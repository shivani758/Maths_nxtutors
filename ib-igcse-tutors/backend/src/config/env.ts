import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const rawEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().min(1).default(process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1, "MONGO_URI is required."),
  SESSION_SECRET: z.string().min(16, "SESSION_SECRET must be at least 16 characters."),
  SESSION_COOKIE_NAME: z.string().min(1).default("maths_bodhi_admin_sid"),
  SESSION_COOKIE_SAME_SITE: z.enum(["lax", "strict", "none"]).optional(),
  SESSION_COOKIE_SECURE: z.coerce.boolean().optional(),
  SESSION_COOKIE_DOMAIN: z.string().trim().optional(),
  FRONTEND_ORIGIN: z.string().min(1).default("http://localhost:5173"),
  ADMIN_SEED_NAME: z.string().min(1).default("Maths Bodhi Super Admin"),
  ADMIN_SEED_EMAIL: z.string().email(),
  ADMIN_SEED_PASSWORD: z.string().min(8, "ADMIN_SEED_PASSWORD must be at least 8 characters."),
});

const rawEnv = rawEnvSchema.parse(process.env);

function parseFrontendOrigins(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const env = {
  ...rawEnv,
  FRONTEND_ORIGINS: parseFrontendOrigins(rawEnv.FRONTEND_ORIGIN),
  SESSION_COOKIE_SAME_SITE:
    rawEnv.SESSION_COOKIE_SAME_SITE ?? (rawEnv.NODE_ENV === "production" ? "none" : "lax"),
  SESSION_COOKIE_SECURE:
    rawEnv.SESSION_COOKIE_SECURE ?? (rawEnv.NODE_ENV === "production"),
  SESSION_COOKIE_DOMAIN: rawEnv.SESSION_COOKIE_DOMAIN || undefined,
};

export const isProduction = env.NODE_ENV === "production";
