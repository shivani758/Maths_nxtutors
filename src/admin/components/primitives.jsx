import { Link } from "react-router-dom";

export function StatusBadge({ status }) {
  const tones = {
    active: "border-emerald-200 bg-emerald-50 text-emerald-700",
    published: "border-emerald-200 bg-emerald-50 text-emerald-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
    inactive: "border-slate-200 bg-slate-100 text-slate-700",
    draft: "border-amber-200 bg-amber-50 text-amber-700",
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    scheduled: "border-blue-200 bg-blue-50 text-blue-700",
    archived: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        tones[String(status ?? "").toLowerCase()] ?? "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {String(status ?? "unknown")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}
    </span>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-start md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        {secondaryAction ? <ActionButton {...secondaryAction} tone="secondary" /> : null}
        {primaryAction ? <ActionButton {...primaryAction} /> : null}
      </div>
    </div>
  );
}

export function SearchAndFilterBar({
  query,
  onQueryChange,
  queryPlaceholder = "Search",
  filters = [],
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1.2fr_repeat(auto-fit,minmax(180px,1fr))]">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={queryPlaceholder}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
        </label>

        {filters.map((filter) => (
          <label key={filter.key} className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {filter.label}
            </span>
            <select
              value={filter.value}
              onChange={(event) => filter.onChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function AdminStatCard({ label, value, helper }) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      {helper ? <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p> : null}
    </article>
  );
}

export function LoadingPanel({ label = "Loading admin content..." }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
    </div>
  );
}

export function ModalDialog({ open, title, description, children, onClose, footer }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/45 p-4">
      <div className="mx-auto mt-8 w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
            {description ? (
              <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600"
          >
            Close
          </button>
        </div>

        <div className="px-6 py-6">{children}</div>
        {footer ? <div className="border-t border-slate-200 px-6 py-5">{footer}</div> : null}
      </div>
    </div>
  );
}

export function ActionButton({ label, to, onClick, tone = "primary" }) {
  const className =
    tone === "secondary"
      ? "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
      : "rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700";

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}
