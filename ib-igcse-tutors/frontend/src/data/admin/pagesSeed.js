import { defaultSiteData } from "../defaultSiteData";
import { mathsBoardConfig } from "../mathsBoardConfig";
import { createId, createTimestamp, ensureArray, uniqueValues } from "./seedUtils";
import { getCanonicalReviewId } from "./reviewsSeed";
import { getCanonicalTutorId } from "./tutorsSeed";

function createSeo(source, fallbackPath) {
  return {
    title: source.metaTitle ?? source.seoTitle ?? source.title,
    description: source.metaDescription ?? source.description ?? source.subtitle,
    canonicalUrl: source.route ?? source.canonicalUrl ?? fallbackPath,
    keywords: uniqueValues(source.keywords ?? source.searchIntentChips ?? source.topics ?? []),
    ogImage: source.heroImage ?? "/images/hero-maths-home.svg",
    indexable: true,
  };
}

function buildFaqId(pageId, index) {
  return `${pageId}-faq-${index + 1}`;
}

const pageEntries = [];
const faqEntries = [];

Object.values(mathsBoardConfig).forEach((page, index) => {
  const pageId = `page-board-${page.key.replaceAll("/", "-")}`;
  const faqIds = ensureArray(page.faqItems).map((item, faqIndex) => {
    const faqId = buildFaqId(pageId, faqIndex);

    faqEntries.push({
      id: faqId,
      question: item.question,
      answer: item.answer,
      linkedType: "page",
      linkedId: pageId,
      linkedLabel: page.label,
      boardKey: page.key,
      citySlug: "",
      localitySlug: "",
      order: faqIndex + 1,
      status: "published",
      createdAt: createTimestamp(index + faqIndex + 12),
      updatedAt: createTimestamp(index + 1),
    });

    return faqId;
  });

  pageEntries.push({
    id: pageId,
    pageType: "board",
    pageKey: page.key,
    slug: page.key,
    route: page.route,
    label: page.label,
    title: page.label,
    navLabel: page.navLabel ?? page.label,
    h1: page.title,
    intro: page.subtitle,
    status: "published",
    badge: page.badge,
    parentKey: page.parentKey ?? null,
    breadcrumbLabel: page.breadcrumbLabel,
    chips: ensureArray(page.chips),
    stats: ensureArray(page.stats),
    supportPanel: page.supportPanel,
    overview: page.overview,
    childSections: ensureArray(page.childSections),
    detailSections: ensureArray(page.detailSections),
    checklist: ensureArray(page.checklist),
    schoolHighlights: ensureArray(page.schoolHighlights),
    localZones: ensureArray(page.localZones),
    cta: page.cta,
    heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
    heroImageAlt: page.heroImageAlt ?? `${page.label} tutoring support`,
    featuredTutorIds: ensureArray(page.featuredTutorIds).map((item) => getCanonicalTutorId(item)),
    featuredReviewIds: ensureArray(page.featuredReviewIds).map((item) => getCanonicalReviewId(item)),
    faqIds,
    seo: createSeo(page, page.route),
    createdAt: createTimestamp(index + 30),
    updatedAt: createTimestamp(index + 2),
  });
});

defaultSiteData.subjectPages.forEach((page, index) => {
  const pageId = `page-subject-${page.slug}`;
  const faqIds = ensureArray(page.faqItems).map((item, faqIndex) => {
    const faqId = buildFaqId(pageId, faqIndex);

    faqEntries.push({
      id: faqId,
      question: item.question,
      answer: item.answer,
      linkedType: "page",
      linkedId: pageId,
      linkedLabel: page.label,
      boardKey: page.slug,
      citySlug: page.relatedCities?.[0] ?? "gurugram",
      localitySlug: "",
      order: faqIndex + 1,
      status: "published",
      createdAt: createTimestamp(index + faqIndex + 9),
      updatedAt: createTimestamp(index + 1),
    });

    return faqId;
  });

    pageEntries.push({
      id: pageId,
      pageType: "subject",
      pageKey: page.slug,
      slug: page.slug,
      route: `/subject/${page.slug}`,
      label: page.label,
      title: page.label,
      navLabel: page.label,
      h1: page.title,
      intro: page.subtitle,
      status: "published",
      heroBadge: page.heroBadge ?? "Subject Page",
      badge: page.heroBadge ?? "Subject Page",
    parentKey: null,
    breadcrumbLabel: page.label,
    chips: ensureArray(page.searchIntentChips ?? page.topics),
    stats: ensureArray(page.heroStats),
    supportPanel: {
      title: page.heroSupportTitle ?? "Subject-first maths support",
      text: page.heroSupportText ?? page.subtitle,
      bullets: ensureArray(page.outcomes).slice(0, 3),
    },
    overview: {
      badge: "Learning Approach",
      title: `${page.label} support overview`,
      subtitle: page.subtitle,
      cards: ensureArray(page.learningApproach).map((item) => ({
        eyebrow: "Approach",
        title: item.title,
        description: item.text,
        tags: [],
      })),
    },
    childSections: ensureArray(page.classSegments).map((segment) => ({
      badge: segment.focus,
      title: segment.label,
      subtitle: segment.description,
      layout: "cards",
      items: ensureArray(segment.topics).map((topic) => ({
        eyebrow: "Topic",
        title: topic,
        description: `${page.label} support for ${topic.toLowerCase()}.`,
        tags: [],
        to: `/subject/${page.slug}`,
      })),
    })),
    detailSections: ensureArray(page.seoSections ?? []).map((section) => ({
      title: section.title,
      paragraphs: ensureArray(section.paragraphs),
    })),
    checklist: ensureArray(page.parentChecklist ?? page.outcomes),
    schoolHighlights: ensureArray(page.schoolHighlights),
    localZones: ensureArray(page.localDemandZones),
    cta: page.cta,
    heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
    heroImageAlt: page.heroImageAlt ?? `${page.label} tutoring support`,
    featuredTutorIds: ensureArray(page.featuredTutorIds).map((item) => getCanonicalTutorId(item)),
      featuredReviewIds: [],
      faqIds,
      relatedCities: ensureArray(page.relatedCities),
      boards: ensureArray(page.boards),
      topics: ensureArray(page.topics),
      outcomes: ensureArray(page.outcomes),
      learningApproach: ensureArray(page.learningApproach),
      classSegments: ensureArray(page.classSegments),
      boardSupportCards: ensureArray(page.boardSupportCards),
      schoolHighlights: ensureArray(page.schoolHighlights),
      localDemandZones: ensureArray(page.localDemandZones),
      seoSections: ensureArray(page.seoSections),
      parentChecklist: ensureArray(page.parentChecklist),
      searchIntentChips: ensureArray(page.searchIntentChips),
      heroStats: ensureArray(page.heroStats),
      heroSupportTitle: page.heroSupportTitle ?? "",
      heroSupportText: page.heroSupportText ?? "",
      seo: createSeo(page, `/subject/${page.slug}`),
      createdAt: createTimestamp(index + 18),
      updatedAt: createTimestamp(index + 2),
    });
  });

export const pageSeeds = pageEntries;

export const faqSeeds = faqEntries;

export const blogSeeds = [
  {
    id: "blog-board-first-shortlisting",
    title: "Why families often choose maths tutors better when they start with the board",
    slug: "maths-tutor-board-first-shortlisting-gurugram",
    summary:
      "Board-first shortlisting usually makes tutor conversations clearer because class level, school pace, and tutor fit become easier to compare.",
    body:
      "Many families begin by asking for the best maths tutor. A clearer first step is often to settle the board or exam path. Once the curriculum is fixed, it becomes easier to judge the student's class pressure, the right tutoring style, and how much local travel convenience really matters.\n\nThat board-first flow is especially helpful when families are comparing school support, board preparation, or a move into deeper exam-oriented maths.",
    status: "published",
    category: "Maths Planning",
    tags: ["Maths by Board", "Tutor Matching", "Parents"],
    author: "Maths Bodhi Team",
    relatedPageId: "page-board-hub",
    relatedTutorIds: [getCanonicalTutorId("tutor-cbse-rahul"), getCanonicalTutorId("tutor-icse-suhani")],
    publishDate: createTimestamp(9),
    coverImage: "/images/hero-maths-home.svg",
    faqItems: [],
    seo: {
      title: "How to Choose a Maths Tutor by Board | Maths Bodhi",
      description:
        "A practical guide to comparing maths tutor fit by board, class level, and local routine in Gurugram.",
      canonicalUrl: "/blog/maths-tutor-board-first-shortlisting-gurugram",
      keywords: ["maths tutor by board", "maths tutor gurugram", "parents maths support"],
      ogImage: "/images/hero-maths-home.svg",
      indexable: true,
    },
    createdAt: createTimestamp(14),
    updatedAt: createTimestamp(3),
  },
  {
    id: "blog-cbse-board-routine",
    title: "Why Class 10 and 12 maths improvement depends on routine, not panic",
    slug: "cbse-board-maths-routine-gurugram",
    summary:
      "The strongest board-year maths routines usually look calmer and more repeatable than families expect.",
    body:
      "Board-year maths support becomes more effective when a student has a repeatable pattern for chapter review, written practice, and correction.\n\nParents often look for extra classes first, but the bigger gain usually comes from sequence and consistency.",
    status: "published",
    category: "CBSE Maths",
    tags: ["CBSE", "Board Prep", "Class 10", "Class 12"],
    author: "Maths Bodhi Editorial",
    relatedPageId: "page-board-cbse",
    relatedTutorIds: [getCanonicalTutorId("tutor-cbse-rahul"), getCanonicalTutorId("tutor-cbse-priyank")],
    publishDate: createTimestamp(6),
    coverImage: "/images/tutor-premium-school.svg",
    faqItems: [],
    seo: {
      title: "CBSE Board Maths Routine in Gurugram | Maths Bodhi",
      description:
        "How structured weekly maths routines support Class 10 and 12 board preparation.",
      canonicalUrl: "/blog/cbse-board-maths-routine-gurugram",
      keywords: ["cbse maths routine", "board maths gurugram", "class 10 maths"],
      ogImage: "/images/tutor-premium-school.svg",
      indexable: true,
    },
    createdAt: createTimestamp(10),
    updatedAt: createTimestamp(4),
  },
  {
    id: "blog-icse-method-structure",
    title: "How ICSE and ISC maths support becomes easier once written method improves",
    slug: "icse-isc-maths-written-method-gurugram",
    summary:
      "Many ICSE and ISC maths problems look like topic gaps at first, but written presentation and weekly structure often matter just as much.",
    body:
      "When a student partly understands the chapter but still loses marks, the issue is often not only conceptual. Clear presentation, steadier notebook discipline, and better step order can change how school papers feel.\n\nThat is why ICSE and ISC maths support often works best when the tutor corrects written method and school rhythm together.",
    status: "published",
    category: "ICSE / ISC Maths",
    tags: ["ICSE", "ISC", "Written Method"],
    author: "Maths Bodhi Team",
    relatedPageId: "page-board-icse-isc",
    relatedTutorIds: [getCanonicalTutorId("tutor-icse-suhani"), getCanonicalTutorId("tutor-icse-raghav")],
    publishDate: createTimestamp(7),
    coverImage: "/images/tutor-classroom-progress.svg",
    faqItems: [],
    seo: {
      title: "ICSE and ISC Maths Written Method Guide | Maths Bodhi",
      description:
        "Why written presentation and weekly structure often improve ICSE and ISC maths confidence.",
      canonicalUrl: "/blog/icse-isc-maths-written-method-gurugram",
      keywords: ["icse maths tutor gurugram", "isc maths tutor gurugram", "written method maths"],
      ogImage: "/images/tutor-classroom-progress.svg",
      indexable: true,
    },
    createdAt: createTimestamp(11),
    updatedAt: createTimestamp(4),
  },
  {
    id: "blog-igcse-method-marks",
    title: "What parents misunderstand about method marks in IGCSE maths",
    slug: "igcse-maths-method-marks-gurugram",
    summary:
      "In IGCSE maths, presentation and method clarity often matter as much as the student's instinct for the answer.",
    body:
      "Students can lose marks even when the final answer looks close. A tutoring plan that corrects method, notation, and layout is often more valuable than simply increasing question volume.",
    status: "published",
    category: "IGCSE Maths",
    tags: ["IGCSE", "Method Marks", "Exam Technique"],
    author: "Maths Bodhi Team",
    relatedPageId: "page-board-igcse",
    relatedTutorIds: [getCanonicalTutorId("tutor-igcse-neha"), getCanonicalTutorId("tutor-igcse-tara")],
    publishDate: createTimestamp(3),
    coverImage: "/images/tutor-classroom-progress.svg",
    faqItems: [],
    seo: {
      title: "IGCSE Method Marks Explained | Maths Bodhi",
      description:
        "Why written method and exam presentation can change IGCSE maths results.",
      canonicalUrl: "/blog/igcse-maths-method-marks-gurugram",
      keywords: ["igcse maths method marks", "igcse tutor gurugram"],
      ogImage: "/images/tutor-classroom-progress.svg",
      indexable: true,
    },
    createdAt: createTimestamp(8),
    updatedAt: createTimestamp(3),
  },
  {
    id: "blog-ib-maths-pace",
    title: "How IB maths students in Gurugram benefit from calmer revision pacing",
    slug: "ib-maths-revision-pacing-gurugram",
    summary:
      "A structured revision rhythm often helps IB maths students more than one more worksheet sprint.",
    body:
      "IB maths students often know more than they can show under pressure. A better tutoring rhythm starts by reducing topic switching, clarifying method, and protecting time for review.\n\nFor many families, the real problem is not effort. It is overload. When a tutor simplifies the order of work and makes feedback repeatable, confidence becomes easier to build.",
    status: "published",
    category: "IB Maths",
    tags: ["IB", "Revision", "Maths Strategy"],
    author: "Maths Bodhi Team",
    relatedPageId: "page-board-ib",
    relatedTutorIds: [getCanonicalTutorId("tutor-ib-aarav"), getCanonicalTutorId("tutor-ib-sana")],
    publishDate: createTimestamp(2),
    coverImage: "/images/hero-maths-home.svg",
    faqItems: [],
    seo: {
      title: "IB Maths Revision Pacing in Gurugram | Maths Bodhi",
      description:
        "A practical look at how calmer revision cycles improve IB maths confidence and paper performance.",
      canonicalUrl: "/blog/ib-maths-revision-pacing-gurugram",
      keywords: ["ib maths gurugram", "ib maths revision", "maths pacing"],
      ogImage: "/images/hero-maths-home.svg",
      indexable: true,
    },
    createdAt: createTimestamp(12),
    updatedAt: createTimestamp(2),
  },
  {
    id: "blog-ib-dp-aa-vs-ai",
    title: "How parents can think about AA and AI without turning IB maths into guesswork",
    slug: "ib-dp-aa-vs-ai-maths-gurugram",
    summary:
      "AA and AI are not better-or-worse versions of the same maths course. They fit different strengths, paper styles, and student goals.",
    body:
      "Many IB families feel pressure to make the right Diploma maths choice quickly. The better starting point is to understand the student's actual comfort with abstraction, modelling, paper style, and workload.\n\nOnce those signals are clearer, the tutoring conversation becomes much more practical and far less stressful.",
    status: "published",
    category: "IB DP Maths",
    tags: ["IB", "DP", "AA vs AI"],
    author: "Maths Bodhi Editorial",
    relatedPageId: "page-board-ib-dp",
    relatedTutorIds: [getCanonicalTutorId("tutor-ib-aarav"), getCanonicalTutorId("tutor-ib-kabir")],
    publishDate: createTimestamp(4),
    coverImage: "/images/tutor-premium-school.svg",
    faqItems: [],
    seo: {
      title: "AA vs AI in IB DP Maths | Maths Bodhi",
      description:
        "A parent-friendly guide to choosing between AA and AI in IB Diploma maths.",
      canonicalUrl: "/blog/ib-dp-aa-vs-ai-maths-gurugram",
      keywords: ["aa vs ai ib maths", "ib dp maths tutor gurugram"],
      ogImage: "/images/tutor-premium-school.svg",
      indexable: true,
    },
    createdAt: createTimestamp(9),
    updatedAt: createTimestamp(3),
  },
  {
    id: "blog-jee-maths-speed-strategy",
    title: "Why JEE maths practice works better when speed and accuracy are trained together",
    slug: "jee-maths-speed-accuracy-gurugram",
    summary:
      "More questions do not automatically create better JEE maths scores. Practice becomes more useful when timing, selection, and review improve together.",
    body:
      "Some students work hard but still feel rushed in JEE maths because the review pattern is too random. A steadier plan often starts by improving question selection, timed practice, and the way mistakes are reviewed after tests.\n\nThat change matters for both JEE Main and JEE Advanced, even though the paper demands are different.",
    status: "published",
    category: "JEE Maths",
    tags: ["JEE", "Speed and Accuracy", "Problem Solving"],
    author: "Maths Bodhi Team",
    relatedPageId: "page-board-jee",
    relatedTutorIds: [getCanonicalTutorId("tutor-jee-aditya"), getCanonicalTutorId("tutor-jee-ishita")],
    publishDate: createTimestamp(5),
    coverImage: "/images/hero-maths-home.svg",
    faqItems: [],
    seo: {
      title: "JEE Maths Speed and Accuracy Strategy | Maths Bodhi",
      description:
        "How JEE maths students can build better speed, accuracy, and weekly paper review habits.",
      canonicalUrl: "/blog/jee-maths-speed-accuracy-gurugram",
      keywords: ["jee maths tutor gurugram", "jee main maths strategy", "jee advanced maths practice"],
      ogImage: "/images/hero-maths-home.svg",
      indexable: true,
    },
    createdAt: createTimestamp(8),
    updatedAt: createTimestamp(2),
  },
];
