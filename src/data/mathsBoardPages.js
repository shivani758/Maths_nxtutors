import { mathsRouteMap } from "./mathsBoardConfig";
import { getMathsBoardPageContent, getMathsBoardPageContentBySegments, getMathsCoreBoardCards, getMathsBoardBreadcrumbs, getFeaturedTutors as getMathsTutorsForPage, getTestimonialsByBoard as getMathsTestimonialsForPage } from "../services/mathsContentService";

export function getMathsPageBySegments(board, stage, track) {
  return getMathsBoardPageContentBySegments(board, stage, track);
}

export function getMathsPageByKey(key) {
  return getMathsBoardPageContent(key);
}

export function getMathsBreadcrumbs(key) {
  return getMathsBoardBreadcrumbs(key);
}

export function getMathsHomeCards() {
  return ["cbse", "igcse", "ib"].map((key) => {
    const page = getMathsBoardPageContent(key);
    return {
      title: page.label,
      eyebrow: page.badge,
      description: page.subtitle,
      to: page.route,
      tags: page.chips.slice(0, 2),
    };
  });
}

export function getCoreMathsBoardCards() {
  return getMathsCoreBoardCards().map((page) => ({
    slug: page.to.split("/").pop(),
    label: page.title,
    note: page.description,
    to: page.to,
    eyebrow: page.eyebrow,
    tags: page.tags,
  }));
}

export function getLegacyMathsRedirectPath(slug) {
  const map = {
    "cbse-maths": mathsRouteMap.cbse,
    "igcse-maths": mathsRouteMap.igcse,
    "jee-maths": mathsRouteMap.jee,
    "jee-main-maths": mathsRouteMap["jee/main"],
    "ib-maths-hl": mathsRouteMap["ib/dp"],
  };

  return map[String(slug ?? "").toLowerCase()] ?? null;
}

export function resolveSubjectLink(subject) {
  const mapped = getLegacyMathsRedirectPath(subject?.slug);
  return mapped ?? `/subject/${subject.slug}`;
}

export { getMathsTutorsForPage, getMathsTestimonialsForPage, mathsRouteMap };
