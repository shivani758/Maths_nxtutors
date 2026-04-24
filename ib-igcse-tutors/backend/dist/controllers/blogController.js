import { createBlog, deleteBlog, getBlogById, listBlogs, updateBlog } from "../services/blogService.js";
import { createBlogSchema, updateBlogSchema } from "../validators/blogValidators.js";
import { sendOk } from "../utils/response.js";
export async function listBlogsController(_req, res) {
    return sendOk(res, await listBlogs());
}
export async function getBlogController(req, res) {
    return sendOk(res, await getBlogById(String(req.params.id)));
}
export async function createBlogController(req, res) {
    const payload = createBlogSchema.parse(req.body);
    return sendOk(res, await createBlog(payload), 201);
}
export async function updateBlogController(req, res) {
    const payload = updateBlogSchema.parse(req.body);
    return sendOk(res, await updateBlog(String(req.params.id), payload));
}
export async function deleteBlogController(req, res) {
    return sendOk(res, await deleteBlog(String(req.params.id)));
}
//# sourceMappingURL=blogController.js.map