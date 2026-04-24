import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Seo from "../../components/Seo";
import { useAdminAuth } from "../providers/AdminAuthContext";
import { LoadingPanel } from "../components/primitives";

function AdminLoginPage() {
  const { isAuthenticated, isLoadingAuth, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (isLoadingAuth) {
    return <LoadingPanel label="Loading admin session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Seo
        title="Admin Login | Maths Bodhi"
        description="Secure admin login for the Maths Bodhi content workspace."
        canonicalPath="/admin/login"
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-slate-100 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
              Admin Workspace
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight">Maths Bodhi admin login</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Sign in to the real admin foundation for tutors, blogs, reviews, and student results.
              The session is backed by the server so the frontend no longer carries development credentials.
            </p>
            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
              <p>
                Use the seeded admin email and password from the backend environment.
              </p>
              <p className="mt-3">
                This session uses the backend auth API and secure cookies for local development.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Sign in to admin</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Continue to the connected admin workspace for tutors, reviews, results, blogs, and the rest of the Maths Bodhi content system.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                try {
                  const result = await login(form);

                  if (result.success) {
                    navigate(location.state?.from || "/admin/dashboard", { replace: true });
                  }
                } catch (loginError) {
                  setError(loginError.message || "Unable to sign in right now.");
                }
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                <input
                  autoComplete="username"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {error}
                </p>
              ) : null}

              <button className="w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700">
                Continue to admin dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
