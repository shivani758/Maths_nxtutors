import { apiRequest } from "./apiClient";
import { refreshPublicSiteData } from "./publicSiteService";

function uniqueValues(values = []) {
  return [...new Set((values ?? []).filter(Boolean))];
}

function inferRelatedBoards(blog) {
  if (blog.relatedBoards?.length) {
    return uniqueValues(blog.relatedBoards);
  }

  if (!blog.relatedPageId) {
    return [];
  }

  const value = String(blog.relatedPageId).replace(/^page-board-/, "");
  const [rootBoard] = value.split("-");
  return rootBoard ? [rootBoard] : [];
}

export async function listBlogs() {
  try {
    const items = await apiRequest("/api/admin/blogs");
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error("Blogs API failed:", error);
    return [];
  }
}

export async function getBlogById(id) {
  if (!id) {
    throw new Error("Blog ID is required.");
  }

  return apiRequest(`/api/admin/blogs/${id}`);
}

export function createEmptyBlog() {
  return {
    id: "",
    title: "",
    slug: "",
    summary: "",
    body: "",
    status: "draft",
    category: "",
    tags: [],
    author: "Maths Bodhi Team",
    relatedBoards: [],
    relatedPageId: "",
    relatedTutorIds: [],
    publishDate: "",
    coverImage: "/images/hero-maths-home.svg",
    faqItems: [],
    seo: {
      title: "",
      description: "",
      canonicalUrl: "",
      keywords: [],
      ogImage: "/images/hero-maths-home.svg",
      indexable: true,
    },
  };
}

function normalizePublishDate(value) {
  const text = String(value ?? "").trim();

  if (!text) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return `${text}T00:00:00.000Z`;
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? text : parsed.toISOString();
}

export async function saveBlog(blog) {
  const payload = {
    title: blog.title,
    slug: blog.slug,
    summary: blog.summary,
    body: blog.body,
    category: blog.category,
    tags: uniqueValues(blog.tags),
    relatedBoards: inferRelatedBoards(blog),
    relatedPageId: blog.relatedPageId ?? "",
    relatedTutorIds: uniqueValues(blog.relatedTutorIds ?? []),
    status: blog.status,
    publishAt: normalizePublishDate(blog.publishDate),
    author: blog.author,
    coverImage: blog.coverImage,
    faqItems: blog.faqItems ?? [],
    seo: blog.seo,
  };

  const saved = blog.id
    ? await apiRequest(`/api/admin/blogs/${blog.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/blogs", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return saved;
}

export async function deleteBlog(id) {
  const deleted = await apiRequest(`/api/admin/blogs/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}
