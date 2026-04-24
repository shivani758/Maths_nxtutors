import { z } from "zod";
export const stringArraySchema = z.array(z.string().trim().min(1)).default([]);
export const seoSchema = z
    .object({
    title: z.string().trim().default(""),
    description: z.string().trim().default(""),
    canonicalUrl: z.string().trim().default(""),
    keywords: stringArraySchema,
    ogImage: z.string().trim().default(""),
    indexable: z.boolean().default(true),
})
    .default({
    title: "",
    description: "",
    canonicalUrl: "",
    keywords: [],
    ogImage: "",
    indexable: true,
});
export const idSchema = z.string().trim().min(1);
//# sourceMappingURL=shared.js.map