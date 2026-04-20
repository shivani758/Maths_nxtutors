import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700">
            Page not found
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            We could not find that page
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Try heading back to the homepage or start the tutoring journey from the
            demo flow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Home
            </Link>
            <Link
              to="/book-demo"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-600"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default NotFound;
