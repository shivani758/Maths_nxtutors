import { apiRequest } from "./apiClient";

const EVENT_NAME = "maths-bodhi-public-site-change";

const DEFAULT_SETTINGS = {
  siteName: "Maths Bodhi",
  supportEmail: "support@mathsbodhi.in",
  whatsappNumber: "919896825986",
  phoneDisplay: "+91 9896825986",
  footerLinks: [],
  contact: {
    phoneDisplay: "+91 9896825986",
    whatsappNumber: "919896825986",
    email: "support@mathsbodhi.in",
    supportHours: "Mon to Sat, 9 AM to 8 PM",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
  },
  socialLinks: {},
  analyticsIds: {},
  branding: {
    logoMark: "/favicon.svg",
    defaultHeroImage: "/images/hero-maths-home.svg",
  },
  seo: {
    title: "Maths Bodhi",
    description: "Maths Bodhi tutoring support.",
    canonicalUrl: "",
    keywords: [],
    ogImage: "/images/hero-maths-home.svg",
    indexable: true,
  },
  homepage: {
    eyebrow: "Maths Home Tuition",
    heroTitle: "Find the right maths tutor",
    heroSubtitle: "Compare real tutor profiles, boards, classes, and lesson modes from the live Maths Bodhi backend.",
    keywordChips: [],
    stats: [],
    serviceBullets: [],
    intentTitle: "",
    intentParagraphs: [],
    goalTitle: "",
    goalParagraphs: [],
  },
  premiumSchools: [],
};

const EMPTY_PUBLIC_STORE = {
  settings: DEFAULT_SETTINGS,
  tutors: [],
  tutorProfiles: [],
  reviews: [],
  results: [],
  blogs: [],
  pages: [],
  faqs: [],
  cities: [],
  localities: [],
};

let apiContentCache = cloneValue(EMPTY_PUBLIC_STORE);

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function hasBrowser() {
  return typeof window !== "undefined";
}

function emitSiteChange() {
  if (!hasBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(EVENT_NAME));
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function getMergedStore() {
  const tutorProfiles = (apiContentCache.tutors ?? []).map((tutor) => {
    return {
      id: tutor.profile?.id ?? `profile-${tutor.id}`,
      tutorId: tutor.id,
      longFormProfile: tutor.fullBio ?? "",
      qualifications: tutor.qualifications ?? [],
      teachingStyle: tutor.teachingStyle ?? "",
      achievements: tutor.achievements ?? [],
      associatedBoards: tutor.boards ?? [],
      associatedTags: tutor.badges ?? [],
      profileMediaIds: tutor.profile?.profileMediaIds ?? [],
      linkedFaqIds: tutor.profile?.linkedFaqIds ?? [],
      linkedStudentResultIds: tutor.linkedResultIds ?? [],
    };
  });

  return {
    ...EMPTY_PUBLIC_STORE,
    ...apiContentCache,
    settings: DEFAULT_SETTINGS,
    tutorProfiles,
  };
}

function getFaqItemsForLinkedId(store, linkedId) {
  return store.faqs
    .filter((item) => item.linkedId === linkedId && item.status !== "archived")
    .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))
    .map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    }));
}

function getActivePageEntries(store, pageType) {
  return store.pages.filter(
    (page) => page.pageType === pageType && page.status === "published",
  );
}

function toPublicTutor(tutor) {
  return {
    id: tutor.id,
    sourceId: tutor.sourceId ?? "",
    slug: tutor.slug,
    name: tutor.name,
    title: tutor.title,
    rating: String(tutor.rating),
    experience: tutor.experience ?? tutor.experienceLabel ?? "",
    board: tutor.boards?.[0] ?? "Maths",
    classLevel: tutor.classesSupported?.[0] ?? "Flexible support",
    location: tutor.location ?? "Gurugram",
    sectors: tutor.localities ?? [],
    topics: tutor.topics ?? [],
    price: tutor.startingFee,
    mode: tutor.serviceModes ?? [],
    studentsHelped: tutor.studentsHelped ?? 0,
    schoolFocus: tutor.schoolFocus ?? [],
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    shortBio: tutor.shortBio ?? tutor.summary,
    fullBio: tutor.fullBio ?? tutor.summary ?? "",
    summary: tutor.summary ?? tutor.shortBio,
    boards: cloneValue(tutor.boards ?? []),
    classesSupported: cloneValue(tutor.classesSupported ?? []),
    localities: cloneValue(tutor.localities ?? []),
    cities: cloneValue(tutor.cities ?? []),
    serviceModes: cloneValue(tutor.serviceModes ?? tutor.mode ?? []),
    startingFee: tutor.startingFee ?? tutor.price,
    qualifications: tutor.qualifications ?? [],
    availability: tutor.availability ?? "",
    achievements: tutor.achievements ?? [],
    badges: cloneValue(tutor.badges ?? []),
    linkedReviewIds: cloneValue(tutor.linkedReviewIds ?? []),
    linkedResultIds: cloneValue(tutor.linkedResultIds ?? []),
    seo: cloneValue(tutor.seo ?? null),
    featuredOn: cloneValue(tutor.featuredOn ?? []),
  };
}

function toPublicReview(review) {
  return {
    id: review.id,
    sourceId: review.sourceId ?? "",
    parent: review.parent ?? review.reviewerName,
    sector: review.sector ?? review.locality,
    school: review.school ?? "Maths Bodhi family",
    board: review.board ?? review.relatedBoard,
    rating: String(review.rating),
    quote: review.quote ?? review.reviewText,
    relatedTutorId: review.relatedTutorId ?? review.linkedTutorId ?? null,
    relatedBoard: review.relatedBoard ?? review.board ?? "",
    locality: review.locality ?? review.sector ?? "",
    featuredOn: cloneValue(review.featuredOn ?? []),
    status: review.status ?? review.moderationStatus,
  };
}

function toPublicBlog(blog) {
  return {
    ...cloneValue(blog),
    sourceId: blog.sourceId ?? "",
    tags: cloneValue(blog.tags ?? []),
    relatedTutorIds: cloneValue(blog.relatedTutorIds ?? []),
  };
}

function toPublicSubjectPage(store, page) {
  return {
    ...page,
    label: page.label ?? page.title,
    faqItems: cloneValue(page.faqItems?.length ? page.faqItems : getFaqItemsForLinkedId(store, page.id)),
    heroBadge: page.heroBadge ?? page.badge,
    title: page.h1,
    subtitle: page.intro,
    seoTitle: page.seo?.title ?? page.h1,
    metaDescription: page.seo?.description ?? page.intro,
    keywords: page.seo?.keywords ?? [],
    heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
    heroImageAlt: page.heroImageAlt ?? `${page.label ?? page.title} tutoring support`,
  };
}

function toPublicBoardPage(store, page) {
  return {
    ...page,
    key: page.pageKey ?? page.key,
    label: page.label ?? page.title,
    title: page.h1,
    subtitle: page.intro,
    metaTitle: page.seo?.title ?? page.h1,
    metaDescription: page.seo?.description ?? page.intro,
    keywords: page.seo?.keywords ?? [],
    route: page.route,
    faqItems: cloneValue(page.faqItems?.length ? page.faqItems : getFaqItemsForLinkedId(store, page.id)),
  };
}

function toPublicCityPage(city) {
  return cloneValue(city);
}

function toPublicLocalityPage(locality) {
  return cloneValue(locality);
}

export async function refreshPublicSiteData() {
  const [bootstrapResult, tutorsResult, blogsResult, reviewsResult] = await Promise.all([
    fetchPublicPayload("/api/public/bootstrap"),
    fetchPublicArray("/api/tutors"),
    fetchPublicArray("/api/blogs"),
    fetchPublicArray("/api/reviews"),
  ]);
  const bootstrap = bootstrapResult.ok ? bootstrapResult.data : {};

  apiContentCache = {
    ...EMPTY_PUBLIC_STORE,
    tutors: tutorsResult.ok ? tutorsResult.data : toArray(bootstrap.tutors),
    blogs: blogsResult.ok ? blogsResult.data : toArray(bootstrap.blogs),
    reviews: reviewsResult.ok ? reviewsResult.data : toArray(bootstrap.reviews),
    results: toArray(bootstrap.results),
    pages: toArray(bootstrap.pages),
  };
  emitSiteChange();
  return cloneValue(apiContentCache);
}

export function getSiteDataSnapshot() {
  const store = getMergedStore();
  const settings = store.settings;
  const homeTutors = store.tutors
    .filter((tutor) => !tutor.status || tutor.status === "active")
    .sort((first, second) => {
      const firstFeatured = Number(Boolean(first.featuredInHome || first.featured));
      const secondFeatured = Number(Boolean(second.featuredInHome || second.featured));

      if (firstFeatured !== secondFeatured) {
        return secondFeatured - firstFeatured;
      }

      return (first.displayOrder ?? 999) - (second.displayOrder ?? 999);
    })
    .map(toPublicTutor);
  const homeReviews = store.reviews
    .filter((review) => (review.status ?? review.moderationStatus) === "approved")
    .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))
    .map(toPublicReview);

  return {
    brandName: settings.siteName,
    contact: cloneValue(settings.contact),
    seo: {
      title: settings.seo.title,
      description: settings.seo.description,
      keywords: cloneValue(settings.seo.keywords ?? []),
    },
    home: cloneValue(settings.homepage),
    premiumSchools: cloneValue(settings.premiumSchools ?? []),
    tutors: homeTutors,
    reviews: homeReviews,
    subjectPages: getActivePageEntries(store, "subject").map((page) => toPublicSubjectPage(store, page)),
    cityPages: store.cities.filter((city) => city.status !== "archived").map(toPublicCityPage),
    sectorPages: store.localities
      .filter((locality) => locality.status !== "archived")
      .map(toPublicLocalityPage),
  };
}

export function subscribeSiteData(listener) {
  if (!hasBrowser()) {
    return () => {};
  }

  const handleEvent = () => listener(getSiteDataSnapshot());
  window.addEventListener(EVENT_NAME, handleEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleEvent);
  };
}

export function listBoardPagesSnapshot() {
  const store = getMergedStore();
  return getActivePageEntries(store, "board").map((page) => toPublicBoardPage(store, page));
}

export function listSubjectPagesSnapshot() {
  const store = getMergedStore();
  return getActivePageEntries(store, "subject").map((page) => toPublicSubjectPage(store, page));
}

export function listCanonicalTutorsSnapshot() {
  return cloneValue(getMergedStore().tutors);
}

export function listCanonicalReviewsSnapshot() {
  return cloneValue(getMergedStore().reviews);
}

export function listTutorProfilesSnapshot() {
  return cloneValue(getMergedStore().tutorProfiles);
}

export function listResultsSnapshot() {
  return cloneValue(getMergedStore().results);
}

export function listPublishedBlogsSnapshot() {
  return getMergedStore().blogs
    .filter((blog) => blog.status === "published")
    .map((blog) => toPublicBlog(blog));
}

export function listFaqsSnapshot() {
  return cloneValue(getMergedStore().faqs);
}

async function fetchPublicArray(path) {
  try {
    const data = await apiRequest(path);
    return { ok: true, data: toArray(data) };
  } catch (error) {
    console.error(`${path} API failed:`, error);
    return { ok: false, data: [] };
  }
}

async function fetchPublicPayload(path) {
  try {
    const data = await apiRequest(path);
    return {
      ok: true,
      data: data && typeof data === "object" ? data : {},
    };
  } catch (error) {
    console.error(`${path} API failed:`, error);
    return { ok: false, data: {} };
  }
}
