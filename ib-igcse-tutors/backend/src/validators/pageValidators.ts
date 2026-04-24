import { z } from "zod";
import { seoSchema, stringArraySchema } from "./shared.js";

const passthroughObjectSchema = z.object({}).passthrough();
const passthroughObjectArraySchema = z.array(passthroughObjectSchema).default([]);

const faqItemSchema = z.object({
  id: z.string().trim().default(""),
  question: z.string().trim().default(""),
  answer: z.string().trim().default(""),
});

const supportPanelSchema = z
  .object({
    title: z.string().trim().default(""),
    text: z.string().trim().default(""),
    bullets: stringArraySchema,
  })
  .default({
    title: "",
    text: "",
    bullets: [],
  });

const overviewSchema = z
  .object({
    badge: z.string().trim().default(""),
    title: z.string().trim().default(""),
    subtitle: z.string().trim().default(""),
    cards: passthroughObjectArraySchema,
  })
  .default({
    badge: "",
    title: "",
    subtitle: "",
    cards: [],
  });

const ctaSchema = z
  .object({
    label: z.string().trim().default(""),
    description: z.string().trim().default(""),
  })
  .default({
    label: "",
    description: "",
  });

const pageBaseSchema = z.object({
  pageType: z.enum(["board", "subject"]).default("board"),
  pageKey: z.string().trim().min(1, "Page key is required."),
  slug: z.string().trim().min(1, "Slug is required."),
  route: z
    .string()
    .trim()
    .min(1, "Route is required.")
    .refine((value) => value.startsWith("/"), "Route must start with /."),
  label: z.string().trim().min(1, "Label is required."),
  title: z.string().trim().default(""),
  navLabel: z.string().trim().default(""),
  h1: z.string().trim().min(1, "H1 is required."),
  intro: z.string().trim().min(1, "Intro is required."),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  badge: z.string().trim().default(""),
  heroBadge: z.string().trim().default(""),
  parentKey: z.string().trim().default(""),
  breadcrumbLabel: z.string().trim().default(""),
  chips: stringArraySchema,
  stats: passthroughObjectArraySchema,
  supportPanel: supportPanelSchema,
  overview: overviewSchema,
  childSections: passthroughObjectArraySchema,
  detailSections: passthroughObjectArraySchema,
  checklist: stringArraySchema,
  schoolHighlights: passthroughObjectArraySchema,
  localZones: passthroughObjectArraySchema,
  localDemandZones: passthroughObjectArraySchema,
  cta: ctaSchema,
  heroImage: z.string().trim().default(""),
  heroImageAlt: z.string().trim().default(""),
  featuredTutorIds: stringArraySchema,
  featuredReviewIds: stringArraySchema,
  faqItems: z.array(faqItemSchema).default([]),
  relatedCities: stringArraySchema,
  boards: stringArraySchema,
  topics: stringArraySchema,
  outcomes: stringArraySchema,
  learningApproach: passthroughObjectArraySchema,
  classSegments: passthroughObjectArraySchema,
  boardSupportCards: passthroughObjectArraySchema,
  searchIntentChips: stringArraySchema,
  heroStats: passthroughObjectArraySchema,
  heroSupportTitle: z.string().trim().default(""),
  heroSupportText: z.string().trim().default(""),
  seoSections: passthroughObjectArraySchema,
  parentChecklist: stringArraySchema,
  seo: seoSchema,
});

export const createPageSchema = pageBaseSchema;

export const updatePageSchema = pageBaseSchema.partial();
