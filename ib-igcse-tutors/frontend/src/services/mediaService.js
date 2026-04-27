import { createId, createTimestamp } from "./clientDataUtils";
import { commitMockStore, getMockStoreSnapshot, removeById, upsertById } from "./mockCmsStore";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024;

export async function listMedia() {
  return [...getMockStoreSnapshot().media].sort((first, second) =>
    String(second.updatedAt ?? "").localeCompare(String(first.updatedAt ?? "")),
  );
}

export async function createMediaFromFile(file, metadata = {}) {
  if (!file) {
    throw new Error("Please choose an image file.");
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, SVG, and WebP files are supported in the frontend mock flow.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("Mock uploads are limited to 1.5 MB so they stay browser-friendly.");
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });

  return saveMedia({
    id: "",
    name: metadata.name || file.name,
    url: dataUrl,
    altText: metadata.altText || "",
    caption: metadata.caption || "",
    mimeType: file.type,
    sizeLabel: `${Math.round(file.size / 1024)} KB`,
    status: "ready",
  });
}

export async function saveMedia(asset) {
  return commitMockStore((draft) => {
    const existingAsset = draft.media.find((item) => item.id === asset.id);
    const nextAsset = {
      ...existingAsset,
      ...asset,
      id: asset.id || createId("media", asset.name || Date.now()),
      createdAt: existingAsset?.createdAt ?? createTimestamp(1),
      updatedAt: new Date().toISOString(),
    };

    draft.media = upsertById(draft.media, nextAsset);
    return nextAsset;
  }, {
    module: "Media",
    action: asset.id ? "Updated media" : "Added media",
    entityId: asset.id || asset.name,
    entityLabel: asset.name,
  });
}

export async function deleteMedia(id) {
  return commitMockStore((draft) => {
    const existingAsset = draft.media.find((item) => item.id === id);
    draft.media = removeById(draft.media, id);
    return existingAsset ?? null;
  }, {
    module: "Media",
    action: "Deleted media",
    entityId: id,
    entityLabel: id,
  });
}
