import { BlogPostModel } from "../models/BlogPost.js";
import { ReviewModel } from "../models/Review.js";
import { StudentResultModel } from "../models/StudentResult.js";
import { TutorModel } from "../models/Tutor.js";

export async function getDashboardSnapshot() {
  const [
    totalTutors,
    featuredTutors,
    pendingReviews,
    publishedBlogs,
    draftBlogs,
    totalResults,
    recentTutors,
    recentBlogs,
  ] = await Promise.all([
    TutorModel.countDocuments(),
    TutorModel.countDocuments({ featured: true }),
    ReviewModel.countDocuments({ moderationStatus: "pending" }),
    BlogPostModel.countDocuments({ status: "published" }),
    BlogPostModel.countDocuments({ status: "draft" }),
    StudentResultModel.countDocuments(),
    TutorModel.find().sort({ updatedAt: -1 }).limit(4).select("name updatedAt"),
    BlogPostModel.find().sort({ updatedAt: -1 }).limit(4).select("title updatedAt"),
  ]);

  return {
    summaryCards: [
      { label: "Total Tutors", value: totalTutors, helper: "Profiles ready for matching" },
      { label: "Featured Tutors", value: featuredTutors, helper: "Visible in key discovery areas" },
      { label: "Pending Reviews", value: pendingReviews, helper: "Waiting for moderation" },
      { label: "Published Blogs", value: publishedBlogs, helper: "Live editorial content" },
      { label: "Draft Blogs", value: draftBlogs, helper: "Still being refined" },
      { label: "Student Results", value: totalResults, helper: "Proof stories available for pages" },
    ],
    quickActions: [
      { label: "Add Tutor", to: "/admin/tutors/new" },
      { label: "Write Blog", to: "/admin/blogs/new" },
      { label: "Moderate Reviews", to: "/admin/reviews" },
      { label: "Add Result", to: "/admin/results" },
    ],
    recentActivity: [
      ...recentTutors.map((item) => ({
        id: `tutor-${item._id.toString()}`,
        module: "Tutors",
        action: "Updated tutor",
        entityLabel: item.name,
        actorName: "Maths Bodhi Admin",
        createdAt: item.updatedAt,
      })),
      ...recentBlogs.map((item) => ({
        id: `blog-${item._id.toString()}`,
        module: "Blogs",
        action: "Updated blog",
        entityLabel: item.title,
        actorName: "Maths Bodhi Admin",
        createdAt: item.updatedAt,
      })),
    ]
      .sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)))
      .slice(0, 8),
  };
}
