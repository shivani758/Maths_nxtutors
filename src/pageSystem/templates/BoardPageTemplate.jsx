import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Seo from "../../components/Seo";
import SectionTitle from "../../components/SectionTitle";
import MathsContextCard from "../../components/maths/MathsContextCard";
import MathsFaqAccordion from "../../components/maths/MathsFaqAccordion";
import MathsGuideCard from "../../components/maths/MathsGuideCard";
import MathsLinkPillGroup from "../../components/maths/MathsLinkPillGroup";
import MathsResultCard from "../../components/maths/MathsResultCard";
import MathsRouteCardGrid from "../../components/maths/MathsRouteCardGrid";
import MathsScrollToTop from "../../components/maths/MathsScrollToTop";
import MathsTutorCard from "../../components/maths/MathsTutorCard";
import { useSiteData } from "../../contexts/SiteDataContext";
import MainLayout from "../../layouts/MainLayout";
import { buildConfigPageSchema } from "../pageConfigService";
import {
  getMathsBoardPageContent,
  getMathsCoreBoardCards,
} from "../../services/mathsContentService";
import { buildWhatsAppUrl } from "../../utils/whatsapp";

const INITIAL_TUTOR_COUNT = 6;
const TUTOR_LOAD_STEP = 3;
const MAX_VISIBLE_TUTORS = 15;

function BoardPageTemplate({ config, templateData = {} }) {
  const { siteData } = useSiteData();
  const { contact } = siteData;
  const page = config?.entity;
  const [visibleTutorCount, setVisibleTutorCount] = useState(INITIAL_TUTOR_COUNT);

  const parentPage = useMemo(
    () => (page?.parentKey ? getMathsBoardPageContent(page.parentKey) : null),
    [page],
  );

  const coreBoardCards = useMemo(() => getMathsCoreBoardCards(), []);

  useEffect(() => {
    setVisibleTutorCount(INITIAL_TUTOR_COUNT);
  }, [page?.key]);

  if (!page) {
    return null;
  }

  const boardGridClassName =
    coreBoardCards.length >= 5
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      : "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";

  const activeBoardRoute = (() => {
    if (page.key === "hub") {
      return null;
    }

    if (page.key.startsWith("ib")) {
      return getMathsBoardPageContent("ib")?.route ?? page.route;
    }

    if (page.key.startsWith("jee")) {
      return getMathsBoardPageContent("jee")?.route ?? page.route;
    }

    return page.route;
  })();

  const featuredTutors = templateData.relatedTutors ?? [];
  const featuredResults = templateData.studentResults ?? [];
  const relatedBlogs = templateData.relatedBlogs ?? [];
  const maxTutorCount = Math.min(MAX_VISIBLE_TUTORS, featuredTutors.length);
  const visibleTutors = featuredTutors.slice(0, Math.min(visibleTutorCount, maxTutorCount));
  const canLoadMoreTutors = visibleTutorCount < maxTutorCount;
  const breadcrumbs = config.breadcrumbItems ?? [];
  const heroImage = config.sections?.hero?.heroImage ?? "/images/hero-maths-home.svg";
  const heroImageAlt =
    config.sections?.hero?.heroImageAlt ?? `${page.label} tutoring in Gurugram`;
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsappNumber,
    `Hello Maths Bodhi, I want help with ${page.label} in Gurugram. Please guide me on the right maths support and next steps.`,
  );
  const featuredTutorHeading =
    page.key === "hub" ? "Featured Tutors Across Boards" : `Featured maths tutors for ${page.label}`;
  const featuredTutorSubtitle =
    page.key === "hub"
      ? "Compare board fit, class focus, fee, and service type before opening a full tutor profile."
      : `These tutors align with ${page.label.toLowerCase()} expectations, class needs, and home-tuition support in Gurugram.`;
  const boardSectionTitle =
    page.key === "hub" ? "Main Boards" : "Compare the main maths boards and the right path for this student";
  const boardSectionSubtitle =
    page.key === "hub"
      ? "Start with the board first, then move into the page that matches the student's curriculum, class range, and maths pressure."
      : page.key.startsWith("ib")
        ? "Compare the main boards first, then move into the IB stage or course that best matches the student."
        : page.key.startsWith("jee")
          ? "Compare the main boards first, then move into the JEE route that matches the student's current target."
          : "Use the main boards for a quick comparison, then focus on the support details that matter most on this page.";
  const resultsTitle = page.key === "hub" ? "Student Results" : `Student results for ${page.label}`;
  const resultsSubtitle =
    page.key === "hub"
      ? "These examples show how maths support can become more organised across boards, class levels, and exam pathways."
      : `These outcomes show the kind of change families often look for when ${page.label.toLowerCase()} support becomes more structured.`;
  const relatedGuidesTitle = page.key === "hub" ? "Related Maths Guides" : `Related guides for ${page.label}`;
  const relatedGuidesSubtitle =
    page.key === "hub"
      ? "These short guides help families compare board fit, maths routines, and the kind of support that usually matters most."
      : `These guides stay close to the questions families often ask before choosing ${page.label.toLowerCase()} support.`;

  return (
    <MainLayout>
      <MathsScrollToTop />
      <Seo
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={page.keywords}
        canonicalPath={config.canonicalUrl}
        imagePath={heroImage}
        schema={buildConfigPageSchema(config)}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-14 md:py-16">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {page.badge}
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  {page.title}
                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {page.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {page.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {page.cta.label}
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Discuss on WhatsApp
                  </a>
                  <Link
                    to={parentPage?.route ?? "/city/gurugram"}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    {parentPage ? `Back to ${parentPage.label}` : "Browse Gurugram maths areas"}
                  </Link>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-sky-100/60">
                  <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                    <img src={heroImage} alt={heroImageAlt} className="h-56 w-full object-cover" />
                  </div>
                </div>

                <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    Quick overview
                  </p>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    {page.supportPanel.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {page.supportPanel.text}
                  </p>

                  <div className="mt-5 grid gap-3">
                    {page.supportPanel.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-slate-700">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Core Boards"
              title={boardSectionTitle}
              subtitle={boardSectionSubtitle}
              align="left"
            />

            <div className="mt-8">
              <MathsRouteCardGrid
                cards={coreBoardCards}
                activeTo={activeBoardRoute ?? undefined}
                variant="board"
                className={boardGridClassName}
              />
            </div>

            {page.childSections?.length ? (
              <div className="mt-8 grid gap-6">
                {page.childSections.map((section) => (
                  <div key={section.title} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
                      {section.badge}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                      {section.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                      {section.subtitle}
                    </p>

                    <div className="mt-6">
                      {section.layout === "pills" ? (
                        <MathsLinkPillGroup
                          title=""
                          items={section.items}
                          activeTo={page.route}
                        />
                      ) : (
                        <MathsRouteCardGrid cards={section.items} activeTo={page.route} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Featured Tutors"
              title={featuredTutorHeading}
              subtitle={featuredTutorSubtitle}
              align="left"
            />

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {page.checklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm"
                >
                  <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleTutors.map((tutor) => (
                <MathsTutorCard key={tutor.id} {...tutor} />
              ))}
            </div>

            {featuredTutors.length ? (
              <div className="mt-6 flex flex-col items-center gap-4">
                <p className="text-sm text-slate-500">
                  Showing {visibleTutors.length} of {maxTutorCount} tutors
                </p>
                {canLoadMoreTutors ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleTutorCount((current) =>
                        Math.min(current + TUTOR_LOAD_STEP, maxTutorCount),
                      )
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Load more tutors
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge={page.overview.badge}
              title={page.overview.title}
              subtitle={page.overview.subtitle}
              align="left"
            />

            <div className="mt-8">
              <MathsRouteCardGrid cards={page.overview.cards} />
            </div>

            {page.detailSections?.length ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {page.detailSections.map((section, index) => (
                  <article
                    key={section.title}
                    className={`rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm ${
                      page.detailSections.length % 2 === 1 &&
                      index === page.detailSections.length - 1
                        ? "lg:col-span-2"
                        : ""
                    }`}
                  >
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      {section.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Student Results"
              title={resultsTitle}
              subtitle={resultsSubtitle}
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredResults.map((result) => (
                <MathsResultCard key={result.id} {...result} />
              ))}
            </div>
          </div>
        </section>

        {relatedBlogs.length ? (
          <section className="bg-slate-50 px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                badge="Related Guides"
                title={relatedGuidesTitle}
                subtitle={relatedGuidesSubtitle}
                align="left"
              />

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {relatedBlogs.map((blog) => (
                  <MathsGuideCard key={blog.id} {...blog} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className={`${relatedBlogs.length ? "bg-white" : "bg-slate-50"} px-6 py-14`}>
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="School Context"
              title="Local school context for this maths board"
              subtitle="These school-cluster notes help parents judge pace, class expectations, and the kind of home support that usually fits best."
              align="left"
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {page.schoolHighlights.map((item) => (
                <MathsContextCard
                  key={item.title}
                  eyebrow={item.subtitle}
                  title={item.title}
                  description={item.description}
                  tags={[page.label]}
                  footer="Useful for Gurugram families comparing school rhythm and tutor fit."
                />
              ))}
            </div>
          </div>
        </section>

        <section className={`${relatedBlogs.length ? "bg-slate-50" : "bg-white"} px-6 py-14`}>
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Gurugram Areas"
              title="Popular Gurugram areas for this maths support"
              subtitle="Use these locality cards to compare board fit, home-tuition convenience, and the type of maths help families often ask for."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.localZones.map((item) => (
                <MathsContextCard
                  key={`${item.title}-${item.to}`}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  to={item.to}
                />
              ))}
            </div>
          </div>
        </section>

        {page.faqItems?.length ? (
          <section className="bg-slate-50 px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                badge="FAQ"
                title={`Common questions about ${page.label}`}
                subtitle="Open any question to see the answer that fits this board, class range, or maths pathway."
                align="left"
              />

              <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <MathsFaqAccordion items={page.faqItems} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-200/70">
              <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Next step
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    Move from browsing into the right maths conversation
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    {page.cta.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/book-demo"
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                      {page.cta.label}
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Message Maths Bodhi on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    What to share before the first conversation
                  </h3>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Board or programme, class level, and school name
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        The maths chapters, question types, or papers causing the most friction
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Preferred Gurugram area and whether the family wants home tuition or online support
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    The team can continue directly on {contact.phoneDisplay}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default BoardPageTemplate;
