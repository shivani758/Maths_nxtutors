import { Link } from "react-router-dom";

function MathsContextCard({ eyebrow, title, description, tags = [], to, footer }) {
  const className =
    "group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/60";

  const content = (
    <>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}

      <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {footer ? <p className="mt-4 text-sm font-medium text-slate-500">{footer}</p> : null}
      {to ? <p className="mt-auto pt-5 text-sm font-semibold text-blue-700">See details</p> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

export default MathsContextCard;
