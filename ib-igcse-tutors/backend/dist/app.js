import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createSessionMiddleware } from "./auth/session.js";
import { requireAuth, requireRole } from "./auth/accessControl.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/admin/blogRoutes.js";
import dashboardRoutes from "./routes/admin/dashboardRoutes.js";
import pageRoutes from "./routes/admin/pageRoutes.js";
import reviewRoutes from "./routes/admin/reviewRoutes.js";
import studentResultRoutes from "./routes/admin/studentResultRoutes.js";
import tutorRoutes from "./routes/admin/tutorRoutes.js";
import portalAuthRoutes from "./routes/portalAuthRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
export function createApp() {
    const app = express();
    const allowedOrigins = new Set(env.FRONTEND_ORIGINS);
    if (env.NODE_ENV !== "production") {
        allowedOrigins.add("http://localhost:5173");
        allowedOrigins.add("http://127.0.0.1:5173");
        allowedOrigins.add("http://localhost:4173");
        allowedOrigins.add("http://127.0.0.1:4173");
    }
    app.set("trust proxy", 1);
    app.use(cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }
            callback(null, false);
        },
        credentials: true,
    }));
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
    app.use(createSessionMiddleware());
    app.get("/api/health", (_req, res) => {
        res.json({ success: true, data: { status: "ok" } });
    });
    app.use("/api/auth", authRoutes);
    app.use("/api/portal-auth", portalAuthRoutes);
    app.use("/api/public", publicRoutes);
    app.use("/api/admin/dashboard", requireAuth, dashboardRoutes);
    app.use("/api/admin/tutors", requireRole(["super_admin", "admin", "editor"]), tutorRoutes);
    app.use("/api/admin/blogs", requireRole(["super_admin", "admin", "editor"]), blogRoutes);
    app.use("/api/admin/pages", requireRole(["super_admin", "admin", "editor"]), pageRoutes);
    app.use("/api/admin/reviews", requireRole(["super_admin", "admin", "editor"]), reviewRoutes);
    app.use("/api/admin/results", requireRole(["super_admin", "admin", "editor"]), studentResultRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map