import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { buildWhatsAppUrl } from "../utils/whatsapp";

function Login() {
  const { siteData } = useSiteData();
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    "Hello Maths Bodhi, I want help choosing the right dashboard and maths support route.",
  );

  return (
    <MainLayout>
      <Seo
        title="Student, Tutor, and Admin Login | Maths Bodhi"
        description="Choose the right dashboard for students, tutors, and admin management on the Maths Bodhi maths home tutoring platform."
        canonicalPath="/login"
        keywords={["student login", "tutor login", "admin login", "maths bodhi dashboard"]}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700">
              Account Access
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Choose how you want to continue with Maths Bodhi
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              The student and tutor dashboards are built for WhatsApp-first coordination,
              while the admin panel controls tutors, reviews, homepage content, and sector-based
              SEO data.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Continue as Student",
                description:
                  "Share class, board, topic needs, timing, and sector to get matched to the right maths home tutor in Gurugram.",
                link: "/student-login",
                action: "Student Login",
                tone: "bg-blue-600 text-white shadow-blue-100",
              },
              {
                title: "Continue as Tutor",
                description:
                  "Onboard as a maths tutor, submit availability, teaching boards, sectors, and profile details, then move to WhatsApp review.",
                link: "/tutor-login",
                action: "Tutor Login",
                tone: "bg-slate-950 text-white",
              },
              {
                title: "Continue as Admin",
                description:
                  "Manage homepage SEO, premium school cards, tutors, reviews, and Gurugram sector content from one protected dashboard.",
                link: "/admin-login",
                action: "Admin Login",
                tone: "bg-white text-slate-950 border border-slate-200",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-slate-950">{card.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{card.description}</p>
                <Link
                  to={card.link}
                  className={`mt-8 inline-flex rounded-2xl px-6 py-3 font-semibold ${card.tone}`}
                >
                  {card.action}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] bg-slate-950 p-8 text-white">
            <h2 className="text-3xl font-bold">Need help before logging in?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              If you would rather talk to the team first, open WhatsApp and send your maths
              tutoring requirement directly to the Maths Bodhi support number.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              WhatsApp {siteData.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
