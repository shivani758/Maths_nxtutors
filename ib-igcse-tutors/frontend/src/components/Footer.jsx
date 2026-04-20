import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";

function Footer() {
  const { siteData } = useSiteData();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100">
              MB
            </div>

            <div>
              <p className="text-xl font-bold text-slate-950">{siteData.brandName}</p>
              <p className="text-xs font-medium text-cyan-600">
                Clear Maths Learning
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
            A premium maths home tutoring platform for Gurugram families, students,
            and tutors across CBSE, ICSE, IGCSE, IB, JEE, Olympiad, and foundation maths.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Explore
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/" className="block hover:text-blue-600">Home</Link>
            <Link to="/subjects/maths" className="block hover:text-blue-600">Maths by Board</Link>
            <Link to="/city/gurugram" className="block hover:text-blue-600">Gurugram</Link>
            <Link to="/book-demo" className="block hover:text-blue-600">Book Demo</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Account
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/login" className="block hover:text-blue-600">Login</Link>
            <Link to="/student-login" className="block hover:text-blue-600">Student Login</Link>
            <Link to="/tutor-login" className="block hover:text-blue-600">Tutor Login</Link>
            <Link to="/admin-login" className="block hover:text-blue-600">Admin Login</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Contact
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>{siteData.contact.email}</p>
            <p>{siteData.contact.phoneDisplay}</p>
            <p>{siteData.contact.supportHours}</p>
            <p>
              {siteData.contact.city}, {siteData.contact.state}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
        Copyright 2026 {siteData.brandName}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
