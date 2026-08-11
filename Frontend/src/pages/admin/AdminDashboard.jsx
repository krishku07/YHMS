import { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DoorOpen,
  CreditCard,
  IdCard,
  UserPlus,
  Plus,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../api/dashboardApi";
import PageHero from "../../components/PageHero";
import StatCard from "../../components/StatCard";

function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    occupiedRooms: 0,
    totalEmployees: 0,
    totalFeesCollected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    {
      label: "Total Students",
      value: dashboard.totalStudents,
      icon: <Users size={22} />,
      color: "#8B5CF6",
    },
    {
      label: "Rooms Occupied",
      value: dashboard.occupiedRooms,
      icon: <DoorOpen size={22} />,
      color: "#22C55E",
    },
    {
      label: "Fees Collected",
      value: `₹${dashboard.totalFeesCollected}`,
      icon: <CreditCard size={22} />,
      color: "#F59E0B",
    },
    {
      label: "Employees",
      value: dashboard.totalEmployees,
      icon: <IdCard size={22} />,
      color: "#10B981",
    },
  ];

  const quickActions = [
    { label: "Add Student", icon: <UserPlus size={20} />, path: "/admin/students", color: "#8B5CF6" },
    { label: "Add Room", icon: <Plus size={20} />, path: "/admin/rooms", color: "#22C55E" },
    { label: "Collect Fee", icon: <DollarSign size={20} />, path: "/admin/fees", color: "#F59E0B" },
    { label: "View Reports", icon: <TrendingUp size={20} />, path: "/admin", color: "#6D28D9" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <PageHero
        icon={<TrendingUp size={26} />}
        title="Admin Dashboard"
        subtitle="Overview of your hostel management system"
        accent="#6D28D9"
      />

      {/* Dashboard Stat Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              index={idx}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: 600,
            color: "#0F172A",
            fontSize: "1.1rem",
            letterSpacing: "-0.3px",
          }}
        >
          Quick Actions
        </Typography>
      </motion.div>
      <Grid container spacing={2}>
        {quickActions.map((action, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Paper
                elevation={0}
                onClick={() => navigate(action.path)}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: `${action.color}`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: `${action.color}12`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: action.color,
                  }}
                >
                  {action.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#0F172A",
                    fontSize: "0.9rem",
                  }}
                >
                  {action.label}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
