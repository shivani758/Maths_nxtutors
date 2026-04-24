import mongoose, { Schema, model } from "mongoose";
import { USER_ROLES } from "../types/auth.js";

const portalProfileSchema = new Schema(
  {
    phone: { type: String, default: "" },
    guardianName: { type: String, default: "" },
    city: { type: String, default: "gurugram" },
    board: { type: String, default: "" },
    classLevel: { type: String, default: "" },
    topicPreferences: { type: [String], default: [] },
    localityPreferences: { type: [String], default: [] },
    preferredMode: { type: String, default: "Home Tuition" },
    timingPreference: { type: String, default: "" },
    goal: { type: String, default: "" },
    requirementSummary: { type: String, default: "" },
    enquiryStatus: { type: String, default: "new" },
    demoStatus: { type: String, default: "not_requested" },
    savedTutorIds: { type: [String], default: [] },
    boardSpecializations: { type: [String], default: [] },
    classSegments: { type: [String], default: [] },
    topicSpecializations: { type: [String], default: [] },
    serviceAreas: { type: [String], default: [] },
    serviceModes: { type: [String], default: [] },
    availabilitySummary: { type: String, default: "" },
    profileSummary: { type: String, default: "" },
    experienceYears: { type: Number, default: null },
    qualificationHighlights: { type: [String], default: [] },
    linkedTutorId: { type: String, default: "" },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "admin",
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
      index: true,
    },
    emailVerificationTokenHash: {
      type: String,
      default: "",
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
    },
    emailVerificationSentAt: {
      type: Date,
      default: null,
    },
    portalProfile: {
      type: portalProfileSchema,
      default: () => ({}),
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.models.User || model("User", userSchema);
