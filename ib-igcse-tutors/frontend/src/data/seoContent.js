const subjectPages = {
  "ib-maths-hl": {
    slug: "ib-maths-hl",
    label: "IB Maths HL",
    title: "IB Maths HL tuition with clear structure and exam-depth support",
    subtitle:
      "Maths Bodhi helps IB Higher Level students build confidence across calculus, functions, proof, and assessment strategy without generic coaching.",
    boards: [
      "IB Diploma Programme",
      "Mathematics: Analysis and Approaches HL",
      "Mathematics: Applications and Interpretation HL",
    ],
    topics: [
      "Calculus",
      "Functions",
      "Sequences and series",
      "Vectors",
      "Probability",
      "Statistics",
    ],
    outcomes: [
      "Turn difficult HL topics into repeatable problem-solving routines.",
      "Prepare for internal assessments, mocks, and final exams with board-aware tutoring.",
      "Build speed, written clarity, and confidence under time pressure.",
    ],
    learningApproach: [
      {
        title: "Diagnostic topic mapping",
        text: "Start with strengths, weak chapters, and assessment goals before planning lessons.",
      },
      {
        title: "Chapter-by-chapter depth",
        text: "Move from concept clarity to exam-style questions so students do not stall on harder papers.",
      },
      {
        title: "Mock and feedback loop",
        text: "Use timed practice, mark-scheme review, and correction habits to improve consistency.",
      },
    ],
    faqItems: [
      {
        question: "Is this page meant for AA HL and AI HL students?",
        answer:
          "Yes. The tutoring structure is seeded to support both HL pathways, then adjusted to the student's paper mix and topic gaps.",
      },
      {
        question: "Can families start with one topic like calculus or vectors?",
        answer:
          "Yes. Many students begin with a specific chapter or exam pain point and then expand into a broader revision plan.",
      },
      {
        question: "When should an IB HL student book a demo?",
        answer:
          "The best time is before mocks, before final revision begins, or as soon as a topic starts affecting confidence across papers.",
      },
    ],
    relatedCities: [{ slug: "gurgaon", label: "Gurgaon" }],
    cta: {
      label: "Book an IB Maths HL demo",
      description:
        "Share the current grade, topic challenges, and target timeline. We will match the student with the right level of rigor.",
    },
  },
};

const cityPages = {
  gurgaon: {
    city: "gurgaon",
    label: "Gurgaon",
    headline: "Find premium maths tuition in Gurgaon without generic tutor listings",
    subtitle:
      "Families in Gurgaon can use Maths Bodhi to compare board-aware maths tutoring, explore local coverage, and start with a structured demo instead of guesswork.",
    coverageAreas: [
      "Golf Course Road",
      "Golf Course Extension Road",
      "DLF Phases",
      "Sushant Lok",
      "Sector 54 to Sector 57",
    ],
    servedBoards: [
      "IB SL and HL",
      "IGCSE Extended Maths",
      "CBSE Class 9 to 12",
      "JEE Main foundation maths",
    ],
    proofPoints: [
      {
        value: "120+",
        label: "Families matched",
        detail: "Seeded local proof for board-specific discovery across Gurgaon.",
      },
      {
        value: "4.8/5",
        label: "Average tutor rating",
        detail: "The experience stays trust-first for parents and students.",
      },
      {
        value: "15+",
        label: "Coverage pockets",
        detail: "Useful for local discovery before a full operations map exists.",
      },
    ],
    testimonials: [
      {
        name: "Ritika Mehra",
        role: "Parent in Gurgaon",
        quote:
          "The platform feels far more focused than generic listings. We could narrow the search by board and move to a demo quickly.",
      },
      {
        name: "Aanya Sharma",
        role: "IGCSE student in Gurgaon",
        quote:
          "The topic-led approach made it easier to ask for support in the exact areas where I was stuck.",
      },
    ],
    topSectors: [
      {
        slug: "sector-56",
        label: "Sector 56",
        summary:
          "A strong micro-local landing page for families near Golf Course Extension Road and nearby schools.",
      },
    ],
    relatedSubjects: [
      {
        slug: "ib-maths-hl",
        label: "IB Maths HL",
        summary: "High-rigor support for AA and AI students preparing for demanding papers.",
      },
    ],
    cta: {
      label: "Book a Gurgaon maths demo",
      description:
        "Tell us the board, class, and locality. We will use that context to suggest the right next tutoring match.",
    },
  },
};

const sectorPages = {
  "gurgaon/sector-56": {
    city: "gurgaon",
    cityLabel: "Gurgaon",
    sector: "sector-56",
    sectorLabel: "Sector 56",
    headline: "Maths tuition in Sector 56 Gurgaon for IB, IGCSE, CBSE, and JEE learners",
    subtitle:
      "A micro-local landing page for families who want tutor availability near Golf Course Extension Road, strong board fit, and a clear next step into demo booking.",
    landmarks: [
      "Golf Course Extension Road",
      "Rapid Metro access via Sector 54 and 55",
      "Residential pockets around Sushant Lok and Golf Course Road",
    ],
    nearbySchools: [
      "Scottish High International School",
      "The Heritage Xperiential Learning School",
      "St. Xavier's High School",
    ],
    serviceModes: [
      "Online one-to-one maths sessions",
      "Home tutoring in nearby sectors",
      "Small-group revision blocks before mocks and exams",
    ],
    timings: [
      "Weekday evening support after school",
      "Saturday revision and mock-paper slots",
      "Short pre-exam booster sessions for topic-specific needs",
    ],
    proofPoints: [
      {
        title: "Area-fit matching",
        text: "Seeded to show how micro-local pages can talk about actual locality convenience instead of repeating city copy.",
      },
      {
        title: "Board-aware tutoring",
        text: "Students can still start by curriculum and topic even when the page intent is local.",
      },
      {
        title: "Conversion-ready flow",
        text: "The layout keeps clear paths back to Gurgaon and into the main subject pages.",
      },
    ],
    popularSubjects: [
      {
        slug: "ib-maths-hl",
        label: "IB Maths HL",
        note: "High-rigor help for AA and AI learners in international-school contexts.",
      },
    ],
    cta: {
      label: "Book a Sector 56 maths demo",
      description:
        "Use this route when the family already knows the locality and now needs the right board and tutor fit.",
    },
  },
};

export function getSubjectPage(slug) {
  return subjectPages[slug?.toLowerCase()] ?? null;
}

export function getCityPage(city) {
  return cityPages[city?.toLowerCase()] ?? null;
}

export function getSectorPage(city, sector) {
  const key = `${city ?? ""}/${sector ?? ""}`.toLowerCase();
  return sectorPages[key] ?? null;
}
