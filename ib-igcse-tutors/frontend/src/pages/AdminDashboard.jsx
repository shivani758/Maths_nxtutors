import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";

function joinLines(value = []) {
  return value.join("\n\n");
}

function splitLines(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitCommaList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function blankTutorForm() {
  return {
    id: "",
    name: "",
    title: "",
    rating: "4.9",
    experience: "5 years",
    board: "CBSE",
    classLevel: "Class 10",
    location: "Gurugram",
    sectors: "Sector 56, Sector 57",
    topics: "Algebra, Geometry",
    price: "Rs 1,500/hr",
    mode: "Home Tuition, Online",
    studentsHelped: "80",
    schoolFocus: "Scottish High International School",
    image: "/images/tutor-premium-school.svg",
    imageAlt: "Premium maths home tutor profile illustration",
    summary: "",
    qualifications: "M.Sc. Mathematics",
    availability: "Weekday evenings",
    achievements: "Strong parent updates, board-specific support",
  };
}

function blankReviewForm() {
  return {
    id: "",
    parent: "",
    student: "",
    sector: "Sector 56",
    school: "",
    board: "CBSE",
    quote: "",
  };
}

function blankSchoolForm() {
  return {
    id: "",
    school: "",
    board: "",
    locality: "",
    support: "",
    highlight: "",
  };
}

function blankSectorForm() {
  return {
    citySlug: "gurugram",
    cityAliases: "gurgaon",
    cityLabel: "Gurugram",
    slug: "",
    sectorLabel: "",
    headline: "",
    subtitle: "",
    landmarks: "Golf Course Road",
    nearbySchools: "Scottish High International School",
    serviceModes: "One-to-one maths home tuition, Online maths support",
    timings: "Weekday after-school classes, Weekend revision",
    ctaLabel: "",
    ctaDescription: "",
  };
}

function AdminDashboard() {
  const { logout } = useAuth();
  const {
    siteData,
    updateSeo,
    updateHomeContent,
    updateContact,
    upsertTutor,
    removeTutor,
    upsertReview,
    removeReview,
    upsertSchool,
    removeSchool,
    upsertSectorPage,
    removeSectorPage,
    resetSiteData,
  } = useSiteData();

  const [seoForm, setSeoForm] = useState({
    title: siteData.seo.title,
    description: siteData.seo.description,
    keywords: siteData.seo.keywords.join(", "),
  });
  const [homeForm, setHomeForm] = useState({
    heroTitle: siteData.home.heroTitle,
    heroSubtitle: siteData.home.heroSubtitle,
    intentTitle: siteData.home.intentTitle,
    intentParagraphs: joinLines(siteData.home.intentParagraphs),
    goalTitle: siteData.home.goalTitle,
    goalParagraphs: joinLines(siteData.home.goalParagraphs),
  });
  const [contactForm, setContactForm] = useState({
    phoneDisplay: siteData.contact.phoneDisplay,
    whatsappNumber: siteData.contact.whatsappNumber,
    email: siteData.contact.email,
    supportHours: siteData.contact.supportHours,
  });
  const [tutorForm, setTutorForm] = useState(blankTutorForm());
  const [reviewForm, setReviewForm] = useState(blankReviewForm());
  const [schoolForm, setSchoolForm] = useState(blankSchoolForm());
  const [sectorForm, setSectorForm] = useState(blankSectorForm());

  useEffect(() => {
    setSeoForm({
      title: siteData.seo.title,
      description: siteData.seo.description,
      keywords: siteData.seo.keywords.join(", "),
    });
    setHomeForm({
      heroTitle: siteData.home.heroTitle,
      heroSubtitle: siteData.home.heroSubtitle,
      intentTitle: siteData.home.intentTitle,
      intentParagraphs: joinLines(siteData.home.intentParagraphs),
      goalTitle: siteData.home.goalTitle,
      goalParagraphs: joinLines(siteData.home.goalParagraphs),
    });
    setContactForm({
      phoneDisplay: siteData.contact.phoneDisplay,
      whatsappNumber: siteData.contact.whatsappNumber,
      email: siteData.contact.email,
      supportHours: siteData.contact.supportHours,
    });
  }, [siteData]);

  return (
    <MainLayout>
      <Seo
        title="Admin Dashboard | Maths Bodhi"
        description="Protected admin panel for homepage SEO, tutors, reviews, school cards, and Gurugram sector content."
        canonicalPath="/admin/dashboard"
        keywords={["admin dashboard", "homepage seo editor", "tutor review manager"]}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
                  Protected Admin Panel
                </span>
                <h1 className="mt-4 text-4xl font-bold">Maths Bodhi content and operations dashboard</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Edit homepage SEO, long-form content, tutors, review cards, premium school
                  blocks, and sector landing pages from one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={resetSiteData}
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Reset to default content
                </button>
                <button
                  onClick={logout}
                  className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["Tutors", String(siteData.tutors.length)],
              ["Reviews", String(siteData.reviews.length)],
              ["Premium schools", String(siteData.premiumSchools.length)],
              ["Sector pages", String(siteData.sectorPages.length)],
              ["SEO keywords", String(siteData.seo.keywords.length)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8">
            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Homepage SEO and contact settings</h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">SEO Title</span>
                  <input
                    value={seoForm.title}
                    onChange={(event) =>
                      setSeoForm((current) => ({ ...current, title: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Meta Description
                  </span>
                  <textarea
                    rows={3}
                    value={seoForm.description}
                    onChange={(event) =>
                      setSeoForm((current) => ({ ...current, description: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
                <label className="block lg:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    SEO Keywords
                  </span>
                  <textarea
                    rows={3}
                    value={seoForm.keywords}
                    onChange={(event) =>
                      setSeoForm((current) => ({ ...current, keywords: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
                {[
                  ["phoneDisplay", "Phone Display"],
                  ["whatsappNumber", "WhatsApp Number"],
                  ["email", "Support Email"],
                  ["supportHours", "Support Hours"],
                ].map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                    <input
                      value={contactForm[key]}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    updateSeo({
                      title: seoForm.title,
                      description: seoForm.description,
                      keywords: splitCommaList(seoForm.keywords),
                    })
                  }
                  className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
                >
                  Save SEO settings
                </button>
                <button
                  onClick={() => updateContact(contactForm)}
                  className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900"
                >
                  Save contact settings
                </button>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Homepage content editor</h2>
              <div className="mt-6 grid gap-4">
                {[
                  ["heroTitle", "Hero H1"],
                  ["heroSubtitle", "Hero intro text"],
                  ["intentTitle", "Intent section title"],
                  ["goalTitle", "Goal section title"],
                ].map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                    <input
                      value={homeForm[key]}
                      onChange={(event) =>
                        setHomeForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Intent section paragraphs
                  </span>
                  <textarea
                    rows={10}
                    value={homeForm.intentParagraphs}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        intentParagraphs: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Goal section paragraphs
                  </span>
                  <textarea
                    rows={10}
                    value={homeForm.goalParagraphs}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        goalParagraphs: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
              </div>
              <button
                onClick={() =>
                  updateHomeContent({
                    heroTitle: homeForm.heroTitle,
                    heroSubtitle: homeForm.heroSubtitle,
                    intentTitle: homeForm.intentTitle,
                    intentParagraphs: splitLines(homeForm.intentParagraphs),
                    goalTitle: homeForm.goalTitle,
                    goalParagraphs: splitLines(homeForm.goalParagraphs),
                  })
                }
                className="mt-6 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Save homepage content
              </button>
            </section>

            <section className="grid gap-8 xl:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Tutor manager</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["name", "Tutor Name"],
                    ["title", "Profile title"],
                    ["rating", "Rating"],
                    ["experience", "Experience"],
                    ["board", "Board"],
                    ["classLevel", "Class level"],
                    ["price", "Starting fee"],
                    ["studentsHelped", "Students helped"],
                    ["image", "Image path"],
                    ["imageAlt", "Image alt text"],
                    ["availability", "Availability"],
                    ["sectors", "Sectors, comma separated"],
                    ["topics", "Topics, comma separated"],
                    ["mode", "Modes, comma separated"],
                    ["schoolFocus", "School focus, comma separated"],
                    ["qualifications", "Qualifications, comma separated"],
                    ["achievements", "Achievements, comma separated"],
                    ["summary", "Summary"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                      {key === "summary" ? (
                        <textarea
                          rows={4}
                          value={tutorForm[key]}
                          onChange={(event) =>
                            setTutorForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      ) : (
                        <input
                          value={tutorForm[key]}
                          onChange={(event) =>
                            setTutorForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const id = tutorForm.id || `tutor-${Date.now()}`;
                      upsertTutor({
                        id,
                        name: tutorForm.name,
                        title: tutorForm.title,
                        rating: tutorForm.rating,
                        experience: tutorForm.experience,
                        board: tutorForm.board,
                        classLevel: tutorForm.classLevel,
                        location: "Gurugram",
                        sectors: splitCommaList(tutorForm.sectors),
                        topics: splitCommaList(tutorForm.topics),
                        price: tutorForm.price,
                        mode: splitCommaList(tutorForm.mode),
                        studentsHelped: Number(tutorForm.studentsHelped) || 0,
                        schoolFocus: splitCommaList(tutorForm.schoolFocus),
                        image: tutorForm.image,
                        imageAlt: tutorForm.imageAlt,
                        summary: tutorForm.summary,
                        qualifications: splitCommaList(tutorForm.qualifications),
                        availability: tutorForm.availability,
                        achievements: splitCommaList(tutorForm.achievements),
                      });
                      setTutorForm(blankTutorForm());
                    }}
                    className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
                  >
                    Save tutor
                  </button>
                  <button
                    onClick={() => setTutorForm(blankTutorForm())}
                    className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-8 space-y-3">
                  {siteData.tutors.map((tutor) => (
                    <div key={tutor.id} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{tutor.name}</p>
                          <p className="text-sm text-slate-600">{tutor.title}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setTutorForm({
                                ...tutor,
                                sectors: tutor.sectors.join(", "),
                                topics: tutor.topics.join(", "),
                                mode: tutor.mode.join(", "),
                                schoolFocus: tutor.schoolFocus.join(", "),
                                qualifications: tutor.qualifications.join(", "),
                                achievements: tutor.achievements.join(", "),
                                studentsHelped: String(tutor.studentsHelped),
                              })
                            }
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeTutor(tutor.id)}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Review manager</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["parent", "Parent Name"],
                    ["student", "Student Name"],
                    ["sector", "Sector"],
                    ["school", "School"],
                    ["board", "Board"],
                    ["quote", "Review Quote"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                      {key === "quote" ? (
                        <textarea
                          rows={4}
                          value={reviewForm[key]}
                          onChange={(event) =>
                            setReviewForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      ) : (
                        <input
                          value={reviewForm[key]}
                          onChange={(event) =>
                            setReviewForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      upsertReview({
                        id: reviewForm.id || `review-${Date.now()}`,
                        rating: 5,
                        ...reviewForm,
                      });
                      setReviewForm(blankReviewForm());
                    }}
                    className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
                  >
                    Save review
                  </button>
                  <button
                    onClick={() => setReviewForm(blankReviewForm())}
                    className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-8 max-h-[520px] space-y-3 overflow-y-auto pr-2">
                  {siteData.reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{review.parent}</p>
                          <p className="text-sm text-slate-600">
                            {review.sector} | {review.school}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setReviewForm({ ...review })}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeReview(review.id)}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-8 xl:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Premium school card manager</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["school", "School Name"],
                    ["board", "Board"],
                    ["locality", "Locality"],
                    ["support", "Support Description"],
                    ["highlight", "Highlight"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                      {key === "support" || key === "highlight" ? (
                        <textarea
                          rows={3}
                          value={schoolForm[key]}
                          onChange={(event) =>
                            setSchoolForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      ) : (
                        <input
                          value={schoolForm[key]}
                          onChange={(event) =>
                            setSchoolForm((current) => ({ ...current, [key]: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      upsertSchool({
                        id: schoolForm.id || `school-${Date.now()}`,
                        ...schoolForm,
                      });
                      setSchoolForm(blankSchoolForm());
                    }}
                    className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
                  >
                    Save school card
                  </button>
                  <button
                    onClick={() => setSchoolForm(blankSchoolForm())}
                    className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-8 space-y-3">
                  {siteData.premiumSchools.map((school) => (
                    <div key={school.id} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{school.school}</p>
                          <p className="text-sm text-slate-600">{school.board}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSchoolForm({ ...school })}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeSchool(school.id)}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Sector page manager</h2>
                <div className="mt-6 grid gap-4">
                  {[
                    ["slug", "Sector slug"],
                    ["sectorLabel", "Sector label"],
                    ["headline", "Headline"],
                    ["subtitle", "Subtitle"],
                    ["landmarks", "Landmarks, comma separated"],
                    ["nearbySchools", "Nearby schools, comma separated"],
                    ["serviceModes", "Service modes, comma separated"],
                    ["timings", "Timings, comma separated"],
                    ["ctaLabel", "CTA label"],
                    ["ctaDescription", "CTA description"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                      <textarea
                        rows={key === "subtitle" || key === "ctaDescription" ? 3 : 2}
                        value={sectorForm[key]}
                        onChange={(event) =>
                          setSectorForm((current) => ({ ...current, [key]: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      upsertSectorPage({
                        citySlug: "gurugram",
                        cityAliases: splitCommaList(sectorForm.cityAliases),
                        cityLabel: "Gurugram",
                        slug: sectorForm.slug,
                        sectorLabel: sectorForm.sectorLabel,
                        headline: sectorForm.headline,
                        subtitle: sectorForm.subtitle,
                        landmarks: splitCommaList(sectorForm.landmarks),
                        nearbySchools: splitCommaList(sectorForm.nearbySchools),
                        serviceModes: splitCommaList(sectorForm.serviceModes),
                        timings: splitCommaList(sectorForm.timings),
                        proofPoints: [
                          {
                            title: "School-specific matching",
                            text: `This ${sectorForm.sectorLabel} page highlights school context and timing convenience for local maths home tuition.`,
                          },
                          {
                            title: "Locality-aware convenience",
                            text: `Families in ${sectorForm.sectorLabel} can assess home tuition practicality without losing sight of the academic intent.`,
                          },
                          {
                            title: "Subject authority remains central",
                            text: "Each sector page continues to support the subject-first structure of the website.",
                          },
                        ],
                        popularSubjects: siteData.subjectPages.slice(0, 3).map((subject) => ({
                          slug: subject.slug,
                          label: subject.label,
                          note: `Popular maths route for families in ${sectorForm.sectorLabel}.`,
                        })),
                        cta: {
                          label: sectorForm.ctaLabel,
                          description: sectorForm.ctaDescription,
                        },
                      });
                      setSectorForm(blankSectorForm());
                    }}
                    className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white"
                  >
                    Save sector page
                  </button>
                  <button
                    onClick={() => setSectorForm(blankSectorForm())}
                    className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-900"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-8 max-h-[520px] space-y-3 overflow-y-auto pr-2">
                  {siteData.sectorPages.map((sector) => (
                    <div key={sector.slug} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{sector.sectorLabel}</p>
                          <p className="text-sm text-slate-600">{sector.slug}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setSectorForm({
                                citySlug: sector.citySlug,
                                cityAliases: sector.cityAliases.join(", "),
                                cityLabel: sector.cityLabel,
                                slug: sector.slug,
                                sectorLabel: sector.sectorLabel,
                                headline: sector.headline,
                                subtitle: sector.subtitle,
                                landmarks: sector.landmarks.join(", "),
                                nearbySchools: sector.nearbySchools.join(", "),
                                serviceModes: sector.serviceModes.join(", "),
                                timings: sector.timings.join(", "),
                                ctaLabel: sector.cta.label,
                                ctaDescription: sector.cta.description,
                              })
                            }
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeSectorPage(sector.slug)}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;
