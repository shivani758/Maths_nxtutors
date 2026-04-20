import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { getTutorById } from "../services/siteLookup";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

function TutorProfile() {
  const { id } = useParams();
  const { siteData } = useSiteData();
  const tutor = getTutorById(siteData, id);

  if (!tutor) {
    return <NotFound />;
  }

  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(siteData.contact, tutor, {}),
  );

  return (
    <MainLayout>
      <Seo
        title={`${tutor.name} | ${tutor.title} | Maths Bodhi`}
        description={`${tutor.name} is a ${tutor.title} available for premium maths home tuition in Gurugram sectors including ${tutor.sectors.join(", ")}.`}
        canonicalPath={`/tutor/${tutor.id}`}
        keywords={[
          tutor.name,
          tutor.title,
          `${tutor.board} maths tutor`,
          "gurugram maths home tutor",
          ...tutor.sectors,
        ]}
        imagePath={tutor.image}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden px-6 py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <img
                src={tutor.image}
                alt={tutor.imageAlt}
                className="w-full rounded-[28px] border border-slate-200 bg-white"
              />
            </div>

            <div>
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700">
                Premium Tutor Profile
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {tutor.name}
              </h1>
              <p className="mt-3 text-xl font-semibold text-blue-700">{tutor.title}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{tutor.summary}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                  {tutor.rating} rating
                </span>
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  {tutor.board}
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  {tutor.experience}
                </span>
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {tutor.price}
                </span>
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
                {[
                  ["Class level", tutor.classLevel],
                  ["Students helped", `${tutor.studentsHelped}+`],
                  ["Availability", tutor.availability],
                  ["Modes", tutor.mode.join(", ")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Maths topics and local coverage</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {tutor.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-slate-950">Preferred Gurugram sectors</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {tutor.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700"
                  >
                    {sector}
                  </span>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-slate-950">School focus</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {tutor.schoolFocus.map((school) => (
                  <span
                    key={school}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Qualifications and teaching strengths</h2>
              <div className="mt-6 space-y-4">
                {tutor.qualifications.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-slate-950">Achievements</h3>
              <div className="mt-4 space-y-4">
                {tutor.achievements.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default TutorProfile;
