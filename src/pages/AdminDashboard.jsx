import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";

const ADMIN_SECTIONS = [
  {
    title: "Manage Tutors",
    description:
      "Create, edit, and organize tutor profiles, featured placements, board fit, and service details.",
  },
  {
    title: "Manage Results",
    description:
      "Maintain student outcomes, parent feedback, and board-specific proof points for each maths route.",
  },
  {
    title: "Manage Boards",
    description:
      "Update board pages, pathway sections, and curriculum-specific content across CBSE, IGCSE, IB, and JEE.",
  },
  {
    title: "Manage Content",
    description:
      "Control FAQs, support sections, chips, calls to action, and future page modules from one dashboard.",
  },
];

function formatLoginTime(timestamp) {
  if (!timestamp) {
    return "Session just started";
  }

  return new Date(timestamp).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  return (
    <MainLayout>
      <Seo
        title="Admin Dashboard | Maths Bodhi"
        description="Development admin dashboard for tutors, board pages, results, and site content."
        canonicalPath="/admin/dashboard"
        keywords={["admin dashboard", "maths bodhi admin"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
                  Development Admin
                </span>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  A simple development workspace for organising tutors, board content, results,
                  and supporting content modules before full database-backed admin tools are added.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/admin/login", { replace: true });
                }}
                className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Logout
              </button>
            </div>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Signed in as</p>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {session?.profile?.name || "Maths Bodhi Admin"}
              </p>
              <p className="mt-2 text-sm text-slate-600">{session?.profile?.username || "admin"}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Last login</p>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {formatLoginTime(session?.loggedInAt)}
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Status</p>
              <p className="mt-2 text-xl font-bold text-slate-950">Ready for content management</p>
              <p className="mt-2 text-sm text-slate-600">
                Connect these modules to API endpoints when the backend auth layer is ready.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Management Areas</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              These sections are prepared for future CRUD workflows while keeping the current app
              stable during development.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {ADMIN_SECTIONS.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-950">{section.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{section.description}</p>
                  <button
                    type="button"
                    className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Open section
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;
