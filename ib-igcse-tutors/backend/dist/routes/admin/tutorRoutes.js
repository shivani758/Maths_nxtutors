import { Router } from "express";
import { createTutorController, deleteTutorController, getTutorController, listTutorsController, updateTutorController, } from "../../controllers/tutorController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const tutorRoutes = Router();
tutorRoutes.get("/", asyncHandler(listTutorsController));
tutorRoutes.get("/:id", asyncHandler(getTutorController));
tutorRoutes.post("/", asyncHandler(createTutorController));
tutorRoutes.put("/:id", asyncHandler(updateTutorController));
tutorRoutes.delete("/:id", asyncHandler(deleteTutorController));
export default tutorRoutes;
//# sourceMappingURL=tutorRoutes.js.map