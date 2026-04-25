export const mathsRouteMap = {
  hub: "/subjects/maths",
  cbse: "/subjects/maths/cbse",
  "icse-isc": "/subjects/maths/icse-isc",
  igcse: "/subjects/maths/igcse",
  ib: "/subjects/maths/ib",
  jee: "/subjects/maths/jee",
  "ib/pyp": "/subjects/maths/ib/pyp",
  "ib/myp": "/subjects/maths/ib/myp",
  "ib/dp": "/subjects/maths/ib/dp",
  "ib/dp/aa-hl": "/subjects/maths/ib/dp/aa-hl",
  "ib/dp/aa-sl": "/subjects/maths/ib/dp/aa-sl",
  "ib/dp/ai-hl": "/subjects/maths/ib/dp/ai-hl",
  "ib/dp/ai-sl": "/subjects/maths/ib/dp/ai-sl",
  "jee/main": "/subjects/maths/jee/main",
  "jee/advanced": "/subjects/maths/jee/advanced",
};

function card({ eyebrow, title, description, tags = [], to }) {
  return { eyebrow, title, description, tags, to };
}

function pill({ label, to }) {
  return { label, to };
}

function school(title, subtitle, description) {
  return { title, subtitle, description };
}

function area(eyebrow, title, to, description, tags) {
  return { eyebrow, title, to, description, tags };
}

const boardHubFaqs = [
  {
    question: "Should parents choose the board first or the area first?",
    answer:
      "Choose the board first. Once the curriculum is clear, it becomes much easier to judge the right tutor style, class fit, and Gurugram locality convenience.",
  },
  {
    question: "What if we are comparing more than one maths board?",
    answer:
      "Use the board cards as the starting point. Each section explains the maths pressure, class range, and tutoring style that usually fits best across CBSE, ICSE and ISC, IGCSE, IB, or JEE maths.",
  },
  {
    question: "Do families still compare sectors after choosing a board?",
    answer:
      "Yes. Once the academic fit is clearer, locality cards help families judge home-tuition convenience and school-corridor relevance.",
  },
];

const cbseFaqs = [
  {
    question: "Is this suitable for both junior and senior CBSE students?",
    answer:
      "Yes. The CBSE page covers Class 6 to 12, with separate support focus for foundation classes, board years, and senior-school maths.",
  },
  {
    question: "Can one tutor support worksheets and board preparation together?",
    answer:
      "Yes. Good CBSE maths support should connect homework, school tests, pre-boards, and revision rather than treating them as separate problems.",
  },
  {
    question: "Can parents compare Gurugram areas from this page?",
    answer:
      "Yes. The CBSE page keeps local sector cards visible so families can compare school rhythm with tutor travel and home-tuition convenience.",
  },
];

const icseIscFaqs = [
  {
    question: "Is this page useful for both ICSE and ISC maths students?",
    answer:
      "Yes. It keeps junior and senior-school maths needs together, while still showing where written method, structured support, and senior-school depth matter most.",
  },
  {
    question: "What usually matters most in ICSE or ISC maths support?",
    answer:
      "Families often want clearer written presentation, steadier school follow-through, and a tutor who can keep weekly chapter work connected to longer-term exam goals.",
  },
  {
    question: "Can this still help if the student mainly needs school support right now?",
    answer:
      "Yes. Many ICSE and ISC families begin with day-to-day school maths support and then widen the plan only when tests, pre-boards, or board papers start to matter more.",
  },
];

const igcseFaqs = [
  {
    question: "Is this useful for both Core and Extended learners?",
    answer:
      "Yes. The IGCSE page helps families compare level fit, written method, and exam pressure without mixing all learners into one generic explanation.",
  },
  {
    question: "Can the same tutor handle school work and exam papers?",
    answer:
      "Yes. Strong IGCSE maths support should connect class understanding, written method, and paper familiarity in one steady plan.",
  },
  {
    question: "Does locality still matter for international-school families?",
    answer:
      "Yes. Travel convenience, school corridor, and timetable fit still matter, especially for after-school home tuition in Gurugram.",
  },
];

const ibFaqs = [
  {
    question: "Why are PYP, MYP, and DP separated on the IB page?",
    answer:
      "Because the maths language, parent concerns, and tutoring style change a lot across these stages. The support needs are not the same.",
  },
  {
    question: "Should we start with the main IB page or go straight to a pathway?",
    answer:
      "If the stage is already clear, open that pathway. If the family wants a broader IB view first, start with the main IB page.",
  },
  {
    question: "Are DP courses shown separately inside IB?",
    answer:
      "Yes. Diploma students can compare AA HL, AA SL, AI HL, and AI SL after opening the main IB maths page.",
  },
];

const jeeFaqs = [
  {
    question: "Does this page work for students balancing school and entrance preparation?",
    answer:
      "Yes. The JEE page is designed for families who want stronger maths depth without losing discipline across school work and exam preparation.",
  },
  {
    question: "Should we choose JEE Main or JEE Advanced first?",
    answer:
      "Choose the one that best matches the current target. Main and Advanced need different paper habits, pace, and problem-solving depth.",
  },
  {
    question: "Can parents still compare Gurugram localities from the JEE page?",
    answer:
      "Yes. Locality cards help families compare study fit with home-tuition convenience after the exam path is clearer.",
  },
];

const cbseSchools = [
  school(
    "GD Goenka Public School and Sohna Road belt",
    "Board-year discipline",
    "Often useful for families who want chapter planning, worksheet follow-through, and clearer pre-board structure.",
  ),
  school(
    "Amity International School and Sector 46 corridor",
    "Regular school support",
    "A strong fit when parents want dependable weekday maths support tied closely to school pace and chapter tests.",
  ),
  school(
    "South City and Sector 45 cluster",
    "Homework and revision rhythm",
    "Relevant for families who want a tutor to keep revision regular, not rushed, across the term.",
  ),
];

const icseIscSchools = [
  school(
    "Sector 43 and DLF Phase 4 school corridor",
    "Structured school support",
    "Useful for families who want regular chapter follow-through, steadier written work, and dependable week-to-week maths discipline.",
  ),
  school(
    "Golf Course Road and Sector 56 cluster",
    "Senior-school maths rhythm",
    "A strong fit when ISC learners need more organised revision across algebra, calculus, and longer written questions.",
  ),
  school(
    "South City and Sector 50 belt",
    "Board-year planning",
    "Often relevant for families who want school-paper support first and then a calmer move into pre-board or board preparation.",
  ),
];

const igcseSchools = [
  school(
    "Scottish High International School corridor",
    "International-school exam rhythm",
    "Often relevant for families who want clearer written method, better paper handling, and school-aware support.",
  ),
  school(
    "The Heritage Xperiential Learning School belt",
    "Concept depth and pacing",
    "Useful when students need calmer chapter correction and a more structured international-school maths routine.",
  ),
  school(
    "Pathways World School Aravali access",
    "Extended maths and premium support",
    "A good fit for families looking for deeper one-to-one explanation and cleaner exam preparation.",
  ),
];

const ibSchools = [
  school(
    "The Shri Ram School Aravali cluster",
    "IB pathway familiarity",
    "Often relevant for IB families who want school-aware support from primary years through Diploma.",
  ),
  school(
    "Pathways World School Aravali and Golf Course Road",
    "Diploma-level mentoring",
    "Useful for families comparing course fit, paper style, and premium one-to-one maths support.",
  ),
  school(
    "Scottish High and Sector 55-56 corridor",
    "MYP to DP progression",
    "A strong fit when students need steadier progression from structured middle-years maths into Diploma expectations.",
  ),
];

const jeeSchools = [
  school(
    "GD Goenka Public School and Sohna Road belt",
    "School plus entrance balance",
    "Often useful for families who want Class 11 and 12 maths to stay stable while entrance preparation grows.",
  ),
  school(
    "Scottish High and Sector 56 senior-school corridor",
    "Advanced maths demand",
    "Relevant for students needing stronger problem-solving discipline and dependable after-school home support.",
  ),
  school(
    "Amity International School and Sector 46 cluster",
    "Chapter discipline and weekly routine",
    "A strong option for students who need a better structure for school maths, PYQs, and revision planning.",
  ),
];

const cbseAreas = [
  area(
    "School corridor",
    "Sector 46",
    "/city/gurugram/sector-46",
    "Often useful for CBSE families needing regular worksheet follow-through and dependable weekday home tuition.",
    ["Worksheet support", "Board rhythm"],
  ),
  area(
    "School corridor",
    "Sector 50",
    "/city/gurugram/sector-50",
    "Popular with parents looking for board-year structure, revision discipline, and tutors who understand Sohna Road schedules.",
    ["Sohna Road", "Pre-board focus"],
  ),
  area(
    "School corridor",
    "Sector 45",
    "/city/gurugram/sector-45",
    "Useful when families want practical travel coverage, South City access, and regular updates on maths progress.",
    ["South City", "Home tuition"],
  ),
];

const icseIscAreas = [
  area(
    "School corridor",
    "Sector 43",
    "/city/gurugram/sector-43",
    "Useful for ICSE and ISC families who want stronger written method, regular school support, and practical weekday home tuition.",
    ["Written method", "School support"],
  ),
  area(
    "School corridor",
    "Sector 56",
    "/city/gurugram/sector-56",
    "Popular with senior-school families looking for steadier maths structure, cleaner revision, and premium-corridor tutor access.",
    ["ISC senior school", "One-to-one"],
  ),
  area(
    "School corridor",
    "Sector 50",
    "/city/gurugram/sector-50",
    "Often useful when parents want a tutor who can connect chapter learning, test preparation, and board-year planning without making maths feel heavy.",
    ["Board planning", "Weekly routine"],
  ),
];

const igcseAreas = [
  area(
    "International-school area",
    "Sector 54",
    "/city/gurugram/sector-54",
    "Relevant for IGCSE families near Golf Course Road who want concept depth, cleaner written maths, and premium-school familiarity.",
    ["Golf Course Road", "Extended maths"],
  ),
  area(
    "International-school area",
    "Sector 55",
    "/city/gurugram/sector-55",
    "Often chosen by families who want flexible scheduling and steady support for school work, papers, and revision blocks.",
    ["Flexible timing", "Paper practice"],
  ),
  area(
    "International-school area",
    "Sector 56",
    "/city/gurugram/sector-56",
    "Useful for premium-school maths support where parents want checkpoint-style calm, correction, and stronger exam writing.",
    ["Premium locality", "Written method"],
  ),
];

const ibAreas = [
  area(
    "IB school area",
    "Sector 54",
    "/city/gurugram/sector-54",
    "A strong choice for IB families near Golf Course Road who want school-aware maths mentoring and practical travel convenience.",
    ["TSRS Aravali", "IB support"],
  ),
  area(
    "IB school area",
    "Sector 55",
    "/city/gurugram/sector-55",
    "Useful for IB families who want structured home tuition near major premium-school corridors on Golf Course Extension Road.",
    ["Heritage cluster", "Premium schools"],
  ),
  area(
    "IB school area",
    "Sector 56",
    "/city/gurugram/sector-56",
    "Popular for MYP and Diploma maths support where families want stronger tutor availability and international-school familiarity.",
    ["Senior maths", "Stable travel"],
  ),
];

const jeeAreas = [
  area(
    "Senior-school area",
    "Sector 46",
    "/city/gurugram/sector-46",
    "Useful for Class 11 and 12 families who want chapter discipline, regular problem practice, and practical weekday home tuition.",
    ["Class 11 and 12", "Weekly routine"],
  ),
  area(
    "Senior-school area",
    "Sector 50",
    "/city/gurugram/sector-50",
    "Often chosen by families who want calculus and algebra support while keeping school timing around Sohna Road manageable.",
    ["Sohna Road", "JEE Main"],
  ),
  area(
    "Senior-school area",
    "Sector 56",
    "/city/gurugram/sector-56",
    "A strong option for premium-locality families looking for focused home tutoring around deeper problem solving and timed practice.",
    ["Premium locality", "JEE Advanced"],
  ),
];

export const mathsBoardConfig = {
  hub: {
    key: "hub",
    route: mathsRouteMap.hub,
    breadcrumbLabel: "Maths",
    parentKey: null,
    label: "Maths by Board",
    navLabel: "Maths by Board",
    badge: "Maths by Board",
    title: "Maths Tutors by Board",
    subtitle:
      "Choose the board first, then move into maths support that fits the student's class level, school setting, and the kind of maths help they need right now.",
    metaTitle: "Maths Tutors by Board in Gurugram | CBSE, ICSE, IGCSE, IB, JEE | Maths Bodhi",
    metaDescription:
      "Explore Maths Bodhi's maths-by-board hub for Gurugram with CBSE, ICSE and ISC, IGCSE, IB, and JEE maths support.",
    keywords: [
      "maths tutor by board gurugram",
      "cbse maths tutor gurugram",
      "icse maths tutor gurugram",
      "igcse maths tutor gurugram",
      "ib maths tutor gurugram",
      "jee maths tutor gurugram",
    ],
    chips: ["CBSE", "ICSE / ISC", "IGCSE", "IB", "JEE"],
    stats: [
      { value: "5", label: "Main maths routes" },
      { value: "6+", label: "Tutors shown immediately" },
      { value: "3", label: "Shortlisting steps" },
    ],
    supportPanel: {
      title: "Start with the right maths board",
      text:
        "Parents usually shortlist better once the curriculum is clear. After that, class fit, tutor style, and Gurugram locality become much easier to judge.",
      bullets: [
        "Choose the board or exam path first",
        "Then compare class level and tutor fit",
        "Then shortlist by school corridor and locality",
      ],
    },
    overview: {
      badge: "Board Support",
      title: "How maths support changes from one board to another",
      subtitle:
        "The pace, written method, paper pressure, and parent expectations all shift with the board or exam path.",
      cards: [
        card({
          eyebrow: "CBSE Maths",
          title: "School pace, worksheets, and board rhythm",
          description:
            "A good fit for families who want chapter clarity, regular homework discipline, and stronger board-year structure.",
          tags: ["Class 6 to 12", "School tests"],
        }),
        card({
          eyebrow: "ICSE / ISC Maths",
          title: "Written method, structured support, and senior-school continuity",
          description:
            "Useful for families who want clearer presentation, steadier school support, and a smoother move into senior-school maths.",
          tags: ["ICSE", "ISC"],
        }),
        card({
          eyebrow: "IGCSE Maths",
          title: "Written method and paper confidence",
          description:
            "Useful for Core and Extended learners who need cleaner working, stronger problem solving, and steadier exam technique.",
          tags: ["Core and Extended", "Exam writing"],
        }),
        card({
          eyebrow: "IB Maths",
          title: "Pathway-specific maths support from PYP to DP",
          description:
            "IB needs the right stage and course path chosen first so maths support can match the student's actual pathway.",
          tags: ["PYP to DP", "AA and AI"],
        }),
        card({
          eyebrow: "JEE Maths",
          title: "Exam-oriented problem solving and weekly discipline",
          description:
            "JEE students usually need the right exam target, sharper question handling, and better speed-plus-accuracy routines.",
          tags: ["JEE Main", "JEE Advanced"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "How families usually use the maths hub",
        paragraphs: [
          "Most parents already know whether the student is in CBSE, ICSE or ISC, IGCSE, IB, or preparing for JEE. What they need next is a quicker way to move into the right maths support style without extra confusion.",
          "That is why this hub stays focused on clear board choices, tutor fit, and Gurugram relevance rather than crowding all pathways into one long page.",
        ],
      },
      {
        title: "When to open a dedicated board page",
        paragraphs: [
          "Once the curriculum is clear, the next step is usually to open the dedicated board page and compare tutors, support points, and school context that actually match the student's situation.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-cbse-rahul",
      "tutor-icse-suhani",
      "tutor-igcse-neha",
      "tutor-ib-aarav",
      "tutor-jee-aditya",
      "tutor-ib-sana",
      "tutor-cbse-priyank",
    ],
    featuredReviewIds: [
      "review-cbse-sector-50",
      "review-igcse-sector-54",
      "review-ib-sector-54",
      "review-jee-sector-50",
    ],
    checklist: [
      "Compare board fit before comparing individual tutors.",
      "Use class range or exam target to shortlist more quickly.",
      "Check school corridor and locality once the board is clear.",
    ],
    schoolHighlights: [
      school(
        "Scottish High and Sector 55-56 corridor",
        "Multiple maths demands in one corridor",
        "Relevant for families comparing board depth, premium-school expectations, and after-school home tuition availability.",
      ),
      school(
        "Golf Course Road premium-school cluster",
        "International curriculum demand",
        "Often useful for families considering IGCSE or IB support with stronger school awareness.",
      ),
      school(
        "Sector 43 and DLF Phase 4 corridor",
        "Structured school-maths follow-through",
        "Useful for ICSE and ISC families who want steadier written work, practical weekday support, and clearer school-paper routines.",
      ),
      school(
        "Sohna Road and Sector 50 school belt",
        "Board-year maths demand",
        "Useful for parents looking for regular worksheet support, revision structure, and Class 9 to 12 maths follow-through.",
      ),
    ],
    localZones: [cbseAreas[0], icseIscAreas[0], igcseAreas[0], ibAreas[0], jeeAreas[1]],
    faqItems: boardHubFaqs,
    cta: {
      label: "Book a maths consultation",
      description:
        "Share the board, class or exam target, school, and the maths chapters causing the most friction. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  cbse: {
    key: "cbse",
    route: mathsRouteMap.cbse,
    breadcrumbLabel: "CBSE Maths",
    parentKey: "hub",
    label: "CBSE Maths",
    navLabel: "CBSE",
    badge: "CBSE Maths",
    title: "CBSE maths home tuition in Gurugram for Class 6 to 12",
    subtitle:
      "CBSE maths support for chapter clarity, worksheets, school tests, and stronger board preparation from middle school to Class 12.",
    metaTitle: "CBSE Maths Tutors in Gurugram | Class 6 to 12 | Maths Bodhi",
    metaDescription:
      "Explore CBSE maths home tuition in Gurugram for Class 6 to 12 with board-year support, school-fit guidance, and Gurugram locality relevance.",
    keywords: ["cbse maths tutor gurugram", "class 10 maths tutor gurugram", "class 12 maths tuition gurugram"],
    chips: ["Class 6 to 8", "Class 9 and 10", "Class 11 and 12"],
    stats: [
      { value: "3", label: "Class bands" },
      { value: "6", label: "Featured tutors" },
      { value: "3", label: "Popular local areas" },
    ],
    supportPanel: {
      title: "CBSE maths changes clearly with class level",
      text:
        "A Class 6 learner, a Class 10 board student, and a Class 12 student all need different pace, written method, and revision support.",
      bullets: [
        "Foundation classes need habit and confidence",
        "Board classes need cleaner written work",
        "Senior school needs stronger revision control",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What CBSE maths students usually need help with",
      subtitle:
        "The biggest differences appear between foundation classes, board years, and senior-school maths.",
      cards: [
        card({
          eyebrow: "Class 6 to 8",
          title: "Concept repair and steadier homework habits",
          description:
            "Useful for students who need cleaner basics, more repetition, and a calmer transition into algebra and mensuration.",
          tags: ["Confidence", "Homework rhythm"],
        }),
        card({
          eyebrow: "Class 9 and 10",
          title: "School pace and board preparation",
          description:
            "Best for families who want better written steps, chapter planning, and less last-minute pressure before boards.",
          tags: ["Board years", "Pre-boards"],
        }),
        card({
          eyebrow: "Class 11 and 12",
          title: "Senior-school maths and revision discipline",
          description:
            "Important for functions, calculus, matrices, and longer revision blocks across the term.",
          tags: ["Senior school", "Calculus"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "Where good CBSE maths tutoring usually helps most",
        paragraphs: [
          "For many CBSE students, the biggest change comes when maths stops feeling rushed and starts feeling structured. That usually means stronger chapter sequencing, cleaner written method, and a steadier test routine.",
          "Parents often notice the difference first in homework discipline and school confidence, then later in test and board performance.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-cbse-rahul",
      "tutor-cbse-mehak",
      "tutor-cbse-priyank",
      "tutor-cbse-kavya",
      "tutor-cbse-devika",
      "tutor-cbse-ankit",
    ],
    featuredReviewIds: [
      "review-cbse-sector-50",
      "review-cbse-sector-46",
      "review-cbse-sector-65",
    ],
    checklist: [
      "Check class fit before finalising the tutor.",
      "Ask how worksheets, tests, and revision will connect.",
      "Shortlist by sector only after the academic fit is clear.",
    ],
    schoolHighlights: cbseSchools,
    localZones: cbseAreas,
    faqItems: cbseFaqs,
    cta: {
      label: "Book a CBSE maths demo",
      description:
        "Share the student's class, school, recent test performance, and the chapters that feel weakest. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "icse-isc": {
    key: "icse-isc",
    route: mathsRouteMap["icse-isc"],
    breadcrumbLabel: "ICSE / ISC Maths",
    parentKey: "hub",
    label: "ICSE / ISC Maths",
    navLabel: "ICSE / ISC",
    badge: "ICSE / ISC Maths",
    title: "ICSE and ISC maths tuition in Gurugram for structured school support",
    subtitle:
      "ICSE and ISC maths support for clearer written method, stronger school follow-through, and steadier senior-school preparation where needed.",
    metaTitle: "ICSE and ISC Maths Tutors in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore ICSE and ISC maths tuition in Gurugram with written-method support, school-fit guidance, and senior-school maths help.",
    keywords: ["icse maths tutor gurugram", "isc maths tutor gurugram", "icse home tuition gurugram"],
    chips: ["Class 7 to 10", "ISC senior school", "Written method"],
    stats: [
      { value: "2", label: "Main school stages" },
      { value: "4", label: "Featured tutors" },
      { value: "3", label: "Popular local areas" },
    ],
    supportPanel: {
      title: "ICSE and ISC maths usually improve with structure",
      text:
        "Families often want stronger written presentation, steadier school support, and a tutoring rhythm that keeps chapter learning connected across the term.",
      bullets: [
        "Younger classes often need calmer written discipline",
        "Senior-school maths needs better sequencing and revision",
        "One-to-one support works best when school rhythm is understood",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What ICSE and ISC maths students usually need help with",
      subtitle:
        "The strongest support plans keep school expectations, written method, and topic confidence moving together.",
      cards: [
        card({
          eyebrow: "ICSE classes",
          title: "Written method and school-paper confidence",
          description:
            "Useful for students who need cleaner steps, steadier notebooks, and more reliable chapter performance before school tests begin to slip.",
          tags: ["Class 7 to 10", "Written method"],
        }),
        card({
          eyebrow: "ISC senior school",
          title: "Senior-school maths with more consistent revision",
          description:
            "Helpful when the student needs stronger structure across calculus, algebra, and longer written questions.",
          tags: ["Class 11 and 12", "Revision"],
        }),
        card({
          eyebrow: "School support",
          title: "Regular one-to-one maths guidance that stays practical",
          description:
            "A good fit for families who want better weekly continuity rather than last-minute maths rescue near exams.",
          tags: ["One-to-one", "School rhythm"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "Why ICSE and ISC families often want structured maths support",
        paragraphs: [
          "For many families, the real issue is not one weak chapter. It is that maths starts to feel uneven across notebooks, school tests, homework, and revision. Clearer structure often helps first.",
          "That is why ICSE and ISC maths support usually works best when the tutor can connect written method, school expectations, and a calmer weekly routine.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-icse-suhani",
      "tutor-icse-raghav",
      "tutor-icse-naina",
      "tutor-icse-vikram",
      "tutor-cbse-priyank",
      "tutor-cbse-kavya",
    ],
    featuredReviewIds: [],
    checklist: [
      "Check whether the tutor improves written presentation as well as understanding.",
      "Ask how school tests and chapter practice will connect each week.",
      "Use location and school corridor only after the academic fit is clear.",
    ],
    schoolHighlights: icseIscSchools,
    localZones: icseIscAreas,
    faqItems: icseIscFaqs,
    cta: {
      label: "Book an ICSE / ISC maths demo",
      description:
        "Share the student's class, school, current test pattern, and the maths chapters that feel least steady. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  igcse: {
    key: "igcse",
    route: mathsRouteMap.igcse,
    breadcrumbLabel: "IGCSE Maths",
    parentKey: "hub",
    label: "IGCSE Maths",
    navLabel: "IGCSE",
    badge: "IGCSE Maths",
    title: "IGCSE maths tuition in Gurugram for Core and Extended learners",
    subtitle:
      "IGCSE maths support for Core and Extended learners building written method confidence, problem solving, and stronger paper performance.",
    metaTitle: "IGCSE Maths Tutors in Gurugram | Core and Extended Support | Maths Bodhi",
    metaDescription:
      "Explore IGCSE maths tuition in Gurugram with Core and Extended support, school-fit guidance, and international-school maths mentoring.",
    keywords: ["igcse maths tutor gurugram", "extended maths tutor gurugram", "cambridge maths tutor gurugram"],
    chips: ["Core", "Extended", "Exam technique"],
    stats: [
      { value: "2", label: "Main levels" },
      { value: "6", label: "Featured tutors" },
      { value: "3", label: "Local corridors" },
    ],
    supportPanel: {
      title: "IGCSE maths often comes down to clarity and written method",
      text:
        "Families usually want to know whether the student needs concept rebuilding, clearer steps, or steadier paper familiarity.",
      bullets: [
        "Core and Extended expectations differ",
        "Written accuracy matters a lot",
        "Past-paper familiarity builds confidence",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What IGCSE maths students usually need help with",
      subtitle:
        "The strongest support plans improve topic clarity, written working, and exam confidence together.",
      cards: [
        card({
          eyebrow: "Core maths",
          title: "Steadier step-by-step understanding",
          description:
            "Useful when the student needs more guided correction, better basic structure, and calmer chapter control before exams.",
          tags: ["Core maths", "Topic control"],
        }),
        card({
          eyebrow: "Extended maths",
          title: "Higher-rigor problem solving",
          description:
            "Best for learners who need more control over algebra, graph work, and multi-step questions.",
          tags: ["Extended", "Problem solving"],
        }),
        card({
          eyebrow: "Exam preparation",
          title: "Cleaner written work and paper confidence",
          description:
            "Important when marks are lost through incomplete method, rushed solving, or weaker timed practice.",
          tags: ["Written method", "Timed papers"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "Why families often choose one-to-one IGCSE maths support",
        paragraphs: [
          "Many students understand the idea in class but still struggle to turn that understanding into clear, mark-worthy working. That is where focused maths tutoring often helps most.",
          "Parents usually value support more when it builds written control and exam confidence together, not only topic familiarity.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-igcse-neha",
      "tutor-igcse-arjun",
      "tutor-igcse-meera",
      "tutor-igcse-tara",
      "tutor-igcse-zoya",
      "tutor-igcse-omar",
    ],
    featuredReviewIds: [
      "review-igcse-sector-54",
      "review-igcse-sector-56",
      "review-igcse-sector-55",
    ],
    checklist: [
      "Check whether the tutor fits Core or Extended expectations.",
      "Ask how written method will be corrected each week.",
      "Use school corridor and timing fit as the final filter.",
    ],
    schoolHighlights: igcseSchools,
    localZones: igcseAreas,
    faqItems: igcseFaqs,
    cta: {
      label: "Book an IGCSE maths demo",
      description:
        "Share the grade, school, current level, and the question types that feel least stable. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  ib: {
    key: "ib",
    route: mathsRouteMap.ib,
    breadcrumbLabel: "IB Maths",
    parentKey: "hub",
    label: "IB Maths",
    navLabel: "IB",
    badge: "IB Maths",
    title: "IB maths tutoring in Gurugram across PYP, MYP, and DP",
    subtitle:
      "IB maths support across PYP, MYP, and Diploma pathways, with clearer guidance on stage fit, course choice, and school-specific expectations.",
    metaTitle: "IB Maths Tutors in Gurugram | PYP, MYP, DP | Maths Bodhi",
    metaDescription:
      "Explore IB maths tutoring in Gurugram across PYP, MYP, and DP, including AA HL, AA SL, AI HL, and AI SL pathways.",
    keywords: ["ib maths tutor gurugram", "ib pyp maths tutor gurugram", "ib dp maths tutor gurugram"],
    chips: ["PYP", "MYP", "DP", "AA and AI"],
    stats: [
      { value: "3", label: "IB stages" },
      { value: "4", label: "DP course options" },
      { value: "6", label: "Featured tutors" },
    ],
    supportPanel: {
      title: "IB maths changes a lot across the years",
      text:
        "A primary learner, a middle-years student, and a Diploma student do not need the same maths language, pace, or support style.",
      bullets: [
        "PYP focuses on numeracy and confidence",
        "MYP builds structure and reasoning",
        "DP needs the right course chosen early",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What IB maths families usually need help with",
      subtitle:
        "The best IB tutoring stays faithful to the student's stage first, then moves into the right level of depth.",
      cards: [
        card({
          eyebrow: "PYP",
          title: "Numeracy confidence and clear maths language",
          description:
            "Useful for younger learners who need number sense, patterns, and a more confident relationship with maths.",
          tags: ["PYP", "Confidence"],
        }),
        card({
          eyebrow: "MYP",
          title: "Reasoning, notation, and progression",
          description:
            "Best for students who need stronger structure, cleaner method, and better preparation for later IB maths.",
          tags: ["MYP", "Reasoning"],
        }),
        card({
          eyebrow: "DP",
          title: "Course fit, paper style, and topic depth",
          description:
            "Important when families need clarity on AA versus AI and stronger support for course-specific papers.",
          tags: ["Diploma", "AA and AI"],
        }),
      ],
    },
    childSections: [
      {
        badge: "IB Pathways",
        title: "Choose the IB stage that matches the student",
        subtitle: "Each pathway leads into a different kind of maths support, language, and academic pressure.",
        layout: "cards",
        items: [
          card({
            eyebrow: "Stage",
            title: "IB PYP Maths",
            description:
              "For numeracy, confidence, patterns, and early problem solving in the primary years.",
            tags: ["PYP", "Foundations"],
            to: mathsRouteMap["ib/pyp"],
          }),
          card({
            eyebrow: "Stage",
            title: "IB MYP Maths",
            description:
              "For stronger reasoning, notation, and progression from structured middle-years maths into later IB work.",
            tags: ["MYP", "Reasoning"],
            to: mathsRouteMap["ib/myp"],
          }),
          card({
            eyebrow: "Stage",
            title: "IB DP Maths",
            description:
              "For families choosing the right Diploma pathway before comparing course depth, papers, and topic needs.",
            tags: ["DP", "AA and AI"],
            to: mathsRouteMap["ib/dp"],
          }),
        ],
      },
      {
        badge: "DP Courses",
        title: "Compare the Diploma maths course options",
        subtitle: "These options help DP families move directly into the right maths course once the stage is clear.",
        layout: "pills",
        items: [
          pill({ label: "AA HL", to: mathsRouteMap["ib/dp/aa-hl"] }),
          pill({ label: "AA SL", to: mathsRouteMap["ib/dp/aa-sl"] }),
          pill({ label: "AI HL", to: mathsRouteMap["ib/dp/ai-hl"] }),
          pill({ label: "AI SL", to: mathsRouteMap["ib/dp/ai-sl"] }),
        ],
      },
    ],
    detailSections: [
      {
        title: "Why stage fit matters so much in IB maths",
        paragraphs: [
          "IB families often find it easier to choose once the page is organised by pathway. PYP needs confidence and numeracy, MYP needs stronger structure, and DP needs course-specific clarity.",
          "That stage-first approach usually leads to a better tutor match and a more realistic support plan.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-ib-aarav",
      "tutor-ib-sana",
      "tutor-ib-rhea",
      "tutor-ib-kabir",
      "tutor-igcse-meera",
      "tutor-igcse-tara",
    ],
    featuredReviewIds: [
      "review-ib-sector-54",
      "review-ib-sector-55",
      "review-ib-sector-62",
    ],
    checklist: [
      "Choose the pathway before choosing the tutor.",
      "For DP, compare course fit early.",
      "Use school corridor and travel convenience after the stage is clear.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: ibFaqs,
    cta: {
      label: "Book an IB maths demo",
      description:
        "Share the student's IB stage, school, pathway if known, and the areas where maths feels least stable. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/pyp": {
    key: "ib/pyp",
    route: mathsRouteMap["ib/pyp"],
    breadcrumbLabel: "IB PYP Maths",
    parentKey: "ib",
    label: "IB PYP Maths",
    navLabel: "PYP",
    badge: "IB PYP Maths",
    title: "IB PYP maths tutoring in Gurugram for numeracy and confidence",
    subtitle:
      "PYP maths support for younger learners who need stronger number sense, better maths language, and calmer confidence in the early years.",
    metaTitle: "IB PYP Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB PYP maths tutoring in Gurugram for number sense, confidence building, and strong early-years numeracy support.",
    keywords: ["ib pyp maths tutor gurugram", "pyp numeracy tutor gurugram"],
    chips: ["Numeracy", "Confidence", "Foundations"],
    stats: [
      { value: "3", label: "Main support goals" },
      { value: "6", label: "Featured tutors" },
    ],
    supportPanel: {
      title: "PYP maths should feel clear and confidence-building",
      text:
        "Families often want stronger number sense, calmer practice, and a tutor who can explain maths in language the child can actually use.",
      bullets: [
        "Build numeracy before pressure grows",
        "Use visual explanation and repetition",
        "Keep lessons positive and structured",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What PYP maths tutoring usually focuses on",
      subtitle:
        "The strongest support usually improves understanding, maths language, and willingness to try.",
      cards: [
        card({
          eyebrow: "Numeracy",
          title: "Number sense and confidence",
          description: "Useful for place value, number bonds, operations, and steady early accuracy.",
          tags: ["Number sense", "Confidence"],
        }),
        card({
          eyebrow: "Thinking",
          title: "Patterns and early problem solving",
          description: "Important when the child needs help reading simple maths situations and responding calmly.",
          tags: ["Patterns", "Problem solving"],
        }),
        card({
          eyebrow: "Language",
          title: "Clearer maths vocabulary",
          description: "Helpful when a learner understands part of the idea but cannot express it clearly yet.",
          tags: ["Vocabulary", "Understanding"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "Why PYP maths support should stay gentle but structured",
        paragraphs: [
          "Younger learners usually grow faster when lessons feel clear, encouraging, and repeatable. The aim is to make maths feel understandable, not heavy.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-ib-sana",
      "tutor-ib-rhea",
      "tutor-igcse-meera",
      "tutor-cbse-devika",
      "tutor-cbse-mehak",
      "tutor-ib-aarav",
    ],
    featuredReviewIds: ["review-pyp-sector-54", "review-ib-sector-55"],
    checklist: [
      "Check whether the tutor explains maths visually and patiently.",
      "Look for confidence-building, not just repetition.",
      "Keep travel convenience practical for younger students.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is PYP maths tutoring mainly for students who are weak?",
        answer:
          "No. Many families use PYP tutoring to build confidence, stronger numeracy habits, and better maths language early.",
      },
      {
        question: "Should PYP maths lessons feel formal?",
        answer:
          "They should feel structured, but the teaching style still needs to stay clear, calm, and age-appropriate.",
      },
    ],
    cta: {
      label: "Book a PYP maths demo",
      description:
        "Share the school, the learner's age, and the maths areas that feel least confident right now. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/myp": {
    key: "ib/myp",
    route: mathsRouteMap["ib/myp"],
    breadcrumbLabel: "IB MYP Maths",
    parentKey: "ib",
    label: "IB MYP Maths",
    navLabel: "MYP",
    badge: "IB MYP Maths",
    title: "IB MYP maths tutoring in Gurugram for reasoning and progression",
    subtitle:
      "MYP maths support for reasoning, notation, structure, and a smoother progression toward Diploma expectations.",
    metaTitle: "IB MYP Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB MYP maths tutoring in Gurugram for reasoning, notation, and stronger progression into later IB maths.",
    keywords: ["ib myp maths tutor gurugram", "myp maths tutor gurugram"],
    chips: ["Reasoning", "Notation", "Progression"],
    stats: [
      { value: "3", label: "Main support goals" },
      { value: "6", label: "Featured tutors" },
    ],
    supportPanel: {
      title: "MYP maths needs structure and better reasoning",
      text:
        "Families often want clearer notation, steadier written method, and a better bridge into more abstract maths.",
      bullets: [
        "Strengthen notation and written logic",
        "Build confidence with abstract ideas",
        "Prepare for later IB maths without rushing",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What MYP maths students usually need help with",
      subtitle:
        "The strongest support makes reasoning cleaner, written work steadier, and progression into later years less stressful.",
      cards: [
        card({
          eyebrow: "Reasoning",
          title: "Clearer mathematical thinking",
          description: "Useful when the student understands parts of the idea but cannot explain or structure it well.",
          tags: ["Reasoning", "Structure"],
        }),
        card({
          eyebrow: "Method",
          title: "Cleaner written steps",
          description: "Important when method marks are being lost through incomplete or unclear working.",
          tags: ["Written method", "Accuracy"],
        }),
        card({
          eyebrow: "Progression",
          title: "Smoother movement into DP",
          description: "Helpful for students who need better discipline before the pressure of Diploma mathematics grows.",
          tags: ["DP readiness", "Progression"],
        }),
      ],
    },
    childSections: [],
    detailSections: [
      {
        title: "Why MYP tutoring often focuses on structure",
        paragraphs: [
          "Many MYP learners are capable, but still inconsistent with notation, explanation, and written flow. That is why tutoring at this stage often works best when it improves structure as much as understanding.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-ib-rhea",
      "tutor-ib-sana",
      "tutor-igcse-meera",
      "tutor-igcse-tara",
      "tutor-ib-aarav",
      "tutor-igcse-neha",
    ],
    featuredReviewIds: ["review-ib-sector-55", "review-ib-sector-54"],
    checklist: [
      "Check whether the tutor improves reasoning, not only question count.",
      "Ask how notation and written method are corrected.",
      "Use school rhythm and travel fit as the final filter.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is MYP tutoring mainly about harder questions?",
        answer:
          "Not always. Many students benefit more from stronger structure, notation, and reasoning before question difficulty is increased.",
      },
      {
        question: "Can MYP tutoring help with later DP readiness?",
        answer:
          "Yes. Better habits in MYP often make the transition into Diploma maths much smoother later.",
      },
    ],
    cta: {
      label: "Book an MYP maths demo",
      description:
        "Share the school, grade, and the areas where notation, reasoning, or confidence are currently weakest. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/dp": {
    key: "ib/dp",
    route: mathsRouteMap["ib/dp"],
    breadcrumbLabel: "IB DP Maths",
    parentKey: "ib",
    label: "IB DP Maths",
    navLabel: "DP",
    badge: "IB DP Maths",
    title: "IB DP maths tutoring in Gurugram for AA and AI pathway decisions",
    subtitle:
      "Diploma maths support for students comparing AA and AI, choosing HL or SL, and building steadier paper performance.",
    metaTitle: "IB DP Maths Tutor in Gurugram | AA and AI Support | Maths Bodhi",
    metaDescription:
      "Explore IB DP maths tutoring in Gurugram for AA HL, AA SL, AI HL, and AI SL pathway guidance and course-specific support.",
    keywords: ["ib dp maths tutor gurugram", "aa hl tutor gurugram", "ai sl tutor gurugram"],
    chips: ["AA HL", "AA SL", "AI HL", "AI SL"],
    stats: [
      { value: "4", label: "DP course options" },
      { value: "6", label: "Featured tutors" },
    ],
    supportPanel: {
      title: "DP maths works best when the course fit is clear",
      text:
        "Families often need help deciding whether the real issue is level, course style, paper control, or topic depth.",
      bullets: [
        "Choose AA or AI carefully",
        "Then decide HL or SL fit",
        "Then build course-specific paper discipline",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What DP maths students usually need help with",
      subtitle:
        "The course choice matters early because AA and AI ask for different strengths and paper habits.",
      cards: [
        card({
          eyebrow: "Course choice",
          title: "AA versus AI clarity",
          description:
            "Useful for families who want to compare the style of mathematics before jumping into chapters.",
          tags: ["Course fit", "Academic direction"],
        }),
        card({
          eyebrow: "Level choice",
          title: "HL versus SL expectations",
          description:
            "Important when the real pressure is level fit rather than only topic difficulty.",
          tags: ["HL and SL", "Workload"],
        }),
        card({
          eyebrow: "Paper performance",
          title: "Course-specific written control",
          description:
            "Best for learners who need steadier working, revision, and paper familiarity in the chosen course.",
          tags: ["Papers", "Revision"],
        }),
      ],
    },
    childSections: [
      {
        badge: "Diploma Courses",
        title: "Choose the DP maths course that matches the student",
        subtitle: "These course cards help families move directly into the right HL or SL path.",
        layout: "cards",
        items: [
          card({
            eyebrow: "Course",
            title: "AA HL",
            description: "For stronger theoretical work, calculus depth, and higher-rigor paper demands.",
            tags: ["Higher level", "Analysis and approaches"],
            to: mathsRouteMap["ib/dp/aa-hl"],
          }),
          card({
            eyebrow: "Course",
            title: "AA SL",
            description: "For cleaner method, steadier written work, and stronger Standard Level mathematical structure.",
            tags: ["Standard level", "Analysis and approaches"],
            to: mathsRouteMap["ib/dp/aa-sl"],
          }),
          card({
            eyebrow: "Course",
            title: "AI HL",
            description: "For modelling, interpretation, and higher-level applications-style problem solving.",
            tags: ["Higher level", "Applications and interpretation"],
            to: mathsRouteMap["ib/dp/ai-hl"],
          }),
          card({
            eyebrow: "Course",
            title: "AI SL",
            description: "For clearer interpretation, confidence, and steadier standard-level applications papers.",
            tags: ["Standard level", "Applications and interpretation"],
            to: mathsRouteMap["ib/dp/ai-sl"],
          }),
        ],
      },
    ],
    detailSections: [
      {
        title: "Why DP maths decisions feel heavy for families",
        paragraphs: [
          "For many IB families, the hardest part is not one chapter. It is deciding the right course and understanding what that choice will mean for workload, paper style, and long-term confidence.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-ib-aarav",
      "tutor-ib-kabir",
      "tutor-ib-rhea",
      "tutor-igcse-tara",
      "tutor-jee-ishita",
      "tutor-igcse-arjun",
    ],
    featuredReviewIds: ["review-ib-sector-54", "review-ib-sector-62"],
    checklist: [
      "Clarify the course before comparing topic support.",
      "Check whether the tutor fits HL or SL expectations.",
      "Ask how papers and revision will be handled within the chosen course.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Should we decide AA or AI before looking at tutors?",
        answer:
          "Yes. The support style changes a lot with the course, so the tutor choice is usually better once AA or AI is clear.",
      },
      {
        question: "Can a tutor help with both course fit and papers?",
        answer:
          "Yes. Good DP maths support should help with the course decision as well as ongoing chapter and paper performance.",
      },
    ],
    cta: {
      label: "Book a DP maths demo",
      description:
        "Share the school, likely course, current level, and the areas where DP maths feels least stable. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/dp/aa-hl": {
    key: "ib/dp/aa-hl",
    route: mathsRouteMap["ib/dp/aa-hl"],
    breadcrumbLabel: "AA HL",
    parentKey: "ib/dp",
    label: "IB DP AA HL Maths",
    navLabel: "AA HL",
    badge: "IB DP AA HL",
    title: "IB DP AA HL maths tutoring in Gurugram for calculus depth and higher-rigor papers",
    subtitle:
      "AA HL support for students who need stronger calculus control, proof-oriented discipline, and more reliable Higher Level paper performance.",
    metaTitle: "IB DP AA HL Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB DP AA HL maths tutoring in Gurugram for calculus depth, theoretical rigour, and Higher Level paper preparation.",
    keywords: ["aa hl maths tutor gurugram", "ib aa hl tutor gurugram"],
    chips: ["AA HL", "Calculus", "Higher-rigor papers"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "AA HL needs depth, clarity, and stronger written control",
      text:
        "Families usually want better topic depth, calmer handling of harder questions, and more dependable Higher Level paper performance.",
      bullets: [
        "Calculus depth matters",
        "Proof and method both matter",
        "Higher Level pacing needs discipline",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What AA HL students usually need help with",
      subtitle: "The course usually improves when topic depth and written control improve together.",
      cards: [
        card({
          eyebrow: "Depth",
          title: "Calculus and algebra control",
          description: "Useful when harder questions still feel unstable or rushed.",
          tags: ["Calculus", "Algebra"],
        }),
        card({
          eyebrow: "Method",
          title: "Cleaner higher-level working",
          description: "Important when incomplete steps or presentation keep cutting marks.",
          tags: ["Written precision", "Method"],
        }),
        card({
          eyebrow: "Papers",
          title: "Steadier paper discipline",
          description: "Helpful when the student needs more control over pacing and paper choice.",
          tags: ["Papers", "Pacing"],
        }),
      ],
    },
    childSections: [],
    detailSections: [],
    featuredTutorIds: [
      "tutor-ib-aarav",
      "tutor-jee-ishita",
      "tutor-igcse-arjun",
      "tutor-ib-rhea",
      "tutor-jee-nishant",
      "tutor-igcse-tara",
    ],
    featuredReviewIds: ["review-ib-sector-54", "review-ib-sector-62"],
    checklist: [
      "Check topic depth, not only paper count.",
      "Ask how written precision is corrected.",
      "Use school timing and travel fit as the final filter.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is AA HL tutoring only for students who are struggling badly?",
        answer:
          "No. Many capable students use AA HL tutoring to improve consistency, written precision, and confidence with harder papers.",
      },
      {
        question: "Can AA HL tutoring still focus on one weak topic first?",
        answer:
          "Yes. Many students begin with calculus, algebra, or one recurring paper weakness before widening the support plan.",
      },
    ],
    cta: {
      label: "Book an AA HL maths demo",
      description:
        "Share the school, predicted level, and the AA HL topics or paper situations that feel least stable. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/dp/aa-sl": {
    key: "ib/dp/aa-sl",
    route: mathsRouteMap["ib/dp/aa-sl"],
    breadcrumbLabel: "AA SL",
    parentKey: "ib/dp",
    label: "IB DP AA SL Maths",
    navLabel: "AA SL",
    badge: "IB DP AA SL",
    title: "IB DP AA SL maths tutoring in Gurugram for written clarity and steadier papers",
    subtitle:
      "AA SL support for students who need more control over method, stronger confidence, and a smoother Standard Level maths routine.",
    metaTitle: "IB DP AA SL Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB DP AA SL maths tutoring in Gurugram for written method, steadier papers, and stronger Standard Level confidence.",
    keywords: ["aa sl maths tutor gurugram", "ib aa sl tutor gurugram"],
    chips: ["AA SL", "Written method", "Steady papers"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "AA SL often needs more consistency than intensity",
      text:
        "Families usually want the student to feel more accurate, more organised, and less rushed across the course.",
      bullets: [
        "Clean up written method",
        "Build steadier confidence",
        "Improve paper routine without panic",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What AA SL students usually need help with",
      subtitle: "The main goal is often to improve reliability, not just harder-question speed.",
      cards: [
        card({
          eyebrow: "Method",
          title: "Cleaner written work",
          description: "Useful when the student partly knows the method but still loses marks through messy or incomplete working.",
          tags: ["Method", "Accuracy"],
        }),
        card({
          eyebrow: "Confidence",
          title: "Stronger topic confidence",
          description: "Helpful when the chapter feels fine in class but unstable in independent work.",
          tags: ["Confidence", "Retention"],
        }),
        card({
          eyebrow: "Papers",
          title: "Steady Standard Level paper routine",
          description: "Important when revision and papers feel too inconsistent across the term.",
          tags: ["Papers", "Revision"],
        }),
      ],
    },
    childSections: [],
    detailSections: [],
    featuredTutorIds: [
      "tutor-ib-aarav",
      "tutor-ib-rhea",
      "tutor-igcse-tara",
      "tutor-igcse-neha",
      "tutor-jee-ishita",
      "tutor-igcse-zoya",
    ],
    featuredReviewIds: ["review-ib-sector-62", "review-ib-sector-54"],
    checklist: [
      "Check whether the tutor improves consistency week by week.",
      "Ask how incomplete steps will be corrected.",
      "Keep school rhythm in view while scheduling support.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is AA SL tutoring mostly for students who are very weak?",
        answer:
          "No. Many students use AA SL tutoring to improve consistency, written precision, and calm paper performance.",
      },
      {
        question: "Can AA SL tutoring still involve proper paper preparation?",
        answer:
          "Yes. Standard Level still benefits from mock review, revision structure, and steadier paper familiarity.",
      },
    ],
    cta: {
      label: "Book an AA SL maths demo",
      description:
        "Share the school, current performance, and the areas where the student feels least consistent. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/dp/ai-hl": {
    key: "ib/dp/ai-hl",
    route: mathsRouteMap["ib/dp/ai-hl"],
    breadcrumbLabel: "AI HL",
    parentKey: "ib/dp",
    label: "IB DP AI HL Maths",
    navLabel: "AI HL",
    badge: "IB DP AI HL",
    title: "IB DP AI HL maths tutoring in Gurugram for modelling and interpretation",
    subtitle:
      "AI HL support for students who need stronger modelling, interpretation, and better control over Higher Level applications-style papers.",
    metaTitle: "IB DP AI HL Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB DP AI HL maths tutoring in Gurugram for modelling, interpretation, and Higher Level applications-style papers.",
    keywords: ["ai hl maths tutor gurugram", "ib ai hl tutor gurugram"],
    chips: ["AI HL", "Modelling", "Interpretation"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "AI HL needs clarity with applied mathematical thinking",
      text:
        "Families often want to know whether the student needs better interpretation, steadier modelling, or stronger Higher Level paper control.",
      bullets: [
        "Interpretation matters a lot",
        "Modelling needs clearer judgement",
        "Higher Level pace still matters",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What AI HL students usually need help with",
      subtitle: "The course improves most when interpretation and paper discipline become steadier together.",
      cards: [
        card({
          eyebrow: "Applications",
          title: "Interpretation and modelling",
          description: "Useful when the student knows some maths but struggles to read and respond clearly to applied contexts.",
          tags: ["Interpretation", "Modelling"],
        }),
        card({
          eyebrow: "Papers",
          title: "Higher Level pacing",
          description: "Important when the student needs more control over time and judgement in tougher papers.",
          tags: ["HL papers", "Pacing"],
        }),
        card({
          eyebrow: "Correction",
          title: "Steadier review habits",
          description: "Helpful when interpretation mistakes keep repeating across longer questions.",
          tags: ["Review", "Accuracy"],
        }),
      ],
    },
    childSections: [],
    detailSections: [],
    featuredTutorIds: [
      "tutor-ib-kabir",
      "tutor-ib-aarav",
      "tutor-jee-ishita",
      "tutor-igcse-tara",
      "tutor-ib-rhea",
      "tutor-jee-nishant",
    ],
    featuredReviewIds: ["review-ib-sector-54", "review-ib-sector-62"],
    checklist: [
      "Check whether modelling and interpretation are both covered.",
      "Ask how paper control will be improved.",
      "Choose a tutor who can keep explanations applied, not vague.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is AI HL simply lighter than AA HL?",
        answer:
          "It is different rather than simply lighter. The challenge often appears in modelling, interpretation, and paper judgement.",
      },
      {
        question: "Can AI HL tutoring focus on one repeated weak area first?",
        answer:
          "Yes. Many students begin with modelling, interpretation, or one recurring paper weakness before widening the plan.",
      },
    ],
    cta: {
      label: "Book an AI HL maths demo",
      description:
        "Share the school, current paper difficulty, and the areas where interpretation or pacing feel weakest. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "ib/dp/ai-sl": {
    key: "ib/dp/ai-sl",
    route: mathsRouteMap["ib/dp/ai-sl"],
    breadcrumbLabel: "AI SL",
    parentKey: "ib/dp",
    label: "IB DP AI SL Maths",
    navLabel: "AI SL",
    badge: "IB DP AI SL",
    title: "IB DP AI SL maths tutoring in Gurugram for confidence and interpretation",
    subtitle:
      "AI SL support for students who need clearer interpretation, steadier written control, and calmer applications-style paper confidence.",
    metaTitle: "IB DP AI SL Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore IB DP AI SL maths tutoring in Gurugram for interpretation, confidence, and applications-style paper support.",
    keywords: ["ai sl maths tutor gurugram", "ib ai sl tutor gurugram"],
    chips: ["AI SL", "Interpretation", "Confidence"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "AI SL often needs steadiness and confidence",
      text:
        "Families usually want the student to feel calmer with applications-style questions and better able to organise working clearly.",
      bullets: [
        "Interpretation confidence matters",
        "Written structure still matters",
        "Paper familiarity should grow gradually",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What AI SL students usually need help with",
      subtitle: "The goal is often to make the course feel more stable, accurate, and less stressful.",
      cards: [
        card({
          eyebrow: "Interpretation",
          title: "More confidence with applied contexts",
          description: "Useful when the student feels unsure about reading and translating real-world prompts into maths.",
          tags: ["Applied questions", "Confidence"],
        }),
        card({
          eyebrow: "Method",
          title: "Cleaner written structure",
          description: "Important when small presentation or organisation mistakes keep repeating.",
          tags: ["Written method", "Structure"],
        }),
        card({
          eyebrow: "Papers",
          title: "Steadier standard-level paper familiarity",
          description: "Helpful when the student needs calmer, regular exposure to the exact question style of the course.",
          tags: ["Papers", "Routine"],
        }),
      ],
    },
    childSections: [],
    detailSections: [],
    featuredTutorIds: [
      "tutor-ib-kabir",
      "tutor-ib-rhea",
      "tutor-igcse-tara",
      "tutor-igcse-neha",
      "tutor-ib-sana",
      "tutor-jee-ishita",
    ],
    featuredReviewIds: ["review-ib-sector-62", "review-ib-sector-54"],
    checklist: [
      "Check whether the tutor builds confidence as well as method.",
      "Ask how applications-style questions are broken down.",
      "Keep timing and travel fit easy enough to sustain.",
    ],
    schoolHighlights: ibSchools,
    localZones: ibAreas,
    faqItems: [
      {
        question: "Is AI SL only for students who are weak in maths?",
        answer:
          "No. Many capable students still need the right applications-style explanation, clearer interpretation, and a steadier paper routine.",
      },
      {
        question: "Can AI SL tutoring still involve proper paper preparation?",
        answer:
          "Yes. Standard Level still benefits from structured review, practice papers, and a calmer revision rhythm.",
      },
    ],
    cta: {
      label: "Book an AI SL maths demo",
      description:
        "Share the school, current comfort level, and the kinds of questions that feel most confusing. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  jee: {
    key: "jee",
    route: mathsRouteMap.jee,
    breadcrumbLabel: "JEE Maths",
    parentKey: "hub",
    label: "JEE Maths",
    navLabel: "JEE",
    badge: "JEE Maths",
    title: "JEE maths tutoring in Gurugram for Main and Advanced preparation",
    subtitle:
      "JEE maths support for Main and Advanced preparation, with stronger chapter discipline, problem solving, and school-plus-exam balance.",
    metaTitle: "JEE Maths Tutor in Gurugram | Main and Advanced Support | Maths Bodhi",
    metaDescription:
      "Explore JEE maths tutoring in Gurugram for Main and Advanced preparation, chapter depth, and focused home tuition support.",
    keywords: ["jee maths tutor gurugram", "jee main maths tutor gurugram", "jee advanced maths tutor gurugram"],
    chips: ["JEE Main", "JEE Advanced", "Class 11 and 12"],
    stats: [
      { value: "2", label: "Exam routes" },
      { value: "6", label: "Featured tutors" },
      { value: "3", label: "Popular areas" },
    ],
    supportPanel: {
      title: "JEE maths needs the right exam target early",
      text:
        "Families usually do better once they decide whether the student needs Main-style speed and coverage or Advanced-style depth and multi-step conditioning.",
      bullets: [
        "Main needs speed, accuracy, and breadth",
        "Advanced needs deeper reasoning",
        "Both need better weekly discipline",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What JEE maths students usually need help with",
      subtitle:
        "The strongest support improves chapter depth, problem selection, and a steadier practice routine across the week.",
      cards: [
        card({
          eyebrow: "School plus exam",
          title: "Balancing Class 11 and 12 with entrance preparation",
          description:
            "Useful when students need better chapter discipline without letting school maths drift.",
          tags: ["School balance", "Routine"],
        }),
        card({
          eyebrow: "Main",
          title: "Speed, accuracy, and PYQ familiarity",
          description:
            "Important for students who need more control over broad chapter coverage and timed solving.",
          tags: ["Speed", "PYQs"],
        }),
        card({
          eyebrow: "Advanced",
          title: "Deeper problem solving and reasoning",
          description:
            "Best for students who need more comfort with multi-step questions and higher uncertainty.",
          tags: ["Reasoning", "Tougher problems"],
        }),
      ],
    },
    childSections: [
      {
        badge: "JEE Routes",
        title: "Choose the JEE exam path that matches the target",
        subtitle: "Main and Advanced need different paper habits, question handling, and weekly preparation rhythm.",
        layout: "cards",
        items: [
          card({
            eyebrow: "Exam route",
            title: "JEE Main Maths",
            description:
              "For speed, accuracy, broad syllabus handling, and steadier familiarity with Main-style question patterns.",
            tags: ["Speed", "PYQ style"],
            to: mathsRouteMap["jee/main"],
          }),
          card({
            eyebrow: "Exam route",
            title: "JEE Advanced Maths",
            description:
              "For deeper problem solving, multi-step reasoning, and tougher question conditioning across the syllabus.",
            tags: ["Deeper reasoning", "Advanced conditioning"],
            to: mathsRouteMap["jee/advanced"],
          }),
        ],
      },
    ],
    detailSections: [
      {
        title: "Why JEE maths support should start with the right exam path",
        paragraphs: [
          "JEE Main and JEE Advanced ask for different habits. Main usually needs stronger control over speed and wide coverage, while Advanced needs more comfort with harder reasoning and uncertainty.",
        ],
      },
    ],
    featuredTutorIds: [
      "tutor-jee-aditya",
      "tutor-jee-nishant",
      "tutor-jee-ishita",
      "tutor-jee-pooja",
      "tutor-cbse-rahul",
      "tutor-cbse-kavya",
    ],
    featuredReviewIds: [
      "review-jee-sector-50",
      "review-jee-sector-56",
      "review-jee-sector-46",
    ],
    checklist: [
      "Choose Main or Advanced before finalising the tutor.",
      "Check whether school maths and entrance preparation will stay balanced.",
      "Use travel fit only after the academic match is clear.",
    ],
    schoolHighlights: jeeSchools,
    localZones: jeeAreas,
    faqItems: jeeFaqs,
    cta: {
      label: "Book a JEE maths demo",
      description:
        "Share the student's class, current target, school routine, and the chapters that feel least stable. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "jee/main": {
    key: "jee/main",
    route: mathsRouteMap["jee/main"],
    breadcrumbLabel: "JEE Main Maths",
    parentKey: "jee",
    label: "JEE Main Maths",
    navLabel: "JEE Main",
    badge: "JEE Main Maths",
    title: "JEE Main maths tutoring in Gurugram for speed, accuracy, and PYQ style",
    subtitle:
      "JEE Main support for students who need broader syllabus handling, sharper question selection, and steadier timed paper control.",
    metaTitle: "JEE Main Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore JEE Main maths tutoring in Gurugram for speed, accuracy, broad syllabus handling, and PYQ-style preparation.",
    keywords: ["jee main maths tutor gurugram", "jee main home tuition gurugram"],
    chips: ["Speed", "Accuracy", "PYQ style"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "JEE Main maths needs pace without losing structure",
      text:
        "Families usually want stronger timing, broader chapter control, and more confidence with Main-style question patterns.",
      bullets: [
        "Build speed without carelessness",
        "Strengthen wide chapter coverage",
        "Use PYQs with better discipline",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What JEE Main students usually need help with",
      subtitle: "The biggest gains usually come from better speed, question handling, and weekly discipline.",
      cards: [
        card({
          eyebrow: "Timing",
          title: "Speed and accuracy together",
          description: "Useful when students rush, skip steps mentally, or lose marks through avoidable errors.",
          tags: ["Speed", "Accuracy"],
        }),
        card({
          eyebrow: "Coverage",
          title: "Broader chapter control",
          description: "Important when the problem is not one chapter, but unstable coverage across the syllabus.",
          tags: ["Coverage", "Routine"],
        }),
        card({
          eyebrow: "Practice",
          title: "Cleaner PYQ review",
          description: "Helpful when PYQs are being attempted but not reviewed in a way that actually improves performance.",
          tags: ["PYQs", "Review"],
        }),
      ],
    },
    childSections: [
      {
        badge: "Compare JEE Routes",
        title: "Compare Main and Advanced before you commit",
        subtitle: "These cards help families check whether the current target and support style still match.",
        layout: "cards",
        items: [
          card({
            eyebrow: "Current route",
            title: "JEE Main Maths",
            description: "For speed, accuracy, broad coverage, and Main-style paper familiarity.",
            tags: ["Current route", "Timed papers"],
            to: mathsRouteMap["jee/main"],
          }),
          card({
            eyebrow: "Alternate route",
            title: "JEE Advanced Maths",
            description: "For deeper problem solving, multi-step reasoning, and tougher question conditioning.",
            tags: ["Deeper reasoning", "Longer problems"],
            to: mathsRouteMap["jee/advanced"],
          }),
        ],
      },
    ],
    detailSections: [],
    featuredTutorIds: [
      "tutor-jee-aditya",
      "tutor-jee-ishita",
      "tutor-jee-pooja",
      "tutor-cbse-rahul",
      "tutor-cbse-kavya",
      "tutor-cbse-ankit",
    ],
    featuredReviewIds: ["review-jee-sector-50", "review-jee-sector-46"],
    checklist: [
      "Check timing strategy, not just chapter teaching.",
      "Ask how PYQs are reviewed after practice.",
      "Keep school maths stable while widening coverage.",
    ],
    schoolHighlights: jeeSchools,
    localZones: jeeAreas,
    faqItems: [
      {
        question: "Is JEE Main tutoring mostly about speed?",
        answer:
          "Speed matters, but speed without structure usually leads to careless errors. Good support improves both accuracy and timing.",
      },
      {
        question: "Should PYQs replace chapter work?",
        answer:
          "No. PYQs work best once chapter understanding is stable enough for meaningful review.",
      },
    ],
    cta: {
      label: "Book a JEE Main demo",
      description:
        "Share the class, current target, weakest chapters, and how the student is performing in timed practice. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
  "jee/advanced": {
    key: "jee/advanced",
    route: mathsRouteMap["jee/advanced"],
    breadcrumbLabel: "JEE Advanced Maths",
    parentKey: "jee",
    label: "JEE Advanced Maths",
    navLabel: "JEE Advanced",
    badge: "JEE Advanced Maths",
    title: "JEE Advanced maths tutoring in Gurugram for deeper reasoning and tougher problems",
    subtitle:
      "JEE Advanced support for students who need stronger multi-step reasoning, better judgement, and tougher question conditioning.",
    metaTitle: "JEE Advanced Maths Tutor in Gurugram | Maths Bodhi",
    metaDescription:
      "Explore JEE Advanced maths tutoring in Gurugram for deeper problem solving, multi-step reasoning, and tougher exam preparation.",
    keywords: ["jee advanced maths tutor gurugram", "jee advanced home tuition gurugram"],
    chips: ["Deeper reasoning", "Harder problems", "Conditioning"],
    stats: [{ value: "6", label: "Featured tutors" }],
    supportPanel: {
      title: "JEE Advanced maths needs deeper problem conditioning",
      text:
        "Families usually want better comfort with uncertainty, longer reasoning chains, and tougher mixed-topic questions.",
      bullets: [
        "Handle multi-step problems more calmly",
        "Build judgement as well as method",
        "Condition the student for harder papers",
      ],
    },
    overview: {
      badge: "Who this support is for",
      title: "What JEE Advanced students usually need help with",
      subtitle: "The biggest difference often comes when deeper reasoning stops feeling chaotic and starts feeling structured.",
      cards: [
        card({
          eyebrow: "Problem solving",
          title: "Longer, less direct questions",
          description: "Useful when the student is fine with standard practice but struggles once the path is less obvious.",
          tags: ["Longer questions", "Judgement"],
        }),
        card({
          eyebrow: "Depth",
          title: "Multi-step algebra and calculus",
          description: "Important when topic knowledge exists but the student still loses control across deeper combinations.",
          tags: ["Algebra", "Calculus depth"],
        }),
        card({
          eyebrow: "Conditioning",
          title: "Tougher paper habits",
          description: "Helpful when the student needs better mental steadiness and review discipline for harder problems.",
          tags: ["Conditioning", "Review"],
        }),
      ],
    },
    childSections: [
      {
        badge: "Compare JEE Routes",
        title: "Compare Main and Advanced before you commit",
        subtitle: "These cards help families check whether the current target and tutor style still match the exam path.",
        layout: "cards",
        items: [
          card({
            eyebrow: "Alternate route",
            title: "JEE Main Maths",
            description: "For speed, accuracy, broad syllabus handling, and Main-style paper control.",
            tags: ["Speed", "Coverage"],
            to: mathsRouteMap["jee/main"],
          }),
          card({
            eyebrow: "Current route",
            title: "JEE Advanced Maths",
            description: "For deeper problem solving, multi-step reasoning, and tougher question conditioning.",
            tags: ["Current route", "Deeper reasoning"],
            to: mathsRouteMap["jee/advanced"],
          }),
        ],
      },
    ],
    detailSections: [],
    featuredTutorIds: [
      "tutor-jee-nishant",
      "tutor-jee-ishita",
      "tutor-jee-aditya",
      "tutor-cbse-rahul",
      "tutor-ib-aarav",
      "tutor-cbse-kavya",
    ],
    featuredReviewIds: ["review-jee-sector-56", "review-jee-sector-50"],
    checklist: [
      "Check whether the tutor truly handles harder reasoning, not only volume.",
      "Ask how difficult problems are reviewed after class.",
      "Keep school load realistic while increasing depth.",
    ],
    schoolHighlights: jeeSchools,
    localZones: jeeAreas,
    faqItems: [
      {
        question: "Is JEE Advanced tutoring just more questions at a harder level?",
        answer:
          "Not really. The biggest difference is often better reasoning, judgement, and the ability to stay calm through uncertainty.",
      },
      {
        question: "Can Advanced tutoring still help students who are good but inconsistent?",
        answer:
          "Yes. Many students use Advanced tutoring to become more stable with deeper problems, not only because they lack basic ability.",
      },
    ],
    cta: {
      label: "Book a JEE Advanced demo",
      description:
        "Share the class, the current target, and the question types where deeper reasoning is breaking down. Maths Bodhi can guide the next step on WhatsApp.",
    },
  },
};
