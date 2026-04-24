import mongoose, { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    sourceId: { type: String, default: null, index: { unique: true, sparse: true } },
    reviewerName: { type: String, required: true, trim: true },
    reviewerType: { type: String, default: "Parent" },
    text: { type: String, required: true },
    rating: { type: Number, default: 5 },
    linkedTutor: { type: Schema.Types.ObjectId, ref: "Tutor", default: null, index: true },
    linkedBoard: { type: String, default: "", index: true },
    linkedPage: { type: String, default: "" },
    city: { type: String, default: "gurugram", index: true },
    locality: { type: String, default: "" },
    school: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    moderationStatus: {
        type: String,
        enum: ["draft", "pending", "approved", "archived"],
        default: "pending",
        index: true,
    },
    anonymized: { type: Boolean, default: false },
    featuredOn: { type: [String], default: [] },
    order: { type: Number, default: 99 },
}, {
    timestamps: true,
});
reviewSchema.index({ moderationStatus: 1, order: 1 });
export const ReviewModel = mongoose.models.Review || model("Review", reviewSchema);
//# sourceMappingURL=Review.js.map