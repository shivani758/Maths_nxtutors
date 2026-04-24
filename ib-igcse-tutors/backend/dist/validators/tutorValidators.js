import { z } from "zod";
import { seoSchema, stringArraySchema } from "./shared.js";
function requiredStringArraySchema(message) {
    return z.array(z.string().trim().min(1)).min(1, message);
}
const tutorBaseSchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    slug: z.string().trim().min(1, "Slug is required."),
    title: z.string().trim().min(1, "Title is required."),
    shortBio: z.string().trim().min(1, "Short bio is required."),
    fullBio: z.string().trim().default(""),
    teachingStyle: z.string().trim().default(""),
    boards: requiredStringArraySchema("Select at least one board."),
    classesSupported: requiredStringArraySchema("Select at least one class level."),
    topics: requiredStringArraySchema("Add at least one topic."),
    cities: stringArraySchema,
    localities: stringArraySchema,
    serviceModes: requiredStringArraySchema("Select at least one service mode."),
    experienceYears: z.coerce.number().min(1, "Experience years is required."),
    experienceLabel: z.string().trim().default(""),
    rating: z.coerce.number().min(0).max(5).default(4.8),
    startingFee: z.string().trim().min(1, "Starting fee is required."),
    featured: z.boolean().default(false),
    featuredInHome: z.boolean().default(false),
    status: z.enum(["active", "inactive"]).default("active"),
    image: z.string().trim().default(""),
    imageAlt: z.string().trim().default(""),
    seo: seoSchema,
    qualifications: stringArraySchema,
    achievements: stringArraySchema,
    badges: stringArraySchema,
    schoolFocus: stringArraySchema,
    availability: z.string().trim().default(""),
    availabilityStatus: z.enum(["available", "limited", "waitlist"]).default("available"),
    displayOrder: z.coerce.number().int().min(0).default(99),
    linkedReviewIds: stringArraySchema,
    linkedResultIds: stringArraySchema,
    featuredOn: stringArraySchema,
});
export const createTutorSchema = tutorBaseSchema;
export const updateTutorSchema = tutorBaseSchema.partial();
//# sourceMappingURL=tutorValidators.js.map