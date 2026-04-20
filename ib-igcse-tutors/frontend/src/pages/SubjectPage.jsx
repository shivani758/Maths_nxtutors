import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { getSubjectPage } from "../services/siteLookup";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

function formatSlugLabel(value) {
  return String(value ?? "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function collectBoardTokens(page) {
  const source = [page.label, ...(page.boards ?? [])].join(" ").toLowerCase();
  const tokens = [];

  if (source.includes("cbse")) tokens.push("cbse");
  if (source.includes("igcse")) tokens.push("igcse");
  if (source.includes("ib")) tokens.push("ib");
  if (source.includes("jee")) tokens.push("jee");
  if (source.includes("icse")) tokens.push("icse");
  if (source.includes("foundation")) tokens.push("foundation");

  return tokens.length ? tokens : [page.label.toLowerCase()];
}

function createFallbackClassSegments(page) {
  return (page.boards ?? []).slice(0, 3).map((board, index) => ({
    label: board,
    focus: `Support track ${index + 1}`,
    description:
      "This part of the subject route keeps the tutoring context tied to the board pathway, topic depth, and expected school outcomes.",
    topics: page.topics.slice(index, index + 4),
  }));
}

function createFallbackSeoSections(page) {
  return [
    {
      title: `${page.label} tutoring in Gurugram`,
      paragraphs: [
        page.subtitle,
        page.cta?.description ??
          "Families can use this subject page to judge fit before they move into a tutor or demo enquiry.",
      ],
    },
    {
      title: `What parents usually evaluate on a ${page.label.toLowerCase()} page`,
      paragraphs: [
        "A strong subject page should explain class fit, board fit, and learning approach clearly enough that the parent can tell whether the route is relevant before filling a form.",
        "The better the page answers practical questions around topics, outcomes, and local availability, the stronger it becomes for both user trust and long-term SEO.",
      ],
    },
  ];
}

function SubjectPage() {
  const { slug } = useParams();
  const { siteData } = useSiteData();
  const { premiumSchools, reviews, sectorPages, tutors, contact } = siteData;
  const page = getSubjectPage(siteData, slug);
  const [openFaq, setOpenFaq] = useState(0);
  const primaryCity = page?.relatedCities?.[0] ?? "gurugram";
  const cityLabel = formatSlugLabel(primaryCity);
  const boardTokens = useMemo(() => (page ? collectBoardTokens(page) : []), [page]);

  const featuredTutors = useMemo(() => {
    if (!page) {
      return [];
    }

    if (page.featuredTutorIds?.length) {
      return page.featuredTutorIds
        .map((id) => tutors.find((tutor) => tutor.id === id))
        .filter(Boolean);
    }

    return tutors
      .filter((tutor) =>
        boardTokens.some((token) =>
          `${tutor.board} ${tutor.title} ${tutor.classLevel}`.toLowerCase().includes(token),
        ),
      )
      .slice(0, 3);
  }, [boardTokens, page, tutors]);

  const schoolHighlights = useMemo(() => {
    if (!page) {
      return [];
    }

    if (page.schoolHighlights?.length) {
      return page.schoolHighlights;
    }

    return premiumSchools
      .filter((school) =>
        boardTokens.some((token) => school.board.toLowerCase().includes(token)),
      )
      .slice(0, 4)
      .map((school) => ({
        school: school.school,
        locality: school.locality,
        fit: school.support,
        boardContext: school.highlight,
      }));
  }, [boardTokens, page, premiumSchools]);

  const localDemandZones = useMemo(() => {
    if (!page) {
      return [];
    }

    const sourceZones =
      page.localDemandZones?.length ? page.localDemandZones : sectorPages.slice(0, 4);

    return sourceZones
      .map((zone) => {
        const sector = sectorPages.find(
          (item) => item.citySlug === primaryCity && item.slug === zone.slug,
        );

        if (!sector) {
          return null;
        }

        return {
          slug: sector.slug,
          label: sector.sectorLabel,
          reason: zone.reason ?? sector.subtitle,
          nearbySchools: sector.nearbySchools ?? [],
        };
      })
      .filter(Boolean);
  }, [page, primaryCity, sectorPages]);

  const featuredReviews = useMemo(() => {
    if (!page) {
      return [];
    }

    const matched = reviews.filter((review) =>
      boardTokens.some((token) => review.board.toLowerCase().includes(token)),
    );

    return (matched.length ? matched : reviews).slice(0, 3);
  }, [boardTokens, reviews]);

  if (!page) {
    return <NotFound />;
  }

  const classSegments = page.classSegments?.length
    ? page.classSegments
    : createFallbackClassSegments(page);
  const boardSupportCards = page.boardSupportCards?.length
    ? page.boardSupportCards
    : page.learningApproach.map((item) => ({ title: item.title, text: item.text }));
  const seoSections = page.seoSections?.length ? page.seoSections : createFallbackSeoSections(page);
  const parentChecklist = page.parentChecklist?.length ? page.parentChecklist : page.outcomes;
  const searchIntentChips = page.searchIntentChips?.length ? page.searchIntentChips : page.topics;
  const heroStats = page.heroStats?.length
    ? page.heroStats
    : [
        { value: `${page.topics.length}+`, label: "Topic clusters" },
        { value: `${classSegments.length}`, label: "Support tracks" },
        { value: `${featuredTutors.length}`, label: "Tutor fits" },
        { value: `${schoolHighlights.length}`, label: "School contexts" },
      ];

  const relatedLinks = [
    ...((page.relatedCities ?? []).map((city) => ({
      to: `/city/${city}`,
      label: `Maths tutor hub in ${formatSlugLabel(city)}`,
      description: `Explore the city-level coverage, sector links, and maths discovery flow for ${formatSlugLabel(city)}.`,
    })) ?? []),
    ...localDemandZones.slice(0, 4).map((zone) => ({
      to: `/city/${primaryCity}/${zone.slug}`,
      label: `${page.label} demand in ${zone.label}`,
      description: zone.reason,
    })),
  ];

  const seoKeywords = page.keywords?.length
    ? page.keywords
    : [page.label, "maths tuition", "gurugram maths tutor", ...page.topics];

  const seoDescription = page.metaDescription ?? page.subtitle;
  const heroImage = page.heroImage ?? "/images/hero-maths-home.svg";
  const heroImageAlt = page.heroImageAlt ?? `${page.label} tutoring support in ${cityLabel}`;
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsappNumber,
    `Hello Maths Bodhi, I want help with ${page.label} home tuition in ${cityLabel}. Please guide me on class fit, school fit, and tutor availability.`,
  );

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com"}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Subjects",
          item: `${import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com"}/subject/${page.slug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.label,
          item: `${import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com"}/subject/${page.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${page.label} home tuition in ${cityLabel}`,
      description: seoDescription,
      serviceType: `${page.label} tutoring`,
      areaServed: cityLabel,
      provider: {
        "@type": "Organization",
        name: siteData.brandName,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <MainLayout>
      <Seo
        title={page.seoTitle ?? page.title}
        description={seoDescription}
        canonicalPath={`/subject/${page.slug}`}
        keywords={seoKeywords}
        imagePath={heroImage}
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-16 md:py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Subjects" },
                { label: page.label },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {page.heroBadge ?? "Subject-first maths discovery"}
                </span>

                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                  {page.title}
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {searchIntentChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {page.cta.label}
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Discuss on WhatsApp
                  </a>
                  <Link
                    to={`/city/${primaryCity}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Browse {cityLabel} maths routes
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100">
                <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50">
                  <img src={heroImage} alt={heroImageAlt} className="h-56 w-full object-cover" />
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                    Why this page matters
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
                    {page.heroSupportTitle ?? "Academic intent stays primary"}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">
                    {page.heroSupportText ??
                      "This page keeps the maths subject intent stronger than a generic locality-first flow, which makes it more useful for parents and more scalable for SEO."}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                    >
                      <p className="text-2xl font-bold text-slate-950">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Board-wise content"
              title={`${page.label} support across class level, chapter depth, and exam stage`}
              subtitle="This board hub should help a parent understand what kind of maths support is relevant before they compare tutors, sectors, or demo timing."
              align="left"
            />

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {boardSupportCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                      Content field
                    </p>
                    <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Topics, outcomes, and the tutoring flow
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">
                  {page.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {page.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">{outcome}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  {page.learningApproach.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-slate-950">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Class-wise support"
              title={`How ${page.label.toLowerCase()} tutoring changes from junior classes to board years`}
              subtitle="Parents usually decide faster when class-wise expectations are visible. This block keeps the page broad, but still specific enough to be useful."
              align="left"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {classSegments.map((segment) => (
                <article
                  key={segment.label}
                  className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                    {segment.label}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{segment.focus}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{segment.description}</p>

                  {segment.topics?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {segment.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <SectionTitle
                badge="School-wise content"
                title={`Local school contexts often connected to ${page.label.toLowerCase()} support`}
                subtitle="School references should help a parent judge fit, pace, and practical tutoring context. They should not feel generic or disconnected from the board."
                align="left"
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {schoolHighlights.map((school) => (
                  <article
                    key={school.school}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {school.locality}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-slate-950">{school.school}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{school.fit}</p>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-700">
                      {school.boardContext}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <SectionTitle
                badge="Local Gurugram fit"
                title={`Sectors where ${page.label.toLowerCase()} home tuition demand is practical and visible`}
                subtitle="This keeps the board page useful for local decision-making without turning it into a duplicate of every sector page."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {localDemandZones.map((zone) => (
                  <Link
                    key={zone.slug}
                    to={`/city/${primaryCity}/${zone.slug}`}
                    className="block rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-950">{zone.label}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                        View locality page
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{zone.reason}</p>
                    {zone.nearbySchools?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {zone.nearbySchools.slice(0, 2).map((school) => (
                          <span
                            key={school}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {school}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Tutor matches"
              title={`Tutors commonly shortlisted for ${page.label.toLowerCase()} support`}
              subtitle="The page should stay actionable. These cards help parents move from board-level research into a more concrete tutor comparison."
              align="left"
            />

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.14fr_0.86fr]">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {featuredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} {...tutor} />
                ))}
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 shadow-sm">
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                    What parents usually check before booking
                  </h2>
                  <div className="mt-6 space-y-3">
                    {parentChecklist.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
                      >
                        <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  {page.relatedQueries?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {page.relatedQueries.map((query) => (
                        <span
                          key={query}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {query}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                    Localized review snippets
                  </h2>
                  <div className="mt-6 space-y-4">
                    {featuredReviews.map((review) => (
                      <article
                        key={review.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-950">
                            {review.parent} from {review.sector}
                          </p>
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{review.quote}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Detailed guide"
              title={`${page.label} in ${cityLabel}: board fit, school fit, and SEO-rich parent guidance`}
              subtitle="These content blocks give the page the depth needed for both parent decision-making and long-term subject-page SEO."
              align="left"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {seoSections.map((section, index) => (
                <article
                  key={section.title}
                  className={`rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm ${
                    seoSections.length % 2 === 1 && index === seoSections.length - 1
                      ? "lg:col-span-2"
                      : ""
                  }`}
                >
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <SectionTitle
                badge="Next routes"
                title="Move from the board hub into the right local page"
                subtitle="These internal links help the user keep the subject context while moving into city or sector-specific discovery."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block rounded-[24px] border border-slate-200 bg-white px-5 py-5 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <h3 className="text-lg font-bold text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <SectionTitle
                badge="FAQ"
                title={`Common questions about ${page.label.toLowerCase()} home tuition`}
                subtitle="The FAQ stays compact on the screen, but expands when the parent wants a clearer answer."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {page.faqItems.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={item.question}
                      className="rounded-[24px] border border-slate-200 bg-slate-50"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-semibold text-slate-950">
                          {item.question}
                        </h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                          {isOpen ? "Hide" : "Open"}
                        </span>
                      </button>
                      {isOpen ? (
                        <p className="border-t border-slate-200 px-6 py-5 text-sm leading-7 text-slate-600">
                          {item.answer}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Next step
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Shortlist the right {page.label.toLowerCase()} tutor without losing school or sector
                context
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {page.cta.description}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <div className="grid gap-3">
                <Link
                  to="/book-demo"
                  className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  {page.cta.label}
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/15 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Message Maths Bodhi on WhatsApp
                </a>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Share the class, school, sector, recent maths score, and major topic difficulty.
                The enquiry can move directly into the team WhatsApp flow on {contact.phoneDisplay}.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default SubjectPage;
