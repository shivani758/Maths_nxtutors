import { defaultSiteData } from "../defaultSiteData";
import { createTimestamp } from "./seedUtils";

export const citySeeds = defaultSiteData.cityPages.map((page, index) => ({
  ...page,
  id: `city-${page.slug}`,
  pageType: "city",
  status: "published",
  seo: {
    title: `Maths Home Tutor in ${page.label} | Maths Bodhi`,
    description: page.subtitle,
    canonicalUrl: `/city/${page.slug}`,
    keywords: [
      `maths home tutor in ${page.label.toLowerCase()}`,
      `maths tuition in ${page.label.toLowerCase()}`,
      ...(page.coverageAreas ?? []),
    ],
    ogImage: "/images/hero-maths-home.svg",
    indexable: true,
  },
  createdAt: createTimestamp(index + 26),
  updatedAt: createTimestamp(index + 1),
}));

export const localitySeeds = defaultSiteData.sectorPages.map((page, index) => ({
  ...page,
  id: `locality-${page.citySlug}-${page.slug}`,
  pageType: "locality",
  status: "published",
  seo: {
    title: `Maths Home Tutor in ${page.sectorLabel}, ${page.cityLabel} | Maths Bodhi`,
    description: page.subtitle,
    canonicalUrl: `/city/${page.citySlug}/${page.slug}`,
    keywords: [
      `maths home tutor in ${page.sectorLabel.toLowerCase()}`,
      `maths tuition in ${page.sectorLabel.toLowerCase()}`,
      ...(page.landmarks ?? []),
    ],
    ogImage: "/images/hero-maths-home.svg",
    indexable: true,
  },
  createdAt: createTimestamp(index + 20),
  updatedAt: createTimestamp(index + 1),
}));
