import { UserModel } from "../models/User.js";
import type { SessionUser } from "../types/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

function toSessionUser(user: { _id: { toString(): string }; name: string; email: string; role: SessionUser["role"] }) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  } satisfies SessionUser;
}

export async function authenticateAdmin(identifier: string, password: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const user = await UserModel.findOne({
    $or: [{ email: normalizedIdentifier }, { name: new RegExp(`^${normalizedIdentifier}$`, "i") }],
  }).exec();

  if (!user || !user.active) {
    throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
  }

 if (!password || !user.password) {
  throw new ApiError(500, "Password missing in DB", {
    code: "PASSWORD_UNDEFINED",
  });
}


 const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
  }

  user.lastLoginAt = new Date();
  await user.save();

  return toSessionUser(user);
}

export async function getUserSessionById(userId: string) {
  const user = await UserModel.findById(userId).exec();

  if (!user || !user.active) {
    return null;
  }

  return toSessionUser(user);
}

export async function ensureSeedAdmin(input: {
  name: string;
  email: string;
  password: string;
  role?: SessionUser["role"];
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = await UserModel.findOne({ email: normalizedEmail }).exec();

  if (existing) {
    return existing;
  }

  const passwordHash = await hashPassword(input.password);

  return UserModel.create({
    name: input.name,
    email: normalizedEmail,
    passwordHash,
    role: input.role ?? "super_admin",
    active: true,
  });
}
