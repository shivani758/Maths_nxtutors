import type { Request, Response } from "express";
import {
  createStudentResult,
  deleteStudentResult,
  getStudentResultById,
  listStudentResults,
  updateStudentResult,
} from "../services/studentResultService.js";
import {
  createStudentResultSchema,
  updateStudentResultSchema,
} from "../validators/studentResultValidators.js";
import { sendOk } from "../utils/response.js";

export async function listStudentResultsController(_req: Request, res: Response) {
  return sendOk(res, await listStudentResults());
}

export async function getStudentResultController(req: Request, res: Response) {
  return sendOk(res, await getStudentResultById(String(req.params.id)));
}

export async function createStudentResultController(req: Request, res: Response) {
  const payload = createStudentResultSchema.parse(req.body);
  return sendOk(res, await createStudentResult(payload), 201);
}

export async function updateStudentResultController(req: Request, res: Response) {
  const payload = updateStudentResultSchema.parse(req.body);
  return sendOk(res, await updateStudentResult(String(req.params.id), payload));
}

export async function deleteStudentResultController(req: Request, res: Response) {
  return sendOk(res, await deleteStudentResult(String(req.params.id)));
}
