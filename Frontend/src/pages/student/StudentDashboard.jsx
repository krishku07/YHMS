import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import StudentNotice from "./StudentNotice";
import { User, CreditCard, DoorOpen, History, Sparkles } from "lucide-react";
import DashboardCard from "../../components/student/DashboardCard";
import PageHero from "../../components/PageHero";

function StudentDashboard() {
  const studentName = localStorage.getItem("studentName") || "Student";
  const roomNumber = localStorage.getItem("roomNumber") || "N/A";

  return (
    <Box>
      {/* Welcome Hero */}
      <PageHero
        icon={<Sparkles size={26} />}
        title={`Welcome Back, ${studentName}!`}
        subtitle={`Room No: ${roomNumber} · Status: Active`}
        accent="#6D28D9"
      />

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <DashboardCard title="My Profile" subtitle="View Personal Details" icon={<User size={24} />} color="#3B82F6" path="/student/profile" />
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <DashboardCard title="Fee Details" subtitle="View Fee Records" icon={<CreditCard size={24} />} color="#10B981" path="/student/fees" />
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            <DashboardCard title="Request Outpass" subtitle="Apply for Outpass" icon={<DoorOpen size={24} />} color="#F59E0B" path="/student/request-outpass" />
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
          >
            <DashboardCard title="Outpass History" subtitle="Track Requests" icon={<History size={24} />} color="#EC4899" path="/student/outpass-history" />
          </motion.div>
        </Grid>
      </Grid>

      {/* Latest Notices */}
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


