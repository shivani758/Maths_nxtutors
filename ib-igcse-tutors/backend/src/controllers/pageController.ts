import type { Request, Response } from "express";
import { createPage, deletePage, getPageById, listPages, updatePage } from "../services/pageService.js";
import { createPageSchema, updatePageSchema } from "../validators/pageValidators.js";
import { sendOk } from "../utils/response.js";

export async function listPagesController(_req: Request, res: Response) {
  return sendOk(res, await listPages());
}

export async function getPageController(req: Request, res: Response) {
  return sendOk(res, await getPageById(String(req.params.id)));
}

export async function createPageController(req: Request, res: Response) {
  const payload = createPageSchema.parse(req.body);
  return sendOk(res, await createPage(payload), 201);
}

export async function updatePageController(req: Request, res: Response) {
  const payload = updatePageSchema.parse(req.body);
  return sendOk(res, await updatePage(String(req.params.id), payload));
}

export async function deletePageController(req: Request, res: Response) {
  return sendOk(res, await deletePage(String(req.params.id)));
}
