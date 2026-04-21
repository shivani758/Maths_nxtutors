import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/city/:city" element={<CityPage />} />
        <Route path="/city/:city/:sector" element={<SectorPage />} />
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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]} fallbackPath="/admin/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
