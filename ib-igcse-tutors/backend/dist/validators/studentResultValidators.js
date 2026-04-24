import { z } from "zod";
const studentResultBaseSchema = z.object({
    studentLabel: z.string().trim().min(1, "Student label is required."),
    board: z.string().trim().min(1, "Board is required."),
    classLevel: z.string().trim().min(1, "Class level is required."),
    resultSummary: z.string().trim().min(1, "Result summary is required."),
    story: z.string().trim().default(""),
    linkedTutorId: z.string().trim().default(""),
    linkedPage: z.string().trim().default(""),
    city: z.string().trim().default("gurugram"),
    locality: z.string().trim().default(""),
    featured: z.boolean().default(false),
    status: z.enum(["draft", "approved"]).default("draft"),
    beforeResult: z.string().trim().default(""),
    afterResult: z.string().trim().default(""),
});
export const createStudentResultSchema = studentResultBaseSchema;
export const updateStudentResultSchema = studentResultBaseSchema.partial();
//# sourceMappingURL=studentResultValidators.js.map