import { useEffect, useState } from "react";
import { listPages } from "../../services/pagesService";
import { createEmptyReview, deleteReview, listReviews, saveReview } from "../../services/reviewsService";
import { listTutors } from "../../services/tutorsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { LoadingPanel, StatusBadge } from "../components/primitives";
import { ReviewForm } from "../forms/simpleForms";

function ReviewsPage() {
  const [resources, setResources] = useState({
    tutors: [],
    pages: [],
  });
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const [tutorsResult, pagesResult] = await Promise.allSettled([listTutors(), listPages()]);

      if (!mounted) {
        return;
      }

      setResources({
        tutors: tutorsResult.status === "fulfilled" && Array.isArray(tutorsResult.value) ? tutorsResult.value : [],
        pages: pagesResult.status === "fulfilled" && Array.isArray(pagesResult.value) ? pagesResult.value : [],
      });
      setLoadingResources(false);
    }

    loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  if (loadingResources) {
    return <LoadingPanel label="Loading review resources..." />;
  }

  return (
    <AdminCollectionPage
      eyebrow="Testimonials"
      title="Reviews"
      description="Moderate, feature, and clean up testimonials before they surface in public proof sections."
      createLabel="Add Review"
      queryPlaceholder="Search by reviewer, board, or locality"
      loader={listReviews}
      createEmptyItem={createEmptyReview}
      saveItem={saveReview}
      deleteItem={deleteReview}
      searchFields={["reviewerName", "relatedBoard", "locality", "reviewText"]}
      filters={[
        {
          key: "status",
          label: "Status",
          defaultValue: "all",
          options: [
            { value: "all", label: "All statuses" },
            { value: "draft", label: "Draft" },
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "archived", label: "Archived" },
          ],
          matches: (item, value) => value === "all" || item.status === value,
        },
        {
          key: "featured",
          label: "Featured",
          defaultValue: "all",
          options: [
            { value: "all", label: "All reviews" },
            { value: "featured", label: "Featured" },
            { value: "regular", label: "Not featured" },
          ],
          matches: (item, value) =>
            value === "all" || (value === "featured" ? item.featured : !item.featured),
        },
      ]}
      columns={[
        {
          key: "reviewerName",
          label: "Reviewer",
          render: (item) => (
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.reviewerName}</p>
              <p className="mt-1 text-sm text-slate-500">
                {item.locality} | {item.relatedBoard}
              </p>
            </div>
          ),
        },
        {
          key: "rating",
          label: "Rating",
          render: (item) => <p className="text-sm font-semibold text-slate-900">{item.rating}/5</p>,
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
      getItemLabel={(item) => item.reviewerName || "review"}
      renderForm={({ draftItem, setDraftItem }) => {
        return (
          <ReviewForm
            draftItem={draftItem}
            setDraftItem={setDraftItem}
            tutorOptions={resources.tutors}
            pageOptions={resources.pages}
          />
        );
      }}
    />
  );
}

export default ReviewsPage;
