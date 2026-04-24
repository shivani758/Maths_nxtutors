import { BlogPostModel } from "../models/BlogPost.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";

type BlogPayload = {
  title?: string;
  slug?: string;
  summary?: string;
  body?: string;
  category?: string;
  tags?: string[];
  relatedBoards?: string[];
  relatedPageId?: string;
  relatedTutorIds?: string[];
  status?: "draft" | "published" | "scheduled";
  publishAt?: string | Date | null;
  author?: string;
  coverImage?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  seo?: Record<string, unknown>;
};

function unique(values: string[] = []) {
  return [...new Set(values.filter(Boolean))];
}

function serializeBlog(doc: any) {
  return {
    id: doc._id.toString(),
    sourceId: doc.sourceId ?? "",
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary ?? "",
    body: doc.body ?? "",
    category: doc.category ?? "",
    tags: doc.tags ?? [],
    relatedBoards: doc.relatedBoards ?? [],
    relatedPageId: doc.relatedPageId ?? "",
    relatedTutorIds: doc.relatedTutorIds ?? [],
    status: doc.status,
    publishDate: doc.publishAt,
    publishAt: doc.publishAt,
    author: doc.author ?? "Maths Bodhi Team",
    coverImage: doc.coverImage ?? "",
    faqItems: doc.faqItems ?? [],
    seo: doc.seo ?? {},
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const existing = await BlogPostModel.findOne({
    slug,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  }).exec();

  if (existing) {
    throw new ApiError(409, "A blog with this slug already exists.", {
      code: "DUPLICATE_BLOG_SLUG",
      details: createFieldErrorDetails("slug", "A blog with this slug already exists."),
    });
  }
}

export async function listBlogs() {
  const blogs = await BlogPostModel.find().sort({ updatedAt: -1 }).exec();
  return blogs.map((doc) => serializeBlog(doc));
}

export async function getBlogById(id: string) {
  const blog = await BlogPostModel.findById(id).exec();

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  return serializeBlog(blog);
}

export async function getPublishedBlogs() {
  const blogs = await BlogPostModel.find({ status: "published" }).sort({ publishAt: -1, updatedAt: -1 }).exec();
  return blogs.map((doc) => serializeBlog(doc));
}

export async function createBlog(payload: BlogPayload) {
  const slug = slugify(payload.slug || payload.title || "");
  await ensureUniqueSlug(slug);
  const blog = await BlogPostModel.create({
    ...payload,
    slug,
    tags: unique(payload.tags),
    relatedBoards: unique(payload.relatedBoards),
    relatedTutorIds: unique(payload.relatedTutorIds),
    publishAt: payload.publishAt ? new Date(payload.publishAt) : null,
  });

  return serializeBlog(blog);
}

export async function updateBlog(id: string, payload: BlogPayload) {
  const blog = await BlogPostModel.findById(id).exec();

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  const slug = slugify(payload.slug || blog.slug || payload.title || blog.title);
  await ensureUniqueSlug(slug, id);

  Object.assign(blog, {
    ...payload,
    slug,
    tags: payload.tags ? unique(payload.tags) : blog.tags,
    relatedBoards: payload.relatedBoards ? unique(payload.relatedBoards) : blog.relatedBoards,
    relatedTutorIds: payload.relatedTutorIds ? unique(payload.relatedTutorIds) : blog.relatedTutorIds,
    publishAt:
      payload.publishAt === undefined
        ? blog.publishAt
        : payload.publishAt
          ? new Date(payload.publishAt)
          : null,
  });

  await blog.save();
  return serializeBlog(blog);
}

export async function deleteBlog(id: string) {
  const blog = await BlogPostModel.findByIdAndDelete(id).exec();

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  return serializeBlog(blog);
}
