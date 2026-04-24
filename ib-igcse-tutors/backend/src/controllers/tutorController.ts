import type { Request, Response } from "express";
import { createTutor, deleteTutor, getTutorById, listTutors, updateTutor } from "../services/tutorService.js";
import { createTutorSchema, updateTutorSchema } from "../validators/tutorValidators.js";
import { sendOk } from "../utils/response.js";

export async function listTutorsController(_req: Request, res: Response) {
  return sendOk(res, await listTutors());
}

export async function getTutorController(req: Request, res: Response) {
  return sendOk(res, await getTutorById(String(req.params.id)));
}

export async function createTutorController(req: Request, res: Response) {
  const payload = createTutorSchema.parse(req.body);
  return sendOk(res, await createTutor(payload), 201);
}

export async function updateTutorController(req: Request, res: Response) {
  const payload = updateTutorSchema.parse(req.body);
  return sendOk(res, await updateTutor(String(req.params.id), payload));
}

export async function deleteTutorController(req: Request, res: Response) {
  return sendOk(res, await deleteTutor(String(req.params.id)));
}
