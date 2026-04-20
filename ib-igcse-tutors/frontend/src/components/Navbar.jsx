import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";

function Navbar() {
  const { siteData } = useSiteData();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100">
            MB
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight text-slate-950">
              {siteData.brandName}
            </p>
            <p className="text-xs font-medium text-cyan-600">
              Clear Maths Learning
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/subjects/maths"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Maths by Board
          </Link>
          <Link
            to="/city/gurugram"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Gurugram Sectors
          </Link>
          <Link
            to="/student-login"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Student
          </Link>
          <Link
            to="/tutor-login"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Tutor
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/admin-login"
            className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 md:inline-flex"
          >
            Admin
          </Link>
          <a
            href={`https://wa.me/${siteData.contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
