import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";

// Components
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import StudentLayout from "../layouts/StudentLayout";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";

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


// ============================================================
// Animated Route Wrapper
// ============================================================

function AnimatedRoute({ children }) {
    return (
        <AnimatedPageWrapper>
            {children}
        </AnimatedPageWrapper>
    );
}


// ============================================================
// Application Routes
// ============================================================

function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes
                location={location}
                key={location.pathname}
            >

                {/* ==================================================
                    AUTHENTICATION
                ================================================== */}

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


                {/* ==================================================
                    ADMIN ROUTES
                    Only ADMIN and JUNIOR_ADMIN can access these
                ================================================== */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "junior_admin"
                            ]}
                        >
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* Admin Dashboard */}
                    <Route
                        path="/admin"
                        element={
                            <AnimatedRoute>
                                <AdminDashboard />
                            </AnimatedRoute>
                        }
                    />

                    {/* Notices */}
                    <Route
                        path="/admin/notices"
                        element={
                            <Notice />
                        }
                    />

                    {/* Employees */}
                    <Route
                        path="/admin/employees"
                        element={
                            <AnimatedRoute>
                                <EmployeePage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Students */}
                    <Route
                        path="/admin/students"
                        element={
                            <AnimatedRoute>
                                <StudentPage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Rooms */}
                    <Route
                        path="/admin/rooms"
                        element={
                            <AnimatedRoute>
                                <RoomPage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Fees */}
                    <Route
                        path="/admin/fees"
                        element={
                            <AnimatedRoute>
                                <FeePage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Outpass */}
                    <Route
                        path="/admin/outpass"
                        element={
                            <AnimatedRoute>
                                <AdminOutpassPage />
                            </AnimatedRoute>
                        }
                    />

                </Route>


                {/* ==================================================
                    STUDENT ROUTES
                    Only STUDENT can access these
                ================================================== */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "student"
                            ]}
                        >
                            <StudentLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* Student Dashboard */}
                    <Route
                        path="/student"
                        element={
                            <AnimatedRoute>
                                <StudentDashboard />
                            </AnimatedRoute>
                        }
                    />

                    {/* Profile */}
                    <Route
                        path="/student/profile"
                        element={
                            <AnimatedRoute>
                                <ProfilePage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Fees */}
                    <Route
                        path="/student/fees"
                        element={
                            <AnimatedRoute>
                                <StudentFeePage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Request Outpass */}
                    <Route
                        path="/student/request-outpass"
                        element={
                            <AnimatedRoute>
                                <RequestOutpassPage />
                            </AnimatedRoute>
                        }
                    />

                    {/* Outpass History */}
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


// ============================================================
// Browser Router Wrapper
// ============================================================

function AppRoutesWrapper() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}


export default AppRoutesWrapper;