import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deletePage, listPages } from "../../services/pagesService";
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

function PagesPage() {
  const { items, loading, error, refresh } = useAdminCollection(listPages);
  const { pushToast } = useAdminToast();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const queryMatch = [item.label, item.h1, item.intro, item.route]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const typeMatch = typeFilter === "all" || item.pageType === typeFilter;
      const statusMatch = statusFilter === "all" || item.status === statusFilter;
      return queryMatch && typeMatch && statusMatch;
    });
  }, [items, query, statusFilter, typeFilter]);

  async function handleDelete() {
    await deletePage(itemToDelete.id);
    pushToast({ title: `${itemToDelete.label || itemToDelete.title} deleted.`, tone: "warning" });
    setItemToDelete(null);
    await refresh();
  }

  if (loading) {
    return <LoadingPanel label="Loading pages..." />;
  }

  if (error) {
    return <EmptyState title="Unable to load pages" description={error} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Pages"
        title="Pages"
        description="Board and subject content is centralized here so public pages can shift to future APIs without UI rewrites."
        primaryAction={{ label: "Create Page", to: "/admin/pages/new" }}
      />

      <SearchAndFilterBar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        queryPlaceholder="Search by page label, H1, or route"
        filters={[
          {
            key: "type",
            label: "Page Type",
            value: typeFilter,
            onChange: (value) => {
              setTypeFilter(value);
              setPage(1);
            },
            options: [
              { value: "all", label: "All types" },
              { value: "board", label: "Board" },
              { value: "subject", label: "Subject" },
            ],
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
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "archived", label: "Archived" },
            ],
          },
        ]}
      />

      {!filteredItems.length ? (
        <EmptyState
          title="No pages match these filters"
          description="Create a new page or adjust the current search criteria."
          action={<ActionButton label="Create Page" to="/admin/pages/new" />}
        />
      ) : (
        <EntityTable
          page={page}
          pageSize={8}
          onPageChange={setPage}
          rows={filteredItems}
          emptyLabel="No pages available."
          columns={[
            {
              key: "title",
              label: "Page",
              render: (item) => (
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.label || item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.route}</p>
                </div>
              ),
            },
            {
              key: "pageType",
              label: "Type",
              render: (item) => <p className="text-sm font-semibold capitalize text-slate-700">{item.pageType}</p>,
            },
            {
              key: "status",
              label: "Status",
              render: (item) => <StatusBadge status={item.status} />,
            },
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/admin/pages/${item.id}`}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Edit
                  </Link>
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
        title="Delete page?"
        description="This removes the page and any linked FAQ records from the frontend mock store."
        confirmLabel="Delete page"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default PagesPage;
