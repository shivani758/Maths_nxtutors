import { Router } from "express";
import { createBlogController, deleteBlogController, getBlogController, listBlogsController, updateBlogController, } from "../../controllers/blogController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const blogRoutes = Router();
blogRoutes.get("/", asyncHandler(listBlogsController));
blogRoutes.get("/:id", asyncHandler(getBlogController));
blogRoutes.post("/", asyncHandler(createBlogController));
blogRoutes.put("/:id", asyncHandler(updateBlogController));
blogRoutes.delete("/:id", asyncHandler(deleteBlogController));
export default blogRoutes;
//# sourceMappingURL=blogRoutes.js.map