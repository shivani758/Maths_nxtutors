import { Link } from "react-router-dom";

function MathsResultCard({ studentLabel, classBoard, beforeResult, afterResult, story, tutorName, tutorPath }) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <span className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Student result
      </span>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{studentLabel}</h3>
      <p className="mt-2 text-sm font-semibold text-blue-700">{classBoard}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Before</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{beforeResult}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">After</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-emerald-900">{afterResult}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{story}</p>

      {tutorName ? (
        tutorPath ? (
          <Link to={tutorPath} className="mt-auto pt-5 text-sm font-semibold text-blue-700 transition hover:text-blue-800">
            Related tutor: {tutorName}
          </Link>
        ) : (
          <p className="mt-auto pt-5 text-sm font-semibold text-slate-500">Related tutor: {tutorName}</p>
        )
      ) : null}
    </article>
  );
}

export default MathsResultCard;
