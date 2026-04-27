import { apiRequest } from "./apiClient";

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function getSettledArray(result) {
  return result.status === "fulfilled" ? toArray(result.value) : [];
}

function getLoadError(result, label) {
  if (result.status !== "rejected") {
    return null;
  }

  return `${label}: ${result.reason?.message || "Unable to load"}`;
}

function buildRecentActivity(tutors, blogs, reviews) {
  return [
    ...tutors.map((item) => ({
      id: `tutor-${item.id}`,
      module: "Tutors",
      action: "Loaded tutor",
      entityLabel: item.name,
      actorName: "Maths Bodhi",
      createdAt: item.updatedAt || item.createdAt,
    })),
    ...blogs.map((item) => ({
      id: `blog-${item.id}`,
      module: "Blogs",
      action: "Loaded blog",
      entityLabel: item.title,
      actorName: item.author || "Maths Bodhi",
      createdAt: item.updatedAt || item.publishAt || item.publishDate || item.createdAt,
    })),
    ...reviews.map((item) => ({
      id: `review-${item.id}`,
      module: "Reviews",
      action: "Loaded review",
      entityLabel: item.reviewerName || item.parent || "Approved review",
      actorName: "Maths Bodhi",
      createdAt: item.updatedAt || item.createdAt,
    })),
  ]
    .filter((item) => item.id && item.createdAt)
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())
    .slice(0, 8);
}

export async function getDashboardSnapshot() {
  const [tutorsResult, blogsResult, reviewsResult] = await Promise.allSettled([
    apiRequest("/api/tutors"),
    apiRequest("/api/blogs"),
    apiRequest("/api/reviews"),
  ]);
  const tutors = getSettledArray(tutorsResult);
  const blogs = getSettledArray(blogsResult);
  const reviews = getSettledArray(reviewsResult);
  const loadErrors = [
    getLoadError(tutorsResult, "Tutors"),
    getLoadError(blogsResult, "Blogs"),
    getLoadError(reviewsResult, "Reviews"),
  ].filter(Boolean);

  return {
    summaryCards: [
      { label: "Tutors", value: tutors.length, helper: "Active profiles from /api/tutors" },
      { label: "Blogs", value: blogs.length, helper: "Published posts from /api/blogs" },
      { label: "Reviews", value: reviews.length, helper: "Approved testimonials from /api/reviews" },
      {
        label: "Featured Tutors",
        value: tutors.filter((item) => item.featured || item.featuredInHome).length,
        helper: "Highlighted in discovery sections",
      },
    ],
    quickActions: [
      { label: "Add Tutor", to: "/admin/tutors/new" },
      { label: "Write Blog", to: "/admin/blogs/new" },
      { label: "Moderate Reviews", to: "/admin/reviews" },
      { label: "Add Result", to: "/admin/results" },
    ],
    recentActivity: buildRecentActivity(tutors, blogs, reviews),
    isEmpty: tutors.length + blogs.length + reviews.length === 0,
    loadErrors,
  };
}
