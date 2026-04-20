import { mathsBoardConfig, mathsRouteMap } from "../data/mathsBoardConfig";
import {
  getMathsTutorById as getTutorByIdFromData,
  getMathsTutorBySlug as getTutorBySlugFromData,
  getMathsTutorsForPage as getTutorsForPage,
  mathsTutors,
} from "../data/mathsTutors";
import {
  getMathsTestimonialById as getTestimonialByIdFromData,
  getMathsTestimonialsForPage as getTestimonialsForPage,
  mathsTestimonials,
} from "../data/mathsTestimonials";

const CORE_BOARD_KEYS = ["cbse", "igcse", "ib", "jee"];

const CORE_BOARD_CARD_COPY = {
  cbse: {
    eyebrow: "Board",
    description: "For school maths support from middle grades to board prep.",
    tags: ["Classes 6-12", "Board prep"],
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

function getPageKeyFromSegments(board, stage, track) {
  const segments = [board, stage, track].filter(Boolean);
  return segments.length ? segments.join("/") : "hub";
}

/**
 * @typedef {Object} MathsTutorEntity
 * @property {string} id
 * @property {string} tutorName
 * @property {string} board
 * @property {string} boardSpecialization
 * @property {string} classesSupported
 * @property {string[]} examSupport
 * @property {string} yearsExperience
 * @property {string} startingFee
 * @property {string} shortBio
 * @property {string[]} boardTags
 * @property {string[]} topicTags
 * @property {string[]} localityTags
 * @property {string[]} serviceModeTags
 * @property {string[]} schoolFitTags
 * @property {string[]} featuredOn
 */

/**
 * @typedef {Object} MathsBoardPageEntity
 * @property {string} key
 * @property {string} route
 * @property {string} label
 * @property {string} title
 * @property {string} subtitle
 * @property {string[]} chips
 * @property {string[]} featuredTutorIds
 * @property {string[]} featuredReviewIds
 * @property {Array<{question: string, answer: string}>} faqItems
 */

/**
 * @typedef {Object} MathsTestimonialEntity
 * @property {string} id
 * @property {string} parent
 * @property {string} board
 * @property {string} rating
 * @property {string} quote
 * @property {string[]} featuredOn
 */

export function getMathsBoardPageContent(key) {
  return cloneValue(mathsBoardConfig[key] ?? null);
}

export function getMathsBoardPageContentBySegments(board, stage, track) {
  return getMathsBoardPageContent(getPageKeyFromSegments(board, stage, track));
}

export function listMathsBoardPages() {
  return Object.values(mathsBoardConfig).map((page) => cloneValue(page));
}

export function getMathsBoardBreadcrumbs(key) {
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

export function getMathsCoreBoardCards() {
  return CORE_BOARD_KEYS.map((key) => {
    const page = mathsBoardConfig[key];
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
  return mathsTutors.map((tutor) => cloneValue(tutor));
}

export function getTutorById(id) {
  return cloneValue(getTutorByIdFromData(id));
}

export function getTutorBySlug(slug) {
  return cloneValue(getTutorBySlugFromData(slug));
}

export function getFeaturedTutors(pageKey, options = {}) {
  const { featuredTutorIds = [], limit = 15 } = options;
  return cloneValue(getTutorsForPage(pageKey, featuredTutorIds).slice(0, limit));
}

export function getBoardPageContent(boardSlug) {
  return getMathsBoardPageContent(boardSlug);
}

export function getBoardFaqItems(boardSlug) {
  return cloneValue(mathsBoardConfig[boardSlug]?.faqItems ?? []);
}

export function getSchoolContextCards(boardSlug) {
  return cloneValue(mathsBoardConfig[boardSlug]?.schoolHighlights ?? []);
}

export function getLocalityCards(boardSlug) {
  return cloneValue(mathsBoardConfig[boardSlug]?.localZones ?? []);
}

export function listMathsTestimonials() {
  return mathsTestimonials.map((testimonial) => cloneValue(testimonial));
}

export function getTestimonialById(id) {
  return cloneValue(getTestimonialByIdFromData(id));
}

export function getTestimonialsByBoard(pageKey, options = {}) {
  const { featuredReviewIds = [], limit = 6 } = options;
  return cloneValue(getTestimonialsForPage(pageKey, featuredReviewIds, limit));
}

export function getStudentResultsByBoard(pageKey, options = {}) {
  return getTestimonialsByBoard(pageKey, options);
}

export { mathsRouteMap };
