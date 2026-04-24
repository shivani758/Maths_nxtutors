import {
  BLOG_CATEGORY_OPTIONS,
  BLOG_STATUS_OPTIONS,
  TUTOR_BOARD_OPTIONS,
} from "../contentOptions";
import { slugifyValue } from "../utils/formValidation";
import {
  FieldGroup,
  FormSection,
  MediaPickerField,
  RichTextEditorField,
  SeoFieldsPanel,
  ToggleField,
  formatLineList,
  getFieldControlClass,
  parseLineList,
} from "./primitives";

function BlogForm({
  draft,
  setDraft,
  mediaOptions,
  pageOptions,
  tutorOptions = [],
  errors = {},
}) {
  function updateDraft(patch) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  return (
    <div className="space-y-5">
      <FormSection
        title="Blog Basics"
        description="These fields map directly to the connected blog model, including publish state, tutor links, and SEO controls."
      >
        <FieldGroup label="Title" required fullWidth error={errors.title}>
          <input
            value={draft.title}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                title: event.target.value,
                slug: current.slug || slugifyValue(event.target.value),
              }))
            }
            className={getFieldControlClass(errors.title)}
          />
        </FieldGroup>

        <FieldGroup label="Slug" required error={errors.slug} helpText="Use lowercase words separated by hyphens.">
          <input
            value={draft.slug}
            onChange={(event) => updateDraft({ slug: slugifyValue(event.target.value) })}
            className={getFieldControlClass(errors.slug)}
          />
        </FieldGroup>

        <FieldGroup label="Status" required error={errors.status}>
          <select
            value={draft.status}
            onChange={(event) => updateDraft({ status: event.target.value })}
            className={getFieldControlClass(errors.status)}
          >
            {BLOG_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Category" error={errors.category}>
          <select
            value={draft.category}
            onChange={(event) => updateDraft({ category: event.target.value })}
            className={getFieldControlClass(errors.category)}
          >
            <option value="">Select category</option>
            {BLOG_CATEGORY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Author" error={errors.author}>
          <input
            value={draft.author}
            onChange={(event) => updateDraft({ author: event.target.value })}
            className={getFieldControlClass(errors.author)}
          />
        </FieldGroup>

        <FieldGroup label="Publish Date" error={errors.publishAt}>
          <input
            type="date"
            value={draft.publishDate ? String(draft.publishDate).slice(0, 10) : ""}
            onChange={(event) => updateDraft({ publishDate: event.target.value })}
            className={getFieldControlClass(errors.publishAt)}
          />
        </FieldGroup>

        <FieldGroup label="Summary" required fullWidth error={errors.summary}>
          <textarea
            rows={4}
            value={draft.summary}
            onChange={(event) => updateDraft({ summary: event.target.value })}
            className={getFieldControlClass(errors.summary)}
          />
        </FieldGroup>

        <FieldGroup label="Tags" helpText="One tag per line." error={errors.tags}>
          <textarea
            rows={4}
            value={formatLineList(draft.tags)}
            onChange={(event) => updateDraft({ tags: parseLineList(event.target.value) })}
            className={getFieldControlClass(errors.tags)}
          />
        </FieldGroup>

        <FieldGroup label="Related Boards" error={errors.relatedBoards} helpText="Use this to improve guide visibility on relevant board pages.">
          <select
            multiple
            value={draft.relatedBoards ?? []}
            onChange={(event) =>
              updateDraft({
                relatedBoards: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.relatedBoards, "h-32")}
          >
            {TUTOR_BOARD_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Related Page" error={errors.relatedPageId}>
          <select
            value={draft.relatedPageId ?? ""}
            onChange={(event) => updateDraft({ relatedPageId: event.target.value })}
            className={getFieldControlClass(errors.relatedPageId)}
          >
            <option value="">Not linked</option>
            {pageOptions.map((page) => (
              <option key={page.id} value={page.id}>
                {page.label || page.title}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup
          label="Related Tutors"
          error={errors.relatedTutorIds}
          fullWidth
          helpText="Use tutor links when the guide should surface from tutor profile pages."
        >
          <select
            multiple
            value={draft.relatedTutorIds ?? []}
            onChange={(event) =>
              updateDraft({
                relatedTutorIds: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.relatedTutorIds, "h-32")}
          >
            {tutorOptions.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </FieldGroup>
      </FormSection>

      <FormSection
        title="Body And Media"
        description="Keep the summary concise, then use the main body for the full guide content."
      >
        <RichTextEditorField
          label="Body"
          value={draft.body}
          onChange={(value) => updateDraft({ body: value })}
          helpText="Use clean paragraphs. This field is required for published blog content."
          error={errors.body}
          required
        />

        <MediaPickerField
          label="Cover Image"
          value={draft.coverImage}
          onChange={(value) =>
            setDraft((current) => ({
              ...current,
              coverImage: value,
              seo: { ...current.seo, ogImage: value },
            }))
          }
          assets={mediaOptions}
          error={errors.coverImage}
        />
      </FormSection>

      <FormSection
        title="Publishing Controls"
        description="Use these controls to keep only ready guides visible on the public site."
      >
        <div className="md:col-span-2">
          <ToggleField
            label="Include in sitemap later"
            description="This maps to the indexable SEO flag that the backend now stores."
            checked={draft.seo?.indexable ?? true}
            onChange={(checked) =>
              setDraft((current) => ({
                ...current,
                seo: { ...current.seo, indexable: checked },
              }))
            }
          />
        </div>
      </FormSection>

      <SeoFieldsPanel
        value={draft.seo}
        onChange={(seo) => setDraft((current) => ({ ...current, seo }))}
        errors={errors}
      />
    </div>
  );
}

export default BlogForm;
