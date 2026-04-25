import { apiRequest } from "./apiClient";
import { refreshPublicSiteData } from "./publicSiteService";

function splitClassBoard(value = "") {
  const [board = "", classLevel = ""] = String(value ?? "")
    .split("|")
    .map((item) => item.trim());

  return { board, classLevel };
}

export async function listResults() {
  return apiRequest("/api/admin/results");
}

export async function getResultById(id) {
  if (!id) {
    throw new Error("Result ID is required.");
  }

  return apiRequest(`/api/admin/results/${id}`);
}

export function createEmptyResult() {
  return {
    id: "",
    studentLabel: "",
    board: "CBSE",
    classLevel: "Class 10",
    classBoard: "CBSE | Class 10",
    resultSummary: "",
    beforeResult: "",
    afterResult: "",
    story: "",
    linkedTutorId: "",
    linkedPageId: "",
    linkedCitySlug: "gurugram",
    linkedLocalitySlug: "",
    featured: false,
    status: "draft",
  };
}

export async function saveResult(result) {
  const splitValue = splitClassBoard(result.classBoard);
  const board = String(result.board ?? splitValue.board ?? "").trim();
  const classLevel = String(result.classLevel ?? splitValue.classLevel ?? "").trim();
  const payload = {
    studentLabel: result.studentLabel,
    board,
    classLevel,
    resultSummary:
      String(result.resultSummary ?? "").trim() ||
      [result.beforeResult, result.afterResult].filter(Boolean).join(" to "),
    story: result.story,
    linkedTutorId: result.linkedTutorId ?? "",
    linkedPage: result.linkedPageId ?? "",
    city: result.linkedCitySlug ?? "gurugram",
    locality: result.linkedLocalitySlug ?? "",
    featured: Boolean(result.featured),
    status: result.status ?? "draft",
    beforeResult: result.beforeResult ?? "",
    afterResult: result.afterResult ?? "",
  };

  const saved = result.id
    ? await apiRequest(`/api/admin/results/${result.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/results", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return saved;
}

export async function deleteResult(id) {
  const deleted = await apiRequest(`/api/admin/results/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}
