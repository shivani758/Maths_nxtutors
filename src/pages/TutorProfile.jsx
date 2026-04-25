import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import MathsFaqAccordion from "../components/maths/MathsFaqAccordion";
import MathsGuideCard from "../components/maths/MathsGuideCard";
import MathsResultCard from "../components/maths/MathsResultCard";
import MathsReviewCard from "../components/maths/MathsReviewCard";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { getTutorProfileById, getTutorProfileBySlug } from "../services/mathsContentService";
import { getTutorProfilePath } from "../utils/tutorRoutes";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

function uniqueValues(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function splitParagraphs(text) {
  return String(text ?? "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function Chip({ children, tone = "slate" }) {
  const tones = {
    slate: "border border-slate-200 bg-white text-slate-700",
    cyan: "border border-cyan-200 bg-cyan-50 text-cyan-700",
    blue: "border border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`rounded-full px-3 py-1.5 text-sm font-semibold ${tones[tone] ?? tones.slate}`}>
      {children}
    </span>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
    </div>
  );
}

function TutorProfile() {
  const { id, slug } = useParams();
  const { siteData } = useSiteData();
  const tutor = useMemo(
    () => (slug ? getTutorProfileBySlug(slug) : getTutorProfileById(id)),
    [id, slug],
  );

  if (!tutor) {
    return <NotFound />;
  }

  const canonicalPath = getTutorProfilePath(tutor);
  const headline = tutor.boards?.[0]
    ? `${tutor.name}, ${tutor.boards[0]} tutor`
    : `${tutor.name}, maths tutor`;
  const intro = tutor.summary ?? tutor.shortBio ?? tutor.title;
  const fullBioParagraphs = splitParagraphs(tutor.longFormProfile);
  const teachingParagraphs = splitParagraphs(tutor.teachingStyle);
  const boardChips = uniqueValues(tutor.boards ?? []);
  const classChips = uniqueValues(tutor.classesSupported ?? []);
  const topicChips = uniqueValues(tutor.topics ?? []);
  const serviceChips = uniqueValues(tutor.serviceModes ?? []);
  const localityChips = uniqueValues(tutor.localities ?? []);
  const tagChips = uniqueValues(tutor.associatedTags ?? []);
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(siteData.contact, tutor, {}),
  );
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: tutor.name,
      description: intro,
      image: tutor.image,
      jobTitle: tutor.title,
      knowsAbout: uniqueValues([...(tutor.boards ?? []), ...(tutor.topics ?? []).slice(0, 5)]),
      worksFor: {
        "@type": "Organization",
        name: "Maths Bodhi",
      },
    },
    ...(tutor.faqItems?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tutor.faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <MainLayout>
      <Seo
        title={tutor.seo?.title ?? `${headline} | Maths Bodhi`}
        description={tutor.seo?.description ?? intro}
        canonicalPath={canonicalPath}
        keywords={tutor.seo?.keywords ?? uniqueValues([tutor.name, ...(tutor.boards ?? []), ...(tutor.topics ?? [])])}
        imagePath={tutor.image}
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden px-6 py-16 md:py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <img
                src={tutor.image}
                alt={tutor.imageAlt}
                className="w-full rounded-[28px] border border-slate-200 bg-white"
              />
            </div>

            <div>
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                Public Tutor Profile
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {headline}
              </h1>
              <p className="mt-4 text-xl font-semibold text-blue-700">{tutor.title}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Chip tone="blue">{tutor.rating}/5 rated</Chip>
                <Chip tone="cyan">{tutor.experience}</Chip>
                <Chip tone="emerald">{tutor.startingFee ?? tutor.price}</Chip>
                {boardChips[0] ? <Chip>{boardChips[0]}</Chip> : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                >
                  Ask about this tutor on WhatsApp
                </a>
                <Link
                  to="/book-demo"
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  Book a demo class
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard label="Class fit" value={classChips[0] ?? "Flexible support"} />
                <InfoCard label="Boards" value={boardChips.join(", ") || "Maths support"} />
                <InfoCard label="Availability" value={tutor.availability ?? "Shared on enquiry"} />
                <InfoCard label="Lesson modes" value={serviceChips.join(", ") || "One-to-one support"} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">About this maths tutor</h2>
              <div className="mt-6 space-y-4">
                {fullBioParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              {teachingParagraphs.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Teaching approach</h3>
                  <div className="mt-4 space-y-4">
                    {teachingParagraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Boards and classes supported</h2>

              <h3 className="mt-6 text-lg font-semibold text-slate-950">Boards</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {boardChips.map((item) => (
                  <Chip key={item} tone="cyan">
                    {item}
                  </Chip>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Classes supported</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {classChips.map((item) => (
                  <Chip key={item} tone="blue">
                    {item}
                  </Chip>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Topics supported</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {topicChips.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>

              {tagChips.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Additional focus areas</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {tagChips.slice(0, 8).map((item) => (
                      <Chip key={item} tone="emerald">
                        {item}
                      </Chip>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Services</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard label="Starting fee" value={tutor.startingFee ?? tutor.price ?? "Shared on request"} />
                <InfoCard label="City" value={(tutor.cities ?? []).join(", ") || tutor.location || "Gurugram"} />
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Lesson modes</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {serviceChips.map((item) => (
                  <Chip key={item} tone="blue">
                    {item}
                  </Chip>
                ))}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Local tutor availability</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {localityChips.map((item) => (
                  <Chip key={item} tone="cyan">
                    {item}
                  </Chip>
                ))}
              </div>

              {tutor.schoolFocus?.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">School familiarity</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {tutor.schoolFocus.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Qualifications and achievements</h2>

              <h3 className="mt-6 text-lg font-semibold text-slate-950">Qualifications</h3>
              <div className="mt-4 space-y-3">
                {(tutor.qualifications ?? []).map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>

              {tutor.achievements?.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Highlights</h3>
                  <div className="mt-4 space-y-3">
                    {tutor.achievements.map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {tutor.relatedResults?.length ? (
          <section className="bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold text-slate-950">Student outcomes</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                These examples show the kind of maths progress families often look for once the support plan becomes more structured.
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {tutor.relatedResults.map((item) => (
                  <MathsResultCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-950">Frequently asked questions</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              These answers help families understand tutor fit, lesson mode, and how the conversation usually starts.
            </p>

            <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <MathsFaqAccordion items={tutor.faqItems} />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-950">Reviews and related reading</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Parent feedback and board-relevant reading can both help families judge whether the tutoring style feels right.
            </p>

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Reviews and testimonials</h3>
                {tutor.relatedReviews?.length ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {tutor.relatedReviews.map((review) => (
                      <MathsReviewCard key={review.id} {...review} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-slate-600">
                      This tutor profile is ready for parent reviews as they are added to the public content system.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-950">Related blogs</h3>
                <div className="mt-5 grid gap-4">
                  {tutor.relatedBlogs.map((blog) => (
                    <MathsGuideCard key={blog.id} {...blog} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-200/70">
              <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Next step
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    Talk through board fit, class level, and the maths pressure that matters most
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    Families can share the board, class, school, current maths concerns, and preferred mode before deciding on the next conversation.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/book-demo"
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                      Book a demo class
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
                    Helpful details to share before booking
                  </h3>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Board, class level, and school name
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        The maths chapters, paper situations, or topic patterns causing the most friction
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Preferred lesson mode and Gurugram locality for scheduling fit
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    The team can continue directly on {siteData.contact.phoneDisplay}.
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

export default TutorProfile;
