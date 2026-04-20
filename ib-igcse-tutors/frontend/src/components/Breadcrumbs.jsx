import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="font-medium transition hover:text-blue-600">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-slate-950" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="text-slate-300">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
