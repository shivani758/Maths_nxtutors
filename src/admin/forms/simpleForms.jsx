import {
  RESULT_BOARD_OPTIONS,
  RESULT_CLASS_LEVEL_OPTIONS,
  RESULT_STATUS_OPTIONS,
} from "../contentOptions";
import {
  FieldGroup,
  FormSection,
  MediaPickerField,
  SeoFieldsPanel,
  ToggleField,
  formatLineList,
  getFieldControlClass,
  parseLineList,
} from "./primitives";

export function ReviewForm({ draftItem, setDraftItem, tutorOptions, pageOptions }) {
  return (
    <div className="space-y-5">
      <FormSection title="Review Details" description="Moderation-friendly fields for testimonials and proof points.">
        <FieldGroup label="Reviewer Name">
          <input
            value={draftItem.reviewerName}
            onChange={(event) => setDraftItem((current) => ({ ...current, reviewerName: event.target.value, parent: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Role Type">
          <select
            value={draftItem.roleType}
            onChange={(event) => setDraftItem((current) => ({ ...current, roleType: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["Parent", "Student", "Guardian"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Rating">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={draftItem.rating}
            onChange={(event) => setDraftItem((current) => ({ ...current, rating: Number(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Status">
          <select
            value={draftItem.status}
            onChange={(event) => setDraftItem((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["draft", "pending", "approved", "archived"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Related Tutor">
          <select
            value={draftItem.relatedTutorId ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, relatedTutorId: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="">Not linked</option>
            {tutorOptions.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Related Page">
          <select
            value={draftItem.relatedPageId ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, relatedPageId: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="">Not linked</option>
            {pageOptions.map((page) => (
              <option key={page.id} value={page.id}>
                {page.label || page.title}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Board">
          <input
            value={draftItem.relatedBoard}
            onChange={(event) =>
              setDraftItem((current) => ({
                ...current,
                relatedBoard: event.target.value,
                board: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Locality">
          <input
            value={draftItem.locality}
            onChange={(event) =>
              setDraftItem((current) => ({
                ...current,
                locality: event.target.value,
                sector: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="School">
          <input
            value={draftItem.school ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, school: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Review Text" fullWidth>
          <textarea
            rows={6}
            value={draftItem.reviewText}
            onChange={(event) =>
              setDraftItem((current) => ({
                ...current,
                reviewText: event.target.value,
                quote: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <div className="space-y-3 md:col-span-2">
          <ToggleField
            label="Featured Review"
            description="Use this for testimonials that should be easier to surface across the site."
            checked={draftItem.featured}
            onChange={(checked) => setDraftItem((current) => ({ ...current, featured: checked }))}
          />
          <ToggleField
            label="Anonymize Display"
            description="Useful when the review should still be visible but the name needs a lighter privacy treatment."
            checked={draftItem.anonymized}
            onChange={(checked) => setDraftItem((current) => ({ ...current, anonymized: checked }))}
          />
        </div>
      </FormSection>
    </div>
  );
}

export function ResultForm({
  draftItem,
  setDraftItem,
  tutorOptions,
  pageOptions,
  cityOptions,
  localityOptions,
  errors = {},
}) {
  return (
    <div className="space-y-5">
      <FormSection title="Student Result" description="Capture the minimum proof details the results API now expects for create and edit flows.">
        <FieldGroup label="Student Label" required error={errors.studentLabel}>
          <input
            value={draftItem.studentLabel}
            onChange={(event) => setDraftItem((current) => ({ ...current, studentLabel: event.target.value }))}
            className={getFieldControlClass(errors.studentLabel)}
          />
        </FieldGroup>

        <FieldGroup label="Board" required error={errors.board}>
          <select
            value={draftItem.board ?? ""}
            onChange={(event) =>
              setDraftItem((current) => ({
                ...current,
                board: event.target.value,
                classBoard: [event.target.value, current.classLevel].filter(Boolean).join(" | "),
              }))
            }
            className={getFieldControlClass(errors.board)}
          >
            <option value="">Select board</option>
            {RESULT_BOARD_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Class Level" required error={errors.classLevel}>
          <select
            value={draftItem.classLevel ?? ""}
            onChange={(event) =>
              setDraftItem((current) => ({
                ...current,
                classLevel: event.target.value,
                classBoard: [current.board, event.target.value].filter(Boolean).join(" | "),
              }))
            }
            className={getFieldControlClass(errors.classLevel)}
          >
            <option value="">Select class level</option>
            {RESULT_CLASS_LEVEL_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Status" error={errors.status}>
          <select
            value={draftItem.status}
            onChange={(event) => setDraftItem((current) => ({ ...current, status: event.target.value }))}
            className={getFieldControlClass(errors.status)}
          >
            {RESULT_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Result Summary" required fullWidth error={errors.resultSummary}>
          <textarea
            rows={3}
            value={draftItem.resultSummary ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, resultSummary: event.target.value }))}
            className={getFieldControlClass(errors.resultSummary)}
          />
        </FieldGroup>
        <FieldGroup label="Before Result">
          <input
            value={draftItem.beforeResult}
            onChange={(event) => setDraftItem((current) => ({ ...current, beforeResult: event.target.value }))}
            className={getFieldControlClass(errors.beforeResult)}
          />
        </FieldGroup>
        <FieldGroup label="After Result">
          <input
            value={draftItem.afterResult}
            onChange={(event) => setDraftItem((current) => ({ ...current, afterResult: event.target.value }))}
            className={getFieldControlClass(errors.afterResult)}
          />
        </FieldGroup>
        <FieldGroup label="Linked Tutor">
          <select
            value={draftItem.linkedTutorId ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, linkedTutorId: event.target.value }))}
            className={getFieldControlClass(errors.linkedTutorId)}
          >
            <option value="">Not linked</option>
            {tutorOptions.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Linked Page">
          <select
            value={draftItem.linkedPageId ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, linkedPageId: event.target.value }))}
            className={getFieldControlClass(errors.linkedPage)}
          >
            <option value="">Not linked</option>
            {pageOptions.map((page) => (
              <option key={page.id} value={page.id}>
                {page.label || page.title}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="City">
          <select
            value={draftItem.linkedCitySlug ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, linkedCitySlug: event.target.value }))}
            className={getFieldControlClass(errors.city)}
          >
            {cityOptions.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.label}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Locality">
          <select
            value={draftItem.linkedLocalitySlug ?? ""}
            onChange={(event) => setDraftItem((current) => ({ ...current, linkedLocalitySlug: event.target.value }))}
            className={getFieldControlClass(errors.locality)}
          >
            <option value="">Not linked</option>
            {localityOptions.map((locality) => (
              <option key={locality.slug} value={locality.slug}>
                {locality.sectorLabel}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Story" fullWidth>
          <textarea
            rows={6}
            value={draftItem.story}
            onChange={(event) => setDraftItem((current) => ({ ...current, story: event.target.value }))}
            className={getFieldControlClass(errors.story)}
          />
        </FieldGroup>
        <div className="space-y-3 md:col-span-2">
          <ToggleField
            label="Featured Result"
            description="Use this when the story should be easier to surface in future page blocks."
            checked={draftItem.featured}
            onChange={(checked) => setDraftItem((current) => ({ ...current, featured: checked }))}
          />
          <ToggleField
            label="Approved"
            description="Keeps the result visible to public selectors once the story is ready for the site."
            checked={draftItem.status === "approved"}
            onChange={(checked) =>
              setDraftItem((current) => ({ ...current, status: checked ? "approved" : "draft" }))
            }
          />
        </div>
      </FormSection>
    </div>
  );
}

export function FaqForm({ draftItem, setDraftItem, pageOptions, cityOptions, localityOptions }) {
  const linkedOptions =
    draftItem.linkedType === "city"
      ? cityOptions.map((city) => ({ value: city.id, label: city.label }))
      : draftItem.linkedType === "locality"
        ? localityOptions.map((locality) => ({ value: locality.id, label: locality.sectorLabel }))
        : pageOptions.map((page) => ({ value: page.id, label: page.label || page.title }));

  return (
    <div className="space-y-5">
      <FormSection title="FAQ Entry" description="Keep FAQ content truthful to the visible page copy and user intent.">
        <FieldGroup label="Question" fullWidth>
          <input
            value={draftItem.question}
            onChange={(event) => setDraftItem((current) => ({ ...current, question: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Answer" fullWidth>
          <textarea
            rows={5}
            value={draftItem.answer}
            onChange={(event) => setDraftItem((current) => ({ ...current, answer: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Linked Type">
          <select
            value={draftItem.linkedType}
            onChange={(event) => setDraftItem((current) => ({ ...current, linkedType: event.target.value, linkedId: "" }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["page", "city", "locality"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Linked Item">
          <select
            value={draftItem.linkedId}
            onChange={(event) =>
              setDraftItem((current) => {
                const label = linkedOptions.find((item) => item.value === event.target.value)?.label ?? "";
                return {
                  ...current,
                  linkedId: event.target.value,
                  linkedLabel: label,
                };
              })
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="">Select item</option>
            {linkedOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Order">
          <input
            type="number"
            value={draftItem.order}
            onChange={(event) => setDraftItem((current) => ({ ...current, order: Number(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Status">
          <select
            value={draftItem.status}
            onChange={(event) => setDraftItem((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["draft", "published", "archived"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
      </FormSection>
    </div>
  );
}

export function CityForm({ draftItem, setDraftItem }) {
  return (
    <div className="space-y-5">
      <FormSection title="City Page" description="City pages stay geo-specific without repeating the same content across every locality.">
        <FieldGroup label="City Label">
          <input
            value={draftItem.label}
            onChange={(event) => setDraftItem((current) => ({ ...current, label: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Slug">
          <input
            value={draftItem.slug}
            onChange={(event) => setDraftItem((current) => ({ ...current, slug: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Headline" fullWidth>
          <input
            value={draftItem.headline}
            onChange={(event) => setDraftItem((current) => ({ ...current, headline: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Subtitle" fullWidth>
          <textarea
            rows={4}
            value={draftItem.subtitle}
            onChange={(event) => setDraftItem((current) => ({ ...current, subtitle: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Coverage Areas" helpText="One area per line.">
          <textarea
            rows={4}
            value={formatLineList(draftItem.coverageAreas)}
            onChange={(event) => setDraftItem((current) => ({ ...current, coverageAreas: parseLineList(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Served Boards" helpText="One board segment per line.">
          <textarea
            rows={4}
            value={formatLineList(draftItem.servedBoards)}
            onChange={(event) => setDraftItem((current) => ({ ...current, servedBoards: parseLineList(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Status">
          <select
            value={draftItem.status}
            onChange={(event) => setDraftItem((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["draft", "published", "archived"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
      </FormSection>
      <SeoFieldsPanel value={draftItem.seo} onChange={(seo) => setDraftItem((current) => ({ ...current, seo }))} />
    </div>
  );
}

export function LocalityForm({ draftItem, setDraftItem, cityOptions }) {
  return (
    <div className="space-y-5">
      <FormSection title="Locality Page" description="Use locality pages only where there is real local relevance to preserve content quality.">
        <FieldGroup label="City">
          <select
            value={draftItem.citySlug}
            onChange={(event) => setDraftItem((current) => ({ ...current, citySlug: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {cityOptions.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.label}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Locality Label">
          <input
            value={draftItem.sectorLabel}
            onChange={(event) => setDraftItem((current) => ({ ...current, sectorLabel: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Slug">
          <input
            value={draftItem.slug}
            onChange={(event) => setDraftItem((current) => ({ ...current, slug: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Headline" fullWidth>
          <input
            value={draftItem.headline}
            onChange={(event) => setDraftItem((current) => ({ ...current, headline: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Subtitle" fullWidth>
          <textarea
            rows={4}
            value={draftItem.subtitle}
            onChange={(event) => setDraftItem((current) => ({ ...current, subtitle: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Landmarks" helpText="One landmark per line.">
          <textarea
            rows={4}
            value={formatLineList(draftItem.landmarks)}
            onChange={(event) => setDraftItem((current) => ({ ...current, landmarks: parseLineList(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Nearby Schools" helpText="One school per line.">
          <textarea
            rows={4}
            value={formatLineList(draftItem.nearbySchools)}
            onChange={(event) => setDraftItem((current) => ({ ...current, nearbySchools: parseLineList(event.target.value) }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Status">
          <select
            value={draftItem.status}
            onChange={(event) => setDraftItem((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["draft", "published", "archived"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>
      </FormSection>
      <SeoFieldsPanel value={draftItem.seo} onChange={(seo) => setDraftItem((current) => ({ ...current, seo }))} />
    </div>
  );
}

export function UserForm({ draftItem, setDraftItem, roleOptions }) {
  return (
    <div className="space-y-5">
      <FormSection title="Admin User" description="Keep roles clean so future permission mapping stays predictable.">
        <FieldGroup label="Name">
          <input
            value={draftItem.name}
            onChange={(event) => setDraftItem((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Email">
          <input
            type="email"
            value={draftItem.email}
            onChange={(event) => setDraftItem((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Role">
          <select
            value={draftItem.role}
            onChange={(event) => setDraftItem((current) => ({ ...current, role: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Provider">
          <select
            value={draftItem.provider}
            onChange={(event) => setDraftItem((current) => ({ ...current, provider: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            {["local", "google", "microsoft"].map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </FieldGroup>
        <FieldGroup label="Invited By">
          <input
            value={draftItem.invitedBy}
            onChange={(event) => setDraftItem((current) => ({ ...current, invitedBy: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <div className="space-y-3 md:col-span-2">
          <ToggleField
            label="User Active"
            description="Inactive users stay in the mock store but should not be treated as current admins."
            checked={draftItem.active}
            onChange={(checked) => setDraftItem((current) => ({ ...current, active: checked }))}
          />
          <ToggleField
            label="Force Password Reset"
            description="A realistic placeholder for future invite/reset flows."
            checked={draftItem.forcePasswordReset}
            onChange={(checked) => setDraftItem((current) => ({ ...current, forcePasswordReset: checked }))}
          />
        </div>
      </FormSection>
    </div>
  );
}

export function MediaAssetForm({ draftItem, setDraftItem, onFileSelect }) {
  return (
    <div className="space-y-5">
      <FormSection title="Media Asset" description="This mock upload flow stores browser-only image data for admin prototyping.">
        <FieldGroup label="Asset Name">
          <input
            value={draftItem.name}
            onChange={(event) => setDraftItem((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Image File" helpText="SVG, PNG, JPEG, and WebP are supported in the mock uploader.">
          <input
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp"
            onChange={(event) => onFileSelect(event.target.files?.[0])}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Alt Text" fullWidth>
          <input
            value={draftItem.altText}
            onChange={(event) => setDraftItem((current) => ({ ...current, altText: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        <FieldGroup label="Caption" fullWidth>
          <textarea
            rows={4}
            value={draftItem.caption}
            onChange={(event) => setDraftItem((current) => ({ ...current, caption: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </FieldGroup>
        {draftItem.url ? (
          <div className="md:col-span-2 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <img src={draftItem.url} alt={draftItem.altText || draftItem.name} className="h-48 w-full rounded-2xl object-cover" />
          </div>
        ) : null}
      </FormSection>
    </div>
  );
}
