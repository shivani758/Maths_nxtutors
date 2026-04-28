import { Types } from "mongoose";
import { PageModel } from "../models/Page.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
}
function normalizeSegment(value) {
    return slugify(value).trim();
}
function normalizePageKey(pageType, value) {
    const raw = String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "");
    if (!raw) {
        return "";
    }
    const segments = raw
        .split("/")
        .map((segment) => normalizeSegment(segment))
        .filter(Boolean);
    if (!segments.length) {
        return "";
    }
    return pageType === "subject" ? segments.join("-") : segments.join("/");
}
function buildSourceId(pageType, pageKey) {
    return `page-${pageType}-${pageKey.replaceAll("/", "-")}`;
}
function normalizeRoute(route, pageType, pageKey, slug) {
    const raw = String(route ?? "").trim();
    if (!raw) {
        return pageType === "subject" ? `/subject/${slug}` : `/subjects/maths/${pageKey}`;
    }
    return raw.startsWith("/") ? raw : `/${raw}`;
}
function sanitizeFaqItems(items = []) {
    return (items ?? [])
        .map((item, index) => ({
        id: item?.id || `faq-${index + 1}`,
        question: String(item?.question ?? "").trim(),
        answer: String(item?.answer ?? "").trim(),
    }))
        .filter((item) => item.question || item.answer);
}
function serializePage(doc) {
    return {
        id: doc.sourceId || doc._id.toString(),
        sourceId: doc.sourceId ?? "",
        pageType: doc.pageType,
        pageKey: doc.pageKey ?? "",
        slug: doc.slug ?? "",
        route: doc.route ?? "",
        label: doc.label ?? "",
        title: doc.title ?? "",
        navLabel: doc.navLabel ?? "",
        h1: doc.h1 ?? "",
        intro: doc.intro ?? "",
        status: doc.status,
        badge: doc.badge ?? "",
        heroBadge: doc.heroBadge ?? "",
        parentKey: doc.parentKey ?? "",
        breadcrumbLabel: doc.breadcrumbLabel ?? "",
        chips: doc.chips ?? [],
        stats: doc.stats ?? [],
        supportPanel: doc.supportPanel ?? { title: "", text: "", bullets: [] },
        overview: doc.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
        childSections: doc.childSections ?? [],
        detailSections: doc.detailSections ?? [],
        checklist: doc.checklist ?? [],
        schoolHighlights: doc.schoolHighlights ?? [],
        localZones: doc.localZones ?? [],
        localDemandZones: doc.localDemandZones ?? [],
        cta: doc.cta ?? { label: "", description: "" },
        heroImage: doc.heroImage ?? "",
        heroImageAlt: doc.heroImageAlt ?? "",
        featuredTutorIds: doc.featuredTutorIds ?? [],
        featuredReviewIds: doc.featuredReviewIds ?? [],
        faqItems: doc.faqItems ?? [],
        relatedCities: doc.relatedCities ?? [],
        boards: doc.boards ?? [],
        topics: doc.topics ?? [],
        outcomes: doc.outcomes ?? [],
        learningApproach: doc.learningApproach ?? [],
        classSegments: doc.classSegments ?? [],
        boardSupportCards: doc.boardSupportCards ?? [],
        searchIntentChips: doc.searchIntentChips ?? [],
        heroStats: doc.heroStats ?? [],
        heroSupportTitle: doc.heroSupportTitle ?? "",
        heroSupportText: doc.heroSupportText ?? "",
        seoSections: doc.seoSections ?? [],
        parentChecklist: doc.parentChecklist ?? [],
        seo: doc.seo ?? {},
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
async function findPageByIdentifier(id) {
    const filters = [{ sourceId: id }];
    if (Types.ObjectId.isValid(id)) {
        filters.push({ _id: new Types.ObjectId(id) });
    }
    return PageModel.findOne({ $or: filters }).exec();
}
async function ensureUniqueRoute(route, sourceId) {
    const existing = await PageModel.findOne({
        route,
        sourceId: { $ne: sourceId },
    }).exec();
    if (existing) {
        throw new ApiError(409, "A page with this route already exists.", {
            code: "DUPLICATE_PAGE_ROUTE",
            details: createFieldErrorDetails("route", "A page with this route already exists."),
        });
    }
}
async function ensureSeedPages() {
    return;
}
function buildPersistedPagePayload(payload, existing) {
    const pageType = payload.pageType ?? existing?.pageType ?? "board";
    const nextPageKey = normalizePageKey(pageType, payload.pageKey || payload.slug || existing?.pageKey || existing?.slug || "");
    const nextSlug = pageType === "subject"
        ? normalizePageKey("subject", payload.slug || payload.pageKey || existing?.slug || existing?.pageKey || "")
        : nextPageKey;
    const sourceId = existing?.sourceId || buildSourceId(pageType, pageType === "subject" ? nextSlug : nextPageKey);
    const route = normalizeRoute(payload.route ?? existing?.route ?? "", pageType, nextPageKey, nextSlug);
    const label = payload.label ?? existing?.label ?? payload.title ?? existing?.title ?? payload.h1 ?? existing?.h1 ?? "";
    const title = payload.title ?? existing?.title ?? label;
    const navLabel = payload.navLabel ?? existing?.navLabel ?? label;
    const h1 = payload.h1 ?? existing?.h1 ?? label;
    const intro = payload.intro ?? existing?.intro ?? "";
    return {
        sourceId,
        pageType,
        pageKey: nextPageKey,
        slug: nextSlug,
        route,
        label,
        title,
        navLabel,
        h1,
        intro,
        status: payload.status ?? existing?.status ?? "draft",
        badge: payload.badge ?? existing?.badge ?? "",
        heroBadge: payload.heroBadge ?? existing?.heroBadge ?? "",
        parentKey: payload.parentKey ?? existing?.parentKey ?? "",
        breadcrumbLabel: payload.breadcrumbLabel ?? existing?.breadcrumbLabel ?? label,
        chips: payload.chips ? unique(payload.chips) : existing?.chips ?? [],
        stats: payload.stats ?? existing?.stats ?? [],
        supportPanel: payload.supportPanel ?? existing?.supportPanel ?? { title: "", text: "", bullets: [] },
        overview: payload.overview ?? existing?.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
        childSections: payload.childSections ?? existing?.childSections ?? [],
        detailSections: payload.detailSections ?? existing?.detailSections ?? [],
        checklist: payload.checklist ? unique(payload.checklist) : existing?.checklist ?? [],
        schoolHighlights: payload.schoolHighlights ?? existing?.schoolHighlights ?? [],
        localZones: payload.localZones ?? existing?.localZones ?? [],
        localDemandZones: payload.localDemandZones ?? existing?.localDemandZones ?? [],
        cta: payload.cta ?? existing?.cta ?? { label: "", description: "" },
        heroImage: payload.heroImage ?? existing?.heroImage ?? "",
        heroImageAlt: payload.heroImageAlt ?? existing?.heroImageAlt ?? "",
        featuredTutorIds: payload.featuredTutorIds
            ? unique(payload.featuredTutorIds)
            : existing?.featuredTutorIds ?? [],
        featuredReviewIds: payload.featuredReviewIds
            ? unique(payload.featuredReviewIds)
            : existing?.featuredReviewIds ?? [],
        faqItems: payload.faqItems !== undefined ? sanitizeFaqItems(payload.faqItems) : existing?.faqItems ?? [],
        relatedCities: payload.relatedCities ? unique(payload.relatedCities) : existing?.relatedCities ?? [],
        boards: payload.boards ? unique(payload.boards) : existing?.boards ?? [],
        topics: payload.topics ? unique(payload.topics) : existing?.topics ?? [],
        outcomes: payload.outcomes ? unique(payload.outcomes) : existing?.outcomes ?? [],
        learningApproach: payload.learningApproach ?? existing?.learningApproach ?? [],
        classSegments: payload.classSegments ?? existing?.classSegments ?? [],
        boardSupportCards: payload.boardSupportCards ?? existing?.boardSupportCards ?? [],
        searchIntentChips: payload.searchIntentChips
            ? unique(payload.searchIntentChips)
            : existing?.searchIntentChips ?? [],
        heroStats: payload.heroStats ?? existing?.heroStats ?? [],
        heroSupportTitle: payload.heroSupportTitle ?? existing?.heroSupportTitle ?? "",
        heroSupportText: payload.heroSupportText ?? existing?.heroSupportText ?? "",
        seoSections: payload.seoSections ?? existing?.seoSections ?? [],
        parentChecklist: payload.parentChecklist
            ? unique(payload.parentChecklist)
            : existing?.parentChecklist ?? [],
        seo: payload.seo ?? existing?.seo ?? {},
    };
}
export async function listPages() {
    await ensureSeedPages();
    const pages = await PageModel.find().sort({ pageType: 1, updatedAt: -1, label: 1 }).exec();
    return pages.map((doc) => serializePage(doc));
}
export async function getPageById(id) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    return serializePage(page);
}
export async function getPublishedPages() {
    await ensureSeedPages();
    const pages = await PageModel.find({ status: "published" }).sort({ pageType: 1, route: 1 }).exec();
    return pages.map((doc) => serializePage(doc));
}
export async function createPage(payload) {
    await ensureSeedPages();
    const nextPayload = buildPersistedPagePayload(payload);
    await ensureUniqueRoute(nextPayload.route, nextPayload.sourceId);
    const page = await PageModel.create(nextPayload);
    return serializePage(page);
}
export async function updatePage(id, payload) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    const nextPayload = buildPersistedPagePayload(payload, page);
    await ensureUniqueRoute(nextPayload.route, nextPayload.sourceId);
    Object.assign(page, nextPayload);
    await page.save();
    return serializePage(page);
}
export async function deletePage(id) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    await page.deleteOne();
    return serializePage(page);
}
//# sourceMappingURL=pageService.js.map