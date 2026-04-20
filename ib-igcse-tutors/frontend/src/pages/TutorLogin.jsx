import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  experience: "5 years",
  boards: "CBSE, IGCSE",
  topics: "Algebra, geometry, and board exam support",
  sectors: "Sector 56, Sector 57",
  availability: "Weekday evenings and Saturday mornings",
  summary: "I am a maths tutor looking to onboard with premium Gurugram families.",
};

function TutorLogin() {
  const { session, loginTutor } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const { siteData } = useSiteData();

  if (session?.role === "tutor") {
    return <Navigate to="/tutor/dashboard" replace />;
  }

  return (
    <MainLayout>
      <Seo
        title="Tutor Login | Maths Bodhi"
        description="Tutor dashboard access for maths specialists who want to onboard with Maths Bodhi and connect through a WhatsApp-first workflow."
        canonicalPath="/tutor-login"
        keywords={["maths tutor login", "tutor dashboard", "gurugram maths tutor onboarding"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[32px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
              Tutor Access
            </span>
            <h1 className="mt-5 text-4xl font-bold">
              Join a premium maths tutoring workflow designed for Gurugram
            </h1>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Share your teaching profile, boards, sectors, and availability. After login, the
              tutor dashboard can send your onboarding brief straight to the Maths Bodhi WhatsApp
              number for review.
            </p>
            <div className="mt-8 space-y-3 text-sm text-blue-50">
              <p>Highlight your strongest boards, classes, and maths topics.</p>
              <p>Choose preferred sectors for home tuition routing in Gurugram.</p>
              <p>Use the tutor dashboard to submit documents, availability, and profile updates.</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Tutor login details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This information helps the team review fit, local routing, and premium school
              compatibility before your profile is finalized.
            </p>

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                loginTutor(form);
                navigate("/tutor/dashboard");
              }}
            >
              {[
                ["name", "Tutor Name", "text"],
                ["phone", "Phone Number", "tel"],
                ["email", "Email", "email"],
                ["experience", "Experience", "text"],
              ].map(([key, label, type]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                  <input
                    required
                    type={type}
                    value={form[key]}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                  />
                </label>
              ))}

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Boards and class segments
                </span>
                <input
                  value={form.boards}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, boards: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Maths topics and specialization
                </span>
                <textarea
                  rows={3}
                  value={form.topics}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, topics: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Gurugram sectors
                </span>
                <input
                  value={form.sectors}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, sectors: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                  list="sector-options"
                />
                <datalist id="sector-options">
                  {siteData.sectorPages.map((sector) => (
                    <option key={sector.slug} value={sector.sectorLabel} />
                  ))}
                </datalist>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Availability
                </span>
                <input
                  value={form.availability}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, availability: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Short profile summary
                </span>
                <textarea
                  rows={4}
                  value={form.summary}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, summary: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <button className="md:col-span-2 rounded-2xl bg-slate-950 px-5 py-4 font-semibold text-white transition hover:bg-slate-800">
                Continue to Tutor Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TutorLogin;
