import { createId, createTimestamp } from "./clientDataUtils";

const cities = [];
const localities = [];

function upsertById(collection, entity) {
  const index = collection.findIndex((item) => item.id === entity.id);

  if (index === -1) {
    collection.push(entity);
    return;
  }

  collection[index] = entity;
}

function removeById(collection, id) {
  const index = collection.findIndex((item) => item.id === id);

  if (index !== -1) {
    collection.splice(index, 1);
  }
}

export async function listCities() {
  return [...cities].sort((first, second) =>
    String(first.label ?? "").localeCompare(String(second.label ?? "")),
  );
}

export async function listLocalities() {
  return [...localities].sort((first, second) =>
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
  const existingCity = cities.find((item) => item.id === city.id);
  const nextCity = {
    ...existingCity,
    ...city,
    id: city.id || createId("city", city.slug || city.label),
    createdAt: existingCity?.createdAt ?? createTimestamp(1),
    updatedAt: new Date().toISOString(),
  };

  upsertById(cities, nextCity);
  return nextCity;
}

export async function saveLocality(locality) {
  const existingLocality = localities.find((item) => item.id === locality.id);
  const nextLocality = {
    ...existingLocality,
    ...locality,
    id: locality.id || createId("locality", `${locality.citySlug}-${locality.slug || locality.sectorLabel}`),
    createdAt: existingLocality?.createdAt ?? createTimestamp(1),
    updatedAt: new Date().toISOString(),
  };

  upsertById(localities, nextLocality);
  return nextLocality;
}

export async function deleteCity(id) {
  const existingCity = cities.find((item) => item.id === id);
  removeById(cities, id);
  return existingCity ?? null;
}

export async function deleteLocality(id) {
  const existingLocality = localities.find((item) => item.id === id);
  removeById(localities, id);
  return existingLocality ?? null;
}
