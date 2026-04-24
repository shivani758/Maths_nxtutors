import { z } from "zod";
import { seoSchema, stringArraySchema } from "./shared.js";
function publishAtSchema() {
    return z
        .union([z.string().trim(), z.null(), z.undefined()])
        .transform((value, ctx) => {
        const text = String(value ?? "").trim();
        if (!text) {
            return null;
        }
        const normalized = /^\d{4}-\d{2}-\d{2}$/.test(text) ? `${text}T00:00:00.000Z` : text;
        const parsed = new Date(normalized);
        if (Number.isNaN(parsed.getTime())) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Publish date must be a valid date or datetime.",
            });
            return z.NEVER;
        }
        return parsed.toISOString();
    });
}
const faqItemSchema = z.object({
    question: z.string().trim().default(""),
    answer: z.string().trim().default(""),
});
const blogBaseSchema = z.object({
    title: z.string().trim().min(1, "Title is required."),
    slug: z.string().trim().min(1, "Slug is required."),
    summary: z.string().trim().min(1, "Summary is required."),
    body: z.string().trim().min(1, "Body is required."),
    category: z.string().trim().default(""),
    tags: stringArraySchema,
    relatedBoards: stringArraySchema,
    relatedPageId: z.string().trim().default(""),
    relatedTutorIds: stringArraySchema,
    status: z.enum(["draft", "published", "scheduled"]).default("draft"),
    publishAt: publishAtSchema(),
    author: z.string().trim().default("Maths Bodhi Team"),
    coverImage: z.string().trim().default(""),
    faqItems: z.array(faqItemSchema).default([]),
    seo: seoSchema,
});
export const createBlogSchema = blogBaseSchema;
export const updateBlogSchema = blogBaseSchema.partial();
//# sourceMappingURL=blogValidators.js.map