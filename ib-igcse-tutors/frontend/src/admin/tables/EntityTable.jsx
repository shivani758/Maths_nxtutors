import { StatusBadge } from "../components/primitives";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4">
      <p className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function DefaultCell({ value }) {
  if (value == null || value === "") {
    return <span className="text-slate-400">-</span>;
  }

  if (typeof value === "string" && ["active", "inactive", "draft", "published", "pending", "approved", "scheduled", "archived", "ready"].includes(value.toLowerCase())) {
    return <StatusBadge status={value} />;
  }

  return <span className="text-sm text-slate-700">{String(value)}</span>;
}

export function EntityTable({
  columns,
  rows,
  emptyLabel,
  page,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

  if (!rows.length) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-600">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {visibleRows.map((row) => (
              <tr key={row.id} className="align-top">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4">
                    {column.render ? (
                      column.render(row)
                    ) : (
                      <DefaultCell value={row[column.key]} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
