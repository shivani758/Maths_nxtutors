import type { Request, Response } from "express";
import { createBlog, deleteBlog, getBlogById, listBlogs, updateBlog } from "../services/blogService.js";
import { createBlogSchema, updateBlogSchema } from "../validators/blogValidators.js";
import { sendOk } from "../utils/response.js";

export async function listBlogsController(_req: Request, res: Response) {
  return sendOk(res, await listBlogs());
}

export async function getBlogController(req: Request, res: Response) {
  return sendOk(res, await getBlogById(String(req.params.id)));
}

export async function createBlogController(req: Request, res: Response) {
  const payload = createBlogSchema.parse(req.body);
  return sendOk(res, await createBlog(payload), 201);
}

export async function updateBlogController(req: Request, res: Response) {
  const payload = updateBlogSchema.parse(req.body);
  return sendOk(res, await updateBlog(String(req.params.id), payload));
}

export async function deleteBlogController(req: Request, res: Response) {
  return sendOk(res, await deleteBlog(String(req.params.id)));
}
