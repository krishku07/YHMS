import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import StudentNotice from "./StudentNotice";
import { User, CreditCard, DoorOpen, History, Sparkles } from "lucide-react";
import DashboardCard from "../../components/student/DashboardCard";
import PageHero from "../../components/PageHero";
import { getStudentProfile } from "../../api/studentApi";

function getStored(key) {
  return sessionStorage.getItem(key) || localStorage.getItem(key);
}

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadStudent = async () => {
      try {
        // Profile is the source of truth. This also fixes dashboards opened
        // directly after login when the login response does not contain
        // studentName/roomNo.
        const data = await getStudentProfile();
        if (!mounted) return;

        setStudent(data);

        const id = data?.id ?? data?.studentId;
        const name = data?.name ?? data?.studentName;
        const room =
          data?.roomNo ??
          data?.roomNumber ??
          data?.room?.roomNo ??
          data?.room?.roomNumber;

        if (id !== undefined && id !== null) {
          sessionStorage.setItem("studentId", String(id));
          localStorage.setItem("studentId", String(id));
        }
        if (name) {
          sessionStorage.setItem("studentName", String(name));
          localStorage.setItem("studentName", String(name));
        }
        if (room !== undefined && room !== null && String(room).trim() !== "") {
          sessionStorage.setItem("roomNumber", String(room));
          localStorage.setItem("roomNumber", String(room));
        }
      } catch (error) {
        console.error("Failed to load student profile:", error);
        // Do not blank the dashboard if profile is temporarily unavailable.
      }
    };

    loadStudent();
    return () => {
      mounted = false;
    };
  }, []);

  const studentName =
    student?.name ??
    student?.studentName ??
    getStored("studentName") ??
    "Student";

  const roomNumber =
    student?.roomNo ??
    student?.roomNumber ??
    student?.room?.roomNo ??
    student?.room?.roomNumber ??
    getStored("roomNumber") ??
    "Not Assigned";

  return (
    <Box>
      <PageHero
        icon={<Sparkles size={26} />}
        title={`Welcome Back, ${studentName}!`}
        subtitle={`Room No: ${roomNumber} · Status: Active`}
        accent="#6D28D9"
      />

      <Grid container spacing={3}>
        {[
          { title: "My Profile", subtitle: "View Personal Details", icon: <User size={24} />, color: "#3B82F6", path: "/student/profile" },
          { title: "Fee Details", subtitle: "View Fee Records", icon: <CreditCard size={24} />, color: "#10B981", path: "/student/fees" },
          { title: "Request Outpass", subtitle: "Apply for Outpass", icon: <DoorOpen size={24} />, color: "#F59E0B", path: "/student/request-outpass" },
          { title: "Outpass History", subtitle: "Track Requests", icon: <History size={24} />, color: "#EC4899", path: "/student/outpass-history" },
        ].map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4, ease: "easeOut" }}
            >
              <DashboardCard {...card} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#0F172A", fontSize: "1.1rem", letterSpacing: "-0.3px" }}>
          📢 Latest Notices
        </Typography>
        <StudentNotice />
      </Box>
    </Box>
  );
}

export default StudentDashboard;
