const gurugramSectors = [
  {
    slug: "sector-45",
    label: "Sector 45",
    summary:
      "Families near DPS International Edge and South City prefer structured after-school maths home tuition with quick weekday slots.",
    landmarks: ["HUDA Market", "South City 1", "Netaji Subhash Marg"],
    nearbySchools: ["DPS International Edge", "Shalom Presidency School", "Euro International School"],
  },
  {
    slug: "sector-46",
    label: "Sector 46",
    summary:
      "A strong pocket for board-focused maths support, especially for CBSE, ICSE, and Olympiad preparation.",
    landmarks: ["Huda Colony", "Medanta corridor", "Subhash Chowk"],
    nearbySchools: ["Amity International School", "Shalom Hills International School", "Lotus Valley International School"],
  },
  {
    slug: "sector-49",
    label: "Sector 49",
    summary:
      "Families around Sohna Road look for dependable one-to-one maths tutors who can travel and also support hybrid learning.",
    landmarks: ["Sohna Road", "Uppal Southend", "Rosewood City"],
    nearbySchools: ["St. Xavier's High School", "The Paras World School", "DPS International Edge"],
  },
  {
    slug: "sector-50",
    label: "Sector 50",
    summary:
      "Parents in Sector 50 often ask for premium maths home tutors with school-specific planning and exam-week discipline.",
    landmarks: ["Nirvana Country", "Baani Square", "Orchid Petals"],
    nearbySchools: ["GD Goenka Public School", "Lotus Valley International School", "Vega Schools"],
  },
  {
    slug: "sector-52",
    label: "Sector 52",
    summary:
      "Well suited for students who need compact weekday home tuition and focused revision close to Ardee City and Wazirabad.",
    landmarks: ["Ardee City", "Wazirabad", "Sector 52 Metro"],
    nearbySchools: ["Amity International School", "DPS Sushant Lok", "The Shri Ram School"],
  },
  {
    slug: "sector-54",
    label: "Sector 54",
    summary:
      "A premium Golf Course Road pocket where families often prefer IB, IGCSE, and advanced maths mentoring at home.",
    landmarks: ["Golf Course Road", "Rapid Metro Sector 54 Chowk", "DLF Crest"],
    nearbySchools: ["The Shri Ram School Aravali", "Lancers International School", "Pathways World School"],
  },
  {
    slug: "sector-55",
    label: "Sector 55",
    summary:
      "Sector 55 sees demand for flexible maths tutoring schedules, especially for international-school and senior-grade learners.",
    landmarks: ["Golf Course Extension Road", "Suncity", "Sector 55-56 Rapid Metro"],
    nearbySchools: ["Scottish High International School", "Heritage Xperiential Learning School", "Shiv Nadar School"],
  },
  {
    slug: "sector-56",
    label: "Sector 56",
    summary:
      "A high-intent locality for IB, IGCSE, CBSE, and JEE maths tuition with strong parent demand for premium tutors.",
    landmarks: ["Golf Course Extension Road", "Windsor Residency", "Huda Market Sector 56"],
    nearbySchools: ["Scottish High International School", "The Heritage Xperiential Learning School", "St. Xavier's High School"],
  },
  {
    slug: "sector-57",
    label: "Sector 57",
    summary:
      "Families in Sector 57 often look for home maths tutors who combine foundation work with board-exam execution.",
    landmarks: ["Sushant Lok 3", "Mayfield Garden", "AIPL Joy Street"],
    nearbySchools: ["St. Xavier's High School", "The Scottish High International School", "DPS Sector 45"],
  },
  {
    slug: "sector-65",
    label: "Sector 65",
    summary:
      "Golf Course Extension families usually want premium maths tutoring, rigorous homework review, and clear parent updates.",
    landmarks: ["M3M Golf Estate", "Golf Estate Road", "WorldMark Gurugram"],
    nearbySchools: ["Heritage Xperiential Learning School", "St. Xavier's High School", "VIBGYOR High School"],
  },
];

const premiumSchools = [
  {
    id: "school-1",
    school: "The Shri Ram School Aravali",
    board: "IB and IGCSE",
    locality: "Sector 54 and Golf Course Road",
    support:
      "School-specific maths tutors for AA HL, AI SL, IGCSE Extended Maths, and internal assessment planning.",
    highlight: "Strong fit for premium school families needing high-rigor maths home tuition.",
  },
  {
    id: "school-2",
    school: "Scottish High International School",
    board: "IB, IGCSE, and CBSE",
    locality: "Sector 55 and Sector 56",
    support:
      "Premium home tutors for algebra depth, calculus transitions, exam papers, and structured weekly progress reviews.",
    highlight: "Popular with parents who want both concept clarity and board-specific outcomes.",
  },
  {
    id: "school-3",
    school: "Pathways World School Aravali",
    board: "IB",
    locality: "Golf Course Road and Sector 62",
    support:
      "One-to-one maths specialists for IB DP, MYP transition, and advanced problem-solving confidence.",
    highlight: "Designed for international-school learners who need precision, pacing, and personal attention.",
  },
  {
    id: "school-4",
    school: "The Heritage Xperiential Learning School",
    board: "IB and IGCSE",
    locality: "Sector 55, Sector 56, and Sector 62",
    support:
      "Maths tutoring aligned to school rhythm, coursework load, and mock-exam preparation across grades.",
    highlight: "Best for families asking for premium tutors near Golf Course Extension Road.",
  },
  {
    id: "school-5",
    school: "Shiv Nadar School",
    board: "CBSE and IB-aligned enrichment",
    locality: "Sector 55 and DLF pockets",
    support:
      "Maths home tutors for CBSE senior classes, Olympiad preparation, and step-by-step remedial support.",
    highlight: "Works well for students who need a stronger bridge from school teaching to exam performance.",
  },
  {
    id: "school-6",
    school: "GD Goenka Public School",
    board: "CBSE and competitive prep",
    locality: "Sector 48, Sector 49, and Sector 50",
    support:
      "Board-focused maths home tuition with chapter tests, formula drills, and targeted exam revision.",
    highlight: "Frequently chosen by parents in Sohna Road and Nirvana Country micro-markets.",
  },
];

const featuredTutors = [
  {
    id: "tutor-1",
    name: "Aarav Sharma",
    title: "IB Maths HL and IGCSE Extended Maths Specialist",
    rating: "4.9",
    experience: "8 years",
    board: "IB",
    classLevel: "IB DP",
    location: "Gurugram",
    sectors: ["Sector 54", "Sector 55", "Sector 56"],
    topics: ["Calculus", "Functions", "Algebra"],
    price: "Rs 1,800/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 120,
    schoolFocus: ["The Shri Ram School Aravali", "Scottish High International School"],
    image: "/images/tutor-premium-school.svg",
    imageAlt: "Premium maths home tutor planning a school-specific lesson for an IB student in Gurugram",
    summary:
      "Helps international-school students move from concept confusion to well-structured written solutions with calm exam execution.",
    qualifications: ["B.Tech, IIT Delhi", "IB Maths mentor", "Cambridge checkpoint support"],
    availability: "Weekday evenings and Saturday mornings",
    achievements: [
      "Improved predicted grades for IB AA HL and AI HL students",
      "Runs chapter diagnostics before every new learning cycle",
      "Strong fit for students who need proof-writing and calculus discipline",
    ],
  },
  {
    id: "tutor-2",
    name: "Neha Kapoor",
    title: "IGCSE, ICSE, and Foundation Maths Tutor",
    rating: "4.8",
    experience: "7 years",
    board: "IGCSE",
    classLevel: "IGCSE",
    location: "Gurugram",
    sectors: ["Sector 55", "Sector 56", "Sector 57"],
    topics: ["Geometry", "Trigonometry", "Statistics"],
    price: "Rs 1,500/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 95,
    schoolFocus: ["Scottish High International School", "The Heritage Xperiential Learning School"],
    image: "/images/tutor-classroom-progress.svg",
    imageAlt: "Maths tutor coaching a student through geometry and trigonometry practice at home",
    summary:
      "Known for patient concept building, error analysis, and structured revision plans for school exams and checkpoint tests.",
    qualifications: ["M.Sc. Mathematics", "Cambridge curriculum mentor", "Olympiad trainer"],
    availability: "Weekday afternoons and Sunday revision slots",
    achievements: [
      "Builds topic trackers for every student",
      "Strong for middle and senior grade school transitions",
      "Balances conceptual depth with measurable school outcomes",
    ],
  },
  {
    id: "tutor-3",
    name: "Rahul Mehta",
    title: "CBSE Class 9 to 12 and JEE Maths Mentor",
    rating: "4.9",
    experience: "10 years",
    board: "CBSE",
    classLevel: "Class 12",
    location: "Gurugram",
    sectors: ["Sector 45", "Sector 46", "Sector 49"],
    topics: ["Coordinate Geometry", "Probability", "Calculus"],
    price: "Rs 1,600/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 180,
    schoolFocus: ["GD Goenka Public School", "DPS International Edge"],
    image: "/images/hero-maths-home.svg",
    imageAlt: "Senior maths mentor helping a Class 12 student practice calculus and coordinate geometry",
    summary:
      "Works best for students targeting stronger board scores, sharper question selection, and better performance under exam pressure.",
    qualifications: ["M.Tech", "JEE maths specialist", "Board exam strategist"],
    availability: "Weekdays after 5 PM and intensive pre-board blocks",
    achievements: [
      "Supports both board preparation and JEE foundation",
      "Breaks down long chapters into measurable weekly goals",
      "Parents value his frequent progress summaries",
    ],
  },
  {
    id: "tutor-4",
    name: "Simran Kaur",
    title: "Middle School Maths and Olympiad Confidence Coach",
    rating: "4.8",
    experience: "6 years",
    board: "Foundation",
    classLevel: "Class 8",
    location: "Gurugram",
    sectors: ["Sector 50", "Sector 52", "Sector 57"],
    topics: ["Number System", "Fractions", "Reasoning"],
    price: "Rs 1,250/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 110,
    schoolFocus: ["The Shri Ram School", "Lotus Valley International School"],
    image: "/images/tutor-premium-school.svg",
    imageAlt: "Home tutor building maths confidence for a middle school student with visual practice cards",
    summary:
      "Makes maths less intimidating for younger learners through calm repetition, visualization, and habit-based homework routines.",
    qualifications: ["B.Ed.", "Olympiad mentor", "Primary and middle school specialist"],
    availability: "Afternoons, early evenings, and Saturday skill labs",
    achievements: [
      "Popular for students who say maths feels stressful",
      "Improves speed and accuracy through routine practice blocks",
      "Strong communication with parents on consistency and confidence",
    ],
  },
  {
    id: "tutor-5",
    name: "Aditya Verma",
    title: "ICSE, CBSE, and Competitive Maths Tutor",
    rating: "4.7",
    experience: "9 years",
    board: "ICSE",
    classLevel: "Class 10",
    location: "Gurugram",
    sectors: ["Sector 49", "Sector 50", "Sector 65"],
    topics: ["Algebra", "Mensuration", "Probability"],
    price: "Rs 1,400/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 140,
    schoolFocus: ["St. Xavier's High School", "VIBGYOR High School"],
    image: "/images/tutor-classroom-progress.svg",
    imageAlt: "Experienced maths home tutor preparing board exam worksheets for an ICSE student",
    summary:
      "Blends theory correction, worksheet practice, and mock testing so students become more independent before exam season.",
    qualifications: ["M.Sc. Mathematics", "ICSE board coach", "Competitive exam mentor"],
    availability: "Weekdays after school and Sunday evening doubt sessions",
    achievements: [
      "Creates weekly score trackers for board classes",
      "Balances school homework with chapter mastery",
      "Useful for students who need consistency over cramming",
    ],
  },
  {
    id: "tutor-6",
    name: "Mehak Bansal",
    title: "Primary to Senior School Maths Home Tutor",
    rating: "4.9",
    experience: "5 years",
    board: "CBSE",
    classLevel: "Class 9",
    location: "Gurugram",
    sectors: ["Sector 45", "Sector 46", "Sector 52"],
    topics: ["Arithmetic", "Linear Equations", "Data Handling"],
    price: "Rs 1,200/hr",
    mode: ["Home Tuition", "Online"],
    studentsHelped: 85,
    schoolFocus: ["Amity International School", "The Shri Ram School"],
    image: "/images/hero-maths-home.svg",
    imageAlt: "Maths teacher guiding a student through data handling and arithmetic exercises at home",
    summary:
      "Strong for students who need sharper basics, better homework routines, and a tutor who keeps every lesson organized.",
    qualifications: ["B.Sc. Mathematics", "School maths coach", "Assessment planning specialist"],
    availability: "Flexible weekday and weekend slots",
    achievements: [
      "Builds strong arithmetic-to-algebra transitions",
      "Useful for students returning from weak school assessments",
      "Parents value her structured, calm teaching style",
    ],
  },
];

const subjectPages = [
  {
    slug: "ib-maths-hl",
    label: "IB Maths HL",
    title: "IB Maths HL home tuition in Gurugram with real depth, structure, and exam-ready support",
    subtitle:
      "A subject-first route for families who want premium IB maths home tutors in Gurugram for AA HL, AI HL, calculus depth, internal assessments, and confident paper execution.",
    boards: [
      "IB Diploma Programme",
      "Mathematics: Analysis and Approaches HL",
      "Mathematics: Applications and Interpretation HL",
    ],
    topics: ["Calculus", "Functions", "Vectors", "Probability", "Statistics", "Sequences"],
    outcomes: [
      "Turn difficult HL chapters into step-by-step methods the student can actually repeat under time pressure.",
      "Reduce careless errors through mark-scheme aligned written practice and targeted correction loops.",
      "Build confidence for mocks, internal assessments, and final IB examinations.",
    ],
    learningApproach: [
      {
        title: "Diagnostic skill audit",
        text: "We begin with chapter-by-chapter mapping so the tutor knows what is weak, what is shaky, and what is exam-critical.",
      },
      {
        title: "Depth before speed",
        text: "Students first learn why a method works, then practice enough variations to respond quickly in timed papers.",
      },
      {
        title: "Feedback that changes outcomes",
        text: "Every correction is turned into a repeatable habit so mistakes do not keep returning in later assignments or mocks.",
      },
    ],
    faqItems: [
      {
        question: "Can we get support only for one hard IB topic first?",
        answer:
          "Yes. Many Gurugram families start with calculus, proof, or vectors first and then expand into a full tutoring plan once trust is built.",
      },
      {
        question: "Do tutors help with internal assessment thinking too?",
        answer:
          "Yes. The tutoring flow can support IA clarity, topic framing, calculations, and presentation discipline while keeping the student's own work central.",
      },
      {
        question: "Is this page relevant for both AA and AI learners?",
        answer:
          "Yes. The core structure is adapted to the exact pathway, paper mix, and grade goal of the student.",
      },
    ],
    relatedCities: ["gurugram"],
    cta: {
      label: "Book an IB maths demo class",
      description:
        "Share the school, current predicted grade, difficult chapters, and preferred sector in Gurugram. We will match the student to the right IB maths specialist.",
    },
  },
  {
    slug: "igcse-maths",
    label: "IGCSE Maths",
    title: "IGCSE maths tuition in Gurugram for extended maths, checkpoints, and school exam confidence",
    subtitle:
      "Structured home tutoring for IGCSE maths students who need help with algebra, geometry, trigonometry, statistics, and exam technique.",
    boards: ["Cambridge IGCSE", "Edexcel IGCSE", "International lower secondary pathways"],
    topics: ["Algebra", "Geometry", "Trigonometry", "Graphs", "Statistics", "Mensuration"],
    outcomes: [
      "Improve written clarity, method marks, and chapter retention.",
      "Bridge school teaching gaps with one-to-one explanation and practice.",
      "Prepare better for mock exams and final board papers.",
    ],
    learningApproach: [
      {
        title: "Concept recovery",
        text: "Weak chapters are rebuilt with examples, visual explanations, and guided repetition before independent practice begins.",
      },
      {
        title: "Past-paper training",
        text: "The tutor uses board-style questions to improve familiarity, pacing, and method presentation.",
      },
      {
        title: "Revision mapping",
        text: "A practical chapter plan keeps students from revising only their comfort areas.",
      },
    ],
    faqItems: [
      {
        question: "Can tutors help students who feel behind in basics?",
        answer:
          "Yes. Many students need a bridge between school pace and topic understanding, especially in algebra, graphs, and trigonometry.",
      },
      {
        question: "Do you offer home tuition near premium schools in Gurugram?",
        answer:
          "Yes. The platform supports sector-based matching near Golf Course Road, Golf Course Extension Road, Sohna Road, and nearby localities.",
      },
      {
        question: "Can the same tutor support school tests and checkpoint exams?",
        answer:
          "Yes. The better tutoring plan aligns weekly school needs with larger academic milestones so the student is not preparing in silos.",
      },
    ],
    relatedCities: ["gurugram"],
    cta: {
      label: "Book an IGCSE maths demo",
      description:
        "Tell us the school, grade, recent test performance, and the exact chapters creating confusion. We will route the enquiry to the best-fit tutor.",
    },
  },
  {
    slug: "cbse-maths",
    label: "CBSE Maths",
    title: "CBSE maths home tuition in Gurugram for Class 6 to 12 with concept clarity and board results",
    subtitle:
      "A practical route for parents looking for dependable maths home tutors in Gurugram for chapter mastery, school assessments, and strong board preparation.",
    heroBadge: "CBSE maths board hub",
    metaDescription:
      "Explore the CBSE maths mother page for Gurugram with class-wise support from Class 6 to 12, board-exam planning, school-fit content, sector coverage, tutor options, FAQs, and local next steps.",
    keywords: [
      "cbse maths home tuition gurugram",
      "cbse maths tutor gurugram",
      "class 10 maths home tutor gurugram",
      "class 12 cbse maths tuition gurugram",
      "class 9 maths tutor gurgaon",
      "class 11 cbse maths tutor gurugram",
      "cbse board maths tutor sector 46",
      "cbse maths home tutor sector 50",
      "cbse maths tutor sector 56",
      "maths home tuition for cbse students gurugram",
      "cbse algebra tutor gurugram",
      "cbse geometry tutor gurugram",
      "cbse calculus tutor gurugram",
      "board exam maths tutor gurugram",
      "cbse maths home classes gurgaon",
      "school assessment maths tutor gurugram",
      "maths tutor near gd goenka gurugram",
      "maths tutor near shiv nadar school gurugram",
      "maths tutor near amity international school gurugram",
      "cbse maths classes for class 6 to 12 gurugram",
    ],
    heroImage: "/images/hero-maths-home.svg",
    heroImageAlt:
      "CBSE maths home tutor in Gurugram planning class-wise study support for school exams and board preparation",
    heroSupportTitle:
      "This CBSE page works as the parent route before families move into class, school, or locality-specific decisions",
    heroSupportText:
      "Parents usually start broad. They want to know whether the tutor can handle the student's class, school pace, weak chapters, and board pressure. This page is designed to answer that first-stage intent properly before deeper location or tutor matching happens.",
    heroStats: [
      { value: "6-12", label: "Classes covered" },
      { value: "6", label: "Priority local sectors" },
      { value: "3", label: "Featured tutor fits" },
      { value: "5", label: "School-focused pockets" },
    ],
    searchIntentChips: [
      "Class 6 maths tutor",
      "Class 10 board maths help",
      "Class 12 CBSE revision",
      "Sector 50 maths tutor",
      "CBSE algebra support",
      "School test preparation",
    ],
    boards: ["CBSE Class 6 to 12", "School assessment support", "Board exam preparation"],
    topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Probability", "Calculus"],
    outcomes: [
      "Strengthen fundamentals without slowing the student down.",
      "Improve chapter test performance through regular guided practice.",
      "Build board-exam confidence with a clear revision plan.",
    ],
    boardSupportCards: [
      {
        title: "Class-wise tutoring map",
        text: "The page starts at the level parents think in first: class, school pace, topic weakness, and upcoming test pressure. That makes the route useful for both junior and senior CBSE students.",
      },
      {
        title: "School work and board work together",
        text: "A strong CBSE maths plan should cover notebooks, worksheets, school chapter tests, and board-style written practice instead of treating them as separate problems.",
      },
      {
        title: "Local Gurugram fit stays visible",
        text: "Sector-based availability, travel convenience, and school corridors matter for home tuition. This board page keeps that local layer connected to the academic intent.",
      },
    ],
    classSegments: [
      {
        label: "Class 6 to 8",
        focus: "Foundation repair and habit building",
        description:
          "Best for students who need calmer support with fractions, decimals, ratio, mensuration, and the transition into algebra without making maths feel heavy.",
        topics: ["Fractions", "Decimals", "Ratio", "Basic algebra"],
      },
      {
        label: "Class 9",
        focus: "Secondary-school transition",
        description:
          "Useful when algebra, coordinate geometry, and proof-style reasoning begin to expose small concept gaps that school pace does not always fix in time.",
        topics: ["Polynomials", "Coordinate geometry", "Statistics", "Surface area"],
      },
      {
        label: "Class 10",
        focus: "Board-year execution",
        description:
          "Focused on chapter sequencing, sample-paper method, formula retention, and writing discipline so board-prep work feels structured instead of rushed.",
        topics: ["Quadratics", "Triangles", "Trigonometry", "Probability"],
      },
      {
        label: "Class 11 to 12",
        focus: "Senior secondary and board preparation",
        description:
          "Built for students handling functions, calculus, matrices, vectors, and higher-pressure exams that require cleaner written thinking and revision control.",
        topics: ["Functions", "Calculus", "Matrices", "Probability"],
      },
    ],
    schoolHighlights: [
      {
        school: "GD Goenka Public School",
        locality: "Sector 50 and Sohna Road belt",
        fit: "A practical match for families who want stronger chapter planning, board-year discipline, and home tuition that stays aligned with school assessments.",
        boardContext:
          "Works well for students who need notebook review, chapter tests, and more consistent board-style revision.",
      },
      {
        school: "Shiv Nadar School",
        locality: "Sector 55 cluster",
        fit: "Useful for students who need school-paced maths support with either enrichment or remedial bridging.",
        boardContext:
          "Good for balancing regular school assignments with concept repair and measured revision.",
      },
      {
        school: "Amity International School",
        locality: "Sector 46 and Sector 52",
        fit: "Often relevant for parents seeking reliable one-to-one maths support after school with better homework follow-through.",
        boardContext:
          "Helps with worksheet discipline, chapter-by-chapter explanation, and test readiness.",
      },
      {
        school: "Lotus Valley International School",
        locality: "Sector 46 and Sector 50",
        fit: "Strong for students who need chapter clarity before test pressure starts compounding across multiple units.",
        boardContext:
          "Supports algebra, geometry, mensuration, and regular revision planning across the school term.",
      },
      {
        school: "DPS International Edge",
        locality: "Sector 45 and Sector 49",
        fit: "A practical fit for parents comparing tutor travel convenience, weekday slots, and regular performance updates.",
        boardContext:
          "Useful for school assessments, chapter tests, and longer board-readiness tracking.",
      },
    ],
    localDemandZones: [
      {
        slug: "sector-46",
        reason:
          "Popular for CBSE school families who want weekday home tuition and stronger worksheet follow-through.",
      },
      {
        slug: "sector-50",
        reason:
          "Parents here often compare board discipline, tutor punctuality, and regular pre-test revision quality.",
      },
      {
        slug: "sector-45",
        reason:
          "A practical zone for after-school maths home tuition aligned to school timings and South City travel routes.",
      },
      {
        slug: "sector-49",
        reason:
          "Useful for Sohna Road families needing hybrid flexibility with steady chapter and homework tracking.",
      },
      {
        slug: "sector-56",
        reason:
          "Relevant for senior learners who want a stronger tutor pool without losing home-tuition convenience.",
      },
      {
        slug: "sector-57",
        reason:
          "Suitable for mixed needs: concept repair, school pacing, and board-year follow-up in one practical tutoring flow.",
      },
    ],
    seoSections: [
      {
        title: "Why CBSE maths home tuition becomes a high-intent search in Gurugram",
        paragraphs: [
          "Parents usually do not begin by searching for a generic tutor. They search when a real maths problem has become visible: repeated mistakes in algebra, low marks in chapter tests, stress before periodic assessments, weak written method in geometry, or a Class 10 or Class 12 student who is no longer keeping pace with school expectations. In Gurugram, that need becomes even more specific because families compare not just teacher quality but school fit, travel practicality, and whether the tutor can work around heavy weekday schedules. A good CBSE maths page therefore has to answer the parent's first question properly: can this route help with the student's actual class and academic stage?",
          "That is why this page works as a mother page rather than a thin landing page. It gives a board-level view first, then breaks the decision down into classes, school contexts, local demand pockets, and tutor fit. This structure is better for parents because it reduces guesswork, and it is better for SEO because the page owns broad CBSE maths intent without repeating the same text across every sector or school mention. The goal is not to stuff keywords into a page. The goal is to make the page genuinely useful for families searching for CBSE maths home tuition in Gurugram.",
        ],
      },
      {
        title: "What a real CBSE maths mother page should help a parent decide",
        paragraphs: [
          "The first decision is class-specific. A Class 6 student and a Class 12 student do not need the same tutoring structure, even if both need maths support. Younger students need routine, clarity, and confidence building. Middle and secondary students need stronger chapter sequencing, worksheet correction, and consistency between school and home practice. Board-year learners need sharper revision control, sample-paper discipline, and a tutor who knows how to turn confusion into repeatable method. A mother page should make these differences obvious early so parents do not have to infer them from vague marketing language.",
          "The second decision is whether the tutoring flow can match the student's school reality. In Gurugram, parents often shortlist tuition support based on school corridor, travel time, and how closely the tutor can follow the pace of chapters, notebooks, and assessments. That is why school-focused content belongs on the page, but it should be used carefully. It should not be filler. It should help the parent judge whether this tutoring route understands the environment the student is studying in. When that school context is combined with class and locality context, the page becomes a far stronger decision tool.",
        ],
      },
      {
        title: "How school fit, sector fit, and class fit work together on this page",
        paragraphs: [
          "For home tuition, local fit matters because consistency matters. A brilliant tutor who cannot travel reliably or fit into the student's schedule is rarely the best long-term choice. That is why this page points toward local sectors where demand is already strong. These sectors help parents move from broad board intent into a more practical next step without losing the academic focus. Instead of forcing the user to leave the CBSE context too early, the page holds the board narrative together while still opening the door to Gurugram-specific next actions.",
          "This combination also supports future expansion cleanly. Class-specific pages, school-specific pages, and locality pages can all grow under the authority of this board hub without becoming disconnected or repetitive. For parents, that means a clearer journey. For the business, it means better internal linking, better content reuse, and a stronger long-term SEO structure built around actual user intent. The page stays board-first, people-first, and location-aware at the same time, which is exactly the balance a maths tutoring website needs.",
        ],
      },
    ],
    learningApproach: [
      {
        title: "Chapter-first planning",
        text: "Tutors map school pace, weak worksheets, and upcoming tests before the first cycle of classes begins.",
      },
      {
        title: "Worksheet discipline",
        text: "Every class ends with short practice tasks so students retain methods between sessions.",
      },
      {
        title: "Exam readiness",
        text: "Senior students move into sample papers, score analysis, and high-yield revision blocks.",
      },
    ],
    faqItems: [
      {
        question: "Is this suitable for Class 6 to 8 students too?",
        answer:
          "Yes. The tutoring style changes by grade, but the platform supports both foundation and board-year learners.",
      },
      {
        question: "Can parents request maths home tuition in a specific sector of Gurugram?",
        answer:
          "Yes. Students can request tutors near major sectors and premium residential pockets across Gurugram.",
      },
      {
        question: "Do tutors share progress with parents?",
        answer:
          "Yes. Many families prefer weekly updates, chapter checklists, and problem-area summaries, especially before exams.",
      },
      {
        question: "Can the same tutor help with school worksheets and board exam prep?",
        answer:
          "Yes. That is often the most useful structure for CBSE students. A strong tutor should correct current school work while also planning forward for revision, weaker chapters, and board-style written practice.",
      },
      {
        question: "Is this page only for board classes like 10 and 12?",
        answer:
          "No. This page is designed as the parent CBSE route for Class 6 to 12 so families can begin with class fit first and then move deeper into tutor, school, or locality decisions.",
      },
    ],
    relatedCities: ["gurugram"],
    featuredTutorIds: ["tutor-3", "tutor-6", "tutor-4"],
    parentChecklist: [
      "Ask whether the tutor will follow the exact school chapter sequence or run a separate revision plan.",
      "Check if weak worksheets, notebook errors, and chapter tests will be reviewed between classes.",
      "For Class 10 and 12, confirm how sample papers and board-style writing practice will be scheduled.",
      "If travel time matters, shortlist sectors first and then compare tutor fit.",
    ],
    relatedQueries: [
      "CBSE maths home tutor in Gurugram",
      "Class 10 maths tutor near Sohna Road",
      "Class 12 CBSE maths home tuition in Sector 50",
      "CBSE algebra tutor in Sector 46",
      "Board exam maths tutor near Golf Course Extension Road",
      "Maths tutor for school assessments in Gurugram",
    ],
    cta: {
      label: "Book a CBSE maths demo",
      description:
        "Send the class, school, recent maths score, and preferred tuition mode. We will help shortlist a tutor that matches the student's level.",
    },
  },
  {
    slug: "jee-main-maths",
    label: "JEE Main Maths",
    title: "JEE Main maths tutoring in Gurugram for serious problem solving, speed, and test strategy",
    subtitle:
      "A focused page for students who need one-to-one maths guidance for JEE Main with disciplined topic coverage and timed practice.",
    boards: ["JEE Main", "CBSE Class 11", "CBSE Class 12"],
    topics: ["Functions", "Coordinate Geometry", "Vectors", "Calculus", "Probability", "Matrices"],
    outcomes: [
      "Build a stronger balance between concept depth and speed.",
      "Improve question selection under time pressure.",
      "Reduce panic through better revision sequencing and mock analysis.",
    ],
    learningApproach: [
      {
        title: "Topic sequencing",
        text: "High-return chapters are ordered intelligently so the student sees measurable progress early.",
      },
      {
        title: "Timed practice",
        text: "Tutors use small timed sets before full tests to build speed without losing method quality.",
      },
      {
        title: "Mistake pattern review",
        text: "Students track why marks are being lost and fix patterns instead of just solving more sheets blindly.",
      },
    ],
    faqItems: [
      {
        question: "Can this work alongside school and coaching?",
        answer:
          "Yes. One-to-one tutoring often works best as a corrective layer that fixes concept gaps and organizes revision around the student's actual weak areas.",
      },
      {
        question: "Is home tuition possible in Gurugram sectors near Sohna Road and Golf Course Extension Road?",
        answer:
          "Yes. Home tuition availability depends on tutor routing, but the platform is built around Gurugram sector-based discovery.",
      },
      {
        question: "What if the student is strong in physics but weak in maths?",
        answer:
          "That is a common pattern. The tutoring plan can become maths-heavy while staying realistic with the student's school and test calendar.",
      },
    ],
    relatedCities: ["gurugram"],
    cta: {
      label: "Book a JEE maths strategy call",
      description:
        "Share the current test level, strongest and weakest chapters, and whether the student needs home tuition or online support in Gurugram.",
    },
  },
];

const intentParagraphs = [
  "Maths Bodhi is designed for families in Gurugram who want more than a generic tutor listing. Parents searching for a maths home tutor in Gurugram are usually dealing with a specific academic problem: a Class 8 student who has lost confidence in fractions, a Class 10 learner who is slipping in algebra, an IGCSE student who needs stronger written working, an IB student who is struggling with calculus, or a Class 12 student who needs disciplined board revision. The homepage therefore has to do real work. It needs to communicate local credibility, subject depth, school fit, and the next action clearly enough that both parents and students feel safe moving forward.",
  "Our intent is to make this homepage useful before it becomes persuasive. That means the content must answer high-intent questions naturally: what kind of maths home tuition is available in Gurugram, which boards are covered, which sectors are served, what premium schools are supported, how tutoring happens at home, and how quickly a family can move from browsing to WhatsApp coordination. Instead of thin copy or keyword-heavy repetition, the page is structured around real user decisions. Families can scan by class, board, topic, locality, and school context. This is especially important in Gurugram, where demand varies widely across premium school corridors, Golf Course Road, Golf Course Extension Road, Sohna Road communities, DLF pockets, and family-heavy sectors where after-school timing matters.",
  "The homepage also reflects a subject-first SEO model because maths learning intent is usually stronger than location intent alone. A student rarely searches only for a tutor. They search for a CBSE maths home tutor, an IB maths tutor, an IGCSE maths tutor, a JEE maths tutor, or a maths tutor for a specific class and difficulty level. Local SEO still matters deeply, but it works best when geography supports the academic intent rather than replacing it. That is why the homepage introduces both the maths specialization and the Gurugram locality layer together. It tells Google and the user that the page is genuinely about maths home tuition in Gurugram, while still remaining helpful and people-first in the way current search guidelines expect.",
  "Another part of our intent is trust through specificity. Parents do not convert because a site looks polished alone. They convert when the site feels aware of their school reality, schedule pressure, and academic risks. That is why the homepage highlights premium school-specific maths home tutors, sector coverage, board-wise programs, and review cards that sound local to Gurugram. This makes the experience more grounded. A family in Sector 56 should feel that the site understands Sector 56. A parent near Golf Course Road should see that international-school maths tuition has been thought through properly. A student preparing for board maths should not feel hidden inside a platform that is trying to be about every subject for every city at once.",
];

const goalParagraphs = [
  "Our goal is to turn the homepage into a real discovery and conversion system for maths home tuition in Gurugram. That means every major block on the page should support one of four outcomes: help a parent understand the service, help a student identify the right maths support, help search engines understand the page clearly, and help the business move enquiries into an operationally simple workflow. In this project, that workflow is intentionally WhatsApp-first. Once a student or tutor logs in, their details flow into a structured WhatsApp message to the Maths Bodhi team so matching, scheduling, and follow-up can be handled directly from one business number. This reduces backend complexity while keeping the enquiry path fast and human.",
  "The second goal is long-term SEO resilience. We are not trying to build pages that exist only to rank. We are building pages that are detailed enough to deserve ranking because they are useful. That means writing substantial content about maths learning intent, school-specific tutoring patterns, local service areas, and parent decision-making rather than creating many near-duplicate pages that only swap sector names. The homepage therefore carries meaningful content, a clean heading hierarchy, image alt text, meta descriptions, keywords, and structured data that help search engines understand the business. It also links logically to city, sector, and subject routes so the internal link flow feels natural and scalable.",
  "The third goal is administrative control. A serious tutoring business changes over time. Tutors join, reviews are added, premium schools shift, sectors grow, and messaging evolves. Because of that, the content on the homepage cannot remain hard-coded. The admin dashboard introduced in this build manages tutors, reviews, hero copy, SEO settings, and service-area content through a protected interface. On the front end, this means the website behaves dynamically even without a traditional backend. For a deployment-ready version, the site becomes editable, fast to update, and more practical for day-to-day operations.",
  "The final goal is clarity for every audience. Parents need confidence and next steps. Students need relevance, proof, and lower friction. Tutors need a structured way to onboard and share availability. Administrators need control. The homepage is therefore designed to do maximum space utilization without becoming visually noisy. Cards, sector chips, review grids, premium school modules, and long-form content work together so the site feels content-rich and conversion-ready. For Gurugram maths home tutoring, that combination of local clarity, academic depth, and operational simplicity is the real advantage.",
];

const reviewParents = [
  "Ritika Mehra",
  "Anuj Bhatia",
  "Shreya Arora",
  "Nitin Suri",
  "Pallavi Khanna",
  "Gaurav Kalra",
  "Ira Chawla",
  "Kunal Malhotra",
  "Sneha Yadav",
  "Aditi Sethi",
];

const reviewStudents = [
  "Aanya",
  "Vihaan",
  "Myra",
  "Reyansh",
  "Anika",
  "Kabir",
  "Saanvi",
  "Advait",
  "Ishita",
  "Aarav",
];

const reviewOutcomes = [
  "moved from hesitation in algebra to consistent chapter test scores above 85",
  "became much calmer with word problems and now completes homework without daily stress",
  "improved from a predicted 4 to a steady 6 in IB maths after better written working",
  "started solving geometry and trigonometry questions with far less hand-holding",
  "became more confident before school assessments and stopped avoiding maths practice",
  "showed a clear jump in board-level problem solving after weekly mock review sessions",
  "started managing school maths and tuition work with a much better routine at home",
  "grew more accurate in calculations and now checks work independently before submission",
  "improved speed in timed worksheets and became more willing to ask sharper questions",
  "felt better prepared for exams because every weak chapter had a clear revision plan",
];

const reviewRatings = [4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.3, 4.6, 4.9, 4.5];

const reviewSchools = [
  "The Shri Ram School Aravali",
  "Scottish High International School",
  "The Heritage Xperiential Learning School",
  "GD Goenka Public School",
  "DPS International Edge",
  "St. Xavier's High School",
  "Pathways World School Aravali",
  "Lotus Valley International School",
  "Amity International School",
  "VIBGYOR High School",
];

const localizedReviews = Array.from({ length: 50 }, (_, index) => {
  const sector = gurugramSectors[index % gurugramSectors.length];
  const parent = reviewParents[index % reviewParents.length];
  const student = reviewStudents[(index + 2) % reviewStudents.length];
  const outcome = reviewOutcomes[index % reviewOutcomes.length];
  const school = reviewSchools[(index + 4) % reviewSchools.length];

  return {
    id: `review-${index + 1}`,
    rating: reviewRatings[index % reviewRatings.length],
    parent,
    student,
    sector: sector.label,
    school,
    board: index % 4 === 0 ? "IB" : index % 4 === 1 ? "IGCSE" : index % 4 === 2 ? "CBSE" : "Foundation Maths",
    quote: `${student} studies at ${school}, and the maths tutor matched for ${sector.label} in Gurugram ${outcome}. The home tuition support felt clear, well paced, and relevant to our actual school needs.`,
  };
});

const cityPages = [
  {
    slug: "gurugram",
    aliases: ["gurgaon"],
    label: "Gurugram",
    headline: "Maths home tutor in Gurugram for CBSE, ICSE, IB, IGCSE, JEE, and Olympiad learners",
    subtitle:
      "Families in Gurugram can use Maths Bodhi to find premium maths home tutors by board, class, school fit, and locality instead of browsing generic tutor directories.",
    coverageAreas: [
      "Golf Course Road",
      "Golf Course Extension Road",
      "Sohna Road",
      "DLF Phases 1 to 5",
      "Sushant Lok",
      "South City",
      "Nirvana Country",
      "Palam Vihar",
    ],
    servedBoards: [
      "CBSE Class 6 to 12",
      "ICSE Maths",
      "IGCSE Extended Maths",
      "IB Maths SL and HL",
      "JEE Main Maths",
      "Olympiad and foundation maths",
    ],
    proofPoints: [
      {
        value: "50+",
        label: "Localized reviews",
        detail: "Seeded across Gurugram sectors so parents can see relevant, locality-aware proof.",
      },
      {
        value: "10",
        label: "Priority sectors",
        detail: "Built around actual high-intent areas where maths home tutoring demand is strongest.",
      },
      {
        value: "6",
        label: "Premium school clusters",
        detail: "School-specific cards help families shortlist the right tutor more quickly.",
      },
    ],
    testimonials: localizedReviews.slice(0, 3).map((review) => ({
      name: review.parent,
      role: `${review.sector} parent`,
      quote: review.quote,
    })),
    topSectors: gurugramSectors.map((sector) => ({
      slug: sector.slug,
      label: sector.label,
      summary: sector.summary,
    })),
    relatedSubjects: subjectPages.slice(0, 4).map((subject) => ({
      slug: subject.slug,
      label: subject.label,
      summary: subject.subtitle,
    })),
    cta: {
      label: "Book a Gurugram maths demo class",
      description:
        "Tell us the board, class, school, sector, and topic challenge. We will move the enquiry straight into our WhatsApp-led matching process.",
    },
  },
];

const sectorPages = gurugramSectors.map((sector, index) => ({
  citySlug: "gurugram",
  cityAliases: ["gurgaon"],
  cityLabel: "Gurugram",
  slug: sector.slug,
  sectorLabel: sector.label,
  headline: `Maths home tuition in ${sector.label} Gurugram for premium school, board, and exam-specific learning`,
  subtitle: `${sector.summary} Each locality page is built to stay useful, specific, and connected to the broader maths tutoring journey in Gurugram.`,
  landmarks: sector.landmarks,
  nearbySchools: sector.nearbySchools,
  serviceModes: [
    "One-to-one maths home tuition",
    "Online maths support with recorded notes",
    "Exam-week booster sessions and mock paper review",
  ],
  timings: [
    "Weekday after-school classes",
    "Weekend revision and test analysis",
    "Pre-exam intensive chapter support",
  ],
  proofPoints: [
    {
      title: "School-specific matching",
      text: `This ${sector.label} page highlights nearby school context so families can quickly judge if the tutor profile feels relevant.`,
    },
    {
      title: "Locality-aware convenience",
      text: `Travel fit, weekday timing, and recurring slot availability matter in ${sector.label}, especially for home tuition.`,
    },
    {
      title: "Subject authority remains central",
      text: "The page still routes users back to the stronger subject-first pages so the site stays academically meaningful.",
    },
  ],
  popularSubjects: subjectPages.slice(index % 2, (index % 2) + 3).map((subject) => ({
    slug: subject.slug,
    label: subject.label,
    note: `Frequently requested by families in ${sector.label} who need sharper maths support with local convenience.`,
  })),
  cta: {
    label: `Book a ${sector.label} maths demo`,
    description:
      "Use this route if the family already knows the locality and now wants the right board fit, tutor fit, and WhatsApp-first enrolment path.",
  },
}));

export const defaultSiteData = {
  brandName: "Maths Bodhi",
  contact: {
    phoneDisplay: "+91 9896825986",
    whatsappNumber: "919896825986",
    email: "support@mathsbodhi.in",
    supportHours: "Mon to Sat, 9 AM to 8 PM",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
  },
  seo: {
    title:
      "Maths Home Tutor in Gurugram | Premium CBSE, IB, IGCSE, ICSE, and JEE Maths Home Tuition",
    description:
      "Find premium maths home tutors in Gurugram for CBSE, IB, IGCSE, ICSE, JEE, Olympiad, and school-specific support. Explore sectors, tutors, reviews, and WhatsApp-first booking.",
    keywords: [
      "maths home tutor in gurugram",
      "maths tuition in gurugram",
      "maths home tuition gurugram",
      "home tutor for maths in gurugram",
      "premium maths tutor gurugram",
      "cbse maths home tutor gurugram",
      "ib maths tutor gurugram",
      "igcse maths tutor gurugram",
      "icse maths tutor gurugram",
      "jee maths tutor gurugram",
      "class 10 maths tutor gurugram",
      "class 12 maths tutor gurugram",
      "sector 56 maths tutor",
      "sector 57 maths tutor",
      "golf course road maths tuition",
      "golf course extension road maths tutor",
      "sohna road maths home tutor",
      "maths tutor near scottish high",
      "maths tutor near shri ram aravali",
      "premium school maths tutor gurugram",
      "online maths tutor gurugram",
      "one to one maths tuition gurugram",
      "olympiad maths tutor gurugram",
      "foundation maths tutor gurugram",
      "home tutor in gurgaon for maths",
    ],
  },
  home: {
    eyebrow: "Maths Home Tuition in Gurugram",
    heroTitle:
      "Find a maths home tutor in Gurugram by class, board, sector, and real learning need",
    heroSubtitle:
      "Built for parents who want less confusion: start with class, narrow by board and sector, and move straight into a clear WhatsApp-based tutor matching flow.",
    keywordChips: [
      "Maths home tutor in Gurugram",
      "Maths tuition in Gurugram",
      "CBSE maths tutor",
      "IB maths tutor",
      "IGCSE maths tutor",
      "ICSE maths tutor",
      "JEE maths tutor",
      "Class 6 maths tutor",
      "Class 7 maths tutor",
      "Class 8 maths tutor",
      "Class 9 maths tutor",
      "Class 10 maths tutor",
      "Class 11 maths tutor",
      "Class 12 maths tutor",
      "Sector 54 maths tutor",
      "Sector 55 maths tutor",
      "Sector 56 maths tutor",
      "Sector 57 maths tutor",
      "Golf Course Road maths tutor",
      "Sohna Road maths tutor",
      "Premium school maths tutor",
      "One-to-one maths home tuition",
      "Online maths support",
      "Olympiad maths tutor",
    ],
    stats: [
      { label: "Review cards on the homepage", value: "50" },
      { label: "Priority Gurugram sectors", value: "10" },
      { label: "Premium school routes", value: "6" },
      { label: "Live tutor profiles", value: "6" },
    ],
    serviceBullets: [
      "Class-first and board-first tutor search",
      "Home tuition and online maths support",
      "Premium school-specific tutor matching",
      "WhatsApp-first parent and tutor coordination",
    ],
    intentTitle: "Our intent: useful, people-first maths home tuition in Gurugram",
    intentParagraphs,
    goalTitle: "Our goal: strong maths outcomes, cleaner SEO, and simpler operations",
    goalParagraphs,
  },
  premiumSchools,
  tutors: featuredTutors,
  reviews: localizedReviews,
  subjectPages,
  cityPages,
  sectorPages,
};
