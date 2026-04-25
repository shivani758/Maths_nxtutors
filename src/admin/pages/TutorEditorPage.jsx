import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listCities, listLocalities } from "../../services/locationsService";
import { listMedia } from "../../services/mediaService";
import { listPages } from "../../services/pagesService";
import { listResults } from "../../services/resultsService";
import { listReviews } from "../../services/reviewsService";
import {
  createEmptyTutor,
  getTutorById,
  saveTutorBundle,
} from "../../services/tutorsService";
import { AdminPageHeader, EmptyState, LoadingPanel } from "../components/primitives";
import TutorForm from "../forms/TutorForm";
import {
  getErrorMessage,
  getFormErrorMessage,
  getValidationErrors,
} from "../utils/formValidation";
import { useAdminToast } from "../providers/AdminToastContext";

function TutorEditorPage() {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useAdminToast();
  const [draft, setDraft] = useState(null);
  const [resources, setResources] = useState({
    media: [],
    reviews: [],
    results: [],
    pages: [],
    cities: [],
    localities: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState("");
  const isNew = !tutorId || tutorId === "new";

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const resourceEntries = await Promise.allSettled([
        listMedia(),
        listReviews(),
        listResults(),
        listPages(),
        listCities(),
        listLocalities(),
      ]);

      const [mediaResult, reviewsResult, resultsResult, pagesResult, citiesResult, localitiesResult] =
        resourceEntries;
      const failures = resourceEntries.filter((entry) => entry.status === "rejected");

      return {
        nextResources: {
          media: mediaResult.status === "fulfilled" ? mediaResult.value : [],
          reviews: reviewsResult.status === "fulfilled" ? reviewsResult.value : [],
          results: resultsResult.status === "fulfilled" ? resultsResult.value : [],
          pages: pagesResult.status === "fulfilled" ? pagesResult.value : [],
          cities: citiesResult.status === "fulfilled" ? citiesResult.value : [],
          localities: localitiesResult.status === "fulfilled" ? localitiesResult.value : [],
        },
        resourceError: failures.length
          ? getErrorMessage(failures[0].reason, "Some tutor editor resources could not be loaded.")
          : "",
      };
    }

    async function load() {
      setLoading(true);
      setLoadError("");
      setFormError("");
      setValidationErrors({});
      setResources({
        media: [],
        reviews: [],
        results: [],
        pages: [],
        cities: [],
        localities: [],
      });

      if (isNew) {
        setDraft(createEmptyTutor());
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
        const baseDraft = await getTutorById(tutorId);

        if (!mounted) {
          return;
        }

        setDraft(baseDraft);
        setLoading(false);
      } catch (error) {
        if (!mounted) {
          return;
        }

        setDraft(null);
        setLoadError(getErrorMessage(error, "This tutor record could not be loaded from the API."));
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
      setLoadError(getErrorMessage(error, "Unable to load the tutor editor right now."));
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [isNew, tutorId]);

  if (loading) {
    return <LoadingPanel label="Loading tutor editor..." />;
  }

  if (!draft) {
    return (
      <EmptyState
        title="Tutor not found"
        description={loadError || "This tutor record could not be loaded from the API."}
        action={<Link to="/admin/tutors" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Back to tutors</Link>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Tutor Editor"
        title={isNew ? "Create Tutor" : draft.tutor.name}
        description="Build a tutor record with required listing fields, linked proof, SEO fields, and media selection."
        secondaryAction={{ label: "Back to tutors", to: "/admin/tutors" }}
        primaryAction={{
          label: "Save tutor",
          onClick: async () => {
            try {
              setValidationErrors({});
              setFormError("");
              const saved = await saveTutorBundle(draft);
              pushToast({ title: `${saved.tutor.name} saved.` });
              navigate(`/admin/tutors/${saved.tutor.id}`, { replace: true });
            } catch (saveError) {
              const nextFormError = getFormErrorMessage(saveError, "Unable to save this tutor right now.");
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

      <TutorForm
        draftItem={draft}
        setDraftItem={(nextValue) => {
          setValidationErrors({});
          setFormError("");
          setDraft((current) => (typeof nextValue === "function" ? nextValue(current) : nextValue));
        }}
        mediaOptions={resources.media}
        reviewOptions={resources.reviews}
        resultOptions={resources.results}
        pageOptions={resources.pages}
        cityOptions={resources.cities}
        localityOptions={resources.localities}
        errors={validationErrors}
      />
    </div>
  );
}

export default TutorEditorPage;
