import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listPages } from "../../services/pagesService";
import { createEmptyReview, saveReview } from "../../services/reviewsService";
import { listAdminTutors as listTutors } from "../../services/tutorsService";
import { AdminPageHeader, LoadingPanel } from "../components/primitives";
import { ReviewForm } from "../forms/simpleForms";
import { useAdminToast } from "../providers/AdminToastContext";

function ReviewEditorPage() {
  const navigate = useNavigate();
  const { pushToast } = useAdminToast();
  const [draft, setDraft] = useState(null);
  const [resources, setResources] = useState({ tutors: [], pages: [] });

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [defaultReview, tutors, pages] = await Promise.all([
        createEmptyReview(),
        listTutors(),
        listPages(),
      ]);

      if (!mounted) {
        return;
      }

      setDraft(defaultReview);
      setResources({ tutors, pages });
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!draft) {
    return <LoadingPanel label="Preparing review form..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="New Review"
        title="Create Review"
        description="Use this dedicated route when you want a cleaner full-page review editor instead of the list modal."
        secondaryAction={{ label: "Back to reviews", to: "/admin/reviews" }}
        primaryAction={{
          label: "Save review",
          onClick: async () => {
            await saveReview(draft);
            pushToast({ title: "Review created." });
            navigate("/admin/reviews", { replace: true });
          },
        }}
      />

      <ReviewForm
        draftItem={draft}
        setDraftItem={setDraft}
        tutorOptions={resources.tutors}
        pageOptions={resources.pages}
      />
    </div>
  );
}

export default ReviewEditorPage;
