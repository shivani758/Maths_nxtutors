if (!import.meta.env.VITE_API_URL) {
  throw new Error("Missing VITE_API_URL");
}

const API_URL = String(import.meta.env.VITE_API_URL).replace(/\/$/, "");

function buildUrl(path) {
  return `${API_URL}${path}`;
}

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    method: options.method ?? "GET",
    credentials: "include",
    cache: options.cache,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    throw new ApiClientError(
      payload?.error?.message || `Request failed with status ${response.status}.`,
      {
        status: response.status,
        code: payload?.error?.code,
        details: payload?.error?.details,
      },
    );
  }

  return payload?.data;
}

export function isApiUnavailableError(error) {
  return (
    error instanceof TypeError ||
    error?.message === "Failed to fetch" ||
    error?.code === "ERR_NETWORK"
  );
}
