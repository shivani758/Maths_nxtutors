import { Router } from "express";
import { createStudentResultController, deleteStudentResultController, getStudentResultController, listStudentResultsController, updateStudentResultController, } from "../../controllers/studentResultController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const studentResultRoutes = Router();
studentResultRoutes.get("/", asyncHandler(listStudentResultsController));
studentResultRoutes.get("/:id", asyncHandler(getStudentResultController));
studentResultRoutes.post("/", asyncHandler(createStudentResultController));
studentResultRoutes.put("/:id", asyncHandler(updateStudentResultController));
studentResultRoutes.delete("/:id", asyncHandler(deleteStudentResultController));
export default studentResultRoutes;
//# sourceMappingURL=studentResultRoutes.js.map