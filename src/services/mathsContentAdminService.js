import {
  listMathsBoardPages,
  listMathsTestimonials,
  listMathsTutors,
} from "./mathsContentService";

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function upsertCollectionItem(collection, entity, idKey = "id") {
  const index = collection.findIndex((item) => item[idKey] === entity[idKey]);

  if (index === -1) {
    return [...collection, entity];
  }

  const nextItems = [...collection];
  nextItems[index] = entity;
  return nextItems;
}

const mathsContentDraftStore = {
  tutors: listMathsTutors(),
  testimonials: listMathsTestimonials(),
  boardPages: Object.fromEntries(listMathsBoardPages().map((page) => [page.key, page])),
};

// Replace these in-memory stubs with API calls once the admin backend is connected.
export async function getMathsAdminSnapshot() {
  return cloneValue({
    tutors: mathsContentDraftStore.tutors,
    testimonials: mathsContentDraftStore.testimonials,
    boardPages: Object.values(mathsContentDraftStore.boardPages),
  });
}

export async function listTutorEntities() {
  return cloneValue(mathsContentDraftStore.tutors);
}

export async function saveTutorEntity(entity) {
  const nextTutor = {
    ...entity,
    id: entity.id ?? createId("tutor"),
    featuredOn: entity.featuredOn ?? [],
  };

  mathsContentDraftStore.tutors = upsertCollectionItem(mathsContentDraftStore.tutors, nextTutor);
  return cloneValue(nextTutor);
}

export async function deleteTutorEntity(id) {
  mathsContentDraftStore.tutors = mathsContentDraftStore.tutors.filter((item) => item.id !== id);
  return true;
}

export async function toggleTutorFeatured(tutorId, pageKey, shouldFeature = true) {
  const tutor = mathsContentDraftStore.tutors.find((item) => item.id === tutorId);

  if (!tutor) {
    return null;
  }

  const featuredOn = new Set(tutor.featuredOn ?? []);

  if (shouldFeature) {
    featuredOn.add(pageKey);
  } else {
    featuredOn.delete(pageKey);
  }

  return saveTutorEntity({
    ...tutor,
    featuredOn: [...featuredOn],
  });
}

export async function listTestimonialEntities() {
  return cloneValue(mathsContentDraftStore.testimonials);
}

export async function saveTestimonialEntity(entity) {
  const nextItem = {
    ...entity,
    id: entity.id ?? createId("testimonial"),
    featuredOn: entity.featuredOn ?? [],
  };

  mathsContentDraftStore.testimonials = upsertCollectionItem(
    mathsContentDraftStore.testimonials,
    nextItem,
  );

  return cloneValue(nextItem);
}

export async function deleteTestimonialEntity(id) {
  mathsContentDraftStore.testimonials = mathsContentDraftStore.testimonials.filter(
    (item) => item.id !== id,
  );
  return true;
}

export async function listBoardPageEntities() {
  return cloneValue(Object.values(mathsContentDraftStore.boardPages));
}

export async function saveBoardPageEntity(entity) {
  const nextPage = {
    ...entity,
    key: entity.key ?? createId("board-page"),
  };

  mathsContentDraftStore.boardPages[nextPage.key] = nextPage;
  return cloneValue(nextPage);
}

export async function saveFaqCollection(pageKey, faqItems = []) {
  const page = mathsContentDraftStore.boardPages[pageKey];

  if (!page) {
    return null;
  }

  return saveBoardPageEntity({
    ...page,
    faqItems,
  });
}

export async function saveSchoolContextCards(pageKey, schoolHighlights = []) {
  const page = mathsContentDraftStore.boardPages[pageKey];

  if (!page) {
    return null;
  }

  return saveBoardPageEntity({
    ...page,
    schoolHighlights,
  });
}

export async function saveLocalityCards(pageKey, localZones = []) {
  const page = mathsContentDraftStore.boardPages[pageKey];

  if (!page) {
    return null;
  }

  return saveBoardPageEntity({
    ...page,
    localZones,
  });
}
