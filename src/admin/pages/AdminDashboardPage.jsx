import { Link } from "react-router-dom";
import { useAdminCollection } from "../hooks/useAdminCollection";
import { getDashboardSnapshot } from "../../services/dashboardService";
import { AdminPageHeader, AdminStatCard, EmptyState, LoadingPanel } from "../components/primitives";

function AdminDashboardPage() {
  const { items: dashboard, loading, error } = useAdminCollection(getDashboardSnapshot);

  if (loading) {
    return <LoadingPanel label="Loading dashboard..." />;
  }

  if (error) {
    return <EmptyState title="Unable to load dashboard" description={error} />;
  }

  const snapshot = dashboard;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Overview"
        title="Admin Dashboard"
        description="A connected control room for Maths Bodhi content, with the first real backend modules now feeding auth, tutors, blogs, reviews, and results."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.summaryCards.map((card) => (
          <AdminStatCard
            key={card.label}
            label={card.label}
            value={card.value}
            helper={card.helper}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Quick actions</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Start the most common workflows without losing context.
          </p>
          <div className="mt-6 grid gap-3">
            {snapshot.quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Recent admin activity</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Recent tutor and blog updates help the team keep track of the first connected content modules.
          </p>
          <div className="mt-6 space-y-3">
            {snapshot.recentActivity.map((activity) => (
              <article
                key={activity.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {activity.action} in {activity.module}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {activity.entityLabel || "Updated content"} by {activity.actorName}
                    </p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {new Date(activity.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
