import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { buildStudentMessage, buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";

function StudentDashboard() {
  const { session, logout } = useAuth();
  const { siteData } = useSiteData();
  const profile = session?.profile ?? {};

  const matchedTutors = siteData.tutors.filter((tutor) => {
    const boardMatch = tutor.board === profile.board || tutor.board === "Foundation";
    const sectorMatch = tutor.sectors.includes(profile.sector);
    return boardMatch || sectorMatch;
  });

  const studentWhatsAppUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildStudentMessage(siteData.contact, profile),
  );

  return (
    <MainLayout>
      <Seo
        title="Student Dashboard | Maths Bodhi"
        description="Student dashboard for maths home tuition in Gurugram with tutor matches and direct WhatsApp handoff."
        canonicalPath="/student/dashboard"
        keywords={["student dashboard", "maths tutor matches", "gurugram maths support"]}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                  Student Dashboard
                </span>
                <h1 className="mt-4 text-4xl font-bold">
                  Welcome, {profile.studentName || "Student"}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Your maths learning brief is ready. Use the actions below to send your full
                  requirement to the Maths Bodhi WhatsApp team, review tutor matches, and move
                  toward a demo class quickly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={studentWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Send requirement to WhatsApp
                </a>
                <button
                  onClick={logout}
                  className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Class or level", profile.classLevel],
              ["Board", profile.board],
              ["Preferred sector", profile.sector],
              ["Preferred mode", profile.mode],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Suggested tutor matches</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                These tutor cards are matched against your board and sector preference. Open a
                profile for more detail or start a WhatsApp enquiry through the Maths Bodhi team.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {matchedTutors.slice(0, 4).map((tutor) => (
                  <TutorCard key={tutor.id} {...tutor} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Learning brief</h2>
                <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Topics</p>
                    <p className="mt-2">{profile.topics}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Goal</p>
                    <p className="mt-2">{profile.goal}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Preferred timing</p>
                    <p className="mt-2">{profile.timing}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Fast actions</h2>
                <div className="mt-6 grid gap-3">
                  {matchedTutors.slice(0, 3).map((tutor) => (
                    <a
                      key={tutor.id}
                      href={buildWhatsAppUrl(
                        siteData.contact.whatsappNumber,
                        buildTutorInquiryMessage(siteData.contact, tutor, profile),
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Ask about {tutor.name}
                    </a>
                  ))}
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book a maths demo class
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default StudentDashboard;
