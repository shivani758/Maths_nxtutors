import { Link } from "react-router-dom";

function RouteCard({ card, isActive = false, variant = "default" }) {
  const isBoardVariant = variant === "board";
  const content = (
    <>
      {card.eyebrow ? (
        <p
          className={`font-semibold uppercase text-cyan-700 ${
            isBoardVariant ? "text-[10px] tracking-[0.16em]" : "text-[11px] tracking-[0.2em]"
          }`}
        >
          {card.eyebrow}
        </p>
      ) : null}

      <h3
        className={`font-bold tracking-tight text-slate-950 ${
          isBoardVariant
            ? "mt-2.5 line-clamp-2 text-lg leading-6"
            : "mt-3 text-lg"
        }`}
      >
        {card.title}
      </h3>

      <p
        className={`line-clamp-3 text-slate-600 ${
          isBoardVariant ? "mt-2 text-[13px] leading-5" : "mt-2 text-sm leading-6"
        }`}
      >
        {card.description}
      </p>

      {card.tags?.length ? (
        <div className={`flex flex-wrap ${isBoardVariant ? "mt-3 gap-1.5" : "mt-4 gap-2"}`}>
          {card.tags.slice(0, isBoardVariant ? 3 : card.tags.length).map((tag) => (
            <span
              key={tag}
              className={`rounded-full border border-slate-200 bg-white font-semibold text-slate-700 ${
                isBoardVariant
                  ? "px-2.5 py-1 text-[10px] leading-none"
                  : "px-3 py-1 text-[11px]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {card.to ? (
        <p
          className={`font-semibold text-blue-700 ${
            isBoardVariant ? "mt-4 text-[13px]" : "mt-auto pt-5 text-sm"
          }`}
        >
          See details
        </p>
      ) : null}
    </>
  );

  const className = `group flex flex-col rounded-[24px] border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
    isActive
      ? "border-blue-200 bg-blue-50/60 shadow-sky-100"
      : "border-slate-200 bg-white hover:border-blue-200"
  } ${isBoardVariant ? "p-4 sm:p-5" : "h-full p-5"}`;

  if (card.to) {
    return (
      <Link to={card.to} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

function MathsRouteCardGrid({
  cards,
  className = "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
  activeTo,
  variant = "default",
}) {
  if (!cards?.length) {
    return null;
  }

  return (
    <div className={className}>
      {cards.map((card) => (
        <RouteCard
          key={`${card.title}-${card.to ?? card.description}`}
          card={card}
          isActive={Boolean(activeTo) && card.to === activeTo}
          variant={variant}
        />
      ))}
    </div>
  );
}

export default MathsRouteCardGrid;
