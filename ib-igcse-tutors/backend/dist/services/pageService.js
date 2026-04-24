import { Types } from "mongoose";
import { PageModel } from "../models/Page.js";
import { ReviewModel } from "../models/Review.js";
import { TutorModel } from "../models/Tutor.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
let seedPromise = null;
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
async function seedPagesFromFrontendStore() {
    const frontendSeedModulePath = "../../../frontend/src/data/admin/index.js";
    const { createInitialAdminStore } = (await import(frontendSeedModulePath));
    const seedStore = createInitialAdminStore();
    const faqById = new Map((seedStore.faqs ?? []).map((faq) => [faq.id, faq]));
    const tutorIdMap = new Map((await TutorModel.find({}, { _id: 1, sourceId: 1 }).lean().exec()).map((item) => [
        item.sourceId,
        item._id.toString(),
    ]));
    const reviewIdMap = new Map((await ReviewModel.find({}, { _id: 1, sourceId: 1 }).lean().exec()).map((item) => [
        item.sourceId,
        item._id.toString(),
    ]));
    for (const page of seedStore.pages ?? []) {
        const pageType = page.pageType === "subject" ? "subject" : "board";
        const pageKey = normalizePageKey(pageType, page.pageKey || page.slug || "");
        const slug = pageType === "subject" ? normalizePageKey("subject", page.slug || page.pageKey || "") : pageKey;
        const route = normalizeRoute(page.route || "", pageType, pageKey, slug);
        const sourceId = page.id || buildSourceId(pageType, pageKey);
        const faqItems = (page.faqIds ?? [])
            .map((faqId) => faqById.get(faqId))
            .filter(Boolean)
            .map((faq, index) => ({
            id: faq.id || `faq-${index + 1}`,
            question: faq.question ?? "",
            answer: faq.answer ?? "",
        }));
        await PageModel.findOneAndUpdate({ sourceId }, {
            sourceId,
            pageType,
            pageKey,
            slug,
            route,
            label: page.label || page.title || page.h1,
            title: page.title || page.label || page.h1,
            navLabel: page.navLabel || page.label || page.title || page.h1,
            h1: page.h1 || page.title || page.label,
            intro: page.intro ?? "",
            status: page.status ?? "draft",
            badge: page.badge ?? "",
            heroBadge: page.heroBadge ?? "",
            parentKey: page.parentKey ?? "",
            breadcrumbLabel: page.breadcrumbLabel ?? "",
            chips: page.chips ?? [],
            stats: page.stats ?? [],
            supportPanel: page.supportPanel ?? { title: "", text: "", bullets: [] },
            overview: page.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
            childSections: page.childSections ?? [],
            detailSections: page.detailSections ?? [],
            checklist: page.checklist ?? [],
            schoolHighlights: page.schoolHighlights ?? [],
            localZones: page.localZones ?? [],
            localDemandZones: page.localDemandZones ?? [],
            cta: page.cta ?? { label: "", description: "" },
            heroImage: page.heroImage ?? "",
            heroImageAlt: page.heroImageAlt ?? "",
            featuredTutorIds: (page.featuredTutorIds ?? []).map((id) => tutorIdMap.get(id) ?? id),
            featuredReviewIds: (page.featuredReviewIds ?? []).map((id) => reviewIdMap.get(id) ?? id),
            faqItems,
            relatedCities: page.relatedCities ?? [],
            boards: page.boards ?? [],
            topics: page.topics ?? [],
            outcomes: page.outcomes ?? [],
            learningApproach: page.learningApproach ?? [],
            classSegments: page.classSegments ?? [],
            boardSupportCards: page.boardSupportCards ?? [],
            searchIntentChips: page.searchIntentChips ?? [],
            heroStats: page.heroStats ?? [],
            heroSupportTitle: page.heroSupportTitle ?? "",
            heroSupportText: page.heroSupportText ?? "",
            seoSections: page.seoSections ?? [],
            parentChecklist: page.parentChecklist ?? [],
            seo: page.seo ?? {},
        }, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    }
}
async function ensureSeedPages() {
    const count = await PageModel.countDocuments().exec();
    if (count > 0) {
        return;
    }
    if (!seedPromise) {
        seedPromise = seedPagesFromFrontendStore().finally(() => {
            seedPromise = null;
        });
    }
    await seedPromise;
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