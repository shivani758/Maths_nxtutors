import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionTitle from "../../components/SectionTitle";
import MathsFaqAccordion from "../../components/maths/MathsFaqAccordion";
import MathsGuideCard from "../../components/maths/MathsGuideCard";
import MathsResultCard from "../../components/maths/MathsResultCard";
import MathsRouteCardGrid from "../../components/maths/MathsRouteCardGrid";
import MathsTutorCard from "../../components/maths/MathsTutorCard";

function normalizePoint(point) {
  if (typeof point === "string") {
    return {
      title: point,
      description: "",
    };
  }

  return {
    title: point.title ?? point.label ?? "",
    description: point.description ?? point.detail ?? point.text ?? point.summary ?? "",
  };
}

export function PageHeroSection({
  breadcrumbs = [],
  badge,
  h1,
  intro,
  chips = [],
  stats = [],
  actions = [],
  supportPanel,
  heroImage,
  heroImageAlt,
}) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 md:py-20">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-100/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            {badge ? (
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                {badge}
              </span>
            ) : null}

            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              {h1}
            </h1>

            {intro ? <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p> : null}

            {chips.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            {actions.length ? (
              <div className="mt-8 flex flex-wrap gap-4">
                {actions.map((action) =>
                  action.to ? (
                    <Link
                      key={`${action.label}-${action.to}`}
                      to={action.to}
                      className={action.tone === "secondary"
                        ? "rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                        : "rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"}
                    >
                      {action.label}
                    </Link>
                  ) : (
                    <a
                      key={`${action.label}-${action.href}`}
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      className={action.tone === "secondary"
                        ? "rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                        : "rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"}
                    >
                      {action.label}
                    </a>
                  ),
                )}
              </div>
            ) : null}

            {stats.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-sm"
                  >
                    <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-5">
            {heroImage ? (
              <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-sky-100/60">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  <img src={heroImage} alt={heroImageAlt} className="h-56 w-full object-cover" />
                </div>
              </div>
            ) : null}

            {supportPanel?.title ? (
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  Quick overview
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                  {supportPanel.title}
                </p>
                {supportPanel.text ? (
                  <p className="mt-3 text-sm leading-7 text-slate-600">{supportPanel.text}</p>
                ) : null}

                {supportPanel.bullets?.length ? (
                  <div className="mt-5 grid gap-3">
                    {supportPanel.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-slate-700">{bullet}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageSupportPointsSection({ badge, title, subtitle, points = [], tone = "slate" }) {
  if (!points.length) {
    return null;
  }

  const backgroundClassName = tone === "white" ? "bg-white" : "bg-slate-50";
  const cardClassName = tone === "white" ? "bg-slate-50" : "bg-white";

  return (
    <section className={`${backgroundClassName} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle badge={badge} title={title} subtitle={subtitle} align="left" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {points.map((point, index) => {
            const item = normalizePoint(point);
            return (
              <article
                key={`${item.title}-${index}`}
                className={`rounded-[26px] border border-slate-200 ${cardClassName} p-6 shadow-sm`}
              >
                <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
                {item.description ? (
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PageRouteGroupsSection({ groups = [] }) {
  const visibleGroups = (groups ?? []).filter((group) => group?.cards?.length);

  if (!visibleGroups.length) {
    return null;
  }

  return (
    <>
      {visibleGroups.map((group, index) => (
        <section
          key={group.id ?? group.title ?? index}
          className={`${group.backgroundClassName ?? (index % 2 === 0 ? "bg-white" : "bg-slate-50")} px-6 py-16`}
        >
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge={group.badge}
              title={group.title}
              subtitle={group.subtitle}
              align="left"
            />

            <div className="mt-8">
              <MathsRouteCardGrid
                cards={group.cards}
                className={group.className ?? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}
                activeTo={group.activeTo}
                variant={group.variant ?? "default"}
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export function PageFeaturedTutorsSection({
  badge,
  title,
  subtitle,
  tutors = [],
  initialVisibleCount = 6,
  loadStep = 3,
  backgroundClassName = "bg-white",
}) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [initialVisibleCount, tutors]);

  if (!tutors.length) {
    return null;
  }

  const visibleTutors = tutors.slice(0, visibleCount);
  const canLoadMore = visibleCount < tutors.length;

  return (
    <section className={`${backgroundClassName} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle badge={badge} title={title} subtitle={subtitle} align="left" />

        <div className="mt-8 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleTutors.map((tutor) => (
            <MathsTutorCard key={tutor.id} {...tutor} />
          ))}
        </div>

        {tutors.length > initialVisibleCount ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((current) =>
                  canLoadMore ? Math.min(current + loadStep, tutors.length) : initialVisibleCount,
                )
              }
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
            >
              {canLoadMore ? "Load more tutors" : "Show fewer tutors"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PageRelatedBlogsSection({
  badge,
  title,
  subtitle,
  blogs = [],
  backgroundClassName = "bg-slate-50",
}) {
  if (!blogs.length) {
    return null;
  }

  return (
    <section className={`${backgroundClassName} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle badge={badge} title={title} subtitle={subtitle} align="left" />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {blogs.map((blog) => (
            <MathsGuideCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageResultsSection({
  badge,
  title,
  subtitle,
  results = [],
  backgroundClassName = "bg-white",
}) {
  if (!results.length) {
    return null;
  }

  return (
    <section className={`${backgroundClassName} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle badge={badge} title={title} subtitle={subtitle} align="left" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((result) => (
            <MathsResultCard key={result.id} {...result} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageFaqSection({
  badge,
  title,
  subtitle,
  items = [],
  backgroundClassName = "bg-slate-50",
}) {
  if (!items.length) {
    return null;
  }

  return (
    <section className={`${backgroundClassName} px-6 py-16`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle badge={badge} title={title} subtitle={subtitle} align="left" />

        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <MathsFaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

export function PageCtaSection({
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  if (!title && !description) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-200/70">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
              {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{description}</p> : null}
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
              <div className="grid gap-3">
                {primaryAction?.to ? (
                  <Link
                    to={primaryAction.to}
                    className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    {primaryAction.label}
                  </Link>
                ) : null}
                {secondaryAction?.to ? (
                  <Link
                    to={secondaryAction.to}
                    className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {secondaryAction.label}
                  </Link>
                ) : null}
                {secondaryAction?.href ? (
                  <a
                    href={secondaryAction.href}
                    target={secondaryAction.external ? "_blank" : undefined}
                    rel={secondaryAction.external ? "noreferrer" : undefined}
                    className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {secondaryAction.label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
