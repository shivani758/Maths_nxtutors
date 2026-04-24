import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LegacyMathsSubjectRoute from "./pages/LegacyMathsSubjectRoute";
import MathsBoardPage from "./pages/MathsBoardPage";
import CityPage from "./pages/CityPage";
import SectorPage from "./pages/SectorPage";
import TutorProfile from "./pages/TutorProfile";
import BookDemo from "./pages/BookDemo";
import StudentLogin from "./pages/StudentLogin";
import TutorLogin from "./pages/TutorLogin";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProviders from "./admin/AdminProviders";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import TutorsListPage from "./admin/pages/TutorsListPage";
import TutorEditorPage from "./admin/pages/TutorEditorPage";
import ReviewsPage from "./admin/pages/ReviewsPage";
import ReviewEditorPage from "./admin/pages/ReviewEditorPage";
import BlogsPage from "./admin/pages/BlogsPage";
import BlogEditorPage from "./admin/pages/BlogEditorPage";
import PagesPage from "./admin/pages/PagesPage";
import PageEditorPage from "./admin/pages/PageEditorPage";
import ResultsPage from "./admin/pages/ResultsPage";
import FaqsPage from "./admin/pages/FaqsPage";
import CitiesPage from "./admin/pages/CitiesPage";
import LocalitiesPage from "./admin/pages/LocalitiesPage";
import MediaPage from "./admin/pages/MediaPage";
import UsersPage from "./admin/pages/UsersPage";
import SettingsPage from "./admin/pages/SettingsPage";
import SeoPage from "./admin/pages/SeoPage";
import ConfigDrivenPageRoute from "./pageSystem/routes/ConfigDrivenPageRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects/maths" element={<MathsBoardPage />} />
        <Route path="/subjects/maths/:board" element={<MathsBoardPage />} />
        <Route path="/subjects/maths/:board/:stage" element={<MathsBoardPage />} />
        <Route path="/subjects/maths/:board/:stage/:track" element={<MathsBoardPage />} />
        <Route path="/subject/:slug" element={<LegacyMathsSubjectRoute />} />
        <Route path="/maths/class/:classSlug" element={<ConfigDrivenPageRoute routeType="class" />} />
        <Route path="/maths/exam/:examSlug" element={<ConfigDrivenPageRoute routeType="exam" />} />
        <Route path="/city/:city" element={<CityPage />} />
        <Route path="/city/:city/:sector" element={<SectorPage />} />
        <Route path="/gurugram" element={<ConfigDrivenPageRoute routeType="gurugram-hub" />} />
        <Route path="/gurugram/:entrySlug" element={<ConfigDrivenPageRoute routeType="gurugram-entry" />} />
        <Route path="/tutors/:slug" element={<TutorProfile />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/tutor-login" element={<TutorLogin />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]} fallbackPath="/student-login">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["tutor"]} fallbackPath="/tutor-login">
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProviders>
              <Outlet />
            </AdminProviders>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="tutors" element={<TutorsListPage />} />
              <Route path="tutors/new" element={<TutorEditorPage />} />
              <Route path="tutors/:tutorId" element={<TutorEditorPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="reviews/new" element={<ReviewEditorPage />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="blogs/new" element={<BlogEditorPage />} />
              <Route path="blogs/:blogId" element={<BlogEditorPage />} />
              <Route path="pages" element={<PagesPage />} />
              <Route path="pages/new" element={<PageEditorPage />} />
              <Route path="pages/:pageId" element={<PageEditorPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="faqs" element={<FaqsPage />} />
              <Route path="cities" element={<CitiesPage />} />
              <Route path="localities" element={<LocalitiesPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="seo" element={<SeoPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
