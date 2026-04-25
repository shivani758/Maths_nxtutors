import { apiRequest, isApiUnavailableError } from "./apiClient";
import { getMockStoreSnapshot, subscribeMockStore } from "./mockCmsStore";

const EVENT_NAME = "maths-bodhi-public-site-change";

let apiContentCache = null;

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

function getMergedStore() {
  const seedStore = getMockStoreSnapshot();

  if (!apiContentCache) {
    return seedStore;
  }

  const seedProfileMap = new Map((seedStore.tutorProfiles ?? []).map((profile) => [profile.tutorId, profile]));
  const tutorProfiles = (apiContentCache.tutors ?? []).map((tutor) => {
    const seedProfile = seedProfileMap.get(tutor.id);
    return {
      id: seedProfile?.id ?? `profile-${tutor.id}`,
      tutorId: tutor.id,
      longFormProfile: tutor.fullBio ?? "",
      qualifications: tutor.qualifications ?? [],
      teachingStyle: tutor.teachingStyle ?? "",
      achievements: tutor.achievements ?? [],
      associatedBoards: tutor.boards ?? [],
      associatedTags: tutor.badges ?? [],
      profileMediaIds: seedProfile?.profileMediaIds ?? [],
      linkedFaqIds: seedProfile?.linkedFaqIds ?? [],
      linkedStudentResultIds: tutor.linkedResultIds ?? [],
    };
  });

  return {
    ...seedStore,
    tutors: apiContentCache.tutors ?? seedStore.tutors,
    tutorProfiles: apiContentCache.tutors ? tutorProfiles : seedStore.tutorProfiles,
    reviews: apiContentCache.reviews ?? seedStore.reviews,
    results: apiContentCache.results ?? seedStore.results,
    blogs: apiContentCache.blogs ?? seedStore.blogs,
    pages: apiContentCache.pages ?? seedStore.pages,
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
  try {
    const payload = await apiRequest("/api/public/bootstrap");
    apiContentCache = {
      tutors: payload.tutors ?? [],
      blogs: payload.blogs ?? [],
      reviews: payload.reviews ?? [],
      results: payload.results ?? [],
      pages: payload.pages ?? [],
    };
    emitSiteChange();
    return payload;
  } catch (error) {
    if (!isApiUnavailableError(error)) {
      throw error;
    }

    return null;
  }
}

export function getSiteDataSnapshot() {
  const store = getMergedStore();
  const settings = store.settings;
  const homeTutors = store.tutors
    .filter((tutor) => tutor.status === "active" && tutor.featuredInHome !== false)
    .sort((first, second) => (first.displayOrder ?? 999) - (second.displayOrder ?? 999))
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

  const unsubscribeMockStore = subscribeMockStore(() => listener(getSiteDataSnapshot()));
  const handleEvent = () => listener(getSiteDataSnapshot());
  window.addEventListener(EVENT_NAME, handleEvent);

  return () => {
    unsubscribeMockStore();
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
