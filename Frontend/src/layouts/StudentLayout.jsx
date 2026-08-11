import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";
import { NavProvider, DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "../context/NavContext";
import { useNav } from "../context/NavContext";

function StudentContent() {
  const { collapsed } = useNav();
  const currentWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <StudentSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <StudentTopbar />
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

function StudentLayout() {
  return (
    <NavProvider>
      <StudentContent />
    </NavProvider>
  );
}

export default StudentLayout;

