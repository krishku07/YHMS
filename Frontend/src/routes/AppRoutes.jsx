import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "../pages/Login";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

import DashboardLayout from "../layouts/DashboardLayout";
import StudentLayout from "../layouts/StudentLayout";
import ForgotPassword from "../pages/ForgotPassword";


// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeePage from "../pages/admin/EmployeePage";
import StudentPage from "../pages/admin/Students";
import RoomPage from "../pages/admin/RoomPage";
import FeePage from "../pages/admin/FeePage";
import AdminOutpassPage from "../pages/admin/AdminOutpassPage";
import Notice from "../pages/admin/Notice";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import ProfilePage from "../pages/student/ProfilePage";
import StudentFeePage from "../pages/student/FeePage";
import RequestOutpassPage from "../pages/student/RequestOutpassPage";
import OutpassHistoryPage from "../pages/student/OutpassHistoryPage";

function AnimatedRoute({ children }) {
  return <AnimatedPageWrapper>{children}</AnimatedPageWrapper>;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Login */}
        <Route
          path="/"
          element={
            <AnimatedRoute>
              <Login />
            </AnimatedRoute>
          }
        />

          <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

        {/* ================= ADMIN ================= */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin"
            element={
              <AnimatedRoute>
                <AdminDashboard />
              </AnimatedRoute>
            }
          />

        

          <Route path="/admin/notices" element={<Notice />} />
          <Route
            path="/admin/employees"
            element={
              <AnimatedRoute>
                <EmployeePage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <AnimatedRoute>
                <StudentPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/admin/rooms"
            element={
              <AnimatedRoute>
                <RoomPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/admin/fees"
            element={
              <AnimatedRoute>
                <FeePage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/admin/outpass"
            element={
              <AnimatedRoute>
                <AdminOutpassPage />
              </AnimatedRoute>
            }
          />
        </Route>

        {/* ================= STUDENT ================= */}
        <Route element={<StudentLayout />}>
          <Route
            path="/student"
            element={
              <AnimatedRoute>
                <StudentDashboard />
              </AnimatedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <AnimatedRoute>
                <ProfilePage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/student/fees"
            element={
              <AnimatedRoute>
                <StudentFeePage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/student/request-outpass"
            element={
              <AnimatedRoute>
                <RequestOutpassPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="/student/outpass-history"
            element={
              <AnimatedRoute>
                <OutpassHistoryPage />
              </AnimatedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutesWrapper() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default AppRoutesWrapper;

