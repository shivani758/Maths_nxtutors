import crypto from "node:crypto";
import { UserModel } from "../models/User.js";
import type {
  PortalLoginPayload,
  PortalSignupPayload,
  StudentProfileUpdatePayload,
  TutorProfileUpdatePayload,
} from "../validators/portalAuthValidators.js";
import type { PortalSessionUser, PortalUserRole } from "../types/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";

const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 48;

type PortalUserDocument = {
  _id: { toString(): string };
  name: string;
  email: string;
  role: PortalUserRole;
  active: boolean;
  passwordHash: string;
  emailVerifiedAt: Date | null;
  emailVerificationTokenHash?: string;
  emailVerificationExpiresAt?: Date | null;
  emailVerificationSentAt?: Date | null;
  lastLoginAt?: Date | null;
  portalProfile?: Record<string, unknown>;
  save(): Promise<unknown>;
};

type PortalProfilePatch = StudentProfileUpdatePayload | TutorProfileUpdatePayload;

type SerializedPortalUser = {
  id: string;
  name: string;
  email: string;
  role: PortalUserRole;
  active: boolean;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  verificationPending: boolean;
  profile: ReturnType<typeof sanitizePortalProfile>;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizeText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeStringList(values: unknown, fallback: string[] = []) {
  if (!Array.isArray(values)) {
    return fallback;
  }

  return [...new Set(values.map((item) => normalizeText(item)).filter(Boolean))];
}

function normalizeExperienceYears(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function createDefaultPortalProfile() {
  return {
    phone: "",
    guardianName: "",
    city: "gurugram",
    board: "",
    classLevel: "",
    topicPreferences: [] as string[],
    localityPreferences: [] as string[],
    preferredMode: "Home Tuition",
    timingPreference: "",
    goal: "",
    requirementSummary: "",
    enquiryStatus: "new",
    demoStatus: "not_requested",
    savedTutorIds: [] as string[],
    boardSpecializations: [] as string[],
    classSegments: [] as string[],
    topicSpecializations: [] as string[],
    serviceAreas: [] as string[],
    serviceModes: [] as string[],
    availabilitySummary: "",
    profileSummary: "",
    experienceYears: null as number | null,
    qualificationHighlights: [] as string[],
    linkedTutorId: "",
  };
}

function sanitizePortalProfile(value: unknown) {
  const profile = {
    ...createDefaultPortalProfile(),
    ...(value && typeof value === "object" ? (value as Record<string, unknown>) : {}),
  };

  return {
    phone: normalizeText(profile.phone),
    guardianName: normalizeText(profile.guardianName),
    city: normalizeText(profile.city, "gurugram"),
    board: normalizeText(profile.board),
    classLevel: normalizeText(profile.classLevel),
    topicPreferences: normalizeStringList(profile.topicPreferences),
    localityPreferences: normalizeStringList(profile.localityPreferences),
    preferredMode: normalizeText(profile.preferredMode, "Home Tuition"),
    timingPreference: normalizeText(profile.timingPreference),
    goal: normalizeText(profile.goal),
    requirementSummary: normalizeText(profile.requirementSummary),
    enquiryStatus: normalizeText(profile.enquiryStatus, "new"),
    demoStatus: normalizeText(profile.demoStatus, "not_requested"),
    savedTutorIds: normalizeStringList(profile.savedTutorIds),
    boardSpecializations: normalizeStringList(profile.boardSpecializations),
    classSegments: normalizeStringList(profile.classSegments),
    topicSpecializations: normalizeStringList(profile.topicSpecializations),
    serviceAreas: normalizeStringList(profile.serviceAreas),
    serviceModes: normalizeStringList(profile.serviceModes),
    availabilitySummary: normalizeText(profile.availabilitySummary),
    profileSummary: normalizeText(profile.profileSummary),
    experienceYears: normalizeExperienceYears(profile.experienceYears),
    qualificationHighlights: normalizeStringList(profile.qualificationHighlights),
    linkedTutorId: normalizeText(profile.linkedTutorId),
  };
}

function buildStudentProfile(patch: StudentProfileUpdatePayload, existing?: unknown) {
  const current = sanitizePortalProfile(existing);

  return sanitizePortalProfile({
    ...current,
    phone: patch.phone ?? current.phone,
    guardianName: patch.guardianName ?? current.guardianName,
    city: patch.city ?? current.city,
    board: patch.board ?? current.board,
    classLevel: patch.classLevel ?? current.classLevel,
    topicPreferences: patch.topicPreferences ?? current.topicPreferences,
    localityPreferences: patch.localityPreferences ?? current.localityPreferences,
    preferredMode: patch.preferredMode ?? current.preferredMode,
    timingPreference: patch.timingPreference ?? current.timingPreference,
    goal: patch.goal ?? current.goal,
    requirementSummary: patch.requirementSummary ?? current.requirementSummary,
    enquiryStatus: patch.enquiryStatus ?? current.enquiryStatus,
    demoStatus: patch.demoStatus ?? current.demoStatus,
    savedTutorIds: patch.savedTutorIds ?? current.savedTutorIds,
  });
}

function buildTutorProfile(patch: TutorProfileUpdatePayload, existing?: unknown) {
  const current = sanitizePortalProfile(existing);

  return sanitizePortalProfile({
    ...current,
    phone: patch.phone ?? current.phone,
    city: patch.city ?? current.city,
    boardSpecializations: patch.boardSpecializations ?? current.boardSpecializations,
    classSegments: patch.classSegments ?? current.classSegments,
    topicSpecializations: patch.topicSpecializations ?? current.topicSpecializations,
    serviceAreas: patch.serviceAreas ?? current.serviceAreas,
    serviceModes: patch.serviceModes ?? current.serviceModes,
    availabilitySummary: patch.availabilitySummary ?? current.availabilitySummary,
    profileSummary: patch.profileSummary ?? current.profileSummary,
    experienceYears:
      patch.experienceYears === undefined ? current.experienceYears : patch.experienceYears,
    qualificationHighlights: patch.qualificationHighlights ?? current.qualificationHighlights,
    linkedTutorId: patch.linkedTutorId ?? current.linkedTutorId,
  });
}

function isPortalRole(role: unknown): role is PortalUserRole {
  return role === "student" || role === "tutor";
}

function toPortalSessionUser(user: SerializedPortalUser): PortalSessionUser {
  return {
    id: user.id,
    role: user.role,
  };
}

function serializePortalUser(user: PortalUserDocument): SerializedPortalUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    active: Boolean(user.active),
    emailVerified: Boolean(user.emailVerifiedAt),
    emailVerifiedAt: user.emailVerifiedAt ? user.emailVerifiedAt.toISOString() : null,
    verificationPending: !user.emailVerifiedAt,
    profile: sanitizePortalProfile(user.portalProfile),
  };
}

function createVerificationToken() {
  const token = crypto.randomBytes(24).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return {
    token,
    tokenHash,
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
  };
}

function buildVerificationPreviewUrl(token: string) {
  return `http://localhost:5173/verify-email?token=${token}`;
}

function logVerificationPreview(email: string, previewUrl: string) {
  console.log(`[Maths Bodhi] Email verification for ${email}: ${previewUrl}`);
}

async function findPortalUserById(userId: string) {
  const user = await UserModel.findById(userId).exec();

  if (!user || !isPortalRole(user.role)) {
    return null;
  }

  return user as unknown as PortalUserDocument;
}

export async function registerPortalAccount(payload: PortalSignupPayload) {
  const normalizedEmail = normalizeEmail(payload.email);
  const existingUser = await UserModel.findOne({ email: normalizedEmail }).exec();

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.", {
      code: "EMAIL_ALREADY_IN_USE",
      details: createFieldErrorDetails("email", "An account with this email already exists."),
    });
  }

  const passwordHash = await hashPassword(payload.password);
  const verification = createVerificationToken();
  const portalProfile =
    payload.role === "student"
      ? buildStudentProfile(payload.profile)
      : buildTutorProfile(payload.profile);

  const user = (await UserModel.create({
    name: payload.name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: payload.role,
    active: true,
    emailVerifiedAt: null,
    emailVerificationTokenHash: verification.tokenHash,
    emailVerificationExpiresAt: verification.expiresAt,
    emailVerificationSentAt: new Date(),
    portalProfile,
  })) as unknown as PortalUserDocument;

  const previewUrl = buildVerificationPreviewUrl(verification.token);
  logVerificationPreview(normalizedEmail, previewUrl);

  return {
    user: serializePortalUser(user),
    sessionUser: toPortalSessionUser(serializePortalUser(user)),
    verificationPreviewUrl: previewUrl,
  };
}

export async function authenticatePortalUser(payload: PortalLoginPayload) {
  const normalizedEmail = normalizeEmail(payload.email);
  const user = (await UserModel.findOne({
    email: normalizedEmail,
    role: payload.role,
  }).exec()) as PortalUserDocument | null;

  if (!user || !user.active) {
    throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
  }

  const isValidPassword = await verifyPassword(payload.password, user.passwordHash);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const serializedUser = serializePortalUser(user);

  return {
    user: serializedUser,
    sessionUser: toPortalSessionUser(serializedUser),
  };
}

export async function getPortalSessionById(userId: string) {
  const user = await findPortalUserById(userId);

  if (!user || !user.active) {
    return null;
  }

  return serializePortalUser(user);
}

export async function updatePortalProfile(
  userId: string,
  role: PortalUserRole,
  payload: { name?: string; profile: PortalProfilePatch },
) {
  const user = await findPortalUserById(userId);

  if (!user || !user.active || user.role !== role) {
    throw new ApiError(404, "Portal account not found.", { code: "PORTAL_USER_NOT_FOUND" });
  }

  if (payload.name !== undefined) {
    user.name = payload.name.trim();
  }

  user.portalProfile =
    role === "student"
      ? buildStudentProfile(payload.profile as StudentProfileUpdatePayload, user.portalProfile)
      : buildTutorProfile(payload.profile as TutorProfileUpdatePayload, user.portalProfile);

  await user.save();
  return serializePortalUser(user);
}

export async function resendPortalVerification(userId: string) {
  const user = await findPortalUserById(userId);

  if (!user || !user.active) {
    throw new ApiError(404, "Portal account not found.", { code: "PORTAL_USER_NOT_FOUND" });
  }

  if (user.emailVerifiedAt) {
    return {
      user: serializePortalUser(user),
      verificationPreviewUrl: null,
    };
  }

  const verification = createVerificationToken();
  user.emailVerificationTokenHash = verification.tokenHash;
  user.emailVerificationExpiresAt = verification.expiresAt;
  user.emailVerificationSentAt = new Date();
  await user.save();

  const previewUrl = buildVerificationPreviewUrl(verification.token);
  logVerificationPreview(user.email, previewUrl);

  return {
    user: serializePortalUser(user),
    verificationPreviewUrl: previewUrl,
  };
}

export async function verifyPortalEmail(token: string) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = (await UserModel.findOne({
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpiresAt: { $gt: new Date() },
    role: { $in: ["student", "tutor"] },
  }).exec()) as PortalUserDocument | null;

  if (!user || !isPortalRole(user.role) || !user.active) {
    throw new ApiError(400, "This verification link is invalid or has expired.", {
      code: "INVALID_VERIFICATION_TOKEN",
      details: createFieldErrorDetails("token", "This verification link is invalid or has expired."),
    });
  }

  user.emailVerifiedAt = new Date();
  user.emailVerificationTokenHash = "";
  user.emailVerificationExpiresAt = null;
  await user.save();

  return serializePortalUser(user);
}
