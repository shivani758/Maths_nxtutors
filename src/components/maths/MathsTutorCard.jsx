import { Link } from "react-router-dom";
import { useSiteData } from "../../contexts/SiteDataContext";
import { getTutorProfilePath } from "../../utils/tutorRoutes";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../../utils/whatsapp";

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function toArray(values) {
  if (Array.isArray(values)) {
    return values.filter(Boolean);
  }

  return values ? [values] : [];
}

function TutorStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{value}</p>
    </div>
  );
}

function TutorChip({ children, tone = "slate" }) {
  const tones = {
    slate: "border border-slate-200 bg-white text-slate-700",
    accent: "border border-cyan-100 bg-cyan-50 text-cyan-700",
    soft: "border border-blue-100 bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tones[tone] ?? tones.slate}`}
    >
      {children}
    </span>
  );
}

function MathsTutorCard({
  id,
  tutorName,
  name,
  title,
  rating,
  yearsExperience,
  experience,
  board,
  boardSpecialization,
  subBoard,
  examType,
  classesSupported,
  classFocus,
  classLevel,
  examSupport = [],
  boardTags = [],
  topicTags = [],
  localityTags = [],
  serviceModeTags = [],
  schoolFitTags = [],
  topics = [],
  chips = [],
  price,
  startingFee,
  sectors = [],
  mode = [],
  serviceModes = [],
  description,
  shortBio,
  summary,
  schoolFocus = [],
  image,
  imageAlt,
  profileTo,
}) {
  const { siteData } = useSiteData();
  const displayName = tutorName ?? name;
  const experienceLabel = yearsExperience ?? experience;
  const specializationLabel = boardSpecialization ?? subBoard ?? examType ?? board;
  const classLabel = classesSupported ?? classFocus ?? classLevel;
  const feeLabel = startingFee ?? price;
  const descriptionText = shortBio ?? description ?? summary;
  const serviceTags = unique(
    toArray(serviceModeTags).length ? toArray(serviceModeTags) : [...toArray(serviceModes), ...toArray(mode)],
  );
  const topChips = unique(
    toArray(boardTags).length ? toArray(boardTags) : [board, specializationLabel, ...toArray(examSupport)],
  ).slice(0, 3);
  const supportingChips = unique([
    ...toArray(topicTags),
    ...toArray(topics),
    ...toArray(localityTags),
    ...toArray(sectors),
    ...toArray(schoolFitTags),
    ...toArray(schoolFocus),
    ...serviceTags,
    ...toArray(chips),
  ]).slice(0, 5);
  const infoLine = unique([classLabel, experienceLabel]).join(" | ");
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(
      siteData.contact,
      { id, name: displayName, title: title ?? specializationLabel },
      {},
    ),
  );
  const profilePath = profileTo ?? getTutorProfilePath({ id, slug: undefined });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-sky-100/70 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {specializationLabel ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700">
                  {specializationLabel}
                </p>
              ) : null}
              <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">{displayName}</h3>
            </div>

            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {rating}/5
            </span>
          </div>

          {title ? (
            <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-700">{title}</p>
          ) : null}
          {infoLine ? <p className="mt-1.5 text-sm text-slate-500">{infoLine}</p> : null}
        </div>
      </div>

      {descriptionText ? (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{descriptionText}</p>
      ) : null}

      {topChips.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {topChips.map((chip) => (
            <TutorChip key={chip} tone="soft">
              {chip}
            </TutorChip>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <TutorStat label="Class fit" value={classLabel ?? "Flexible support"} />
        <TutorStat label="Experience" value={experienceLabel ?? "Experienced tutor"} />
        <TutorStat label="Starting fee" value={feeLabel ?? "Shared on request"} />
      </div>

      {supportingChips.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {supportingChips.map((chip) => (
            <TutorChip key={chip} tone="accent">
              {chip}
            </TutorChip>
          ))}
        </div>
      ) : null}

      <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
        {profileTo ? (
          <Link
            to={profilePath}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
          >
            View profile
          </Link>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
          >
            Check tutor fit
          </a>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default MathsTutorCard;
