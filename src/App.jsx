import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

/* COMMON */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PublicVoting from "./pages/PublicVoting";
import Leaderboard from "./pages/Leaderboard";
import LiveAnnouncement from "./pages/LiveAnnouncement";

/* PUBLIC / PAGES */
import Competitions from "./pages/Competitions";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* SUPER ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateUser from "./pages/admin/CreateUser";
import SchoolList from "./pages/admin/schools/SchoolList";
import AssignSchool from "./pages/admin/schools/AssignSchool";

/* SCHOOL ADMIN */
import SchoolAdminDashboard from "./pages/school_admin/SchoolAdminDashboard";
import CreateSchoolUser from "./pages/CreateSchoolUser";
import ReviewPerformances from "./pages/school_admin/ReviewPerformances";

/* STUDENT */
import JudgeVoting from "./pages/judges/JudgeVoting";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherVideoUpload from "./pages/teacher/TeacherUploadVideo";
import TeacherRegisterStudents from "./pages/teacher/TeacherRegisterdStudents";
import LiveChat from "./components/LiveChat";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-layout">
      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🚦 PAGE CONTENT */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/voting" element={<PublicVoting />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/live-announcement" element={<LiveAnnouncement />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 👑 SUPER ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-user"
            element={
              <ProtectedRoute roles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/schools"
            element={
              <ProtectedRoute>
                <SchoolList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/assign-school"
            element={
              <ProtectedRoute>
                <AssignSchool />
              </ProtectedRoute>
            }
          />

          {/* 🏫 SCHOOL ADMIN */}
          <Route
            path="/school-admin/dashboard"
            element={
              <ProtectedRoute roles={["school_admin"]}>
                <SchoolAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-admin/review-performances"
            element={
              <ProtectedRoute roles={["school_admin"]}>
                <ReviewPerformances />
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-admin/create-user"
            element={
              <ProtectedRoute roles={["school_admin"]}>
                <CreateSchoolUser />
              </ProtectedRoute>
            }
          />

          {/* 👨‍⚖️ JUDGE */}
          <Route
            path="/judge/performances"
            element={
              <ProtectedRoute roles={["judge"]}>
                <JudgeVoting />
              </ProtectedRoute>
            }
          />

          {/* 👩‍🏫 TEACHER */}
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute roles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/register"
            element={
              <ProtectedRoute roles={["teacher"]}>
                <TeacherRegisterStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/upload-videos"
            element={
              <ProtectedRoute roles={["teacher"]}>
                <TeacherVideoUpload />
              </ProtectedRoute>
            }
          />

          {/* ❌ 404 */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: 100 }}>
                404 — Page Not Found
              </h2>
            }
          />
        </Routes>
      </main>

      {user && <LiveChat />}

      {/* 🔻 FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
