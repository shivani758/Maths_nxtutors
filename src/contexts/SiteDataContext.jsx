import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteData } from "../data/defaultSiteData";

const STORAGE_KEY = "maths-bodhi-site-data";
const SiteDataContext = createContext(null);

function mergeSiteData(savedData) {
  if (!savedData) {
    return defaultSiteData;
  }

  return {
    ...defaultSiteData,
    ...savedData,
    contact: {
      ...defaultSiteData.contact,
      ...savedData.contact,
    },
    seo: {
      ...defaultSiteData.seo,
      ...savedData.seo,
      keywords: savedData.seo?.keywords ?? defaultSiteData.seo.keywords,
    },
    home: {
      ...defaultSiteData.home,
      ...savedData.home,
      keywordChips: savedData.home?.keywordChips ?? defaultSiteData.home.keywordChips,
      stats: savedData.home?.stats ?? defaultSiteData.home.stats,
      serviceBullets: savedData.home?.serviceBullets ?? defaultSiteData.home.serviceBullets,
      intentParagraphs:
        savedData.home?.intentParagraphs ?? defaultSiteData.home.intentParagraphs,
      goalParagraphs: savedData.home?.goalParagraphs ?? defaultSiteData.home.goalParagraphs,
    },
    premiumSchools: savedData.premiumSchools ?? defaultSiteData.premiumSchools,
    tutors: savedData.tutors ?? defaultSiteData.tutors,
    reviews: savedData.reviews ?? defaultSiteData.reviews,
    subjectPages: savedData.subjectPages ?? defaultSiteData.subjectPages,
    cityPages: savedData.cityPages ?? defaultSiteData.cityPages,
    sectorPages: savedData.sectorPages ?? defaultSiteData.sectorPages,
  };
}

function readStorage() {
  if (typeof window === "undefined") {
    return defaultSiteData;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return mergeSiteData(parsed);
  } catch {
    return defaultSiteData;
  }
}

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(readStorage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
  }, [siteData]);

  const value = useMemo(
    () => ({
      siteData,
      resetSiteData: () => setSiteData(defaultSiteData),
      updateHomeContent: (payload) =>
        setSiteData((current) => ({
          ...current,
          home: {
            ...current.home,
            ...payload,
          },
        })),
      updateSeo: (payload) =>
        setSiteData((current) => ({
          ...current,
          seo: {
            ...current.seo,
            ...payload,
          },
        })),
      updateContact: (payload) =>
        setSiteData((current) => ({
          ...current,
          contact: {
            ...current.contact,
            ...payload,
          },
        })),
      upsertTutor: (payload) =>
        setSiteData((current) => {
          const exists = current.tutors.some((item) => item.id === payload.id);
          const nextTutors = exists
            ? current.tutors.map((item) => (item.id === payload.id ? payload : item))
            : [payload, ...current.tutors];

          return {
            ...current,
            tutors: nextTutors,
          };
        }),
      removeTutor: (id) =>
        setSiteData((current) => ({
          ...current,
          tutors: current.tutors.filter((item) => item.id !== id),
        })),
      upsertReview: (payload) =>
        setSiteData((current) => {
          const exists = current.reviews.some((item) => item.id === payload.id);
          const nextReviews = exists
            ? current.reviews.map((item) => (item.id === payload.id ? payload : item))
            : [payload, ...current.reviews];

          return {
            ...current,
            reviews: nextReviews,
          };
        }),
      removeReview: (id) =>
        setSiteData((current) => ({
          ...current,
          reviews: current.reviews.filter((item) => item.id !== id),
        })),
      upsertSchool: (payload) =>
        setSiteData((current) => {
          const exists = current.premiumSchools.some((item) => item.id === payload.id);
          const nextSchools = exists
            ? current.premiumSchools.map((item) => (item.id === payload.id ? payload : item))
            : [payload, ...current.premiumSchools];

          return {
            ...current,
            premiumSchools: nextSchools,
          };
        }),
      removeSchool: (id) =>
        setSiteData((current) => ({
          ...current,
          premiumSchools: current.premiumSchools.filter((item) => item.id !== id),
        })),
      upsertSectorPage: (payload) =>
        setSiteData((current) => {
          const exists = current.sectorPages.some((item) => item.slug === payload.slug);
          const nextSectors = exists
            ? current.sectorPages.map((item) => (item.slug === payload.slug ? payload : item))
            : [payload, ...current.sectorPages];

          const nextCityPages = current.cityPages.map((item) =>
            item.slug === payload.citySlug
              ? {
                  ...item,
                  topSectors: nextSectors
                    .filter((sector) => sector.citySlug === payload.citySlug)
                    .map((sector) => ({
                      slug: sector.slug,
                      label: sector.sectorLabel,
                      summary: sector.subtitle,
                    })),
                }
              : item,
          );

          return {
            ...current,
            sectorPages: nextSectors,
            cityPages: nextCityPages,
          };
        }),
      removeSectorPage: (slug) =>
        setSiteData((current) => ({
          ...current,
          sectorPages: current.sectorPages.filter((item) => item.slug !== slug),
        })),
    }),
    [siteData],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const context = useContext(SiteDataContext);

  if (!context) {
    throw new Error("useSiteData must be used inside SiteDataProvider");
  }

  return context;
}

