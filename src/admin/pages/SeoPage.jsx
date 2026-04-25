import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSeoOverview, saveSettings, getSettings } from "../../services/settingsService";
import { AdminPageHeader, EmptyState, LoadingPanel, StatusBadge } from "../components/primitives";
import { EntityTable } from "../tables/EntityTable";
import { SeoFieldsPanel } from "../forms/primitives";
import { useAdminToast } from "../providers/AdminToastContext";

function SeoPage() {
  const { pushToast } = useAdminToast();
  const [overview, setOverview] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    Promise.all([getSeoOverview(), getSettings()]).then(([nextOverview, nextSettings]) => {
      setOverview(nextOverview);
      setSettings(nextSettings);
    });
  }, []);

  if (!overview || !settings) {
    return <LoadingPanel label="Loading SEO controls..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="SEO"
        title="SEO Controls"
        description="Manage safe global SEO defaults here, then edit entity-level SEO fields inside pages and blogs."
        primaryAction={{
          label: "Save SEO defaults",
          onClick: async () => {
            await saveSettings({ seo: settings.seo });
            pushToast({ title: "SEO defaults saved." });
          },
        }}
      />

      <SeoFieldsPanel
        value={settings.seo}
        onChange={(seo) => setSettings((current) => ({ ...current, seo }))}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Page SEO coverage</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Review whether public-facing pages have the basic metadata they need.
            </p>
          </div>
          {!overview.pages.length ? (
            <EmptyState title="No pages available" description="Create pages first to inspect SEO coverage." />
          ) : (
            <EntityTable
              page={1}
              pageSize={999}
              onPageChange={() => {}}
              rows={overview.pages}
              emptyLabel="No pages found."
              columns={[
                {
                  key: "title",
                  label: "Page",
                  render: (item) => (
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.type}</p>
                    </div>
                  ),
                },
                {
                  key: "status",
                  label: "Status",
                  render: (item) => <StatusBadge status={item.status} />,
                },
                {
                  key: "seo",
                  label: "SEO",
                  render: (item) => (
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.hasSeoTitle ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.hasSeoTitle ? "Title ready" : "Title missing"}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.hasSeoDescription ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.hasSeoDescription ? "Description ready" : "Description missing"}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "action",
                  label: "Edit",
                  render: (item) => (
                    <Link
                      to={`/admin/pages/${item.id}`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Edit page
                    </Link>
                  ),
                },
              ]}
            />
          )}
        </section>

        <section className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Blog SEO coverage</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Use this list to spot drafts or live posts that still need stronger metadata.
            </p>
          </div>
          {!overview.blogs.length ? (
            <EmptyState title="No blogs available" description="Create blog posts first to inspect SEO coverage." />
          ) : (
            <EntityTable
              page={1}
              pageSize={999}
              onPageChange={() => {}}
              rows={overview.blogs}
              emptyLabel="No blogs found."
              columns={[
                {
                  key: "title",
                  label: "Blog",
                  render: (item) => <p className="text-sm font-semibold text-slate-900">{item.title}</p>,
                },
                {
                  key: "status",
                  label: "Status",
                  render: (item) => <StatusBadge status={item.status} />,
                },
                {
                  key: "seo",
                  label: "SEO",
                  render: (item) => (
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.hasSeoTitle ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.hasSeoTitle ? "Title ready" : "Title missing"}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.hasSeoDescription ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.hasSeoDescription ? "Description ready" : "Description missing"}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "action",
                  label: "Edit",
                  render: (item) => (
                    <Link
                      to={`/admin/blogs/${item.id}`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Edit blog
                    </Link>
                  ),
                },
              ]}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default SeoPage;
