import type { Request, Response } from "express";
import { env } from "../config/env.js";
import {
  authenticatePortalUser,
  getPortalSessionById,
  registerPortalAccount,
  resendPortalVerification,
  updatePortalProfile,
  verifyPortalEmail,
} from "../services/portalAuthService.js";
import {
  parsePortalProfileUpdatePayload,
  parsePortalSignupPayload,
  portalLoginPayloadSchema,
  portalVerificationTokenSchema,
} from "../validators/portalAuthValidators.js";
import { sendOk } from "../utils/response.js";

const REMEMBER_ME_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

async function establishPortalSession(
  req: Request,
  portalUser: { id: string; role: "student" | "tutor" },
  rememberMe: boolean,
) {
  const existingAdminUser = req.session.user;

  await new Promise<void>((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      req.session.user = existingAdminUser;
      req.session.portalUser = portalUser;
      req.session.cookie.maxAge = rememberMe ? REMEMBER_ME_MAX_AGE_MS : undefined;
      req.session.save((saveError) => {
        if (saveError) {
          reject(saveError);
          return;
        }

        resolve();
      });
    });
  });
}

export async function portalSignupController(req: Request, res: Response) {
  const payload = parsePortalSignupPayload(req.body);
  const result = await registerPortalAccount(payload);
  await establishPortalSession(req, result.sessionUser, payload.rememberMe);

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, {
    authenticated: true,
    user: result.user,
    verificationPreviewUrl: result.verificationPreviewUrl,
  }, 201);
}

export async function portalLoginController(req: Request, res: Response) {
  const payload = portalLoginPayloadSchema.parse(req.body);
  const result = await authenticatePortalUser(payload);
  await establishPortalSession(req, result.sessionUser, payload.rememberMe);

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, {
    authenticated: true,
    user: result.user,
  });
}

export async function portalLogoutController(req: Request, res: Response) {
  if (req.session.user) {
    req.session.portalUser = undefined;

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

export async function portalSessionController(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  if (!req.session.portalUser) {
    return sendOk(res, { authenticated: false, user: null });
  }

  const user = await getPortalSessionById(req.session.portalUser.id);

  if (!user) {
    req.session.portalUser = undefined;
    return sendOk(res, { authenticated: false, user: null });
  }

  req.session.portalUser = {
    id: user.id,
    role: user.role,
  };

  return sendOk(res, { authenticated: true, user });
}

export async function portalProfileUpdateController(req: Request, res: Response) {
  const sessionUser = req.portalAuthUser!;
  const payload = parsePortalProfileUpdatePayload(sessionUser.role, req.body);
  const user = await updatePortalProfile(sessionUser.id, sessionUser.role, payload);

  req.session.portalUser = {
    id: user.id,
    role: user.role,
  };

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, { authenticated: true, user });
}

export async function portalResendVerificationController(req: Request, res: Response) {
  const sessionUser = req.portalAuthUser!;
  const result = await resendPortalVerification(sessionUser.id);

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, {
    authenticated: true,
    user: result.user,
    verificationPreviewUrl: result.verificationPreviewUrl,
  });
}

export async function portalVerifyEmailController(req: Request, res: Response) {
  const payload = portalVerificationTokenSchema.parse(req.body);
  const user = await verifyPortalEmail(payload.token);

  if (req.session.portalUser?.id === user.id) {
    req.session.portalUser = {
      id: user.id,
      role: user.role,
    };
  }

  res.setHeader("Cache-Control", "no-store");
  return sendOk(res, {
    verified: true,
    user,
  });
}
