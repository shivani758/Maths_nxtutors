import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";

function AdminLogin() {
  const { session, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const redirectPath = location.state?.from || "/admin/dashboard";

  return (
    <MainLayout>
      <Seo
        title="Admin Login | Maths Bodhi"
        description="Protected admin login for the Maths Bodhi development dashboard."
        canonicalPath="/admin/login"
        keywords={["admin login", "maths bodhi admin"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
            Admin Access
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
            Admin login
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            Sign in to open the development dashboard for tutors, boards, results, and content
            sections.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");

              const result = loginAdmin({ username, password });

              if (result.success) {
                navigate(redirectPath, { replace: true });
                return;
              }

              setError(result.error);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Username</span>
              <input
                required
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-950 outline-none transition focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-950 outline-none transition focus:border-blue-500"
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </p>
            ) : null}

            <button className="w-full rounded-2xl bg-slate-950 px-5 py-4 font-semibold text-white transition hover:bg-slate-800">
              Login to admin dashboard
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminLogin;
