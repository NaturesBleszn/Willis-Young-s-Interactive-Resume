import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  personalInfo,
  experience,
  education,
  skills,
  detailedCertifications,
  sections,
} from "./data";
import {
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Mail,
  MapPin,
  Linkedin,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  Download,
  Search,
  Copy,
  Check,
  Moon,
  Sun,
  Settings,
  X,
  Type,
  AlignLeft,
  Palette,
  Clock,
  Zap,
  ShieldCheck,
  Target,
  ExternalLink,
  FileBadge,
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("summary");
  const [focusMode, setFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof detailedCertifications[0] | null>(null);
  
  // Readability Settings
  const [theme, setTheme] = useState<"light" | "dark" | "high-contrast">("light");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [lineSpacing, setLineSpacing] = useState<"normal" | "relaxed" | "loose">("normal");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "high-contrast", "text-normal", "text-large", "text-xlarge", "spacing-normal", "spacing-relaxed", "spacing-loose");
    
    if (theme === "dark") html.classList.add("dark");
    if (theme === "high-contrast") html.classList.add("high-contrast");
    
    html.classList.add(`text-${fontSize}`);
    html.classList.add(`spacing-${lineSpacing}`);
  }, [theme, fontSize, lineSpacing]);

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -40% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Sidebar Navigation */}
      <nav className="md:w-64 lg:w-80 bg-slate-900 text-slate-300 p-8 md:fixed md:h-screen md:overflow-y-auto z-20 shadow-xl flex flex-col">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-indigo-400 font-medium mb-6">
            {personalInfo.title}
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between group">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-slate-500" />
                {personalInfo.email}
              </a>
              <button
                onClick={() => handleCopy(personalInfo.email)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-800 rounded-md"
                title="Copy email"
              >
                {copiedEmail ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} className="text-slate-500 hover:text-white" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-500" />
              {personalInfo.location}
            </div>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Linkedin size={16} className="text-slate-500" />
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 hidden md:block">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Navigation
          </h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-indigo-200" : "text-slate-500"} />
                    <span className="font-medium">{section.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto"
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-8 border-t border-slate-800 hidden md:flex flex-col gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 border border-slate-700 hover:bg-slate-800 text-slate-300"
            title="Quick Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="font-medium">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 border border-slate-700 hover:bg-slate-800 text-slate-300"
            title="Readability Settings"
          >
            <Settings size={18} />
            <span className="font-medium">Readability</span>
          </button>

          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 border ${
              focusMode
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "border-slate-700 hover:bg-slate-800 text-slate-300"
            }`}
            title="Focus mode dims inactive sections to help you concentrate."
          >
            {focusMode ? <Eye size={18} /> : <EyeOff size={18} />}
            <span className="font-medium">
              {focusMode ? "Focus Mode On" : "Enable Focus Mode"}
            </span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 border border-slate-700 hover:bg-slate-800 text-slate-300"
            title="Save as PDF via Print dialog"
          >
            <Download size={18} />
            <span className="font-medium">Download PDF</span>
          </button>

          <p className="text-xs text-slate-500 mt-1 text-center">
            ADHD Friendly: Dims inactive sections.
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 lg:ml-80 p-6 md:p-12 lg:p-20 max-w-4xl dark:bg-slate-900 transition-colors duration-300">
        <div className="space-y-24">
          {/* Summary Section */}
          <Section id="summary" title="Summary" active={activeSection === "summary"} focusMode={focusMode}>
            <div className="space-y-6">
              {/* ADHD-Friendly Quick Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20 flex items-start gap-4 transition-colors duration-300">
                  <div className="bg-indigo-100 dark:bg-indigo-500/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">5+ Years Experience</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Technical support & troubleshooting</p>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 flex items-start gap-4 transition-colors duration-300">
                  <div className="bg-emerald-100 dark:bg-emerald-500/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">80-90% Resolution</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">First-contact resolution rate</p>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20 flex items-start gap-4 transition-colors duration-300">
                  <div className="bg-amber-100 dark:bg-amber-500/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">100% Compliant</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">HIPAA & Medicare standards</p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 flex items-start gap-4 transition-colors duration-300">
                  <div className="bg-blue-100 dark:bg-blue-500/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Cross-Platform</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">macOS, Windows, iOS & EHR</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
                  {personalInfo.summary}
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-300">
                  <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-2 transition-colors duration-300">
                    What I'm looking for
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-200 leading-relaxed transition-colors duration-300">
                    {personalInfo.interests}
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Experience Section */}
          <Section id="experience" title="Experience" active={activeSection === "experience"} focusMode={focusMode}>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative group transition-colors duration-300"
                >
                  <div className="absolute left-0 top-8 w-1 h-12 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                        {job.role}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium transition-colors duration-300">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium mb-1 transition-colors duration-300">
                        {job.date}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">{job.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-emerald-500 mt-0.5 shrink-0"
                        />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Education Section */}
          <Section id="education" title="Education" active={activeSection === "education"} focusMode={focusMode}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300"
                >
                  <GraduationCap size={24} className="text-indigo-500 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">
                    {edu.school}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">{edu.degree}</p>
                  {edu.date && (
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md transition-colors duration-300">
                      {edu.date}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Skills Section */}
          <Section id="skills" title="Skills" active={activeSection === "skills"} focusMode={focusMode}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search skills (e.g., Troubleshooting, HIPAA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                />
              </div>

              <motion.div layout className="flex flex-wrap gap-3 min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: theme === 'dark' ? "#312e81" : theme === 'high-contrast' ? "#000000" : "#eef2ff", 
                          color: theme === 'dark' ? "#a5b4fc" : theme === 'high-contrast' ? "#ffff00" : "#4338ca", 
                          borderColor: theme === 'dark' ? "#4f46e5" : theme === 'high-contrast' ? "#ffff00" : "#c7d2fe" 
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-slate-100 dark:bg-slate-700 border border-transparent text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer shadow-sm hover:shadow-md"
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400"
                    >
                      <Search size={32} className="text-slate-300 dark:text-slate-600 mb-3" />
                      <p>No skills found matching "{searchQuery}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Section>

          {/* Certifications Section */}
          <Section id="certifications" title="Certifications" active={activeSection === "certifications"} focusMode={focusMode}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailedCertifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer flex flex-col justify-between group transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-indigo-600 dark:text-indigo-400">
                      <FileBadge className="w-6 h-6" />
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    {(cert.date || cert.issuer) && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
                        <span>{cert.issuer}</span>
                        <span>{cert.date}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {cert.skills.slice(0, 2).map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                        +{cert.skills.length - 2}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
        
        {/* Footer */}
        <footer className="mt-32 pb-12 text-center text-slate-500 text-sm">
          <p>Designed with focus and clarity in mind.</p>
        </footer>
      </main>

      {/* Readability Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Readability</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Palette size={16} /> Color Contrast
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["light", "dark", "high-contrast"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                          theme === t
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-400 dark:text-indigo-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        {t.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Type size={16} /> Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["normal", "large", "xlarge"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setFontSize(s)}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                          fontSize === s
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-400 dark:text-indigo-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Spacing */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <AlignLeft size={16} /> Line Spacing
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["normal", "relaxed", "loose"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLineSpacing(l)}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                          lineSpacing === l
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-400 dark:text-indigo-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Certificate Validation</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 md:p-8 overflow-y-auto w-full flex-grow relative bg-[#f1f5f9] dark:bg-slate-950 flex items-center justify-center min-h-[500px]">
                {/* Simulated Certificate Display */}
                <div className="bg-white max-w-3xl w-full aspect-[4/3] rounded shadow-sm border border-slate-200 relative overflow-hidden flex flex-col p-10 md:p-14 text-center">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-br-full" />
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[100px] border-l-transparent border-t-[100px] border-t-emerald-500/10" />
                  <div className="absolute bottom-0 left-0 w-full h-4 bg-blue-600" />
                  
                  <div className="flex items-center justify-center mb-10 gap-2">
                    <span className="font-bold text-3xl tracking-tight text-[#0a66c2]">Linked<span className="bg-[#0a66c2] text-white px-1 rounded ml-1">in</span></span>
                    <span className="text-3xl text-slate-700 ml-2 font-light">Learning</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-light text-slate-800 mb-8 leading-tight">
                    {selectedCert.title}
                  </h1>

                  <div className="text-lg md:text-xl text-slate-600 mb-2">
                    Course completed by <span className="font-semibold">{personalInfo.name}</span>
                  </div>
                  
                  {(selectedCert.date) && (
                    <div className="text-base text-slate-500 mb-10">
                      {selectedCert.date}
                    </div>
                  )}

                  <div className="mt-auto">
                    <h4 className="text-sm uppercase tracking-widest text-slate-400 mb-4 font-semibold">Top skills covered</h4>
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                      {selectedCert.skills.map(s => (
                        <span key={s} className="border border-slate-300 rounded-full px-4 py-1.5 text-sm text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-8 border-t border-slate-100">
                    <div className="text-left">
                      <div className="w-40 h-12 border-b border-slate-800 mb-2 opacity-50 block items-end flex pb-1">
                        <span className="font-signature text-3xl text-slate-800 transform -rotate-2 inline-block">Dan Brodnitz</span>
                      </div>
                      <div className="text-xs text-slate-500">Head of Global Content, Learning</div>
                    </div>
                    
                    {selectedCert.certificateId && (
                      <div className="text-right flex items-center justify-end">
                         <div className="text-[10px] text-slate-400 max-w-[200px] truncate" title={selectedCert.certificateId}>
                           Certificate ID: {selectedCert.certificateId}
                         </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute bottom-12 right-12 opacity-20 pointer-events-none">
                    <Award className="w-24 h-24 text-blue-600" />
                  </div>
                </div>

                {selectedCert.pdf && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <a
                      href={`/${selectedCert.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View Official PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Section Component
function Section({
  id,
  title,
  children,
  active,
  focusMode,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  active: boolean;
  focusMode: boolean;
}) {
  const isDimmed = focusMode && !active;

  return (
    <section
      id={id}
      className={`scroll-mt-24 transition-all duration-500 ${
        isDimmed ? "opacity-40 pointer-events-none select-none grayscale-[30%]" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
          {title}
        </h2>
        <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1 transition-colors duration-300" />
      </div>
      {children}
    </section>
  );
}

