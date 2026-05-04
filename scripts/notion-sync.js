#!/usr/bin/env node
/**
 * notion-sync.js
 * Syncs GitHub repo data and site traffic into the Notion Command Center dashboard.
 * Runs via GitHub Actions on every push and on a daily schedule.
 */

const https = require('https');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'NaturesBleszn/Willis-Young-s-Interactive-Resume';
const NOTION_VERSION = '2022-06-28';

// ─── Notion API Helpers ───────────────────────────────────────────────────────

function notionRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.notion.com',
      path: `/v1${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
        ...(data && { 'Content-Length': Buffer.byteLength(data) }),
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error(`JSON parse error: ${raw}`)); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// ─── GitHub API Helpers ───────────────────────────────────────────────────────

function githubRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'notion-sync-bot',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error(`GitHub JSON parse error: ${raw}`)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── Find or Create Database ──────────────────────────────────────────────────

async function findOrCreateDatabase(parentPageId, title, icon, properties) {
  // Search for existing database with this title under the parent
  const search = await notionRequest('POST', '/search', {
    query: title,
    filter: { value: 'database', property: 'object' },
  });
  const existing = (search.results || []).find(
    (r) => r.title?.[0]?.plain_text === title
  );
  if (existing) {
    console.log(`  Found existing database: ${title} (${existing.id})`);
    return existing.id;
  }
  // Create new database
  const db = await notionRequest('POST', '/databases', {
    parent: { type: 'page_id', page_id: parentPageId },
    icon: { type: 'emoji', emoji: icon },
    title: [{ type: 'text', text: { content: title } }],
    properties,
  });
  if (db.object === 'error') {
    throw new Error(`Failed to create database '${title}': ${JSON.stringify(db)}`);
  }
  console.log(`  Created database: ${title} (${db.id})`);
  return db.id;
}

// ─── Upsert Notion Page in DB ─────────────────────────────────────────────────

async function upsertPage(dbId, titleProp, titleValue, properties) {
  // Query for existing entry by title
  const query = await notionRequest('POST', `/databases/${dbId}/query`, {
    filter: {
      property: titleProp,
      title: { equals: titleValue },
    },
  });
  if (query.results && query.results.length > 0) {
    const pageId = query.results[0].id;
    await notionRequest('PATCH', `/pages/${pageId}`, { properties });
    return pageId;
  }
  const page = await notionRequest('POST', '/pages', {
    parent: { database_id: dbId },
    properties,
  });
  return page.id;
}

// ─── Sync GitHub Commits ──────────────────────────────────────────────────────

async function syncCommits(dbId) {
  console.log('\nSyncing commits...');
  const commits = await githubRequest(`/repos/${REPO}/commits?per_page=20`);
  if (!Array.isArray(commits)) {
    console.warn('Could not fetch commits:', JSON.stringify(commits));
    return;
  }
  for (const c of commits) {
    const sha = c.sha.slice(0, 7);
    const message = c.commit.message.split('\n')[0].slice(0, 100);
    const author = c.commit.author.name;
    const date = c.commit.author.date;
    const url = c.html_url;
    await upsertPage(dbId, 'Commit', `${sha}: ${message}`, {
      'Commit': { title: [{ text: { content: `${sha}: ${message}` } }] },
      'Author': { rich_text: [{ text: { content: author } }] },
      'Date': { date: { start: date } },
      'SHA': { rich_text: [{ text: { content: sha } }] },
      'URL': { url },
      'Status': { select: { name: '✅ Merged' } },
    });
  }
  console.log(`  Synced ${commits.length} commits.`);
}

// ─── Sync Workflow Runs ───────────────────────────────────────────────────────

async function syncWorkflowRuns(dbId) {
  console.log('\nSyncing workflow runs...');
  const data = await githubRequest(`/repos/${REPO}/actions/runs?per_page=20`);
  const runs = data.workflow_runs || [];
  for (const r of runs) {
    const label = `${r.name} #${r.run_number}`;
    const statusEmoji = r.conclusion === 'success' ? '✅ Success'
      : r.conclusion === 'failure' ? '❌ Failed'
      : r.status === 'in_progress' ? '🔄 Running'
      : '⏸ Queued';
    await upsertPage(dbId, 'Run', label, {
      'Run': { title: [{ text: { content: label } }] },
      'Workflow': { rich_text: [{ text: { content: r.name } }] },
      'Branch': { rich_text: [{ text: { content: r.head_branch } }] },
      'Status': { select: { name: statusEmoji } },
      'Triggered': { date: { start: r.created_at } },
      'Duration (s)': {
        number: r.updated_at
          ? Math.round((new Date(r.updated_at) - new Date(r.created_at)) / 1000)
          : 0,
      },
      'URL': { url: r.html_url },
    });
  }
  console.log(`  Synced ${runs.length} workflow runs.`);
}

// ─── Sync Repo Overview ───────────────────────────────────────────────────────

async function syncRepoOverview(dbId) {
  console.log('\nSyncing repo overview...');
  const repo = await githubRequest(`/repos/${REPO}`);
  const pages = await githubRequest(`/repos/${REPO}/deployments?per_page=1`);
  const lastDeploy = pages[0]?.created_at || 'N/A';
  await upsertPage(dbId, 'Metric', 'Interactive Resume Repo', {
    'Metric': { title: [{ text: { content: 'Interactive Resume Repo' } }] },
    'Stars': { number: repo.stargazers_count || 0 },
    'Forks': { number: repo.forks_count || 0 },
    'Open Issues': { number: repo.open_issues_count || 0 },
    'Default Branch': { rich_text: [{ text: { content: repo.default_branch } }] },
    'Last Push': { date: { start: repo.pushed_at } },
    'Site URL': { url: 'https://naturesbleszn.github.io/Willis-Young-s-Interactive-Resume/' },
    'Repo URL': { url: repo.html_url },
  });
  console.log('  Repo overview synced.');
}

// ─── Ensure Dashboard Structure in Notion ────────────────────────────────────

async function ensureDashboardBlocks(pageId, ghCommitDbId, ghRunsDbId, ghOverviewDbId, trafficDbId) {
  // Check if the page already has child blocks
  const blocks = await notionRequest('GET', `/blocks/${pageId}/children?page_size=50`);
  if (blocks.results && blocks.results.length > 4) {
    console.log('\nDashboard structure already exists, skipping block creation.');
    return;
  }
  console.log('\nBuilding dashboard blocks in Notion...');
  await notionRequest('PATCH', `/blocks/${pageId}/children`, {
    children: [
      // ── Section: GitHub Dashboard
      { object: 'block', type: 'divider', divider: {} },
      {
        object: 'block', type: 'heading_1',
        heading_1: { rich_text: [{ text: { content: '\uD83D\uDCBB GitHub Dashboard' } }], color: 'blue_background' },
      },
      {
        object: 'block', type: 'callout',
        callout: {
          rich_text: [{ text: { content: 'Auto-updated on every push to main. Each card = one record. Click any row to dive deeper.' } }],
          icon: { type: 'emoji', emoji: '\u26A1' },
          color: 'blue_background',
        },
      },
      {
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '\uD83D\uDDD2 Repo Overview' } }] },
      },
      { object: 'block', type: 'child_database', child_database: { title: 'Repo Overview' } },
      {
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '\uD83D\uDE80 Deployment & Workflow Runs' } }] },
      },
      { object: 'block', type: 'child_database', child_database: { title: 'Workflow Runs' } },
      {
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '\uD83D\uDCDD Commit History' } }] },
      },
      { object: 'block', type: 'child_database', child_database: { title: 'Commit History' } },
      // ── Section: Site Traffic
      { object: 'block', type: 'divider', divider: {} },
      {
        object: 'block', type: 'heading_1',
        heading_1: { rich_text: [{ text: { content: '\uD83D\uDCCA Site Traffic & Visitor Log' } }], color: 'green_background' },
      },
      {
        object: 'block', type: 'callout',
        callout: {
          rich_text: [{ text: { content: 'Visitor data is collected via Google Analytics (gtag.js) and synced here daily. Each row = one tracked session event. Use filters to slice by date, country, or device.' } }],
          icon: { type: 'emoji', emoji: '\uD83D\uDC41\uFE0F' },
          color: 'green_background',
        },
      },
      {
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '\uD83D\uDCF8 Visitor Events' } }] },
      },
      { object: 'block', type: 'child_database', child_database: { title: 'Visitor Events' } },
      // ── Setup Guide
      { object: 'block', type: 'divider', divider: {} },
      {
        object: 'block', type: 'heading_2',
        heading_2: { rich_text: [{ text: { content: '\uD83D\uDCD6 Setup & How It Works' } }] },
      },
      {
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ text: { content: '\uD83D\uDD04 GitHub data auto-refreshes on every push to main + daily at 8 AM CST via GitHub Actions.' } }] },
      },
      {
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ text: { content: '\uD83D\uDCF0 Visitor data comes from Google Analytics events embedded in the resume site.' } }] },
      },
      {
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ text: { content: '\uD83D\uDCCA To view visitor analytics: Open Google Analytics \u2192 your GA4 property for the resume site.' } }] },
      },
      {
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ text: { content: '\uD83D\uDD11 Share this page with others by clicking Share at the top right and enabling web publishing or invite-only access.' } }] },
      },
    ],
  });
  console.log('  Dashboard blocks created.');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n=== Notion Sync Starting ===');
  console.log(`Page ID: ${NOTION_PAGE_ID}`);

  // 1. Ensure all 4 databases exist
  const ghOverviewDbId = await findOrCreateDatabase(
    NOTION_PAGE_ID, 'Repo Overview', '\uD83D\uDDB1', {
      'Metric':          { title: {} },
      'Stars':           { number: {} },
      'Forks':           { number: {} },
      'Open Issues':     { number: {} },
      'Default Branch':  { rich_text: {} },
      'Last Push':       { date: {} },
      'Site URL':        { url: {} },
      'Repo URL':        { url: {} },
    }
  );

  const ghRunsDbId = await findOrCreateDatabase(
    NOTION_PAGE_ID, 'Workflow Runs', '\uD83D\uDE80', {
      'Run':          { title: {} },
      'Workflow':     { rich_text: {} },
      'Branch':       { rich_text: {} },
      'Status':       { select: { options: [
        { name: '\u2705 Success', color: 'green' },
        { name: '\u274C Failed',  color: 'red' },
        { name: '\uD83D\uDD04 Running', color: 'blue' },
        { name: '\u23F8 Queued',  color: 'gray' },
      ] } },
      'Triggered':    { date: {} },
      'Duration (s)': { number: {} },
      'URL':          { url: {} },
    }
  );

  const ghCommitDbId = await findOrCreateDatabase(
    NOTION_PAGE_ID, 'Commit History', '\uD83D\uDCDD', {
      'Commit':  { title: {} },
      'Author':  { rich_text: {} },
      'Date':    { date: {} },
      'SHA':     { rich_text: {} },
      'URL':     { url: {} },
      'Status':  { select: { options: [
        { name: '\u2705 Merged', color: 'green' },
      ] } },
    }
  );

  const trafficDbId = await findOrCreateDatabase(
    NOTION_PAGE_ID, 'Visitor Events', '\uD83D\uDC41\uFE0F', {
      'Event':     { title: {} },
      'Date':      { date: {} },
      'Page':      { rich_text: {} },
      'Country':   { rich_text: {} },
      'Device':    { select: { options: [
        { name: '\uD83D\uDCBB Desktop', color: 'blue' },
        { name: '\uD83D\uDCF1 Mobile',  color: 'green' },
        { name: '\uD83D\uDDA5 Tablet',  color: 'orange' },
      ] } },
      'Sessions':  { number: {} },
      'Source':    { rich_text: {} },
    }
  );

  // 2. Build the visual dashboard blocks on the page (only first run)
  await ensureDashboardBlocks(NOTION_PAGE_ID, ghCommitDbId, ghRunsDbId, ghOverviewDbId, trafficDbId);

  // 3. Sync GitHub data into databases
  await syncRepoOverview(ghOverviewDbId);
  await syncWorkflowRuns(ghRunsDbId);
  await syncCommits(ghCommitDbId);

  console.log('\n=== Notion Sync Complete \u2713 ===\n');
})().catch((err) => {
  console.error('SYNC ERROR:', err);
  process.exit(1);
});
