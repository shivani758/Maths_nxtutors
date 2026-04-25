import { defaultSiteData } from "../defaultSiteData";
import { createTimestamp } from "./seedUtils";

export const settingsSeed = {
  siteName: defaultSiteData.brandName,
  supportEmail: defaultSiteData.contact.email,
  whatsappNumber: defaultSiteData.contact.whatsappNumber,
  phoneDisplay: defaultSiteData.contact.phoneDisplay,
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Maths by Board", href: "/subjects/maths" },
    { label: "Gurugram", href: "/city/gurugram" },
    { label: "Book Demo", href: "/book-demo" },
  ],
  socialLinks: {
    whatsapp: `https://wa.me/${defaultSiteData.contact.whatsappNumber}`,
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: "",
  },
  analyticsIds: {
    ga4: "",
    gtm: "",
    metaPixel: "",
  },
  branding: {
    logoSquare: "/favicon.svg",
    logoMark: "/favicon.svg",
    defaultHeroImage: "/images/hero-maths-home.svg",
  },
  contact: {
    ...defaultSiteData.contact,
  },
  seo: {
    title: defaultSiteData.seo.title,
    description: defaultSiteData.seo.description,
    keywords: defaultSiteData.seo.keywords,
    canonicalBaseUrl: "https://www.mathsbodhi.in",
    defaultTitleSuffix: "Maths Bodhi",
    defaultOgImage: "/images/hero-maths-home.svg",
    indexable: true,
  },
  homepage: {
    ...defaultSiteData.home,
  },
  premiumSchools: defaultSiteData.premiumSchools,
  featuredContentBlocks: [
    {
      id: "block-home-hero-support",
      title: "Homepage Hero Support",
      placement: "home_hero",
      description:
        "Supports the primary parent journey into maths-by-board and local discovery routes.",
      status: "active",
    },
    {
      id: "block-home-proof-grid",
      title: "Proof and Trust Highlights",
      placement: "home_proof",
      description:
        "Keeps premium school context and local tutoring relevance visible without overloading the hero section.",
      status: "active",
    },
  ],
  createdAt: createTimestamp(36),
  updatedAt: createTimestamp(1),
};
