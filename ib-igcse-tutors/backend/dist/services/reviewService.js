import { ReviewModel } from "../models/Review.js";
import { ApiError } from "../utils/ApiError.js";
import { toObjectIdOrNull } from "../utils/mongo.js";
function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
}
function serializeReview(doc) {
    return {
        id: doc._id.toString(),
        sourceId: doc.sourceId ?? "",
        reviewerName: doc.reviewerName,
        roleType: doc.reviewerType,
        reviewerType: doc.reviewerType,
        reviewText: doc.text,
        text: doc.text,
        rating: doc.rating,
        relatedTutorId: doc.linkedTutor ? doc.linkedTutor.toString() : "",
        linkedTutorId: doc.linkedTutor ? doc.linkedTutor.toString() : "",
        relatedBoard: doc.linkedBoard ?? "",
        linkedBoard: doc.linkedBoard ?? "",
        relatedPageId: doc.linkedPage ?? "",
        linkedPage: doc.linkedPage ?? "",
        city: doc.city ?? "gurugram",
        locality: doc.locality ?? "",
        school: doc.school ?? "",
        status: doc.moderationStatus,
        moderationStatus: doc.moderationStatus,
        featured: Boolean(doc.featured),
        featuredOn: doc.featuredOn ?? [],
        order: doc.order ?? 99,
        anonymized: Boolean(doc.anonymized),
        parent: doc.reviewerName,
        sector: doc.locality ?? "",
        board: doc.linkedBoard ?? "",
        quote: doc.text,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
export async function listReviews() {
    const reviews = await ReviewModel.find().sort({ order: 1, updatedAt: -1 }).exec();
    return reviews.map((doc) => serializeReview(doc));
}
export async function getReviewById(id) {
    const review = await ReviewModel.findById(id).exec();
    if (!review) {
        throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
    }
    return serializeReview(review);
}
export async function getApprovedReviews() {
    const reviews = await ReviewModel.find({ moderationStatus: "approved" }).sort({ order: 1, updatedAt: -1 }).exec();
    return reviews.map((doc) => serializeReview(doc));
}
export async function createReview(payload) {
    const review = await ReviewModel.create({
        ...payload,
        linkedTutor: toObjectIdOrNull(payload.linkedTutorId),
        featuredOn: unique(payload.featuredOn),
    });
    return serializeReview(review);
}
export async function updateReview(id, payload) {
    const review = await ReviewModel.findById(id).exec();
    if (!review) {
        throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
    }
    Object.assign(review, {
        ...payload,
        linkedTutor: payload.linkedTutorId === undefined ? review.linkedTutor : toObjectIdOrNull(payload.linkedTutorId),
        featuredOn: payload.featuredOn ? unique(payload.featuredOn) : review.featuredOn,
    });
    await review.save();
    return serializeReview(review);
}
export async function deleteReview(id) {
    const review = await ReviewModel.findByIdAndDelete(id).exec();
    if (!review) {
        throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
    }
    return serializeReview(review);
}
//# sourceMappingURL=reviewService.js.map