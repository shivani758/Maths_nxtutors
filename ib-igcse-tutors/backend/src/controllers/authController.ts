import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { authenticateAdmin, getUserSessionById } from "../services/authService.js";
import { loginSchema } from "../validators/authValidators.js";
import { sendOk } from "../utils/response.js";

export async function loginController(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const user = await authenticateAdmin(payload.identifier, payload.password);
  const existingPortalUser = req.session.portalUser;

  await new Promise<void>((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      req.session.user = user;
      req.session.portalUser = existingPortalUser;
      req.session.save((saveError) => {
        if (saveError) {
          reject(saveError);
          return;
        }
        resolve();
      });
    });
  });

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, { authenticated: true, user });
}

export async function logoutController(req: Request, res: Response) {
  if (req.session.portalUser) {
    req.session.user = undefined;

    await new Promise<void>((resolve, reject) => {
      req.session.save((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    res.setHeader("Cache-Control", "no-store");
    return sendOk(res, { authenticated: false });
  }

  await new Promise<void>((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  res.clearCookie(env.SESSION_COOKIE_NAME);
  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, { authenticated: false });
}

export async function sessionController(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  if (!req.session.user) {
    return sendOk(res, { authenticated: false, user: null });
  }

  const user = await getUserSessionById(req.session.user.id);

  if (!user) {
    req.session.user = undefined;
    return sendOk(res, { authenticated: false, user: null });
  }

  req.session.user = user;
  return sendOk(res, { authenticated: true, user });
}
