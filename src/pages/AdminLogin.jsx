import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";

function AdminLogin() {
  const { session, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <MainLayout>
      <Seo
        title="Admin Login | Maths Bodhi"
        description="Protected admin login for managing tutors, homepage SEO, reviews, and Gurugram sector content."
        canonicalPath="/admin-login"
        keywords={["admin login", "seo dashboard", "maths bodhi admin"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">Admin Login</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Use the protected credentials to manage homepage content, tutors, reviews, and local
            SEO routes. For deployment, set custom credentials in `.env`.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const result = loginAdmin({ loginId, password });

              if (result.success) {
                navigate("/admin/dashboard");
                return;
              }

              setError(result.error);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Login ID</span>
              <input
                required
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
              />
            </label>

            {error ? (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </p>
            ) : null}

            <button className="w-full rounded-2xl bg-slate-950 px-5 py-4 font-semibold text-white transition hover:bg-slate-800">
              Login to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminLogin;
