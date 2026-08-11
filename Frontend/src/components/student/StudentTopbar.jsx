import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Badge, Tooltip } from "@mui/material";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNav, DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "../../context/NavContext";

function StudentTopbar() {
  const navigate = useNavigate();
  const { collapsed, openMobile } = useNav();
  const studentName = localStorage.getItem("studentName") || "Student";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { xs: "100%", md: `calc(100% - ${currentWidth}px)` },
        ml: { xs: 0, md: `${currentWidth}px` },
        bgcolor: "#FFFFFF",
        color: "#0F172A",
        borderBottom: "1px solid #E2E8F0",
        height: 64,
        justifyContent: "center",
        transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 2, minHeight: "64px !important" }}>
        <IconButton
          onClick={openMobile}
          sx={{ display: { xs: "flex", md: "none" }, color: "#64748B", "&:hover": { bgcolor: "#F1F5F9" } }}
        >
          <Menu size={22} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "#0F172A",
              letterSpacing: "-0.3px",
            }}
          >
            Student Dashboard
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.72rem" }}>
            {today}
          </Typography>
        </Box>

        <Tooltip title="Notifications">
          <IconButton
            onClick={() => navigate("/student/profile")}
            sx={{ color: "#64748B", transition: "all 0.2s", "&:hover": { bgcolor: "#F1F5F9", color: "#6D28D9" } }}
          >
            <Badge badgeContent={0} showZero={false} sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 18, minWidth: 18, background: "#6D28D9", color: "#FFFFFF", fontWeight: 700 } }}>
              <Bell size={20} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            ml: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": { bgcolor: "#F1F5F9" },
          }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: "#6D28D9", color: "#FFFFFF", fontWeight: 700, fontSize: "0.9rem" }}>
            {studentName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "0.85rem", color: "#0F172A" }}>
              {studentName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.72rem" }}>
              Hostel Resident
            </Typography>
          </Box>
          <ChevronDown size={16} style={{ color: "#94A3B8" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default StudentTopbar;

