function SectionTitle({ badge, title, subtitle, align = "center" }) {
  const alignment = align === "left" ? "text-left mx-0" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {badge ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          {badge}
        </span>
      ) : null}

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
