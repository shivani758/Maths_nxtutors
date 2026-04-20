const mathsTestimonials = [
  {
    id: "review-cbse-sector-50",
    parent: "Ritika S.",
    sector: "Sector 50",
    board: "CBSE Maths",
    rating: "4.8",
    quote:
      "The tutor kept worksheets, school tests, and board revision connected. My son stopped guessing through chapters and started writing full working with more confidence.",
    featuredOn: ["hub", "cbse"],
  },
  {
    id: "review-cbse-sector-46",
    parent: "Amit G.",
    sector: "Sector 46",
    board: "CBSE Maths",
    rating: "4.7",
    quote:
      "What helped most was the weekly routine. The classes stayed practical, chapter by chapter, and the tutor gave clear updates before school tests and pre-boards.",
    featuredOn: ["cbse"],
  },
  {
    id: "review-cbse-sector-65",
    parent: "Neetu B.",
    sector: "Sector 65",
    board: "CBSE Maths",
    rating: "4.8",
    quote:
      "My daughter needed stronger Class 11 maths discipline, not just more questions. The lessons gave her a cleaner plan for calculus and functions every week.",
    featuredOn: ["cbse"],
  },
  {
    id: "review-igcse-sector-54",
    parent: "Sonal M.",
    sector: "Sector 54",
    board: "IGCSE Maths",
    rating: "4.9",
    quote:
      "The improvement came from written method and error review. My child was already trying hard, but the tutor made the working much clearer and more exam-ready.",
    featuredOn: ["hub", "igcse"],
  },
  {
    id: "review-igcse-sector-56",
    parent: "Farah K.",
    sector: "Sector 56",
    board: "IGCSE Maths",
    rating: "4.8",
    quote:
      "We wanted a tutor who understood Extended Maths pressure. The classes became calmer, more structured, and much better aligned to how the school assessed maths.",
    featuredOn: ["igcse"],
  },
  {
    id: "review-igcse-sector-55",
    parent: "Prerna A.",
    sector: "Sector 55",
    board: "IGCSE Maths",
    rating: "4.7",
    quote:
      "Past-paper practice finally became useful because the tutor first fixed the way my son was setting out his working. That made a visible difference.",
    featuredOn: ["igcse"],
  },
  {
    id: "review-ib-sector-54",
    parent: "Nadia R.",
    sector: "Sector 54",
    board: "IB Maths",
    rating: "4.9",
    quote:
      "The tutor understood the school context and the exact course pressure. My daughter became much more stable with IB maths once the lessons matched her pathway properly.",
    featuredOn: ["hub", "ib", "ib/dp"],
  },
  {
    id: "review-ib-sector-55",
    parent: "Rohan P.",
    sector: "Sector 55",
    board: "IB Maths",
    rating: "4.8",
    quote:
      "For MYP, what mattered was better structure and reasoning. The tutoring was patient, but it also gave my child more academic discipline week by week.",
    featuredOn: ["ib", "ib/myp"],
  },
  {
    id: "review-ib-sector-62",
    parent: "Sara L.",
    sector: "Sector 62",
    board: "IB Maths",
    rating: "4.8",
    quote:
      "We were confused between AA and AI at first. The support helped us understand the fit and then build confidence once the Diploma course was clear.",
    featuredOn: ["ib", "ib/dp", "ib/dp/aa-sl", "ib/dp/ai-sl"],
  },
  {
    id: "review-pyp-sector-54",
    parent: "Devina T.",
    sector: "Sector 54",
    board: "IB PYP Maths",
    rating: "4.8",
    quote:
      "The lessons made maths feel lighter for our child. Number sense, patterns, and confidence improved without making the sessions feel heavy.",
    featuredOn: ["ib/pyp"],
  },
  {
    id: "review-jee-sector-50",
    parent: "Manish V.",
    sector: "Sector 50",
    board: "JEE Maths",
    rating: "4.8",
    quote:
      "The biggest change was discipline. My son stopped jumping randomly between chapters and started handling school maths and JEE practice in a more organised way.",
    featuredOn: ["hub", "jee", "jee/main"],
  },
  {
    id: "review-jee-sector-56",
    parent: "Apoorva D.",
    sector: "Sector 56",
    board: "JEE Maths",
    rating: "4.9",
    quote:
      "Advanced preparation felt less overwhelming once the tutor focused on deeper problem solving instead of just piling on more question sheets.",
    featuredOn: ["jee", "jee/advanced"],
  },
  {
    id: "review-jee-sector-46",
    parent: "Kunal C.",
    sector: "Sector 46",
    board: "JEE Maths",
    rating: "4.7",
    quote:
      "JEE Main practice became much sharper after the tutor built a better timing routine and made PYQ review more structured.",
    featuredOn: ["jee", "jee/main"],
  },
];

function dedupeById(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (!item || seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

export function getMathsTestimonialById(id) {
  return mathsTestimonials.find((item) => item.id === id) ?? null;
}

export function getMathsTestimonialsByIds(ids = []) {
  return ids.map((id) => getMathsTestimonialById(id)).filter(Boolean);
}

export function getMathsTestimonialsForPage(pageKey, featuredReviewIds = [], limit = 6) {
  const prioritisedItems = getMathsTestimonialsByIds(featuredReviewIds);
  const relatedItems = mathsTestimonials.filter((item) => item.featuredOn.includes(pageKey));

  return dedupeById([...prioritisedItems, ...relatedItems]).slice(0, limit);
}

export { mathsTestimonials };
