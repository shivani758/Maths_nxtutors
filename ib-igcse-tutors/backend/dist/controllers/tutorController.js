import { createTutor, deleteTutor, getTutorById, listTutors, updateTutor } from "../services/tutorService.js";
import { createTutorSchema, updateTutorSchema } from "../validators/tutorValidators.js";
import { sendOk } from "../utils/response.js";
export async function listTutorsController(_req, res) {
    return sendOk(res, await listTutors());
}
export async function getTutorController(req, res) {
    return sendOk(res, await getTutorById(String(req.params.id)));
}
export async function createTutorController(req, res) {
    const payload = createTutorSchema.parse(req.body);
    return sendOk(res, await createTutor(payload), 201);
}
export async function updateTutorController(req, res) {
    const payload = updateTutorSchema.parse(req.body);
    return sendOk(res, await updateTutor(String(req.params.id), payload));
}
export async function deleteTutorController(req, res) {
    return sendOk(res, await deleteTutor(String(req.params.id)));
}
//# sourceMappingURL=tutorController.js.map