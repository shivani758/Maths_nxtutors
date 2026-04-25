import { createInitialAdminStore } from "../data/admin";
import { cloneValue, createId } from "../data/admin/seedUtils";

const STORAGE_KEY = "maths-bodhi-admin-mock-store:v2";
const EVENT_NAME = "maths-bodhi-admin-store-change";

function hasBrowser() {
  return typeof window !== "undefined";
}

function mergeSettings(seedSettings, savedSettings = {}) {
  return {
    ...seedSettings,
    ...savedSettings,
    contact: {
      ...seedSettings.contact,
      ...savedSettings.contact,
    },
    seo: {
      ...seedSettings.seo,
      ...savedSettings.seo,
      keywords: savedSettings.seo?.keywords ?? seedSettings.seo.keywords,
    },
    homepage: {
      ...seedSettings.homepage,
      ...savedSettings.homepage,
      keywordChips: savedSettings.homepage?.keywordChips ?? seedSettings.homepage.keywordChips,
      stats: savedSettings.homepage?.stats ?? seedSettings.homepage.stats,
      serviceBullets:
        savedSettings.homepage?.serviceBullets ?? seedSettings.homepage.serviceBullets,
      intentParagraphs:
        savedSettings.homepage?.intentParagraphs ?? seedSettings.homepage.intentParagraphs,
      goalParagraphs:
        savedSettings.homepage?.goalParagraphs ?? seedSettings.homepage.goalParagraphs,
    },
  };
}

function mergeStore(seedStore, savedStore = {}) {
  return {
    ...seedStore,
    ...savedStore,
    meta: {
      ...seedStore.meta,
      ...savedStore.meta,
    },
    settings: mergeSettings(seedStore.settings, savedStore.settings),
    tutors: savedStore.tutors ?? seedStore.tutors,
    tutorProfiles: savedStore.tutorProfiles ?? seedStore.tutorProfiles,
    reviews: savedStore.reviews ?? seedStore.reviews,
    results: savedStore.results ?? seedStore.results,
    blogs: savedStore.blogs ?? seedStore.blogs,
    pages: savedStore.pages ?? seedStore.pages,
    faqs: savedStore.faqs ?? seedStore.faqs,
    cities: savedStore.cities ?? seedStore.cities,
    localities: savedStore.localities ?? seedStore.localities,
    media: savedStore.media ?? seedStore.media,
    users: savedStore.users ?? seedStore.users,
    dashboardActivity: savedStore.dashboardActivity ?? seedStore.dashboardActivity,
  };
}

function persistStore(store) {
  if (!hasBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { updatedAt: store.meta.updatedAt } }));
}

export function getMockStoreSnapshot() {
  const seedStore = createInitialAdminStore();

  if (!hasBrowser()) {
    return seedStore;
  }

  try {
    const savedStore = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return mergeStore(seedStore, savedStore);
  } catch {
    return seedStore;
  }
}

export function subscribeMockStore(listener) {
  if (!hasBrowser()) {
    return () => {};
  }

  const handleCustomEvent = () => listener(getMockStoreSnapshot());
  const handleStorageEvent = (event) => {
    if (event.key === STORAGE_KEY) {
      listener(getMockStoreSnapshot());
    }
  };

  window.addEventListener(EVENT_NAME, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

export function createActivityEntry(activity = {}) {
  return {
    id: createId("activity", `${activity.module ?? "admin"}-${Date.now()}`),
    module: activity.module ?? "Admin",
    action: activity.action ?? "Updated item",
    entityId: activity.entityId ?? "",
    entityLabel: activity.entityLabel ?? "",
    actorName: activity.actorName ?? "Frontend Demo Admin",
    createdAt: new Date().toISOString(),
  };
}

export function commitMockStore(mutator, activity) {
  const currentStore = getMockStoreSnapshot();
  const nextStore = cloneValue(currentStore);
  const result = mutator(nextStore);

  if (activity) {
    nextStore.dashboardActivity = [
      createActivityEntry(activity),
      ...(nextStore.dashboardActivity ?? []),
    ].slice(0, 40);
  }

  nextStore.meta.updatedAt = new Date().toISOString();
  persistStore(nextStore);

  return cloneValue(result ?? nextStore);
}

export function resetMockStore() {
  const freshStore = createInitialAdminStore();
  persistStore(freshStore);
  return freshStore;
}

export function upsertById(collection = [], entity) {
  const index = collection.findIndex((item) => item.id === entity.id);

  if (index === -1) {
    return [...collection, entity];
  }

  const nextCollection = [...collection];
  nextCollection[index] = entity;
  return nextCollection;
}

export function removeById(collection = [], entityId) {
  return collection.filter((item) => item.id !== entityId);
}
