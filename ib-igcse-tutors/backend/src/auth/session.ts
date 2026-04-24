import session from "express-session";
import MongoStore from "connect-mongo";
import { env, isProduction } from "../config/env.js";

export function createSessionMiddleware() {
  return session({
    name: env.SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
      collectionName: "admin_sessions",
    }),
    cookie: {
      httpOnly: true,
      sameSite: env.SESSION_COOKIE_SAME_SITE,
      secure: env.SESSION_COOKIE_SECURE,
      domain: env.SESSION_COOKIE_DOMAIN,
      maxAge: undefined,
    },
  });
}
