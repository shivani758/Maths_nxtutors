import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";

function TutorCard({
  id,
  name,
  title,
  rating,
  experience,
  board,
  classLevel,
  topics,
  price,
  sectors = [],
  mode = [],
  summary,
  schoolFocus = [],
  image,
  imageAlt,
}) {
  const { siteData } = useSiteData();
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(siteData.contact, { id, name, title }, {}),
  );

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-950">{name}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{title}</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {rating}/5 rated
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Class focus</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{classLevel}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Experience</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{experience}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Starting fee</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{price}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Board fit</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{board}</p>
          </div>
          {schoolFocus[0] ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              {schoolFocus[0]}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {sectors.slice(0, 3).map((sector) => (
          <span
            key={sector}
            className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700"
          >
            {sector}
          </span>
        ))}
        <div className="flex flex-wrap gap-2">
          {mode.map((item) => (
            <span
              key={item}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/tutor/${id}`}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
        >
          View Profile
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default TutorCard;
