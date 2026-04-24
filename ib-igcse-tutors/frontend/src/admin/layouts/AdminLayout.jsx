import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Seo from "../../components/Seo";
import { getAdminBreadcrumbs, adminNavigationGroups, getAdminNavLabel } from "../navigation";
import { useAdminAuth } from "../providers/AdminAuthContext";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, logout } = useAdminAuth();
  const breadcrumbs = getAdminBreadcrumbs(location.pathname);
  const currentLabel = getAdminNavLabel(location.pathname);

  return (
    <>
      <Seo
        title={`${currentLabel} | Maths Bodhi Admin`}
        description="Frontend-only admin workspace for Maths Bodhi content and operations."
        canonicalPath={location.pathname}
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-slate-100">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <aside className="border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                  MB
                </div>
                <div>
                  <p className="text-lg font-bold">Maths Bodhi</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Admin</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Frontend-only content workspace built to swap to real APIs later.
              </p>
            </div>

            <nav className="mt-6 space-y-6">
              {adminNavigationGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {group.label}
                  </p>
                  <div className="mt-3 grid gap-1">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                            isActive
                              ? "bg-white text-slate-950"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">
            <header className="border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur-xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {breadcrumbs.map((item, index) => (
                      <span key={item.to} className="flex items-center gap-2">
                        {index > 0 ? <span>/</span> : null}
                        <span>{item.label}</span>
                      </span>
                    ))}
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {currentLabel}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {session?.profile?.name ?? "Maths Bodhi Admin"}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      {session?.profile?.role ?? "super_admin"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      navigate("/admin/login", { replace: true });
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </header>

            <div className="px-6 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
