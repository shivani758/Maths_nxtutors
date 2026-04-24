import { z } from "zod";
import { PORTAL_USER_ROLES } from "../types/auth.js";
const emailSchema = z.string().trim().email("Enter a valid email address.");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters.");
const stringListSchema = z.array(z.string().trim().min(1));
const emptyStringListSchema = stringListSchema.default([]);
const optionalStringSchema = z.string().trim().default("");
const studentProfileSchema = z.object({
    phone: z.string().trim().min(7, "Phone number is required."),
    guardianName: z.string().trim().min(2, "Parent or guardian name is required."),
    city: optionalStringSchema.default("gurugram"),
    board: z.string().trim().min(1, "Board is required."),
    classLevel: z.string().trim().min(1, "Class level is required."),
    topicPreferences: stringListSchema.min(1, "Select at least one maths focus area."),
    localityPreferences: emptyStringListSchema,
    preferredMode: z.enum(["Home Tuition", "Online", "Hybrid"]).default("Home Tuition"),
    timingPreference: z.string().trim().min(1, "Preferred timing is required."),
    goal: z.string().trim().min(1, "Learning goal is required."),
    requirementSummary: z.string().trim().min(1, "Share the current maths support requirement."),
    enquiryStatus: z.enum(["new", "reviewing", "matched", "closed"]).default("new"),
    demoStatus: z.enum(["not_requested", "requested", "scheduled", "completed"]).default("not_requested"),
    savedTutorIds: emptyStringListSchema,
});
const tutorProfileSchema = z.object({
    phone: z.string().trim().min(7, "Phone number is required."),
    city: optionalStringSchema.default("gurugram"),
    boardSpecializations: stringListSchema.min(1, "Select at least one board specialization."),
    classSegments: stringListSchema.min(1, "Select at least one class segment."),
    topicSpecializations: stringListSchema.min(1, "Select at least one topic specialization."),
    serviceAreas: emptyStringListSchema,
    serviceModes: z.array(z.enum(["Home Tuition", "Online", "Hybrid"])).min(1, "Select at least one service mode."),
    availabilitySummary: z.string().trim().min(1, "Availability summary is required."),
    profileSummary: z.string().trim().min(1, "Profile summary is required."),
    experienceYears: z.coerce
        .number({ invalid_type_error: "Experience years must be a number." })
        .min(0, "Experience years cannot be negative.")
        .max(60, "Experience years looks too high."),
    qualificationHighlights: emptyStringListSchema,
    linkedTutorId: optionalStringSchema,
});
const studentProfileUpdateSchema = studentProfileSchema.partial();
const tutorProfileUpdateSchema = tutorProfileSchema.partial();
const portalRoleSchema = z.enum(PORTAL_USER_ROLES);
const portalSignupBaseSchema = z.object({
    role: portalRoleSchema,
    name: z.string().trim().min(2, "Name is required."),
    email: emailSchema,
    password: passwordSchema,
    rememberMe: z.boolean().default(false),
});
const portalLoginSchema = z.object({
    role: portalRoleSchema,
    email: emailSchema,
    password: z.string().min(1, "Password is required."),
    rememberMe: z.boolean().default(false),
});
const portalProfileUpdateBaseSchema = z.object({
    name: z.string().trim().min(2, "Name is required.").optional(),
});
export const portalVerificationTokenSchema = z.object({
    token: z.string().trim().min(1, "Verification token is required."),
});
export function parsePortalSignupPayload(input) {
    const parsed = portalSignupBaseSchema.extend({ profile: z.unknown() }).parse(input);
    if (parsed.role === "student") {
        return {
            ...parsed,
            role: "student",
            profile: studentProfileSchema.parse(parsed.profile),
        };
    }
    return {
        ...parsed,
        role: "tutor",
        profile: tutorProfileSchema.parse(parsed.profile),
    };
}
export function parsePortalProfileUpdatePayload(role, input) {
    const parsed = portalProfileUpdateBaseSchema.extend({ profile: z.unknown().default({}) }).parse(input);
    return {
        ...parsed,
        profile: role === "student"
            ? studentProfileUpdateSchema.parse(parsed.profile)
            : tutorProfileUpdateSchema.parse(parsed.profile),
    };
}
export const portalLoginPayloadSchema = portalLoginSchema;
//# sourceMappingURL=portalAuthValidators.js.map