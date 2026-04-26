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

export async function apiRequest(url, options = {}) {
  const response = await fetch(import.meta.env.VITE_API_URL + url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  return response.json();
}

export function isApiUnavailableError(error) {
  return (
    error instanceof TypeError ||
    error?.message === "Failed to fetch" ||
    error?.code === "ERR_NETWORK"
  );
}
