import { apiRequest } from "./apiClient";

export async function getDashboardSnapshot() {
  return apiRequest("/api/admin/dashboard");
}
