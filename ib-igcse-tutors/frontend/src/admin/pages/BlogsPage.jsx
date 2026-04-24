import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBlog, listBlogs } from "../../services/blogsService";
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

function BlogsPage() {
  const { items, loading, error, refresh } = useAdminCollection(listBlogs);
  const { pushToast } = useAdminToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const queryMatch = [item.title, item.summary, item.category, ...(item.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const statusMatch = statusFilter === "all" || item.status === statusFilter;
      return queryMatch && statusMatch;
    });
  }, [items, query, statusFilter]);

  async function handleDelete() {
    await deleteBlog(itemToDelete.id);
    pushToast({ title: `${itemToDelete.title} deleted.`, tone: "warning" });
    setItemToDelete(null);
    await refresh();
  }

  if (loading) {
    return <LoadingPanel label="Loading blogs..." />;
  }

  if (error) {
    return <EmptyState title="Unable to load blogs" description={error} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Editorial"
        title="Blogs"
        description="Manage summaries, body content, SEO fields, and publishing states from a backend-ready frontend editor."
        primaryAction={{ label: "New Blog", to: "/admin/blogs/new" }}
      />

      <SearchAndFilterBar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        queryPlaceholder="Search by title, summary, or tag"
        filters={[
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
              { value: "scheduled", label: "Scheduled" },
            ],
          },
        ]}
      />

      {!filteredItems.length ? (
        <EmptyState
          title="No blogs match these filters"
          description="Create a new blog draft or broaden the current filter set."
          action={<ActionButton label="New Blog" to="/admin/blogs/new" />}
        />
      ) : (
        <EntityTable
          page={page}
          pageSize={8}
          onPageChange={setPage}
          rows={filteredItems}
          emptyLabel="No blogs available."
          columns={[
            {
              key: "title",
              label: "Post",
              render: (item) => (
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                </div>
              ),
            },
            {
              key: "summary",
              label: "Summary",
              render: (item) => <p className="max-w-md text-sm leading-6 text-slate-700">{item.summary}</p>,
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
                    to={`/admin/blogs/${item.id}`}
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
        title="Delete blog?"
        description="This removes the blog record from the connected data source for the blog module."
        confirmLabel="Delete blog"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default BlogsPage;
