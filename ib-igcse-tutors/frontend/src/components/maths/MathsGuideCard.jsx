import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function MathsGuideCard({ category, title, summary, tags = [], author, publishDate, to = "" }) {
  const formattedDate = formatDate(publishDate);
  const cardBody = (
    <article className={`flex h-full flex-col rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm ${to ? "transition group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-md" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        {category ? (
          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700">
            {category}
          </span>
        ) : null}
        {formattedDate ? (
          <span className="text-xs font-medium text-slate-500">{formattedDate}</span>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>

      {tags.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {author ? <p className="mt-auto pt-5 text-sm font-medium text-slate-500">By {author}</p> : null}
      {to ? <p className="mt-3 text-sm font-semibold text-blue-700">Read guide</p> : null}
    </article>
  );

  if (!to) {
    return cardBody;
  }

  return (
    <Link to={to} className="group block h-full">
      {cardBody}
    </Link>
  );
}

export default MathsGuideCard;
