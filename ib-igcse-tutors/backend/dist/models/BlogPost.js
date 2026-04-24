import mongoose, { Schema, model } from "mongoose";
const seoSchema = new Schema({
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    canonicalUrl: { type: String, trim: true, default: "" },
    keywords: { type: [String], default: [] },
    ogImage: { type: String, trim: true, default: "" },
    indexable: { type: Boolean, default: true },
}, { _id: false });
const blogPostSchema = new Schema({
    sourceId: { type: String, default: null, index: { unique: true, sparse: true } },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    summary: { type: String, default: "" },
    body: { type: String, default: "" },
    category: { type: String, default: "" },
    tags: { type: [String], default: [] },
    relatedBoards: { type: [String], default: [] },
    relatedPageId: { type: String, default: "" },
    relatedTutorIds: { type: [String], default: [] },
    status: {
        type: String,
        enum: ["draft", "published", "scheduled"],
        default: "draft",
        index: true,
    },
    publishAt: { type: Date, default: null },
    author: { type: String, default: "Maths Bodhi Team" },
    coverImage: { type: String, default: "" },
    faqItems: {
        type: [
            new Schema({
                question: { type: String, trim: true, default: "" },
                answer: { type: String, trim: true, default: "" },
            }, { _id: false }),
        ],
        default: [],
    },
    seo: { type: seoSchema, default: () => ({}) },
}, {
    timestamps: true,
});
blogPostSchema.index({ status: 1, publishAt: -1 });
export const BlogPostModel = mongoose.models.BlogPost || model("BlogPost", blogPostSchema);
//# sourceMappingURL=BlogPost.js.map