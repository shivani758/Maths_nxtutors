import { mathsBoardConfig, mathsRouteMap } from "../data/mathsBoardConfig";
import { getTutorProfilePath } from "../utils/tutorRoutes";
import {
  listBoardPagesSnapshot,
  listCanonicalReviewsSnapshot,
  listCanonicalTutorsSnapshot,
  listPublishedBlogsSnapshot,
  listResultsSnapshot,
  listTutorProfilesSnapshot,
} from "./publicSiteService";

const CORE_BOARD_KEYS = ["cbse", "icse-isc", "igcse", "ib", "jee"];

const CORE_BOARD_CARD_COPY = {
  cbse: {
    eyebrow: "Board",
    description: "For school maths support from middle grades to board preparation.",
    tags: ["Classes 6-12", "Board prep"],
  },
  "icse-isc": {
    eyebrow: "Board",
    description: "For written method, structured school support, and senior-school continuity.",
    tags: ["ICSE", "ISC"],
  },
  igcse: {
    eyebrow: "Board",
    description: "For Core and Extended learners building method clarity and exam confidence.",
    tags: ["Core", "Extended"],
  },
  ib: {
    eyebrow: "Board",
    description: "For IB learners moving through PYP, MYP, and Diploma maths.",
    tags: ["PYP", "MYP", "DP"],
  },
  jee: {
    eyebrow: "Exam route",
    description:
      "For students preparing through concept depth, timed practice, and exam problem solving.",
    tags: ["JEE Main", "JEE Advanced"],
  },
};

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function dedupeById(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (!item || seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

function uniqueValues(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeToken(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getIdentityValues(value) {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  return uniqueValues([value.id, value.sourceId]);
}

function identitiesMatch(left, right) {
  const leftIds = getIdentityValues(left);
  const rightIds = getIdentityValues(right);

  return leftIds.some((item) => rightIds.includes(item));
}

function getPageKeyFromSegments(board, stage, track) {
  const segments = [board, stage, track].filter(Boolean);
  return segments.length ? segments.join("/") : "hub";
}

function getPageIdForKey(key) {
  return `page-board-${String(key ?? "").replaceAll("/", "-")}`;
}

function getBoardPageStore() {
  return [...Object.values(mathsBoardConfig), ...listBoardPagesSnapshot()].reduce((map, page) => {
    map[page.pageKey ?? page.key] = page;
    return map;
  }, {});
}

function getTutorStore() {
  return listCanonicalTutorsSnapshot().reduce((map, tutor) => {
    map[tutor.id] = tutor;
    if (tutor.sourceId) {
      map[tutor.sourceId] = tutor;
    }
    return map;
  }, {});
}

function getRootBoardKey(pageKey = "") {
  const [root] = String(pageKey ?? "").split("/");
  return root || "hub";
}

function getRelevantBoardPageIds(pageKey) {
  const pages = Object.values(getBoardPageStore());

  if (pageKey === "hub") {
    return pages.map((page) => page.id ?? getPageIdForKey(page.pageKey ?? page.key));
  }

  return pages
    .filter((page) => {
      const currentKey = page.pageKey ?? page.key;
      return (
        currentKey === pageKey ||
        currentKey.startsWith(`${pageKey}/`) ||
        pageKey.startsWith(`${currentKey}/`)
      );
    })
    .map((page) => page.id ?? getPageIdForKey(page.pageKey ?? page.key));
}

function getBoardTokens(pageKey) {
  const rootKey = getRootBoardKey(pageKey);
  const tokens = [pageKey, rootKey];

  if (rootKey === "icse-isc") {
    tokens.push("icse", "isc");
  }

  if (rootKey === "ib") {
    tokens.push("pyp", "myp", "dp", "aa", "ai", "diploma");
  }

  if (rootKey === "jee") {
    tokens.push("jee", "main", "advanced");
  }

  return uniqueValues(tokens.flatMap((item) => normalizeToken(item).split(" ")));
}

function getBoardKeyFromName(boardLabel = "") {
  const normalized = normalizeToken(boardLabel);

  if (normalized.includes("cbse")) {
    return "cbse";
  }

  if (normalized.includes("icse") || normalized.includes("isc")) {
    return "icse-isc";
  }

  if (normalized.includes("igcse")) {
    return "igcse";
  }

  if (normalized.includes("ib")) {
    return "ib";
  }

  if (normalized.includes("jee")) {
    return "jee";
  }

  return null;
}

function toMathsTutorEntity(tutor) {
  return {
    id: tutor.id,
    slug: tutor.slug,
    tutorName: tutor.name,
    name: tutor.name,
    title: tutor.title,
    rating: String(tutor.rating),
    yearsExperience: tutor.experience,
    experience: tutor.experience,
    board: tutor.boards?.[0] ?? "Maths",
    boardSpecialization: tutor.boardTags?.[0] ?? tutor.boards?.[0] ?? "Maths",
    classesSupported: tutor.classesSupported?.join(", ") || "Flexible support",
    classFocus: tutor.classesSupported?.[0] ?? "Flexible support",
    classLevel: tutor.classesSupported?.[0] ?? "Flexible support",
    examSupport: cloneValue(tutor.examSupport ?? []),
    boardTags: cloneValue(tutor.boardTags ?? tutor.boards ?? []),
    topicTags: cloneValue(tutor.topicTags ?? tutor.topics ?? []),
    localityTags: cloneValue(tutor.localityTags ?? tutor.localities ?? []),
    serviceModeTags: cloneValue(tutor.serviceModeTags ?? tutor.serviceModes ?? []),
    schoolFitTags: cloneValue(tutor.schoolFitTags ?? tutor.schoolFocus ?? []),
    topics: cloneValue(tutor.topics ?? []),
    chips: cloneValue(tutor.badges ?? []),
    price: tutor.startingFee,
    startingFee: tutor.startingFee,
    sectors: cloneValue(tutor.localities ?? []),
    mode: cloneValue(tutor.serviceModes ?? []),
    serviceModes: cloneValue(tutor.serviceModes ?? []),
    description: tutor.shortBio ?? tutor.summary,
    shortBio: tutor.shortBio ?? tutor.summary,
    summary: tutor.summary ?? tutor.shortBio,
    schoolFocus: cloneValue(tutor.schoolFocus ?? []),
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    featuredOn: cloneValue(tutor.featuredOn ?? []),
    profileTo: getTutorProfilePath(tutor),
  };
}

function toMathsReviewEntity(review) {
  return {
    id: review.id,
    parent: review.parent ?? review.reviewerName,
    sector: review.sector ?? review.locality,
    school: review.school ?? "",
    board: review.board ?? review.relatedBoard,
    rating: String(review.rating),
    quote: review.quote ?? review.reviewText,
    featuredOn: cloneValue(review.featuredOn ?? []),
    relatedTutorId: review.relatedTutorId ?? null,
  };
}

function toMathsResultEntity(result, tutorStore) {
  const linkedTutor = tutorStore[result.linkedTutorId];

  return {
    id: result.id,
    studentLabel: result.studentLabel,
    classBoard: result.classBoard,
    beforeResult: result.beforeResult,
    afterResult: result.afterResult,
    story: result.story,
    tutorName: linkedTutor?.name ?? "",
    tutorPath: linkedTutor ? getTutorProfilePath(linkedTutor) : "",
    featured: Boolean(result.featured),
  };
}

function toMathsBlogEntity(blog) {
  return {
    id: blog.id,
    sourceId: blog.sourceId ?? "",
    title: blog.title,
    summary: blog.summary,
    category: blog.category,
    tags: cloneValue(blog.tags ?? []),
    author: blog.author,
    publishDate: blog.publishDate,
    coverImage: blog.coverImage,
    slug: blog.slug,
    to: blog.slug ? `/blogs/${blog.slug}` : "",
  };
}

function getBlogTokens(blog) {
  return uniqueValues([
    normalizeToken(blog.category),
    ...(blog.tags ?? []).map((item) => normalizeToken(item)),
    ...(blog.relatedBoards ?? []).map((item) => normalizeToken(item)),
  ]).flatMap((item) => item.split(" ").filter(Boolean));
}

function getPageTokens(page) {
  return uniqueValues([
    normalizeToken(page.label ?? page.title),
    ...(page.boards ?? []).map((item) => normalizeToken(item)),
    ...(page.topics ?? []).map((item) => normalizeToken(item)),
  ]).flatMap((item) => item.split(" ").filter(Boolean));
}

function getTutorTopicTokens(tutor) {
  return uniqueValues([
    ...(tutor.boards ?? []).map((item) => getBoardKeyFromName(item)),
    ...(tutor.boardTags ?? []).map((item) => getBoardKeyFromName(item)),
    ...((tutor.topics ?? []).map((item) => normalizeToken(item))),
  ]).flatMap((item) => normalizeToken(item).split(" "));
}

function getGeneratedTutorFaqs(tutor) {
  const boardsLabel = (tutor.boards ?? []).join(", ");
  const classesLabel = (tutor.classesSupported ?? []).join(", ");
  const servicesLabel = (tutor.serviceModes ?? []).join(", ");
  const localityLabel = (tutor.localities ?? []).slice(0, 3).join(", ");

  return [
    {
      question: `Which maths boards and classes does ${tutor.name} usually support?`,
      answer:
        `${tutor.name} usually supports ${boardsLabel || "maths learners"} across ${classesLabel || "multiple class levels"}. The focus is on matching the tutoring pace to the student's current school or exam pressure.`,
    },
    {
      question: `What kind of maths support does ${tutor.name} offer?`,
      answer:
        `${tutor.name} offers ${servicesLabel || "one-to-one maths support"} with an emphasis on clearer method, steadier revision, and practical chapter-by-chapter progress.`,
    },
    {
      question: `Can families ask about locality and scheduling fit before booking?`,
      answer:
        `Yes. Families can check locality coverage${localityLabel ? ` around ${localityLabel}` : ""}, preferred lesson mode, and the most suitable next step before confirming a trial or regular maths plan.`,
    },
  ];
}

function getRelatedBlogsForTutorEntity(tutor, limit = 3) {
  const tutorBoardPageIds = uniqueValues(
    (tutor.boards ?? [])
      .map((board) => getBoardKeyFromName(board))
      .filter(Boolean)
      .flatMap((boardKey) => getRelevantBoardPageIds(boardKey)),
  );
  const tutorTokens = getTutorTopicTokens(tutor);
  const blogs = listPublishedBlogsSnapshot();

  const directMatches = blogs.filter((blog) =>
    (blog.relatedTutorIds ?? []).some((relatedTutorId) => identitiesMatch(relatedTutorId, tutor)),
  );
  const boardMatches = blogs.filter((blog) => tutorBoardPageIds.includes(blog.relatedPageId));
  const topicMatches = blogs.filter((blog) => {
    const blogTokens = getBlogTokens(blog);
    return blogTokens.some((token) => tutorTokens.includes(token));
  });

  return dedupeById([...directMatches, ...boardMatches, ...topicMatches])
    .map((blog) => toMathsBlogEntity(blog))
    .slice(0, limit);
}

export function getMathsBoardPageContent(key) {
  return cloneValue(getBoardPageStore()[key] ?? null);
}

export function getMathsBoardPageContentBySegments(board, stage, track) {
  return getMathsBoardPageContent(getPageKeyFromSegments(board, stage, track));
}

export function listMathsBoardPages() {
  return Object.values(getBoardPageStore()).map((page) => cloneValue(page));
}

export function getMathsBoardBreadcrumbs(key) {
  const pageStore = getBoardPageStore();
  const items = [];
  let current = pageStore[key];

  while (current) {
    items.unshift({
      label: current.breadcrumbLabel,
      to: current.route,
    });
    current = current.parentKey ? pageStore[current.parentKey] : null;
  }

  return [{ label: "Home", to: "/" }, ...items];
}

export function getMathsCoreBoardCards() {
  const pageStore = getBoardPageStore();

  return CORE_BOARD_KEYS.map((key) => {
    const page = pageStore[key];
    const cardCopy = CORE_BOARD_CARD_COPY[key];

    return {
      eyebrow: cardCopy.eyebrow,
      title: page.label,
      description: cardCopy.description,
      tags: cardCopy.tags,
      to: page.route,
    };
  });
}

export function listMathsTutors() {
  return listCanonicalTutorsSnapshot().map((tutor) => toMathsTutorEntity(tutor));
}

export function getTutorById(id) {
  return cloneValue(listMathsTutors().find((item) => item.id === id) ?? null);
}

export function getTutorBySlug(slug) {
  return cloneValue(listMathsTutors().find((item) => item.slug === slug) ?? null);
}

export function getFeaturedTutors(pageKey, options = {}) {
  const { featuredTutorIds = [], limit = 15 } = options;
  const tutors = listCanonicalTutorsSnapshot();
  const prioritised = featuredTutorIds
    .map((id) => tutors.find((tutor) => tutor.id === id))
    .filter(Boolean);
  const related = tutors.filter((tutor) => tutor.featuredOn?.includes(pageKey));

  return dedupeById([...prioritised, ...related])
    .map((tutor) => toMathsTutorEntity(tutor))
    .slice(0, limit);
}

export function getBoardPageContent(boardSlug) {
  return getMathsBoardPageContent(boardSlug);
}

export function getBoardFaqItems(boardSlug) {
  return cloneValue(getMathsBoardPageContent(boardSlug)?.faqItems ?? []);
}

export function getSchoolContextCards(boardSlug) {
  return cloneValue(getMathsBoardPageContent(boardSlug)?.schoolHighlights ?? []);
}

export function getLocalityCards(boardSlug) {
  return cloneValue(getMathsBoardPageContent(boardSlug)?.localZones ?? []);
}

export function listMathsTestimonials() {
  return listCanonicalReviewsSnapshot().map((review) => toMathsReviewEntity(review));
}

export function getTestimonialById(id) {
  return cloneValue(listMathsTestimonials().find((item) => item.id === id) ?? null);
}

export function getTestimonialsByBoard(pageKey, options = {}) {
  const { featuredReviewIds = [], limit = 6 } = options;
  const reviews = listCanonicalReviewsSnapshot();
  const prioritised = featuredReviewIds
    .map((id) => reviews.find((review) => review.id === id))
    .filter(Boolean);
  const related = reviews.filter((review) => review.featuredOn?.includes(pageKey));

  return dedupeById([...prioritised, ...related])
    .map((review) => toMathsReviewEntity(review))
    .slice(0, limit);
}

export function getStudentResultsByBoard(pageKey, options = {}) {
  const { limit = 4 } = options;
  const results = listResultsSnapshot().filter((result) => result.status === "approved");
  const tutorStore = getTutorStore();
  const relevantPageIds = new Set(getRelevantBoardPageIds(pageKey));
  const boardTokens = getBoardTokens(pageKey);

  const prioritised = results.filter((result) => result.featured && relevantPageIds.has(result.linkedPageId));
  const related = results.filter((result) => {
    if (relevantPageIds.has(result.linkedPageId)) {
      return true;
    }

    const classBoardTokens = normalizeToken(result.classBoard).split(" ");
    return classBoardTokens.some((token) => boardTokens.includes(token));
  });

  return dedupeById([...prioritised, ...related])
    .map((result) => toMathsResultEntity(result, tutorStore))
    .slice(0, limit);
}

export function getRelatedBlogs(pageKey, options = {}) {
  const { limit = 3 } = options;
  const relevantPageIds = new Set(getRelevantBoardPageIds(pageKey));
  const boardTokens = getBoardTokens(pageKey);
  const blogs = listPublishedBlogsSnapshot();

  const directMatches = blogs.filter((blog) => relevantPageIds.has(blog.relatedPageId));
  const topicMatches = blogs.filter((blog) => {
    const blogTokens = getBlogTokens(blog);
    return blogTokens.some((token) => boardTokens.includes(token));
  });

  return dedupeById([...directMatches, ...topicMatches])
    .map((blog) => toMathsBlogEntity(blog))
    .slice(0, limit);
}

export function getHomeRelatedBlogs(options = {}) {
  const { limit = 4 } = options;
  return listPublishedBlogsSnapshot()
    .slice()
    .sort((first, second) => new Date(second.publishDate ?? 0).getTime() - new Date(first.publishDate ?? 0).getTime())
    .map((blog) => toMathsBlogEntity(blog))
    .slice(0, limit);
}

export function getRelatedBlogsForSubjectPage(page, options = {}) {
  const { limit = 3 } = options;

  if (!page) {
    return [];
  }

  const pageTokens = getPageTokens(page);
  const boardKeys = uniqueValues((page.boards ?? []).map((item) => getBoardKeyFromName(item)).filter(Boolean));
  const relevantPageIds = new Set(
    uniqueValues([
      page.id,
      page.sourceId,
      ...boardKeys.flatMap((boardKey) => getRelevantBoardPageIds(boardKey)),
    ]),
  );

  const blogs = listPublishedBlogsSnapshot();
  const directMatches = blogs.filter((blog) => relevantPageIds.has(blog.relatedPageId));
  const boardMatches = blogs.filter((blog) =>
    (blog.relatedBoards ?? []).some((board) => {
      const boardKey = getBoardKeyFromName(board);
      return (
        normalizeToken(board)
          .split(" ")
          .some((token) => pageTokens.includes(token)) ||
        (boardKey && boardKeys.includes(boardKey))
      );
    }),
  );
  const topicMatches = blogs.filter((blog) => getBlogTokens(blog).some((token) => pageTokens.includes(token)));

  return dedupeById([...directMatches, ...boardMatches, ...topicMatches])
    .map((blog) => toMathsBlogEntity(blog))
    .slice(0, limit);
}

export function getRelatedResultsForSubjectPage(page, options = {}) {
  const { limit = 3 } = options;

  if (!page) {
    return [];
  }

  const results = listResultsSnapshot().filter((result) => result.status === "approved");
  const tutorStore = getTutorStore();
  const pageTokens = getPageTokens(page);
  const directMatches = results.filter((result) => identitiesMatch(result.linkedPageId, page));
  const relatedMatches = results.filter((result) => {
    const resultTokens = uniqueValues([
      normalizeToken(result.board),
      normalizeToken(result.classLevel),
      normalizeToken(result.resultSummary),
      normalizeToken(result.classBoard),
    ]).flatMap((item) => item.split(" ").filter(Boolean));

    return resultTokens.some((token) => pageTokens.includes(token));
  });

  return dedupeById([...directMatches, ...relatedMatches])
    .map((result) => toMathsResultEntity(result, tutorStore))
    .slice(0, limit);
}

export function getBoardLinksForTutor(tutor, options = {}) {
  const { limit = 3 } = options;
  const boardPages = Object.values(getBoardPageStore());

  return dedupeById(
    (tutor?.boards ?? [])
      .map((board) => {
        const boardKey = getBoardKeyFromName(board);
        return boardPages.find((page) => (page.pageKey ?? page.key) === boardKey);
      })
      .filter(Boolean),
  )
    .map((page) => ({
      id: page.id,
      label: page.label,
      to: page.route,
    }))
    .slice(0, limit);
}

export function getPublishedBlogBySlug(slug) {
  const blog = listPublishedBlogsSnapshot().find((item) => item.slug === slug);
  return blog ? cloneValue(blog) : null;
}

export function getRelatedTutorsForBlog(blog, options = {}) {
  const { limit = 3 } = options;
  const tutors = listCanonicalTutorsSnapshot();
  const blogTokens = getBlogTokens(blog);
  const directMatches = tutors.filter((tutor) =>
    (blog.relatedTutorIds ?? []).some((relatedTutorId) => identitiesMatch(relatedTutorId, tutor)),
  );
  const boardMatches = tutors.filter((tutor) =>
    (tutor.boards ?? []).some((board) =>
      normalizeToken(board)
        .split(" ")
        .some((token) => blogTokens.includes(token)),
    ),
  );
  const topicMatches = tutors.filter((tutor) =>
    (tutor.topics ?? []).some((topic) => blogTokens.includes(normalizeToken(topic))),
  );

  return dedupeById([...directMatches, ...boardMatches, ...topicMatches])
    .map((tutor) => toMathsTutorEntity(tutor))
    .slice(0, limit);
}

export function getPrimaryBoardLinkForBlog(blog) {
  const boardPages = listBoardPagesSnapshot();
  const directPage = boardPages.find((page) => identitiesMatch(page, blog.relatedPageId));

  if (directPage) {
    return {
      label: directPage.label,
      to: directPage.route,
    };
  }

  const boardKey = getBoardKeyFromName((blog.relatedBoards ?? [])[0] ?? "");
  const boardPage = boardPages.find((page) => (page.pageKey ?? page.key) === boardKey);

  return boardPage
    ? {
        label: boardPage.label,
        to: boardPage.route,
      }
    : null;
}

export function getRelatedBlogsForBlog(blog, options = {}) {
  const { limit = 3 } = options;
  const blogTokens = getBlogTokens(blog);

  return listPublishedBlogsSnapshot()
    .filter((item) => item.id !== blog.id)
    .filter((item) => {
      const itemTokens = getBlogTokens(item);
      return (
        item.relatedPageId === blog.relatedPageId ||
        itemTokens.some((token) => blogTokens.includes(token))
      );
    })
    .map((item) => toMathsBlogEntity(item))
    .slice(0, limit);
}

export function getTutorProfileById(id) {
  const tutor = listCanonicalTutorsSnapshot().find((item) => item.id === id);
  return tutor ? buildTutorProfileContent(tutor) : null;
}

export function getTutorProfileBySlug(slug) {
  const tutor = listCanonicalTutorsSnapshot().find((item) => item.slug === slug);
  return tutor ? buildTutorProfileContent(tutor) : null;
}

function buildTutorProfileContent(tutor) {
  const tutorProfiles = listTutorProfilesSnapshot();
  const reviews = listCanonicalReviewsSnapshot();
  const results = listResultsSnapshot();
  const profile = tutorProfiles.find((item) => item.tutorId === tutor.id);
  const relatedReviews = reviews.filter(
    (review) => review.relatedTutorId === tutor.id || tutor.linkedReviewIds?.includes(review.id),
  );
  const relatedResults = results.filter(
    (result) => result.linkedTutorId === tutor.id || tutor.linkedResultIds?.includes(result.id),
  );

  return cloneValue({
    ...tutor,
    profileTo: getTutorProfilePath(tutor),
    longFormProfile: profile?.longFormProfile ?? tutor.fullBio ?? tutor.summary ?? "",
    teachingStyle: profile?.teachingStyle ?? "",
    associatedBoards: cloneValue(profile?.associatedBoards ?? tutor.boards ?? []),
    associatedTags: cloneValue(profile?.associatedTags ?? tutor.badges ?? []),
    faqItems: getGeneratedTutorFaqs(tutor),
    relatedReviews: relatedReviews.map((review) => toMathsReviewEntity(review)),
    relatedResults: relatedResults.map((result) => toMathsResultEntity(result, getTutorStore())),
    relatedBlogs: getRelatedBlogsForTutorEntity(tutor),
  });
}

export { mathsRouteMap };
