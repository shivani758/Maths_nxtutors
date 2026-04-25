export function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

export function ensureArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : [];
}

export function uniqueValues(values = []) {
  return [...new Set(ensureArray(values).flatMap((item) => ensureArray(item)).filter(Boolean))];
}

export function toSlug(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId(prefix, value) {
  const slug = toSlug(value) || Math.random().toString(36).slice(2, 10);
  return `${prefix}-${slug}`;
}

export function createTimestamp(dayOffset = 0) {
  return new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString();
}

export function coerceNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function lineParagraphs(values = []) {
  return ensureArray(values)
    .filter(Boolean)
    .join("\n\n");
}
