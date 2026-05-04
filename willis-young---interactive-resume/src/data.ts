import {
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Linkedin,
} from "lucide-react";

export const personalInfo = {
  name: "Willis Young",
  title: "Technical Support Specialist",
  email: "willis.young@outlook.com",
  location: "Conway, Arkansas",
  linkedin: "https://www.linkedin.com/in/willis-young",
  summary:
    "Customer-focused Technical Support Specialist with 5+ years resolving complex software, hardware, and web-based issues across macOS, Windows, and iOS. I routinely handle high-volume tickets while keeping first-contact resolution and customer satisfaction in the 80–90%+ range. I'm known for calm, empathetic communication, airtight documentation, and protecting user data in regulated environments (Medicaid, EVV, EHR, and HIPAA-governed workflows).",
  interests:
    "I'm especially interested in how emerging technologies and AI can streamline support, reduce repeat contacts, and create more human-centered experiences at scale.",
};

export const experience = [
  {
    id: "gainwell",
    company: "Gainwell Technologies",
    role: "Senior Support Specialist",
    date: "Sep 2024 - Present",
    location: "Remote",
    highlights: [
      "Delivered expert telecom support for Medicaid members, navigating 10+ EHR, telephony, and web systems.",
      "Resolved ~95% of caller issues on first contact while maintaining 100% adherence to HIPAA and Medicare requirements.",
      "Partnered with 5+ cross-functional teams to roll out system updates and refine escalation paths, boosting efficiency by ~20%.",
      "Authored and maintained 50+ pages of process and knowledge-base content, strengthening audit readiness.",
    ],
  },
  {
    id: "fedex",
    company: "FedEx Express",
    role: "Material Handler",
    date: "Jan 2022 - Jul 2023",
    location: "Memphis, Tennessee",
    highlights: [
      "Expertly managed and recorded high-volume inventory data, driving a 20–25% improvement in stock accuracy.",
      "Coordinated product movement and order flow to consistently hit delivery deadlines (95–99% on-time shipments).",
      "Followed warehouse safety and security protocols, contributing to a double-digit reduction in incidents.",
    ],
  },
  {
    id: "dxc-evv",
    company: "DXC Technologies",
    role: "EVV: Electronic Visit Verification Admin",
    date: "Dec 2020 - Jan 2022",
    location: "Conway, Arkansas",
    highlights: [
      "Led end-to-end implementation and support of Electronic Visit Verification (EVV) solutions for Medicaid programs.",
      "Trained 150+ providers and caregivers on the Sandata Mobile Connect app via live and remote sessions.",
      "Diagnosed and resolved 200+ technical issues remotely, stabilizing EVV performance.",
    ],
  },
  {
    id: "dxc-msr",
    company: "DXC Technologies",
    role: "Member Service Representative",
    date: "Jul 2019 - Jan 2020",
    location: "Conway, Arkansas",
    highlights: [
      "Safeguarded sensitive member information with 100% adherence to HIPAA privacy standards.",
      "Troubleshot coverage, eligibility, and technical issues (80–90% resolved on first contact).",
      "Applied EHR and HIPAA knowledge to keep error rates in member records below 2–3%.",
    ],
  },
  {
    id: "conduent",
    company: "Conduent",
    role: "Technical Support Representative",
    date: "May 2017 - Jul 2019",
    location: "Remote",
    highlights: [
      "Delivered remote technical support for software and device issues, resolving ~85% of tickets on the first interaction.",
      "Guided non-technical users with clear, step-by-step solutions, cutting repeat contacts by 25–30%.",
      "Meticulously documented 100% of interactions and escalations, improving ticket accuracy.",
    ],
  },
  {
    id: "apple",
    company: "Apple Support (Conduent)",
    role: "Technical Support Advisor",
    date: "Mar 2016 - May 2017",
    location: "Remote",
    highlights: [
      "Specialized in remote technical support for Apple products, resolving an estimated 80–90% of cases without follow-up.",
      "Diagnosed problems through active listening and targeted questioning.",
      "Maintained a calm, professional presence while handling high call volumes.",
    ],
  },
];

export const education = [
  {
    id: "fullsail",
    school: "Full Sail University",
    degree: "Bachelor of Science - BS, Communication and Media Studies",
    date: "Nov 2025 - Jun 2027",
  },
  {
    id: "uca",
    school: "University of Central Arkansas",
    degree: "Film/Business",
    date: "",
  },
  {
    id: "central",
    school: "Central High School",
    degree: "High School Diploma",
    date: "",
  },
];

export const skills = [
  "Technical Troubleshooting",
  "Knowledge Base Development",
  "Process Documentation",
  "Customer Education",
  "Cross-Functional Collaboration",
  "Microsoft Office",
  "Hardware & Software Troubleshooting",
  "EHR & HIPAA Compliance",
  "IT Escalation",
];

export const detailedCertifications = [
  {
    title: "Getting Things Done with David Allen",
    date: "",
    skills: ["Productivity", "Task Management"],
    certificateId: "",
    issuer: "LinkedIn Learning",
    pdf: "1720893046_Getting_Things_Done_with_David_Allen_1.pdf"
  },
  {
    title: "Accounting Foundations: Understanding the Accounting Cycle and Accrual-Basis Accounting",
    date: "Mar 13, 2025",
    skills: ["Full Cycle Accounting", "Accounting", "Accruals"],
    certificateId: "a65aeb17af6821c3a79a57b903c8c6af4c6729c035a90c29dec78b1b2753d29b",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Accounting Foundations Understanding the Accounting Cycle and AccrualBasis Accounting.pdf"
  },
  {
    title: "Audio and Music Production Careers: First Steps",
    date: "Feb 25, 2025",
    skills: ["Music Production"],
    certificateId: "9a79d19f6467cda4e26965b6eed5b5ad21dd239a70535382b1017487513b849f",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Audio and Music Production Careers First Steps.pdf"
  },
  {
    title: "Building with Google Gemini Advanced and Ultra",
    date: "Feb 17, 2025",
    skills: ["Software Development", "Generative AI", "Gemini"],
    certificateId: "d394a2d6a21031f255e5fdfbb71509c1edc3f4fa3a95034618ed5a6f198c7a9e",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Building with Google Gemini Advanced and Ultra.pdf"
  },
  {
    title: "Content Marketing: Blogging for Business",
    date: "Oct 04, 2025",
    skills: ["Social Media Marketing"],
    certificateId: "77cb9a325061f89eeb86908af7881b4eba0d764beb8080c1d0555806f6d2b812",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Content Marketing Blogging for Business 2021.pdf"
  },
  {
    title: "Copilot in Excel: Supercharge Your Productivity",
    date: "Oct 28, 2025",
    skills: ["AI for Business", "Microsoft Copilot", "Artificial Intelligence (AI)"],
    certificateId: "c3087223aaa85a4d428dbc180531fb4e09e44c844d206dd0eaae7bfa1af94937",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in Excel Supercharge Your Productivity 2023.pdf"
  },
  {
    title: "Copilot in OneNote: Smarter Note-Taking with AI",
    date: "Feb 18, 2025",
    skills: ["Microsoft Copilot", "Microsoft OneNote", "Note Taking"],
    certificateId: "11630a777cf66a1a723600d6969f84a190b39ea7299d39999726b7928789cd87",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in OneNote Smarter NoteTaking with AI.pdf"
  },
  {
    title: "Copilot in Outlook: Maximize Your Workday Efficiency",
    date: "Feb 18, 2025",
    skills: ["Artificial Intelligence for Business", "Microsoft Outlook"],
    certificateId: "587e79ebb0a757dd63d91c238dd57c82b255c101801815c6bf40c7c35fa301d0",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in Outlook Maximize Your Workday Efficiency.pdf"
  },
  {
    title: "Copilot in PowerPoint: From Prompt to Presentation",
    date: "Mar 14, 2025",
    skills: ["Microsoft PowerPoint", "Artificial Intelligence for Business", "Microsoft Copilot"],
    certificateId: "afed8b5dc22b533904cc9f6030ab504e56b5a6b1173602e90ff8a38326096e5b",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in PowerPoint From Prompt to Presentation.pdf"
  },
  {
    title: "Copilot in Teams: AI-Powered Collaboration",
    date: "Feb 18, 2025",
    skills: ["Microsoft Teams", "Artificial Intelligence for Business", "Microsoft Copilot"],
    certificateId: "56337ea3f1880672a00285f3a930ef8bfa6349f2c4f4e2ac4a18ad2375a0413d",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in Teams AIPowered Collaboration.pdf"
  },
  {
    title: "Copilot in Word: Create and Refine Documents with AI",
    date: "Feb 26, 2025",
    skills: ["Artificial Intelligence for Business", "Microsoft Copilot", "AI Productivity"],
    certificateId: "a2f8aac85c43026a01e5c5e96090940633d1eff04e86897a1923dd41e01b8308",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Copilot in Word Create and Refine Documents with AI.pdf"
  },
  {
    title: "Creating a Mood Board",
    date: "Nov 11, 2025",
    skills: ["Mood Boards"],
    certificateId: "b96d0cd47351733709fdcba259531c97cb88c82beb1208f544c88352f115f3a2",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Creating a Mood Board.pdf"
  },
  {
    title: "Digital Marketing Foundations",
    date: "Mar 12, 2025",
    skills: ["Digital Marketing"],
    certificateId: "51a068f933ff2e865578ea7b006386f2b7419987d9628415269c2149a4485cf9",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Digital Marketing Foundations.pdf"
  },
  {
    title: "Excel Essential Training (Microsoft 365)",
    date: "Jan 30, 2026",
    skills: ["Microsoft Excel"],
    certificateId: "5bf3896fbffbc5bf3a4b04d9a1da4a088e76d95b072edbd139d4ce4ceaf8e0b9",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel Essential Training Microsoft 365.pdf"
  },
  {
    title: "Excel for Accounting",
    date: "Mar 12, 2025",
    skills: ["Accounting", "Microsoft Excel"],
    certificateId: "61805c858289ccd7da6c3be09e55a39e89ce364d597175328325566734afde04",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel for Accounting.pdf"
  },
  {
    title: "Excel Formulas and Functions Quick Tips",
    date: "Apr 05, 2026",
    skills: ["Microsoft Excel"],
    certificateId: "cce28c08eecd41cb7bd098d7d7b435e61cd3174873d15e84e42a9f13041d2a15",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel Formulas and Functions Quick Tips.pdf"
  },
  {
    title: "Excel: Macros and VBA for Beginners",
    date: "Apr 05, 2026",
    skills: ["VBA Excel", "Microsoft Excel Macros"],
    certificateId: "e16bf9b6d1ffa79e3a564d1df4450c28e17917773a0b137bcafb70290ee3a3f9",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel Macros and VBA for Beginners.pdf"
  },
  {
    title: "Excel PivotTable Quick Tips",
    date: "Apr 05, 2026",
    skills: ["Excel Pivot"],
    certificateId: "a5e85226119608524c48ccb746638bcb4cbdb6901e0e69dede8458f7a0db55e1",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel PivotTable Quick Tips.pdf"
  },
  {
    title: "Excel: Power Query for Beginners",
    date: "Apr 05, 2026",
    skills: ["Microsoft Power Query", "Microsoft Excel"],
    certificateId: "9cf4156fe22f553f474151ff20442d9a2628035eefa49dd8b0168adb8ef0c219",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Excel Power Query for Beginners.pdf"
  },
  {
    title: "Freelancing Tips",
    date: "Oct 03, 2025",
    skills: ["Freelancing"],
    certificateId: "47d1a5cfd2d06d6e73693097c176661237f4a73ec1ba568f30f103af3ab042be",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Freelancing Tips.pdf"
  },
  {
    title: "Generative AI for Digital Marketers",
    date: "Mar 13, 2025",
    skills: ["Digital Marketing", "Artificial Intelligence for Business", "Generative AI Tools"],
    certificateId: "9eaf884c6ee1e8d703b9f204c42b4cea55a244e3779b4a89ae99f792858fcde0",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Generative AI for Digital Marketers.pdf"
  },
  {
    title: "Google Gemini: Get Started with Google's AI Assistant",
    date: "Feb 17, 2025",
    skills: ["Google Gemini", "AI Productivity"],
    certificateId: "256f8b54fafff04f5204bb940728b8f26fb644477e4bce22eb9dcf02d8f57454",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Google Gemini Get Started with Googles AI Assistant.pdf"
  },
  {
    title: "How to Get Started on Tasks You're Avoiding",
    date: "Nov 11, 2025",
    skills: ["Task Management"],
    certificateId: "5491f393025883d8e6a9f228a1eb20f1af7a9d49c97639499cb2f0eb29a449bd",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_How to Get Started on Tasks Youre Avoiding.pdf"
  },
  {
    title: "How to Use LinkedIn Learning",
    date: "Feb 17, 2025",
    skills: ["LinkedIn Learning"],
    certificateId: "bfba5dafb342eaa295d85dadab42768c1b2a5561952cfe40b8af77aa2649f998",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_How to Use LinkedIn Learning.pdf"
  },
  {
    title: "Introduction to Graphic Design: Concepts",
    date: "Nov 04, 2025",
    skills: ["Graphic Design"],
    certificateId: "3d55ad65b2e1d913502b4a4a32e8cca82a6d8fbed055ef3acfde43eaf9f3313a",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Introduction to Graphic Design Concepts.pdf"
  },
  {
    title: "IT Security Foundations: Network Security",
    date: "Aug 02, 2025",
    skills: ["Network Security", "IT Security Operations"],
    certificateId: "b7728bc3c4f0bb9eb43db1fb71eb62c7d0cf40a908e4854fbf8283c783aabdca",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_IT Security Foundations Network Security.pdf"
  },
  {
    title: "Leading with Stories",
    date: "Jan 20, 2026",
    skills: ["Storytelling", "Leadership"],
    certificateId: "be5c487cf86561b38900e9eea01ed2a1d05e6f03f37c6776e4fb47990a339964",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Leading with Stories.pdf"
  },
  {
    title: "Learning Cinematography: 1 Narrative Fundamentals",
    date: "Oct 04, 2025",
    skills: ["Cinematography"],
    certificateId: "00b99de0fd17222cf61b870c7fbe06d3a3a03a545eea5af43e8612afb0d414c5",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Learning Cinematography 1 Narrative Fundamentals.pdf"
  },
  {
    title: "Learning FL Studio 12",
    date: "Feb 25, 2025",
    skills: ["FL Studio"],
    certificateId: "e9228c6c6f42896e4b3284a6c71e5509bd4a80ccbd3ab52f3eae7035fda67d79",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Learning FL Studio 12.pdf"
  },
  {
    title: "Learning Premiere Pro",
    date: "Mar 09, 2026",
    skills: ["Non-linear Editing", "Adobe Premiere Pro", "Video Editing"],
    certificateId: "651ff30046021aa775a0ccf4c07bd5c04ed5a1bc0056e3ba553796d9167a882e",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Learning Premiere Pro.pdf"
  },
  {
    title: "Leveraging the Power of Social Intelligence in the Age of AI",
    date: "Mar 02, 2025",
    skills: ["Social Intelligence", "Interpersonal Skills", "AI Productivity"],
    certificateId: "2ca3d762da567c10c9aa0a09e10803fbab531860cbd58a2dd60b8f46655ccd7d",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Leveraging the Power of Social Intelligence in the Age of AI.pdf"
  },
  {
    title: "Nano Tips to Sharpen Your Critical Thinking",
    date: "Mar 01, 2025",
    skills: ["Critical Thinking"],
    certificateId: "e75858fd97c2c2760c7e52ff25bbbf78b84e4e86a31fff60a089853cca928eb7",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Nano Tips to Sharpen Your Critical Thinking with Shae Zahrai.pdf"
  },
  {
    title: "SAP Accounts Payable Boot Camp",
    date: "Jan 07, 2026",
    skills: ["SAP Products", "Accounts Payable (AP)"],
    certificateId: "a4abef6f57a5ccbfdc9b8a3f1995cd22a8befd0b253caba7865f4021dffa889d",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_SAP Accounts Payable Boot Camp.pdf"
  },
  {
    title: "Storytelling for Designers",
    date: "Nov 02, 2025",
    skills: ["Visual Storytelling"],
    certificateId: "5d020c563112c1d68c96a711605e5a2bb04c778217fd7d47078b7faffb057746",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Storytelling for Designers.pdf"
  },
  {
    title: "Strategies for Creating Viral Short Form Content",
    date: "Mar 04, 2025",
    skills: ["Content Strategy", "Content Creation"],
    certificateId: "f6baf12f53be1bae360dc72b1040dae2cd8080154f4b2899b66382b7f8f9b861",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Strategies for Creating Viral Short Form Content.pdf"
  },
  {
    title: "Streamlining Your Work with Microsoft Copilot",
    date: "Mar 09, 2025",
    skills: ["Artificial Intelligence for Business", "AI Productivity", "Generative AI"],
    certificateId: "27e49b52579724752ff122a9a000fd54aba75be31e6510e025e84beb7e5d8f54",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Streamlining Your Work with Microsoft Copilot.pdf"
  },
  {
    title: "Train Your Brain to Develop Better Habits",
    date: "Jan 25, 2026",
    skills: ["Professional Development", "Personal Development"],
    certificateId: "a61ea96728eb83e19a50960a9891861c35e6f8e8de4704eb8f36b584f70b719a",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Train Your Brain to Develop Better Habits.pdf"
  },
  {
    title: "Vocal Production Techniques: Editing and Mixing in Logic Pro",
    date: "Mar 08, 2025",
    skills: ["Audio Mixing", "Logic Pro", "Audio Editing"],
    certificateId: "fa71d19aff26580402d8682768f1dc387ac6c6a7a1807d83e5ce175a03b95b59",
    issuer: "LinkedIn Learning",
    pdf: "CertificateOfCompletion_Vocal Production Techniques Editing and Mixing in Logic Pro.pdf"
  }
];

// Re-export old certifications array as well to prevent breaking imports if not fully cleaned up yet
export const certifications = detailedCertifications.map(c => c.title);

export const sections = [
  { id: "summary", title: "Summary", icon: Briefcase },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "skills", title: "Skills", icon: Wrench },
  { id: "certifications", title: "Certifications", icon: Award },
];
