import { useMemo } from "react";

function splitLines(value) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function FormSection({ title, description, children }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5">
      <div className="max-w-3xl">
        <h3 className="text-xl font-bold tracking-tight text-slate-950">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function FieldGroup({
  label,
  helpText,
  error,
  required = false,
  children,
  className = "",
  fullWidth = false,
}) {
  return (
    <label className={`${fullWidth ? "md:col-span-2" : ""} ${className}`.trim()}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-1 text-rose-600">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs leading-5 text-rose-600">{error}</span> : null}
      {helpText ? <span className="mt-2 block text-xs leading-5 text-slate-500">{helpText}</span> : null}
    </label>
  );
}

export function getFieldControlClass(error, extraClassName = "") {
  return [
    "w-full rounded-2xl border px-4 py-3 outline-none transition",
    error ? "border-rose-300 bg-rose-50 focus:border-rose-500" : "border-slate-200 focus:border-blue-500",
    extraClassName,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ToggleField({ label, description, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
        checked
          ? "border-blue-200 bg-blue-50 text-blue-800"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {description ? <p className="mt-1 text-xs leading-5">{description}</p> : null}
      </div>
      <span
        className={`mt-1 inline-flex h-6 w-11 rounded-full p-1 ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

export function SeoFieldsPanel({ value, onChange, errors = {} }) {
  const keywordsValue = useMemo(() => (value?.keywords ?? []).join("\n"), [value?.keywords]);

  return (
    <FormSection
      title="SEO Fields"
      description="These fields stay frontend-only for now, but they match the shape a real CMS/API can use later."
    >
      <FieldGroup label="Meta Title" error={errors["seo.title"]}>
        <input
          value={value?.title ?? ""}
          onChange={(event) => onChange({ ...value, title: event.target.value })}
          className={getFieldControlClass(errors["seo.title"])}
        />
      </FieldGroup>

      <FieldGroup label="Canonical URL" error={errors["seo.canonicalUrl"]}>
        <input
          value={value?.canonicalUrl ?? ""}
          onChange={(event) => onChange({ ...value, canonicalUrl: event.target.value })}
          className={getFieldControlClass(errors["seo.canonicalUrl"])}
        />
      </FieldGroup>

      <FieldGroup label="Meta Description" fullWidth error={errors["seo.description"]}>
        <textarea
          rows={4}
          value={value?.description ?? ""}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
          className={getFieldControlClass(errors["seo.description"])}
        />
      </FieldGroup>

      <FieldGroup
        label="Keywords"
        fullWidth
        helpText="One keyword or phrase per line."
        error={errors["seo.keywords"]}
      >
        <textarea
          rows={4}
          value={keywordsValue}
          onChange={(event) => onChange({ ...value, keywords: splitLines(event.target.value) })}
          className={getFieldControlClass(errors["seo.keywords"])}
        />
      </FieldGroup>

      <FieldGroup label="Social Image" error={errors["seo.ogImage"]}>
        <input
          value={value?.ogImage ?? ""}
          onChange={(event) => onChange({ ...value, ogImage: event.target.value })}
          className={getFieldControlClass(errors["seo.ogImage"])}
        />
      </FieldGroup>

      <div className="md:col-span-2">
        <ToggleField
          label="Allow indexing"
          description="Keep this on for public pages and blog posts that should remain discoverable."
          checked={value?.indexable ?? true}
          onChange={(checked) => onChange({ ...value, indexable: checked })}
        />
      </div>
    </FormSection>
  );
}

export function MediaPickerField({ label, value, onChange, assets = [], error, required = false }) {
  return (
    <FieldGroup
      label={label}
      helpText="Choose a seeded asset now. Replace this with a real media API later."
      error={error}
      required={required}
    >
      <div className="space-y-3">
        <select
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className={getFieldControlClass(error)}
        >
          <option value="">Select media</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.url}>
              {asset.name}
            </option>
          ))}
        </select>

        {value ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
            <img src={value} alt={label} className="h-40 w-full rounded-xl object-cover" />
          </div>
        ) : null}
      </div>
    </FieldGroup>
  );
}

export function RichTextEditorField({ label, value, onChange, helpText, error, required = false }) {
  return (
    <FieldGroup label={label} helpText={helpText} fullWidth error={error} required={required}>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.92fr]">
        <textarea
          rows={10}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className={getFieldControlClass(error, "rounded-[24px]")}
        />
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Preview</p>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {value || "Start typing to preview the content."}
          </div>
        </div>
      </div>
    </FieldGroup>
  );
}

export function parseLineList(value) {
  return splitLines(value);
}

export function formatLineList(values) {
  return (values ?? []).join("\n");
}
