import { createId, createTimestamp } from "./clientDataUtils";
import { commitMockStore, getMockStoreSnapshot, removeById, upsertById } from "./mockCmsStore";

export async function listCities() {
  return [...getMockStoreSnapshot().cities].sort((first, second) =>
    String(first.label ?? "").localeCompare(String(second.label ?? "")),
  );
}

export async function listLocalities() {
  return [...getMockStoreSnapshot().localities].sort((first, second) =>
    String(first.sectorLabel ?? "").localeCompare(String(second.sectorLabel ?? "")),
  );
}

export async function createEmptyCity() {
  return {
    id: "",
    slug: "",
    aliases: [],
    label: "",
    headline: "",
    subtitle: "",
    coverageAreas: [],
    servedBoards: [],
    proofPoints: [],
    testimonials: [],
    topSectors: [],
    relatedSubjects: [],
    cta: {
      label: "",
      description: "",
    },
    status: "draft",
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

export async function createEmptyLocality() {
  return {
    id: "",
    citySlug: "gurugram",
    cityAliases: ["gurgaon"],
    cityLabel: "Gurugram",
    slug: "",
    sectorLabel: "",
    headline: "",
    subtitle: "",
    landmarks: [],
    nearbySchools: [],
    serviceModes: [],
    timings: [],
    proofPoints: [],
    popularSubjects: [],
    cta: {
      label: "",
      description: "",
    },
    status: "draft",
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

export async function saveCity(city) {
  return commitMockStore((draft) => {
    const existingCity = draft.cities.find((item) => item.id === city.id);
    const nextCity = {
      ...existingCity,
      ...city,
      id: city.id || createId("city", city.slug || city.label),
      createdAt: existingCity?.createdAt ?? createTimestamp(1),
      updatedAt: new Date().toISOString(),
    };

    draft.cities = upsertById(draft.cities, nextCity);
    return nextCity;
  }, {
    module: "Cities",
    action: city.id ? "Updated city" : "Created city",
    entityId: city.id || city.slug || city.label,
    entityLabel: city.label,
  });
}

export async function saveLocality(locality) {
  return commitMockStore((draft) => {
    const existingLocality = draft.localities.find((item) => item.id === locality.id);
    const nextLocality = {
      ...existingLocality,
      ...locality,
      id: locality.id || createId("locality", `${locality.citySlug}-${locality.slug || locality.sectorLabel}`),
      createdAt: existingLocality?.createdAt ?? createTimestamp(1),
      updatedAt: new Date().toISOString(),
    };

    draft.localities = upsertById(draft.localities, nextLocality);
    return nextLocality;
  }, {
    module: "Localities",
    action: locality.id ? "Updated locality" : "Created locality",
    entityId: locality.id || locality.slug || locality.sectorLabel,
    entityLabel: locality.sectorLabel,
  });
}

export async function deleteCity(id) {
  return commitMockStore((draft) => {
    const existingCity = draft.cities.find((item) => item.id === id);
    draft.cities = removeById(draft.cities, id);
    return existingCity ?? null;
  }, {
    module: "Cities",
    action: "Deleted city",
    entityId: id,
    entityLabel: id,
  });
}

export async function deleteLocality(id) {
  return commitMockStore((draft) => {
    const existingLocality = draft.localities.find((item) => item.id === id);
    draft.localities = removeById(draft.localities, id);
    return existingLocality ?? null;
  }, {
    module: "Localities",
    action: "Deleted locality",
    entityId: id,
    entityLabel: id,
  });
}
