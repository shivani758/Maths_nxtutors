import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";

const defaultForm = {
  studentName: "",
  parentName: "",
  phone: "",
  classLevel: "Class 10",
  board: "CBSE",
  sector: "Sector 56",
  topics: "Algebra, geometry, and school worksheet support",
  mode: "Home Tuition",
  goal: "Need regular maths support and stronger exam confidence",
  timing: "Weekday evenings",
};

function StudentLogin() {
  const { session, loginStudent } = useAuth();
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);

  if (session?.role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  }

  return (
    <MainLayout>
      <Seo
        title="Student Login | Maths Bodhi"
        description="Student dashboard access for maths home tuition in Gurugram. Share your class, board, sector, and learning needs to start tutor matching."
        canonicalPath="/student-login"
        keywords={["student maths dashboard", "maths tutor matching", "gurugram student login"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
              Student Access
            </span>
            <h1 className="mt-5 text-4xl font-bold">
              Start your maths support journey with the right details
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              This login is designed as a smart intake step. Once you continue, the student
              dashboard can send your full brief directly to the Maths Bodhi WhatsApp number for
              matching and follow-up.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>Board-aware matching for CBSE, ICSE, IGCSE, IB, and JEE maths.</p>
              <p>Sector-based coverage across premium Gurugram localities.</p>
              <p>Parent-friendly workflow with clear next steps after login.</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Student login details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share enough information to help us route you to the correct maths tutor and
              WhatsApp conversation.
            </p>

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                loginStudent(form);
                navigate("/student/dashboard");
              }}
            >
              {[
                ["studentName", "Student Name", "text"],
                ["parentName", "Parent Name", "text"],
                ["phone", "Phone Number", "tel"],
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

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Class or Level
                </span>
                <select
                  value={form.classLevel}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, classLevel: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                >
                  {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "IGCSE", "IB DP", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Board</span>
                <select
                  value={form.board}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, board: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                >
                  {["CBSE", "ICSE", "IGCSE", "IB", "Foundation", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Gurugram Sector
                </span>
                <select
                  value={form.sector}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, sector: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                >
                  {siteData.sectorPages.map((sector) => (
                    <option key={sector.slug} value={sector.sectorLabel}>
                      {sector.sectorLabel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Mode
                </span>
                <select
                  value={form.mode}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, mode: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                >
                  {["Home Tuition", "Online", "Hybrid"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              {[
                ["topics", "Topics or current problem"],
                ["goal", "Goal from tutoring"],
                ["timing", "Preferred timing"],
              ].map(([key, label]) => (
                <label key={key} className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                  <textarea
                    rows={key === "topics" ? 3 : 2}
                    value={form[key]}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                  />
                </label>
              ))}

              <button className="md:col-span-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700">
                Continue to Student Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default StudentLogin;
