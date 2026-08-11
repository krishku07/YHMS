import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { NavProvider, DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "../context/NavContext";
import { useNav } from "../context/NavContext";

function DashboardContent() {
  const { collapsed } = useNav();
  const currentWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

<Box
          sx={{
            p: { xs: 2, md: 3 },
            mt: "64px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function DashboardLayout() {
  return (
    <NavProvider>
      <DashboardContent />
    </NavProvider>
  );
}

export default DashboardLayout;

