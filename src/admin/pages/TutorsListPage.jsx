import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTutor, listTutors, toggleTutorFeatured, toggleTutorStatus } from "../../services/tutorsService";
import { useAdminCollection } from "../hooks/useAdminCollection";
import {
  ActionButton,
  AdminPageHeader,
  ConfirmDialog,
  EmptyState,
  LoadingPanel,
  SearchAndFilterBar,
  StatusBadge,
} from "../components/primitives";
import { EntityTable } from "../tables/EntityTable";
import { useAdminToast } from "../providers/AdminToastContext";

function TutorsListPage() {
  const { items, loading, error, refresh } = useAdminCollection(listTutors);
  const { pushToast } = useAdminToast();
  const [query, setQuery] = useState("");
  const [boardFilter, setBoardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemToDelete, setItemToDelete] = useState(null);

  const boardOptions = useMemo(
    () => ["all", ...new Set(items.flatMap((item) => item.boards ?? []))],
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const queryMatch = [item.name, item.title, ...(item.topics ?? []), ...(item.localities ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const boardMatch = boardFilter === "all" || item.boards?.includes(boardFilter);
      const statusMatch = statusFilter === "all" || item.status === statusFilter;
      const featuredMatch =
        featuredFilter === "all" ||
        (featuredFilter === "featured" ? item.featured : !item.featured);

      return queryMatch && boardMatch && statusMatch && featuredMatch;
    });
  }, [boardFilter, featuredFilter, items, query, statusFilter]);

  async function handleDelete() {
    await deleteTutor(itemToDelete.id);
    pushToast({ title: `${itemToDelete.tutor.name || itemToDelete.name} deleted.`, tone: "warning" });
    setItemToDelete(null);
    await refresh();
  }

  if (loading) {
    return <LoadingPanel label="Loading tutors..." />;
  }

  if (error) {
    return <EmptyState title="Unable to load tutors" description={error} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Tutor Management"
        title="Tutors"
        description="Manage listing content, profile depth, local availability, and featured placement from one modular workspace."
        primaryAction={{ label: "Add Tutor", to: "/admin/tutors/new" }}
      />

      <SearchAndFilterBar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        queryPlaceholder="Search by tutor, topic, or locality"
        filters={[
          {
            key: "board",
            label: "Board",
            value: boardFilter,
            onChange: (value) => {
              setBoardFilter(value);
              setPage(1);
            },
            options: boardOptions.map((value) => ({
              value,
              label: value === "all" ? "All boards" : value,
            })),
          },
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            onChange: (value) => {
              setStatusFilter(value);
              setPage(1);
            },
            options: [
              { value: "all", label: "All statuses" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
          {
            key: "featured",
            label: "Featured",
            value: featuredFilter,
            onChange: (value) => {
              setFeaturedFilter(value);
              setPage(1);
            },
            options: [
              { value: "all", label: "All tutors" },
              { value: "featured", label: "Featured only" },
              { value: "regular", label: "Not featured" },
            ],
          },
        ]}
      />

      {!filteredItems.length ? (
        <EmptyState
          title="No tutors match these filters"
          description="Try a broader search or create a new tutor profile."
          action={<ActionButton label="Add Tutor" to="/admin/tutors/new" />}
        />
      ) : (
        <EntityTable
          page={page}
          pageSize={8}
          onPageChange={setPage}
          rows={filteredItems}
          emptyLabel="No tutors available."
          columns={[
            {
              key: "name",
              label: "Tutor",
              render: (item) => (
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.title}</p>
                </div>
              ),
            },
            {
              key: "boards",
              label: "Boards",
              render: (item) => (
                <p className="text-sm text-slate-700">{(item.boards ?? []).join(", ")}</p>
              ),
            },
            {
              key: "localities",
              label: "Localities",
              render: (item) => (
                <p className="text-sm text-slate-700">{(item.localities ?? []).slice(0, 3).join(", ")}</p>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (item) => <StatusBadge status={item.status} />,
            },
            {
              key: "featured",
              label: "Featured",
              render: (item) => (
                <button
                  type="button"
                  onClick={async () => {
                    await toggleTutorFeatured(item.id);
                    pushToast({ title: `${item.name} updated.` });
                    await refresh();
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.featured
                      ? "bg-blue-50 text-blue-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.featured ? "Featured" : "Regular"}
                </button>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/admin/tutors/${item.id}`}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      await toggleTutorStatus(item.id);
                      pushToast({ title: `${item.name} status updated.` });
                      await refresh();
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Toggle Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={Boolean(itemToDelete)}
        title="Delete tutor?"
        description="This removes the tutor and linked mock profile details from the frontend store."
        confirmLabel="Delete tutor"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default TutorsListPage;
