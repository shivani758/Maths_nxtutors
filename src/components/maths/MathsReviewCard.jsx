function MathsReviewCard({ parent, sector, rating, board, quote }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-950">{parent}</h3>
          <p className="mt-1 text-sm text-slate-500">{sector}, Gurugram</p>
        </div>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {rating}/5
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
          {board}
        </span>
        <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-700">
          Maths home tuition
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{quote}</p>
    </article>
  );
}

export default MathsReviewCard;
