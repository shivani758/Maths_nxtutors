import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import MathsRouteCardGrid from "../components/maths/MathsRouteCardGrid";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import { getCoreMathsBoardCards } from "../data/mathsBoardPages";
import MainLayout from "../layouts/MainLayout";
import { getSectorPage } from "../services/siteLookup";
import NotFound from "./NotFound";

function SectorPage() {
  const { city, sector } = useParams();
  const { siteData } = useSiteData();
  const page = getSectorPage(siteData, city, sector);
  const mathsBoardCards = getCoreMathsBoardCards();

  if (!page) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <Seo
        title={`Maths Home Tutor in ${page.sectorLabel}, ${page.cityLabel} | ${siteData.brandName}`}
        description={page.subtitle}
        canonicalPath={`/city/${page.citySlug}/${page.slug}`}
        keywords={[
          `maths home tutor in ${page.sectorLabel.toLowerCase()}`,
          `maths tuition in ${page.sectorLabel.toLowerCase()}`,
          page.cityLabel,
          ...page.landmarks,
        ]}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-20">
          <div className="absolute left-0 top-12 h-64 w-64 rounded-full bg-cyan-100/75 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: page.cityLabel, to: `/city/${page.citySlug}` },
                { label: page.sectorLabel },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700">
                  Micro-local landing page
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                  {page.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/book-demo"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {page.cta.label}
                  </Link>
                  <Link
                    to={`/city/${page.citySlug}`}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    Back to {page.cityLabel}
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {page.landmarks.map((landmark) => (
                    <span
                      key={landmark}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Locality value
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
                  Micro pages should say something truly local
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  This page demonstrates how locality routes can talk about timing, nearby schools,
                  and access convenience while still sending users back toward real subject intent.
                </p>

                <div className="mt-6 space-y-4">
                  {page.proofPoints.map((point) => (
                    <div
                      key={point.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <p className="font-semibold text-slate-900">{point.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{point.text}</p>
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
              badge="Local Relevance"
              title={`Why ${page.sectorLabel} can stand as its own page`}
              subtitle="A locality page should feel like a useful micro-conversion layer, not a city page copied with a different heading."
              align="left"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Nearby schools and academic context
                </h2>
                <div className="mt-6 space-y-3">
                  {page.nearbySchools.map((school) => (
                    <div
                      key={school}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <p className="font-medium text-slate-800">{school}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Service modes and timings
                </h2>
                <div className="mt-6 grid gap-4">
                  {page.serviceModes.map((mode, index) => (
                    <div
                      key={mode}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="font-semibold text-slate-900">{mode}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {page.timings[index] ?? page.timings[0]}
                      </p>
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
              badge="Popular Maths Board Routes"
              title={`Common maths board pages for families in ${page.sectorLabel}`}
              subtitle="These links keep the locality page connected to the cleaner board-first maths structure."
              align="left"
            />

            <div className="mt-10">
              <MathsRouteCardGrid
                cards={mathsBoardCards.map((subject) => ({
                  eyebrow: subject.eyebrow,
                  title: subject.label,
                  description: subject.note,
                  to: subject.to,
                  tags: subject.tags,
                }))}
              />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default SectorPage;
