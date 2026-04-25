import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createEmptyBlog, getBlogById, saveBlog } from "../../services/blogsService";
import { listMedia } from "../../services/mediaService";
import { listPages } from "../../services/pagesService";
import { listTutors } from "../../services/tutorsService";
import { AdminPageHeader, EmptyState, LoadingPanel } from "../components/primitives";
import BlogForm from "../forms/BlogForm";
import {
  getErrorMessage,
  getFormErrorMessage,
  getValidationErrors,
} from "../utils/formValidation";
import { useAdminToast } from "../providers/AdminToastContext";

function BlogEditorPage() {
  const { blogId } = useParams();
  const isNew = !blogId || blogId === "new";
  const navigate = useNavigate();
  const { pushToast } = useAdminToast();
  const [draft, setDraft] = useState(null);
  const [resources, setResources] = useState({
    media: [],
    pages: [],
    tutors: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const resourceEntries = await Promise.allSettled([listMedia(), listPages(), listTutors()]);
      const [mediaResult, pagesResult, tutorsResult] = resourceEntries;
      const failures = resourceEntries.filter((entry) => entry.status === "rejected");

      return {
        nextResources: {
          media: mediaResult.status === "fulfilled" ? mediaResult.value : [],
          pages: pagesResult.status === "fulfilled" ? pagesResult.value : [],
          tutors: tutorsResult.status === "fulfilled" ? tutorsResult.value : [],
        },
        resourceError: failures.length
          ? getErrorMessage(failures[0].reason, "Some blog editor resources could not be loaded.")
          : "",
      };
    }

    async function load() {
      setLoading(true);
      setLoadError("");
      setFormError("");
      setValidationErrors({});
      setResources({ media: [], pages: [], tutors: [] });

      if (isNew) {
        setDraft(createEmptyBlog());
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
        const blog = await getBlogById(blogId);

        if (!mounted) {
          return;
        }

        setDraft(blog);
        setLoading(false);
      } catch (error) {
        if (!mounted) {
          return;
        }

        setDraft(null);
        setLoadError(getErrorMessage(error, "This blog record could not be loaded from the API."));
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
      setLoadError(getErrorMessage(error, "Unable to load the blog editor right now."));
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [blogId, isNew]);

  if (loading) {
    return <LoadingPanel label="Loading blog editor..." />;
  }

  if (!draft) {
    return (
      <EmptyState
        title="Blog not found"
        description={loadError || "The requested blog could not be loaded from the API."}
        action={
          <Link to="/admin/blogs" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
            Back to blogs
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Blog Editor"
        title={isNew ? "Create Blog" : draft.title}
        description="Use a dedicated editor for long-form content, draft/publish states, tutor links, and SEO controls."
        secondaryAction={{ label: "Back to blogs", to: "/admin/blogs" }}
        primaryAction={{
          label: "Save blog",
          onClick: async () => {
            try {
              setValidationErrors({});
              setFormError("");
              const saved = await saveBlog(draft);
              pushToast({ title: `${saved.title} saved.` });
              navigate(`/admin/blogs/${saved.id}`, { replace: true });
            } catch (saveError) {
              const nextFormError = getFormErrorMessage(saveError, "Unable to save this blog right now.");
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

      <BlogForm
        draft={draft}
        setDraft={(nextValue) => {
          setValidationErrors({});
          setFormError("");
          setDraft((current) => (typeof nextValue === "function" ? nextValue(current) : nextValue));
        }}
        mediaOptions={resources.media}
        pageOptions={resources.pages}
        tutorOptions={resources.tutors}
        errors={validationErrors}
      />
    </div>
  );
}

export default BlogEditorPage;
