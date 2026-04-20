import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
import { useSiteData } from "../contexts/SiteDataContext";
import { getMathsHomeCards } from "../data/mathsBoardPages";
import MainLayout from "../layouts/MainLayout";
import { buildWhatsAppUrl } from "../utils/whatsapp";

const homepageFaqs = [
  {
    question: "How do I choose the right maths tutor for my child's class and board?",
    answer:
      "Start with class, then narrow by board, sector, and teaching mode. A Class 8 learner usually needs confidence and concept repair, while a Class 10, IB, IGCSE, or JEE learner often needs sharper exam structure and topic strategy.",
  },
  {
    question: "Do you provide maths home tutors for premium schools in Gurugram?",
    answer:
      "Yes. The premium school section is for families who want tutors already familiar with the pace and expectations of schools near Golf Course Road, Golf Course Extension Road, and other major Gurugram corridors.",
  },
  {
    question: "Can I request home tuition only in my sector?",
    answer:
      "Yes. The sector cards are meant to help parents check locality relevance quickly before moving into a demo or WhatsApp enquiry.",
  },
  {
    question: "What happens after I submit a student or tutor form?",
    answer:
      "The dashboard creates a structured WhatsApp handoff to the Maths Bodhi number, so the next conversation can start quickly without extra portal friction.",
  },
];

function getClassSortOrder(value) {
  const orderedClasses = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "IGCSE",
    "IB DP",
    "JEE Main",
  ];

  const index = orderedClasses.indexOf(value);
  return index === -1 ? orderedClasses.length + 1 : index;
}

function Home() {
  const { siteData } = useSiteData();
  const { seo, home, contact, tutors, reviews, premiumSchools, sectorPages } = siteData;

  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedBoard, setSelectedBoard] = useState("All Boards");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [visibleSectors, setVisibleSectors] = useState(6);
  const [openFaq, setOpenFaq] = useState(0);

  const classOptions = useMemo(() => {
    const classes = [...new Set(tutors.map((tutor) => tutor.classLevel))].sort(
      (first, second) => getClassSortOrder(first) - getClassSortOrder(second),
    );

    return ["All Classes", ...classes];
  }, [tutors]);

  const sectorOptions = useMemo(
    () => ["All Sectors", ...new Set(sectorPages.map((sector) => sector.sectorLabel))],
    [sectorPages],
  );

  const boardOptions = useMemo(
    () => ["All Boards", ...new Set(tutors.map((tutor) => tutor.board))],
    [tutors],
  );

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const classMatch =
        selectedClass === "All Classes" || tutor.classLevel === selectedClass;
      const sectorMatch =
        selectedSector === "All Sectors" || tutor.sectors.includes(selectedSector);
      const boardMatch = selectedBoard === "All Boards" || tutor.board === selectedBoard;
      const modeMatch =
        selectedMode === "All Modes" || tutor.mode.includes(selectedMode);

      return classMatch && sectorMatch && boardMatch && modeMatch;
    });
  }, [selectedBoard, selectedClass, selectedMode, selectedSector, tutors]);

  const averageReviewRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    return reviews.length ? (total / reviews.length).toFixed(1) : "0.0";
  }, [reviews]);

  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsappNumber,
    "Hello Maths Bodhi, I want help finding a maths home tutor in Gurugram.",
  );
  const mathsHomeCards = getMathsHomeCards();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteData.brandName,
      url: import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com",
      logo: `${import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com"}/favicon.svg`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: contact.phoneDisplay,
          contactType: "customer support",
          areaServed: "Gurugram",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `${siteData.brandName} Gurugram`,
      description: seo.description,
      telephone: contact.phoneDisplay,
      email: contact.email,
      areaServed: ["Gurugram", "Gurgaon"],
      address: {
        "@type": "PostalAddress",
        addressLocality: contact.city,
        addressRegion: contact.state,
        addressCountry: contact.country,
      },
      image: `${import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com"}/images/hero-maths-home.svg`,
    },
  ];

  return (
    <MainLayout>
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalPath="/"
        imagePath="/images/hero-maths-home.svg"
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-16">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {home.eyebrow}
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
                {home.heroTitle}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {home.heroSubtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  {
                    label: "Class 10 support",
                    action: () => {
                      setSelectedClass("Class 10");
                      setSelectedBoard("All Boards");
                    },
                  },
                  {
                    label: "IB maths experts",
                    action: () => {
                      setSelectedClass("IB DP");
                      setSelectedBoard("IB");
                    },
                  },
                  {
                    label: "Sector 56 tutors",
                    action: () => setSelectedSector("Sector 56"),
                  },
                  {
                    label: "Home tuition only",
                    action: () => setSelectedMode("Home Tuition"),
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/book-demo"
                  className="rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                >
                  Book Free Maths Demo
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  WhatsApp Maths Bodhi
                </a>
                <Link
                  to="/login"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Open Student or Tutor Login
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {home.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Popular maths searches on this page
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {home.keywordChips.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100">
              <img
                src="/images/hero-maths-home.svg"
                alt="Premium maths home tutoring dashboard illustration showing concept learning, progress tracking, and local Gurugram service coverage"
                className="h-auto w-full rounded-[24px] border border-slate-100 bg-slate-50"
              />

              <div className="mt-5 rounded-[24px] bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-950">
                  Find the right maths tutor faster
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Start with class, then narrow by board, sector, and mode so the shortlist feels
                  relevant from the first click.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Class or level
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(event) => setSelectedClass(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Board
                    </label>
                    <select
                      value={selectedBoard}
                      onChange={(event) => setSelectedBoard(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
                    >
                      {boardOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Gurugram sector
                    </label>
                    <select
                      value={selectedSector}
                      onChange={(event) => setSelectedSector(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
                    >
                      {sectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Teaching mode
                    </label>
                    <select
                      value={selectedMode}
                      onChange={(event) => setSelectedMode(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
                    >
                      {["All Modes", "Home Tuition", "Online"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Tutor matches</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{filteredTutors.length}</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Average review</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{averageReviewRating}/5</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Priority sectors</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{sectorPages.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  Filtered Tutor Results
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
                  Compare tutors that match your current filters
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                  {filteredTutors.length} tutor{filteredTutors.length === 1 ? "" : "s"} found for{" "}
                  {selectedClass !== "All Classes" ? selectedClass : "all classes"},{" "}
                  {selectedBoard !== "All Boards" ? selectedBoard : "all boards"},{" "}
                  {selectedSector !== "All Sectors" ? selectedSector : "all sectors"}, and{" "}
                  {selectedMode !== "All Modes" ? selectedMode.toLowerCase() : "all modes"}.
                </p>
              </div>

              <Link
                to="/book-demo"
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Request custom tutor matching
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[selectedClass, selectedBoard, selectedSector, selectedMode]
                .filter((item) => !item.startsWith("All "))
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredTutors.slice(0, 6).map((tutor) => (
                <TutorCard key={tutor.id} {...tutor} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Browse Maths by Board"
              title="Choose the maths board or programme that matches the student's academic route"
              subtitle="Start with the curriculum first, then move into the exact maths page that fits the student's level more cleanly."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/subjects/maths"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                Open Maths by Board Hub
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mathsHomeCards.map((subject) => (
                <Link
                  key={subject.title}
                  to={subject.to}
                  className="group rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
                    {subject.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-slate-950">{subject.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {subject.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subject.tags.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                    Open board page
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="For Premium School Parents"
              title="Maths tutors aligned to premium school expectations in Gurugram"
              subtitle="Quickly judge school fit, locality fit, and the kind of maths support being offered."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {premiumSchools.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                      {item.board}
                    </p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.locality}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{item.school}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{item.support}</p>
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                    <h3 className="text-base font-semibold text-slate-950">Best for</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.highlight}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <SectionTitle
                badge="Why Families Trust This Setup"
                title={home.intentTitle}
                subtitle="A lighter SEO-focused explanation of how the homepage supports class intent, board intent, and local Gurugram discovery."
                align="left"
              />

              <div className="mt-7 space-y-5">
                {home.intentParagraphs.map((paragraph, index) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-700 md:text-base">
                    {index === 1 ? (
                      <>
                        <span className="mb-2 block text-lg font-bold text-slate-950">
                          Why the structure supports local SEO and parent clarity
                        </span>
                        {paragraph}
                      </>
                    ) : index === 2 ? (
                      <>
                        <span className="mb-2 block text-lg font-bold text-slate-950">
                          Why maths-first SEO is safer and more useful
                        </span>
                        {paragraph}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <img
                src="/images/tutor-premium-school.svg"
                alt="School-specific premium maths home tutor profile illustration for Gurugram families"
                className="aspect-[4/3] w-full rounded-[24px] border border-slate-200 bg-white object-cover"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-slate-950">
                    School-aware local intent
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Parents can judge school fit, board fit, and sector fit before enquiring.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-slate-950">
                    Clearer search relevance
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The layout keeps class, board, and locality relevance visible without long scanning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div className="order-2 rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm lg:order-1">
              <img
                src="/images/tutor-classroom-progress.svg"
                alt="Maths progress illustration showing score growth, weekly review, and structured tutoring outcomes"
                className="aspect-[4/3] w-full rounded-[24px] border border-slate-200 bg-slate-50 object-cover"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Faster handoff
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Dashboards and forms move cleanly into WhatsApp so the next conversation starts faster.
                  </p>
                </div>
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Clearer follow-up
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Parents, students, tutors, and the team stay on one practical communication path.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionTitle
                badge="What Happens Next"
                title={home.goalTitle}
                subtitle="A lighter operational view of what happens after the first enquiry, demo request, or tutor onboarding step."
                align="left"
              />

              <div className="mt-7 space-y-5">
                {home.goalParagraphs.map((paragraph, index) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-700 md:text-base">
                    {index === 1 ? (
                      <>
                        <span className="mb-2 block text-lg font-bold text-slate-950">
                          Helpful content over thin SEO pages
                        </span>
                        {paragraph}
                      </>
                    ) : index === 2 ? (
                      <>
                        <span className="mb-2 block text-lg font-bold text-slate-950">
                          Dynamic control through admin edits
                        </span>
                        {paragraph}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Find Tutors Near You"
              title="Browse local Gurugram sectors where maths home tuition demand is strongest"
              subtitle="A more professional locality view for parents who want fast sector-level clarity before booking a demo."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sectorPages.slice(0, visibleSectors).map((sector) => (
                <Link
                  key={sector.slug}
                  to={`/city/${sector.citySlug}/${sector.slug}`}
                  className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                        Gurugram Locality
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-slate-950">
                        {sector.sectorLabel}
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                      {sector.nearbySchools.length} school zones
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{sector.subtitle}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {sector.landmarks.slice(0, 2).map((landmark) => (
                      <span
                        key={landmark}
                        className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {landmark}
                      </span>
                    ))}
                    {sector.nearbySchools[0] ? (
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                        {sector.nearbySchools[0]}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-sm font-medium text-slate-600">Home tuition and online support</p>
                    <p className="text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                      Explore sector
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {visibleSectors < sectorPages.length ? (
                <button
                  onClick={() =>
                    setVisibleSectors((current) => Math.min(current + 3, sectorPages.length))
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Load more sectors
                </button>
              ) : (
                <button
                  onClick={() => setVisibleSectors(6)}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Show fewer sectors
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="What Gurugram Parents Say"
              title="Real-looking parent feedback from Gurugram sectors with more honest rating spread"
              subtitle={`Showing ${visibleReviews} of ${reviews.length} review cards. Ratings are intentionally mixed instead of repeating a flat 5.0 on every card.`}
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {reviews.slice(0, visibleReviews).map((review) => (
                <article
                  key={review.id}
                  className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      {Number(review.rating).toFixed(1)}/5
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {review.board}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">
                    {review.parent}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {review.sector} | {review.school}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{review.quote}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {visibleReviews < reviews.length ? (
                <button
                  onClick={() =>
                    setVisibleReviews((current) => Math.min(current + 10, reviews.length))
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Load 10 more reviews
                </button>
              ) : (
                <button
                  onClick={() => setVisibleReviews(10)}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Show fewer reviews
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <SectionTitle
                badge="Questions Parents Ask"
                title="Questions parents usually click on before choosing a maths tutor"
                subtitle="The answers stay hidden until the parent opens the question, which keeps the section easier to scan."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {homepageFaqs.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-base font-semibold text-slate-950">
                          {item.question}
                        </h3>
                        <span className="text-xl font-bold text-blue-700">
                          {isOpen ? "-" : "+"}
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-slate-100 px-6 py-5">
                          <p className="leading-7 text-slate-600">{item.answer}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
                Clear Next Step
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Start with the path that matches your role and your maths need
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Book a demo, open the student dashboard, onboard as a tutor, or message the team directly.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  to="/student-login"
                  className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Student Dashboard Access
                </Link>
                <Link
                  to="/tutor-login"
                  className="rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Tutor Dashboard Access
                </Link>
                <Link
                  to="/admin-login"
                  className="rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Admin Panel Login
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-blue-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-blue-500"
                >
                  WhatsApp {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
