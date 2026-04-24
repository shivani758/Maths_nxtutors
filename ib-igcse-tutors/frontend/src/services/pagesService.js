import { apiRequest } from "./apiClient";
import { refreshPublicSiteData } from "./publicSiteService";

function uniqueValues(values = []) {
  return [...new Set((values ?? []).filter(Boolean))];
}

function normalizeFaqItems(items = []) {
  return (items ?? []).map((item, index) => ({
    id: item?.id || `faq-${index + 1}`,
    question: String(item?.question ?? "").trim(),
    answer: String(item?.answer ?? "").trim(),
  }));
}

export async function listPages() {
  const pages = await apiRequest("/api/admin/pages");
  return [...pages].sort((first, second) =>
    String(first.label ?? first.title ?? "").localeCompare(String(second.label ?? second.title ?? "")),
  );
}

export async function getPageById(id) {
  if (!id) {
    throw new Error("Page ID is required.");
  }

  return apiRequest(`/api/admin/pages/${id}`);
}

export function createEmptyPage() {
  return {
    id: "",
    pageType: "board",
    pageKey: "",
    slug: "",
    route: "",
    title: "",
    navLabel: "",
    h1: "",
    intro: "",
    status: "draft",
    badge: "",
    parentKey: "",
    breadcrumbLabel: "",
    chips: [],
    stats: [],
    supportPanel: {
      title: "",
      text: "",
      bullets: [],
    },
    overview: {
      badge: "",
      title: "",
      subtitle: "",
      cards: [],
    },
    childSections: [],
    detailSections: [],
    checklist: [],
    schoolHighlights: [],
    localZones: [],
    cta: {
      label: "",
      description: "",
    },
    heroImage: "/images/hero-maths-home.svg",
    heroImageAlt: "",
    featuredTutorIds: [],
    featuredReviewIds: [],
    faqItems: [],
    relatedCities: [],
    boards: [],
    topics: [],
    outcomes: [],
    learningApproach: [],
    classSegments: [],
    boardSupportCards: [],
    searchIntentChips: [],
    heroStats: [],
    seo: {
      title: "",
      description: "",
      canonicalUrl: "",
      keywords: [],
      ogImage: "/images/hero-maths-home.svg",
      indexable: true,
    },
  };
}

export async function savePage(page) {
  const payload = {
    pageType: page.pageType,
    pageKey: page.pageKey,
    slug: page.slug,
    route: page.route,
    label: page.label ?? page.title,
    title: page.title ?? page.label ?? "",
    navLabel: page.navLabel ?? page.label ?? page.title ?? "",
    h1: page.h1,
    intro: page.intro,
    status: page.status,
    badge: page.badge ?? "",
    heroBadge: page.heroBadge ?? "",
    parentKey: page.parentKey ?? "",
    breadcrumbLabel: page.breadcrumbLabel ?? "",
    chips: uniqueValues(page.chips),
    stats: page.stats ?? [],
    supportPanel: {
      title: page.supportPanel?.title ?? "",
      text: page.supportPanel?.text ?? "",
      bullets: uniqueValues(page.supportPanel?.bullets ?? []),
    },
    overview: page.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
    childSections: page.childSections ?? [],
    detailSections: page.detailSections ?? [],
    checklist: uniqueValues(page.checklist),
    schoolHighlights: page.schoolHighlights ?? [],
    localZones: page.localZones ?? [],
    localDemandZones: page.localDemandZones ?? [],
    cta: {
      label: page.cta?.label ?? "",
      description: page.cta?.description ?? "",
    },
    heroImage: page.heroImage ?? "",
    heroImageAlt: page.heroImageAlt ?? "",
    featuredTutorIds: uniqueValues(page.featuredTutorIds),
    featuredReviewIds: uniqueValues(page.featuredReviewIds),
    faqItems: normalizeFaqItems(page.faqItems),
    relatedCities: uniqueValues(page.relatedCities),
    boards: uniqueValues(page.boards),
    topics: uniqueValues(page.topics),
    outcomes: uniqueValues(page.outcomes),
    learningApproach: page.learningApproach ?? [],
    classSegments: page.classSegments ?? [],
    boardSupportCards: page.boardSupportCards ?? [],
    searchIntentChips: uniqueValues(page.searchIntentChips),
    heroStats: page.heroStats ?? [],
    heroSupportTitle: page.heroSupportTitle ?? "",
    heroSupportText: page.heroSupportText ?? "",
    seoSections: page.seoSections ?? [],
    parentChecklist: uniqueValues(page.parentChecklist),
    seo: {
      ...page.seo,
      keywords: uniqueValues(page.seo?.keywords ?? []),
    },
  };

  const saved = page.id
    ? await apiRequest(`/api/admin/pages/${page.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/pages", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return saved;
}

export async function deletePage(id) {
  const deleted = await apiRequest(`/api/admin/pages/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}
