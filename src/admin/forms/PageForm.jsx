import { PAGE_STATUS_OPTIONS, PAGE_TYPE_OPTIONS, TUTOR_BOARD_OPTIONS } from "../contentOptions";
import { slugifyValue } from "../utils/formValidation";
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

function normalizeBoardPageKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9/-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/\/{2,}/g, "/");
}

function buildDefaultRoute(pageType, pageKey, slug) {
  if (pageType === "subject") {
    return slug ? `/subject/${slug}` : "";
  }

  if (!pageKey) {
    return "";
  }

  return pageKey === "hub" ? "/subjects/maths" : `/subjects/maths/${pageKey}`;
}

function PageForm({
  draft,
  setDraft,
  mediaOptions,
  tutorOptions,
  reviewOptions,
  cityOptions = [],
  errors = {},
}) {
  function setField(patch) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function updateIdentityFromLabel(value) {
    setDraft((current) => {
      const nextSlug = current.slug || slugifyValue(value);
      const nextPageKey =
        current.pageKey ||
        (current.pageType === "subject" ? nextSlug : normalizeBoardPageKey(value));
      const nextRoute = current.route || buildDefaultRoute(current.pageType, nextPageKey, nextSlug);

      return {
        ...current,
        label: value,
        title: current.title || value,
        navLabel: current.navLabel || value,
        h1: current.h1 || value,
        slug: nextSlug,
        pageKey: nextPageKey,
        route: nextRoute,
      };
    });
  }

  return (
    <div className="space-y-5">
      <FormSection
        title="Page Basics"
        description="This editor now writes directly to the shared pages API used by board and subject content."
      >
        <FieldGroup label="Page Type" required error={errors.pageType}>
          <select
            value={draft.pageType}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                pageType: event.target.value,
                route:
                  current.route ||
                  buildDefaultRoute(event.target.value, current.pageKey, current.slug),
              }))
            }
            className={getFieldControlClass(errors.pageType)}
          >
            {PAGE_TYPE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Status" required error={errors.status}>
          <select
            value={draft.status}
            onChange={(event) => setField({ status: event.target.value })}
            className={getFieldControlClass(errors.status)}
          >
            {PAGE_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Label" required error={errors.label}>
          <input
            value={draft.label ?? draft.title}
            onChange={(event) => updateIdentityFromLabel(event.target.value)}
            className={getFieldControlClass(errors.label)}
          />
        </FieldGroup>

        <FieldGroup label="Page Key" required error={errors.pageKey} helpText="Board pages may use nested keys like `ib/dp` if needed.">
          <input
            value={draft.pageKey}
            onChange={(event) =>
              setDraft((current) => {
                const nextPageKey =
                  current.pageType === "subject"
                    ? slugifyValue(event.target.value)
                    : normalizeBoardPageKey(event.target.value);
                return {
                  ...current,
                  pageKey: nextPageKey,
                  route: current.route || buildDefaultRoute(current.pageType, nextPageKey, current.slug),
                };
              })
            }
            className={getFieldControlClass(errors.pageKey)}
          />
        </FieldGroup>

        <FieldGroup label="Slug" required error={errors.slug}>
          <input
            value={draft.slug}
            onChange={(event) =>
              setDraft((current) => {
                const nextSlug =
                  current.pageType === "subject"
                    ? slugifyValue(event.target.value)
                    : normalizeBoardPageKey(event.target.value);
                return {
                  ...current,
                  slug: nextSlug,
                  route: current.route || buildDefaultRoute(current.pageType, current.pageKey, nextSlug),
                };
              })
            }
            className={getFieldControlClass(errors.slug)}
          />
        </FieldGroup>

        <FieldGroup label="Route" required error={errors.route} helpText="Public routes must start with `/`.">
          <input
            value={draft.route}
            onChange={(event) => setField({ route: event.target.value })}
            className={getFieldControlClass(errors.route)}
          />
        </FieldGroup>

        <FieldGroup label="H1" required fullWidth error={errors.h1}>
          <input
            value={draft.h1}
            onChange={(event) => setField({ h1: event.target.value })}
            className={getFieldControlClass(errors.h1)}
          />
        </FieldGroup>

        <FieldGroup label="Intro" required fullWidth error={errors.intro}>
          <textarea
            rows={4}
            value={draft.intro}
            onChange={(event) => setField({ intro: event.target.value })}
            className={getFieldControlClass(errors.intro)}
          />
        </FieldGroup>

        <FieldGroup label="Badge" error={errors.badge}>
          <input
            value={draft.badge ?? ""}
            onChange={(event) => setField({ badge: event.target.value })}
            className={getFieldControlClass(errors.badge)}
          />
        </FieldGroup>

        <FieldGroup label="Hero Badge" error={errors.heroBadge}>
          <input
            value={draft.heroBadge ?? ""}
            onChange={(event) => setField({ heroBadge: event.target.value })}
            className={getFieldControlClass(errors.heroBadge)}
          />
        </FieldGroup>

        <MediaPickerField
          label="Hero Image"
          value={draft.heroImage}
          onChange={(value) => setField({ heroImage: value, seo: { ...draft.seo, ogImage: value } })}
          assets={mediaOptions}
          error={errors.heroImage}
        />
      </FormSection>

      <FormSection
        title="Routing And Relevance"
        description="Use these fields to connect pages with tutors, reviews, and related public entry points."
      >
        <FieldGroup label="Related Cities" error={errors.relatedCities} helpText="Useful for subject pages that should surface in specific city routes.">
          <select
            multiple
            value={draft.relatedCities ?? []}
            onChange={(event) =>
              setField({
                relatedCities: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.relatedCities, "h-32")}
          >
            {cityOptions.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.label}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Boards" error={errors.boards} helpText="One or more boards that this page supports.">
          <select
            multiple
            value={draft.boards ?? []}
            onChange={(event) =>
              setField({
                boards: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.boards, "h-32")}
          >
            {TUTOR_BOARD_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Topics" fullWidth error={errors.topics} helpText="One topic or search angle per line.">
          <textarea
            rows={4}
            value={formatLineList(draft.topics ?? draft.searchIntentChips)}
            onChange={(event) =>
              setField({
                topics: parseLineList(event.target.value),
                searchIntentChips: parseLineList(event.target.value),
              })
            }
            className={getFieldControlClass(errors.topics)}
          />
        </FieldGroup>

        <FieldGroup label="Checklist" fullWidth helpText="One checklist item per line." error={errors.checklist}>
          <textarea
            rows={5}
            value={formatLineList(draft.checklist)}
            onChange={(event) =>
              setField({
                checklist: parseLineList(event.target.value),
                parentChecklist: parseLineList(event.target.value),
              })
            }
            className={getFieldControlClass(errors.checklist)}
          />
        </FieldGroup>

        <FieldGroup label="FAQ Entries" fullWidth helpText="Use `Question :: Answer` on each line." error={errors.faqItems}>
          <textarea
            rows={6}
            value={(draft.faqItems ?? []).map((item) => `${item.question} :: ${item.answer}`).join("\n")}
            onChange={(event) =>
              setField({
                faqItems: parseLineList(event.target.value).map((item, index) => {
                  const [question, ...rest] = item.split("::");
                  return {
                    id: draft.faqItems?.[index]?.id,
                    question: question.trim(),
                    answer: rest.join("::").trim(),
                  };
                }),
              })
            }
            className={getFieldControlClass(errors.faqItems)}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        title="Featured Content"
        description="These relationships power tutor, review, and related-content visibility on the public site."
      >
        <FieldGroup label="Featured Tutors" error={errors.featuredTutorIds}>
          <select
            multiple
            value={draft.featuredTutorIds ?? []}
            onChange={(event) =>
              setField({
                featuredTutorIds: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.featuredTutorIds, "h-32")}
          >
            {tutorOptions.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Featured Reviews" error={errors.featuredReviewIds}>
          <select
            multiple
            value={draft.featuredReviewIds ?? []}
            onChange={(event) =>
              setField({
                featuredReviewIds: Array.from(event.target.selectedOptions, (option) => option.value),
              })
            }
            className={getFieldControlClass(errors.featuredReviewIds, "h-32")}
          >
            {reviewOptions.map((review) => (
              <option key={review.id} value={review.id}>
                {review.reviewerName}
              </option>
            ))}
          </select>
        </FieldGroup>

        <div className="md:col-span-2">
          <ToggleField
            label="Indexable"
            description="Disable only for pages you explicitly want excluded from public indexation."
            checked={draft.seo?.indexable ?? true}
            onChange={(checked) => setField({ seo: { ...draft.seo, indexable: checked } })}
          />
        </div>
      </FormSection>

      <SeoFieldsPanel value={draft.seo} onChange={(seo) => setField({ seo })} errors={errors} />
    </div>
  );
}

export default PageForm;
