import { defaultSiteData } from "../defaultSiteData";
import { mathsTestimonials } from "../mathsTestimonials";
import {
  cloneValue,
  coerceNumber,
  createId,
  createTimestamp,
  uniqueValues,
} from "./seedUtils";
import { getCanonicalTutorId } from "./tutorsSeed";

function fromHomeReview(review, index) {
  return {
    id: review.id ?? createId("review", `${review.parent ?? review.student ?? index}`),
    legacyIds: uniqueValues([review.id]),
    reviewerName: review.parent ?? review.student ?? `Maths Bodhi Family ${index + 1}`,
    roleType: review.role ?? "Parent",
    reviewText: review.quote,
    rating: coerceNumber(review.rating, 4.8),
    relatedTutorId: getCanonicalTutorId(review.relatedTutorId),
    relatedBoard: review.board ?? "Maths",
    relatedPageId: null,
    city: "gurugram",
    locality: review.sector ?? "Gurugram",
    school: review.school ?? "",
    status: "approved",
    featured: index < 8,
    featuredOn: uniqueValues(review.featuredOn ?? ["home"]),
    order: index + 1,
    anonymized: false,
    parent: review.parent ?? review.student ?? `Maths Bodhi Family ${index + 1}`,
    sector: review.sector ?? "Gurugram",
    board: review.board ?? "Maths",
    quote: review.quote,
    createdAt: createTimestamp(index + 18),
    updatedAt: createTimestamp(index + 2),
  };
}

function fromBoardReview(review, index) {
  return {
    id: review.id ?? createId("review", `${review.parent ?? index}`),
    legacyIds: uniqueValues([review.id]),
    reviewerName: review.parent ?? `Parent ${index + 1}`,
    roleType: "Parent",
    reviewText: review.quote,
    rating: coerceNumber(review.rating, 4.8),
    relatedTutorId: null,
    relatedBoard: review.board ?? "Maths",
    relatedPageId: null,
    city: "gurugram",
    locality: review.sector ?? "Gurugram",
    school: review.school ?? "",
    status: "approved",
    featured: review.featuredOn?.includes("hub") ?? false,
    featuredOn: uniqueValues(review.featuredOn),
    order: index + 1,
    anonymized: false,
    parent: review.parent ?? `Parent ${index + 1}`,
    sector: review.sector ?? "Gurugram",
    board: review.board ?? "Maths",
    quote: review.quote,
    createdAt: createTimestamp(index + 22),
    updatedAt: createTimestamp(index + 1),
  };
}

const reviewMap = new Map();

defaultSiteData.reviews.forEach((review, index) => {
  reviewMap.set(review.id, fromHomeReview(review, index));
});

mathsTestimonials.forEach((review, index) => {
  if (!reviewMap.has(review.id)) {
    reviewMap.set(review.id, fromBoardReview(review, index));
  }
});

export const reviewSeeds = Array.from(reviewMap.values()).sort(
  (first, second) => (first.order ?? 0) - (second.order ?? 0),
);

const reviewAliasMap = reviewSeeds.reduce((map, review) => {
  map.set(review.id, review.id);
  (review.legacyIds ?? []).forEach((alias) => map.set(alias, review.id));
  return map;
}, new Map());

export function getCanonicalReviewId(alias) {
  return reviewAliasMap.get(alias) ?? alias ?? null;
}

export const resultSeeds = [
  {
    id: "result-ib-aa-hl-rise",
    studentLabel: "IB AA HL student",
    classBoard: "IB Diploma | AA HL",
    beforeResult: "Predicted 4/7",
    afterResult: "Moved to 6/7 confidence in mocks",
    story:
      "Weekly topic diagnostics and calmer review cycles helped the student convert scattered understanding into more dependable paper execution.",
    linkedTutorId: getCanonicalTutorId("tutor-1"),
    linkedPageId: "page-board-ib-dp-aa-hl",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-54",
    featured: true,
    status: "approved",
    createdAt: createTimestamp(14),
    updatedAt: createTimestamp(2),
  },
  {
    id: "result-cbse-board-jump",
    studentLabel: "Class 10 CBSE learner",
    classBoard: "CBSE | Class 10",
    beforeResult: "Pre-board maths at 61%",
    afterResult: "Board-style tests stabilised above 84%",
    story:
      "The tutoring plan focused on chapter sequencing, written discipline, and regular formula revision instead of rushing from worksheet to worksheet.",
    linkedTutorId: getCanonicalTutorId("tutor-cbse-priyank"),
    linkedPageId: "page-board-cbse",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-50",
    featured: true,
    status: "approved",
    createdAt: createTimestamp(11),
    updatedAt: createTimestamp(3),
  },
  {
    id: "result-igcse-method-clarity",
    studentLabel: "IGCSE Extended student",
    classBoard: "IGCSE | Extended Maths",
    beforeResult: "Inconsistent method marks",
    afterResult: "Cleaner working and more stable paper confidence",
    story:
      "The biggest shift came from line-by-line correction, error review, and a stronger method-first approach before timed paper work.",
    linkedTutorId: getCanonicalTutorId("tutor-igcse-neha"),
    linkedPageId: "page-board-igcse",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-56",
    featured: true,
    status: "approved",
    createdAt: createTimestamp(9),
    updatedAt: createTimestamp(1),
  },
  {
    id: "result-icse-written-method",
    studentLabel: "Class 9 ICSE learner",
    classBoard: "ICSE | Class 9",
    beforeResult: "Chapter tests felt rushed and untidy",
    afterResult: "Written steps became clearer and school scores steadier",
    story:
      "The biggest change came from slowing the student down just enough to improve presentation, corrections, and chapter review between school tests.",
    linkedTutorId: getCanonicalTutorId("tutor-icse-suhani"),
    linkedPageId: "page-board-icse-isc",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-43",
    featured: true,
    status: "approved",
    createdAt: createTimestamp(8),
    updatedAt: createTimestamp(2),
  },
  {
    id: "result-jee-main-pace",
    studentLabel: "JEE Main aspirant",
    classBoard: "JEE Main",
    beforeResult: "Slow chapter completion and weak timing control",
    afterResult: "More consistent test routines and question selection",
    story:
      "A steadier mock-analysis rhythm reduced random practice and improved how the student approached question choice under time pressure.",
    linkedTutorId: getCanonicalTutorId("tutor-cbse-rahul"),
    linkedPageId: "page-board-jee-main",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-50",
    featured: false,
    status: "approved",
    createdAt: createTimestamp(7),
    updatedAt: createTimestamp(1),
  },
  {
    id: "result-foundation-confidence",
    studentLabel: "Class 7 foundation learner",
    classBoard: "CBSE | Class 7",
    beforeResult: "Low confidence in fractions and ratio",
    afterResult: "More independent worksheet completion",
    story:
      "The early wins came from paced revision blocks, smaller concept steps, and a tutoring style that kept maths from feeling heavy.",
    linkedTutorId: getCanonicalTutorId("tutor-cbse-devika"),
    linkedPageId: "page-board-cbse",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "sector-46",
    featured: false,
    status: "approved",
    createdAt: createTimestamp(5),
    updatedAt: createTimestamp(1),
  },
].map((result, index) => ({
  ...result,
  order: index + 1,
}));
