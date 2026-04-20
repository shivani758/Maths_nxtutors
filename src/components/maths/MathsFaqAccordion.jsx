import { useState } from "react";

function MathsFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="rounded-[22px] border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <h3 className="text-base font-semibold text-slate-950">{item.question}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-blue-700">
                {isOpen ? "Hide" : "Open"}
              </span>
            </button>

            {isOpen ? (
              <p className="border-t border-slate-200 px-5 py-4 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default MathsFaqAccordion;
