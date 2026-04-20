import { mathsBoardConfig, mathsRouteMap } from "./mathsBoardConfig";
import { getMathsTestimonialsForPage as getTestimonialsForPage } from "./mathsTestimonials";
import { getMathsTutorsForPage as getTutorsForPage } from "./mathsTutors";

function getKeyFromSegments(board, stage, track) {
  const segments = [board, stage, track].filter(Boolean);
  return segments.length ? segments.join("/") : "hub";
}

export function getMathsPageBySegments(board, stage, track) {
  return mathsBoardConfig[getKeyFromSegments(board, stage, track)] ?? null;
}

export function getMathsPageByKey(key) {
  return mathsBoardConfig[key] ?? null;
}

export function getMathsBreadcrumbs(key) {
  const items = [];
  let current = mathsBoardConfig[key];

  while (current) {
    items.unshift({
      label: current.breadcrumbLabel,
      to: current.route,
    });
    current = current.parentKey ? mathsBoardConfig[current.parentKey] : null;
  }

  return [{ label: "Home", to: "/" }, ...items];
}

export function getMathsTutorsForPage(key, featuredTutorIds = []) {
  return getTutorsForPage(key, featuredTutorIds);
}

export function getMathsTestimonialsForPage(key, featuredReviewIds = [], limit = 6) {
  return getTestimonialsForPage(key, featuredReviewIds, limit);
}

export function getMathsHomeCards() {
  return ["cbse", "igcse", "ib"].map((key) => {
    const page = mathsBoardConfig[key];
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
  return ["cbse", "igcse", "ib"].map((key) => {
    const page = mathsBoardConfig[key];
    return {
      slug: key,
      label: page.label,
      note: page.subtitle,
      to: page.route,
      eyebrow: "Maths board",
      tags: page.chips.slice(0, 2),
    };
  });
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

export { mathsBoardConfig, mathsRouteMap };
