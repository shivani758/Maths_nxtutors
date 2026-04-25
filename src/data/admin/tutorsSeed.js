import { defaultSiteData } from "../defaultSiteData";
import { mathsTutors } from "../mathsTutors";
import {
  cloneValue,
  coerceNumber,
  createId,
  createTimestamp,
  ensureArray,
  lineParagraphs,
  toSlug,
  uniqueValues,
} from "./seedUtils";

function createTutorFromPublicTutor(tutor, index) {
  const slug = toSlug(tutor.name);

  return {
    id: tutor.id ?? createId("tutor", slug),
    legacyIds: uniqueValues([tutor.id]),
    name: tutor.name,
    slug,
    title: tutor.title,
    shortBio: tutor.summary,
    fullBio: lineParagraphs([tutor.summary, ...(tutor.achievements ?? [])]),
    experience: tutor.experience,
    rating: coerceNumber(tutor.rating, 4.8),
    startingFee: tutor.price,
    boards: uniqueValues([tutor.board]),
    classesSupported: uniqueValues([tutor.classLevel]),
    examSupport: [],
    topics: uniqueValues(tutor.topics),
    localities: uniqueValues(tutor.sectors),
    cities: ["gurugram"],
    serviceModes: uniqueValues(tutor.mode),
    featured: index < 6,
    featuredInHome: true,
    status: "active",
    displayOrder: index + 1,
    availabilityStatus: "available",
    badges: [],
    featuredOn: [],
    boardTags: uniqueValues([tutor.board]),
    topicTags: uniqueValues(tutor.topics),
    localityTags: uniqueValues(tutor.sectors),
    serviceModeTags: uniqueValues(tutor.mode),
    schoolFitTags: uniqueValues(tutor.schoolFocus),
    schoolFocus: uniqueValues(tutor.schoolFocus),
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    summary: tutor.summary,
    studentsHelped: tutor.studentsHelped ?? 60,
    availability: tutor.availability ?? "Weekdays after school and weekend review blocks",
    achievements: cloneValue(tutor.achievements ?? []),
    qualifications: cloneValue(tutor.qualifications ?? []),
    location: tutor.location ?? "Gurugram",
    seo: {
      title: `${tutor.name} | ${tutor.title} | Maths Bodhi`,
      description: tutor.summary,
      canonicalUrl: `/tutors/${slug}`,
      keywords: uniqueValues([tutor.name, tutor.board, ...ensureArray(tutor.topics)]),
      ogImage: tutor.image,
      indexable: true,
    },
    linkedReviewIds: [],
    linkedResultIds: [],
    createdAt: createTimestamp(index + 28),
    updatedAt: createTimestamp(index + 3),
  };
}

function mergeMathsTutorFields(baseTutor, boardTutor) {
  const nextId = baseTutor?.id ?? boardTutor.id ?? createId("tutor", boardTutor.slug ?? boardTutor.name);
  const displayName = boardTutor.tutorName ?? boardTutor.name ?? baseTutor?.name;
  const shortBio =
    baseTutor?.shortBio ??
    boardTutor.shortBio ??
    boardTutor.description ??
    boardTutor.summary ??
    `${displayName} supports structured maths tuition across relevant boards and class levels.`;

  return {
    ...baseTutor,
    id: nextId,
    legacyIds: uniqueValues([...(baseTutor?.legacyIds ?? []), boardTutor.id]),
    name: displayName,
    slug: baseTutor?.slug ?? boardTutor.slug ?? toSlug(displayName),
    title: boardTutor.title ?? baseTutor?.title ?? `${displayName} maths tutor`,
    shortBio,
    fullBio:
      baseTutor?.fullBio ??
      lineParagraphs([
        boardTutor.description ?? boardTutor.summary ?? shortBio,
        ...(boardTutor.chips ?? []),
      ]),
    experience: boardTutor.yearsExperience ?? boardTutor.experience ?? baseTutor?.experience,
    rating: coerceNumber(boardTutor.rating ?? baseTutor?.rating, 4.8),
    startingFee: boardTutor.startingFee ?? boardTutor.price ?? baseTutor?.startingFee,
    boards: uniqueValues([...(baseTutor?.boards ?? []), boardTutor.board]),
    classesSupported: uniqueValues([
      ...(baseTutor?.classesSupported ?? []),
      boardTutor.classesSupported,
      boardTutor.classFocus,
      boardTutor.classLevel,
    ]),
    examSupport: uniqueValues([...(baseTutor?.examSupport ?? []), ...(boardTutor.examSupport ?? [])]),
    topics: uniqueValues([...(baseTutor?.topics ?? []), ...(boardTutor.topics ?? []), ...(boardTutor.topicTags ?? [])]),
    localities: uniqueValues([
      ...(baseTutor?.localities ?? []),
      ...(boardTutor.localityTags ?? []),
      ...(boardTutor.sectors ?? []),
    ]),
    cities: uniqueValues([...(baseTutor?.cities ?? []), "gurugram"]),
    serviceModes: uniqueValues([
      ...(baseTutor?.serviceModes ?? []),
      ...(boardTutor.serviceModes ?? []),
      ...(boardTutor.serviceModeTags ?? []),
      ...(boardTutor.mode ?? []),
    ]),
    featured: Boolean(baseTutor?.featured ?? boardTutor.featuredOn?.length),
    featuredInHome: Boolean(baseTutor?.featuredInHome),
    status: baseTutor?.status ?? "active",
    displayOrder: baseTutor?.displayOrder ?? 99,
    availabilityStatus: baseTutor?.availabilityStatus ?? "available",
    badges: uniqueValues([...(baseTutor?.badges ?? []), ...(boardTutor.chips ?? [])]),
    featuredOn: uniqueValues([...(baseTutor?.featuredOn ?? []), ...(boardTutor.featuredOn ?? [])]),
    boardTags: uniqueValues([
      ...(baseTutor?.boardTags ?? []),
      ...(boardTutor.boardTags ?? []),
      boardTutor.boardSpecialization,
      boardTutor.subBoard,
      boardTutor.examType,
    ]),
    topicTags: uniqueValues([...(baseTutor?.topicTags ?? []), ...(boardTutor.topicTags ?? []), ...(boardTutor.topics ?? [])]),
    localityTags: uniqueValues([...(baseTutor?.localityTags ?? []), ...(boardTutor.localityTags ?? []), ...(boardTutor.sectors ?? [])]),
    serviceModeTags: uniqueValues([
      ...(baseTutor?.serviceModeTags ?? []),
      ...(boardTutor.serviceModeTags ?? []),
      ...(boardTutor.serviceModes ?? []),
      ...(boardTutor.mode ?? []),
    ]),
    schoolFitTags: uniqueValues([...(baseTutor?.schoolFitTags ?? []), ...(boardTutor.schoolFitTags ?? []), ...(boardTutor.schoolFocus ?? [])]),
    schoolFocus: uniqueValues([...(baseTutor?.schoolFocus ?? []), ...(boardTutor.schoolFocus ?? [])]),
    image: baseTutor?.image ?? boardTutor.image,
    imageAlt: baseTutor?.imageAlt ?? boardTutor.imageAlt,
    summary: baseTutor?.summary ?? boardTutor.description ?? boardTutor.shortBio ?? shortBio,
    studentsHelped: baseTutor?.studentsHelped ?? 48,
    availability:
      baseTutor?.availability ??
      "Weekdays after school and Sunday evening doubt sessions",
    achievements: uniqueValues([...(baseTutor?.achievements ?? []), ...(boardTutor.chips ?? [])]),
    qualifications: uniqueValues([
      ...(baseTutor?.qualifications ?? []),
      ...(boardTutor.schoolFocus ?? []).slice(0, 2).map((item) => `School fit: ${item}`),
    ]),
    location: baseTutor?.location ?? "Gurugram",
    seo: {
      title:
        baseTutor?.seo?.title ?? `${displayName} | ${boardTutor.title ?? "Maths Tutor"} | Maths Bodhi`,
      description:
        baseTutor?.seo?.description ?? boardTutor.description ?? boardTutor.shortBio ?? shortBio,
      canonicalUrl:
        baseTutor?.seo?.canonicalUrl ?? `/tutors/${baseTutor?.slug ?? boardTutor.slug ?? toSlug(displayName)}`,
      keywords: uniqueValues([
        ...(baseTutor?.seo?.keywords ?? []),
        displayName,
        boardTutor.board,
        ...(boardTutor.topics ?? []),
      ]),
      ogImage: baseTutor?.seo?.ogImage ?? boardTutor.image,
      indexable: baseTutor?.seo?.indexable ?? true,
    },
    linkedReviewIds: uniqueValues(baseTutor?.linkedReviewIds ?? []),
    linkedResultIds: uniqueValues(baseTutor?.linkedResultIds ?? []),
    createdAt: baseTutor?.createdAt ?? createTimestamp(21),
    updatedAt: createTimestamp(2),
  };
}

const tutorMap = new Map();

defaultSiteData.tutors.forEach((tutor, index) => {
  const entity = createTutorFromPublicTutor(tutor, index);
  tutorMap.set(entity.slug, entity);
});

mathsTutors.forEach((tutor) => {
  const slug = tutor.slug ?? toSlug(tutor.tutorName ?? tutor.name);
  const nextTutor = mergeMathsTutorFields(tutorMap.get(slug), tutor);
  tutorMap.set(slug, nextTutor);
});

export const tutorSeeds = Array.from(tutorMap.values())
  .sort((first, second) => (first.displayOrder ?? 999) - (second.displayOrder ?? 999))
  .map((tutor, index) => ({
    ...tutor,
    displayOrder: tutor.displayOrder ?? index + 1,
    updatedAt: tutor.updatedAt ?? createTimestamp(index + 2),
  }));

export const tutorProfileSeeds = tutorSeeds.map((tutor, index) => ({
  id: createId("tutor-profile", tutor.slug),
  tutorId: tutor.id,
  longFormProfile:
    tutor.fullBio ??
    `${tutor.name} works with students who need clearer written methods, calmer pacing, and board-aware maths support.`,
  qualifications: cloneValue(tutor.qualifications ?? []),
  teachingStyle: lineParagraphs([
    `${tutor.name} keeps explanations practical, structured, and matched to the student's pace.`,
    "Every plan is designed to reduce confusion first and then build repeatable exam confidence.",
  ]),
  achievements: cloneValue(tutor.achievements ?? []),
  associatedBoards: cloneValue(tutor.boards ?? []),
  associatedTags: uniqueValues([
    ...(tutor.boardTags ?? []),
    ...(tutor.topicTags ?? []),
    ...(tutor.badges ?? []),
  ]),
  profileMediaIds: [],
  linkedFaqIds: [],
  linkedStudentResultIds: cloneValue(tutor.linkedResultIds ?? []),
  createdAt: tutor.createdAt ?? createTimestamp(index + 35),
  updatedAt: tutor.updatedAt ?? createTimestamp(index + 4),
}));

const tutorAliasMap = tutorSeeds.reduce((map, tutor) => {
  map.set(tutor.id, tutor.id);
  (tutor.legacyIds ?? []).forEach((alias) => map.set(alias, tutor.id));
  return map;
}, new Map());

export function getCanonicalTutorId(alias) {
  return tutorAliasMap.get(alias) ?? alias ?? null;
}
