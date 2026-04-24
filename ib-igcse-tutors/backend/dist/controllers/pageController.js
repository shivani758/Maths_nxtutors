import { createPage, deletePage, getPageById, listPages, updatePage } from "../services/pageService.js";
import { createPageSchema, updatePageSchema } from "../validators/pageValidators.js";
import { sendOk } from "../utils/response.js";
export async function listPagesController(_req, res) {
    return sendOk(res, await listPages());
}
export async function getPageController(req, res) {
    return sendOk(res, await getPageById(String(req.params.id)));
}
export async function createPageController(req, res) {
    const payload = createPageSchema.parse(req.body);
    return sendOk(res, await createPage(payload), 201);
}
export async function updatePageController(req, res) {
    const payload = updatePageSchema.parse(req.body);
    return sendOk(res, await updatePage(String(req.params.id), payload));
}
export async function deletePageController(req, res) {
    return sendOk(res, await deletePage(String(req.params.id)));
}
//# sourceMappingURL=pageController.js.map