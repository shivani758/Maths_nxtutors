import type { Request, Response } from "express";
import { getDashboardSnapshot } from "../services/dashboardService.js";
import { sendOk } from "../utils/response.js";

export async function getDashboardController(_req: Request, res: Response) {
  return sendOk(res, await getDashboardSnapshot());
}
