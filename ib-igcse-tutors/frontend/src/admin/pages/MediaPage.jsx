import { useState } from "react";
import { createId } from "../../data/admin/seedUtils";
import { createMediaFromFile, deleteMedia, listMedia, saveMedia } from "../../services/mediaService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { StatusBadge } from "../components/primitives";
import { MediaAssetForm } from "../forms/simpleForms";

async function createEmptyMediaDraft() {
  return {
    id: "",
    name: "",
    url: "",
    altText: "",
    caption: "",
    mimeType: "",
    sizeLabel: "",
    status: "ready",
  };
}

function MediaPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <AdminCollectionPage
      eyebrow="Media Library"
      title="Media"
      description="Use the mock upload flow to validate media UX now, then swap the service for real storage later."
      createLabel="Add Media"
      queryPlaceholder="Search by asset name or alt text"
      loader={listMedia}
      createEmptyItem={createEmptyMediaDraft}
      saveItem={async (draft) => {
        if (selectedFile) {
          await createMediaFromFile(selectedFile, draft);
          setSelectedFile(null);
          return;
        }

        return saveMedia({
          ...draft,
          id: draft.id || createId("media", draft.name || Date.now()),
        });
      }}
      deleteItem={deleteMedia}
      searchFields={["name", "altText", "caption"]}
      filters={[
        {
          key: "status",
          label: "Status",
          defaultValue: "all",
          options: [
            { value: "all", label: "All statuses" },
            { value: "ready", label: "Ready" },
          ],
          matches: (item, value) => value === "all" || item.status === value,
        },
      ]}
      columns={[
        {
          key: "name",
          label: "Asset",
          render: (item) => (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img src={item.url} alt={item.altText || item.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">{item.mimeType}</p>
              </div>
            </div>
          ),
        },
        {
          key: "caption",
          label: "Caption",
          render: (item) => <p className="max-w-md text-sm leading-6 text-slate-700">{item.caption}</p>,
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
      getItemLabel={(item) => item.name || "media asset"}
      renderForm={({ draftItem, setDraftItem }) => (
        <MediaAssetForm
          draftItem={draftItem}
          setDraftItem={setDraftItem}
          onFileSelect={setSelectedFile}
        />
      )}
    />
  );
}

export default MediaPage;
