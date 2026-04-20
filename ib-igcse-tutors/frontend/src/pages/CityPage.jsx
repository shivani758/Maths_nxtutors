import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { getCityPage } from "../services/siteLookup";
import NotFound from "./NotFound";

function CityPage() {
  const { city } = useParams();
  const { siteData } = useSiteData();
  const page = getCityPage(siteData, city);

  if (!page) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <Seo
        title={`Maths Home Tutor in ${page.label} | ${siteData.brandName}`}
        description={page.subtitle}
        canonicalPath={`/city/${page.slug}`}
        keywords={[
          `maths home tutor in ${page.label.toLowerCase()}`,
          `maths tuition in ${page.label.toLowerCase()}`,
          "gurugram maths tutor",
          ...page.coverageAreas,
        ]}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-20">
          <div className="absolute left-0 top-4 h-64 w-64 rounded-full bg-blue-100/80 blur-3xl" />
          <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Cities" },
                { label: page.label },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                  City hub landing page
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
                  {page.topSectors[0] ? (
                    <Link
                      to={`/city/${page.slug}/${page.topSectors[0].slug}`}
                      className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      Explore top localities
                    </Link>
                  ) : null}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {page.coverageAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Local proof layer
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
                  City pages own geography, proof, and locality links
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  This page acts as the local hub. It connects city-level trust, coverage, and
                  high-intent subject routes without duplicating the same content from every locality page.
                </p>

                <div className="mt-6 space-y-4">
                  {page.proofPoints.map((point) => (
                    <div
                      key={point.label}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-2xl font-bold text-neutral-950">{point.value}</p>
                        <p className="text-sm font-semibold text-cyan-700">{point.label}</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {point.detail}
                      </p>
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
              badge="City Coverage"
              title={`How maths discovery works in ${page.label}`}
              subtitle="City pages should explain local service coverage and academic demand clearly before the user enters a locality or demo flow."
              align="left"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Coverage overview
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.coverageAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Boards and class types served
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.servedBoards.map((board) => (
                    <span
                      key={board}
                      className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {board}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Top Localities"
              title={`Micro-local pages linked from ${page.label}`}
              subtitle="Sector pages should exist only where there is real locality value. This city hub links to those micro-conversion paths."
              align="left"
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {page.topSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  to={`/city/${page.slug}/${sector.slug}`}
                  className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                    Locality page
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-neutral-950">
                    {sector.label}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{sector.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default CityPage;
