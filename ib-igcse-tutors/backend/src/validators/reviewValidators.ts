import { z } from "zod";
import { stringArraySchema } from "./shared.js";

const reviewBaseSchema = z.object({
  reviewerName: z.string().trim().min(1, "Reviewer name is required."),
  reviewerType: z.string().trim().default("Parent"),
  text: z.string().trim().min(1, "Review text is required."),
  rating: z.number().min(0).max(5).default(4.8),
  linkedTutorId: z.string().trim().default(""),
  linkedBoard: z.string().trim().default(""),
  linkedPage: z.string().trim().default(""),
  city: z.string().trim().default("gurugram"),
  locality: z.string().trim().default(""),
  school: z.string().trim().default(""),
  featured: z.boolean().default(false),
  moderationStatus: z.enum(["draft", "pending", "approved", "archived"]).default("pending"),
  anonymized: z.boolean().default(false),
  featuredOn: stringArraySchema,
  order: z.number().int().min(0).default(99),
});

export const createReviewSchema = reviewBaseSchema;

export const updateReviewSchema = reviewBaseSchema.partial();
