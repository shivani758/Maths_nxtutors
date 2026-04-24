import mongoose, { Schema, model } from "mongoose";
const seoSchema = new Schema({
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    canonicalUrl: { type: String, trim: true, default: "" },
    keywords: { type: [String], default: [] },
    ogImage: { type: String, trim: true, default: "" },
    indexable: { type: Boolean, default: true },
}, { _id: false });
const tutorSchema = new Schema({
    sourceId: { type: String, default: null, index: { unique: true, sparse: true } },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    shortBio: { type: String, default: "" },
    fullBio: { type: String, default: "" },
    teachingStyle: { type: String, default: "" },
    boards: { type: [String], default: [] },
    classesSupported: { type: [String], default: [] },
    topics: { type: [String], default: [] },
    cities: { type: [String], default: [] },
    localities: { type: [String], default: [] },
    serviceModes: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    experienceLabel: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    startingFee: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    featuredInHome: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        index: true,
    },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    seo: { type: seoSchema, default: () => ({}) },
    qualifications: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    badges: { type: [String], default: [] },
    schoolFocus: { type: [String], default: [] },
    availability: { type: String, default: "" },
    availabilityStatus: {
        type: String,
        enum: ["available", "limited", "waitlist"],
        default: "available",
    },
    displayOrder: { type: Number, default: 99, index: true },
    linkedReviewIds: { type: [String], default: [] },
    linkedResultIds: { type: [String], default: [] },
    featuredOn: { type: [String], default: [] },
}, {
    timestamps: true,
});
tutorSchema.index({ featured: 1, displayOrder: 1 });
export const TutorModel = mongoose.models.Tutor || model("Tutor", tutorSchema);
//# sourceMappingURL=Tutor.js.map