export function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function toSlug(value) {
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
