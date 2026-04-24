import { Router } from "express";
import { createPageController, deletePageController, getPageController, listPagesController, updatePageController, } from "../../controllers/pageController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const pageRoutes = Router();
pageRoutes.get("/", asyncHandler(listPagesController));
pageRoutes.get("/:id", asyncHandler(getPageController));
pageRoutes.post("/", asyncHandler(createPageController));
pageRoutes.put("/:id", asyncHandler(updatePageController));
pageRoutes.delete("/:id", asyncHandler(deletePageController));
export default pageRoutes;
//# sourceMappingURL=pageRoutes.js.map