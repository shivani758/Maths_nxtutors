import { Link } from "react-router-dom";

function MathsLinkPillGroup({ title, subtitle, items = [], activeTo }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
      {title ? <h3 className="text-lg font-bold tracking-tight text-slate-950">{title}</h3> : null}
      {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2.5">
        {items.map((item) => {
          const isActive = activeTo === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MathsLinkPillGroup;
