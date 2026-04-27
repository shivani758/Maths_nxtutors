import { apiRequest } from "./apiClient";
import { refreshPublicSiteData } from "./publicSiteService";

function uniqueValues(values = []) {
  return [...new Set((values ?? []).filter(Boolean))];
}

export async function listReviews() {
  try {
    const items = await apiRequest("/api/admin/reviews");
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error("Reviews API failed:", error);
    return [];
  }
}

export async function getReviewById(id) {
  return apiRequest(`/api/admin/reviews/${id}`);
}

export async function createEmptyReview() {
  return {
    id: "",
    reviewerName: "",
    roleType: "Parent",
    reviewText: "",
    rating: 4.8,
    relatedTutorId: "",
    relatedBoard: "",
    relatedPageId: "",
    city: "gurugram",
    locality: "",
    school: "",
    status: "pending",
    featured: false,
    featuredOn: [],
    order: 99,
    anonymized: false,
    parent: "",
    sector: "",
    board: "",
    quote: "",
  };
}

export async function saveReview(review) {
  const payload = {
    reviewerName: review.reviewerName,
    reviewerType: review.roleType,
    text: review.reviewText,
    rating: Number(review.rating ?? 4.8),
    linkedTutorId: review.relatedTutorId ?? "",
    linkedBoard: review.relatedBoard ?? review.board ?? "",
    linkedPage: review.relatedPageId ?? "",
    city: review.city ?? "gurugram",
    locality: review.locality ?? review.sector ?? "",
    school: review.school ?? "",
    featured: Boolean(review.featured),
    moderationStatus: review.status ?? "pending",
    anonymized: Boolean(review.anonymized),
    featuredOn: uniqueValues(review.featuredOn),
    order: Number(review.order ?? 99),
  };

  const saved = review.id
    ? await apiRequest(`/api/admin/reviews/${review.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/reviews", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return saved;
}

export async function deleteReview(id) {
  const deleted = await apiRequest(`/api/admin/reviews/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}

export async function toggleReviewFeatured(id) {
  const current = await apiRequest(`/api/admin/reviews/${id}`);
  const updated = await apiRequest(`/api/admin/reviews/${id}`, {
    method: "PUT",
    body: { featured: !current.featured },
  });
  await refreshPublicSiteData().catch(() => {});
  return updated;
}
