import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listCities } from "../../services/locationsService";
import { listMedia } from "../../services/mediaService";
import { createEmptyPage, getPageById, savePage } from "../../services/pagesService";
import { listReviews } from "../../services/reviewsService";
import { listAdminTutors as listTutors } from "../../services/tutorsService";
import { AdminPageHeader, EmptyState, LoadingPanel } from "../components/primitives";
import PageForm from "../forms/PageForm";
import {
  getErrorMessage,
  getFormErrorMessage,
  getValidationErrors,
} from "../utils/formValidation";
import { useAdminToast } from "../providers/AdminToastContext";

function PageEditorPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const isNew = !pageId || pageId === "new";
  const { pushToast } = useAdminToast();
  const [draft, setDraft] = useState(null);
  const [resources, setResources] = useState({
    media: [],
    tutors: [],
    reviews: [],
    cities: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const resourceEntries = await Promise.allSettled([
        listMedia(),
        listTutors(),
        listReviews(),
        listCities(),
      ]);
      const [mediaResult, tutorsResult, reviewsResult, citiesResult] = resourceEntries;
      const failures = resourceEntries.filter((entry) => entry.status === "rejected");

      return {
        nextResources: {
          media: mediaResult.status === "fulfilled" ? mediaResult.value : [],
          tutors: tutorsResult.status === "fulfilled" ? tutorsResult.value : [],
          reviews: reviewsResult.status === "fulfilled" ? reviewsResult.value : [],
          cities: citiesResult.status === "fulfilled" ? citiesResult.value : [],
        },
        resourceError: failures.length
          ? getErrorMessage(failures[0].reason, "Some page editor resources could not be loaded.")
          : "",
      };
    }

    async function load() {
      setLoading(true);
      setLoadError("");
      setFormError("");
      setValidationErrors({});
      setResources({ media: [], tutors: [], reviews: [], cities: [] });

      if (isNew) {
        setDraft(createEmptyPage());
        setLoading(false);

        const { nextResources, resourceError } = await loadResources();

        if (!mounted) {
          return;
        }

        setResources(nextResources);
        setLoadError(resourceError);
        return;
      }

      setDraft(null);

      try {
        const page = await getPageById(pageId);

        if (!mounted) {
          return;
        }

        setDraft(page);
        setLoading(false);
      } catch (error) {
        if (!mounted) {
          return;
        }

        setDraft(null);
        setLoadError(getErrorMessage(error, "This page record could not be loaded from the API."));
        setLoading(false);
        return;
      }

      const { nextResources, resourceError } = await loadResources();

      if (!mounted) {
        return;
      }

      setResources(nextResources);
      setLoadError(resourceError);
    }

    load().catch((error) => {
      if (!mounted) {
        return;
      }

      setDraft(null);
      setLoadError(getErrorMessage(error, "Unable to load the page editor right now."));
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [isNew, pageId]);

  if (loading) {
    return <LoadingPanel label="Loading page editor..." />;
  }

  if (!draft) {
    return (
      <EmptyState
        title="Page not found"
        description={loadError || "The requested page could not be loaded from the API."}
        action={
          <Link to="/admin/pages" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
            Back to pages
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Editor"
        title={isNew ? "Create Page" : draft.label || draft.title}
        description="Edit board and subject page content without disturbing the existing public route structure."
        secondaryAction={{ label: "Back to pages", to: "/admin/pages" }}
        primaryAction={{
          label: "Save page",
          onClick: async () => {
            try {
              setValidationErrors({});
              setFormError("");
              const saved = await savePage(draft);
              pushToast({ title: `${saved.label || saved.title} saved.` });
              navigate(`/admin/pages/${saved.id}`, { replace: true });
            } catch (saveError) {
              const nextFormError = getFormErrorMessage(saveError, "Unable to save this page right now.");
              setValidationErrors(getValidationErrors(saveError));
              setFormError(nextFormError);
              pushToast({
                title: nextFormError,
                tone: "error",
              });
            }
          },
        }}
      />

      {loadError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
        </div>
      ) : null}

      {formError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {formError}
        </div>
      ) : null}

      <PageForm
        draft={draft}
        setDraft={(nextValue) => {
          setValidationErrors({});
          setFormError("");
          setDraft((current) => (typeof nextValue === "function" ? nextValue(current) : nextValue));
        }}
        mediaOptions={resources.media}
        tutorOptions={resources.tutors}
        reviewOptions={resources.reviews}
        cityOptions={resources.cities}
        errors={validationErrors}
      />
    </div>
  );
}

export default PageEditorPage;
