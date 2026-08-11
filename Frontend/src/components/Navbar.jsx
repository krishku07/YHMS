import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Badge, InputBase, Tooltip } from "@mui/material";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNav, DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from "../context/NavContext";

function Navbar() {
  const navigate = useNavigate();
  const { collapsed, openMobile } = useNav();
  const name = localStorage.getItem("adminName") || "Admin";
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
        {/* Mobile menu button */}
        <IconButton
          onClick={openMobile}
          sx={{ display: { xs: "flex", md: "none" }, color: "#64748B", "&:hover": { bgcolor: "#F1F5F9" } }}
        >
          <Menu size={22} />
        </IconButton>

        {/* Welcome */}
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
            Welcome back,{" "}
            <Box component="span" sx={{ color: "#6D28D9", fontWeight: 700 }}>
              {name}
            </Box>
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.72rem" }}>
            {today}
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            bgcolor: "#F1F5F9",
            borderRadius: "10px",
            px: 1.5,
            py: 0.5,
            border: "1px solid #E2E8F0",
            transition: "all 0.2s",
            "&:focus-within": {
              borderColor: "#6D28D9",
              bgcolor: "#FFFFFF",
              boxShadow: "0 0 0 3px rgba(139,92,246,0.1)",
            },
          }}
        >
          <Search size={16} style={{ color: "#94A3B8", marginRight: 8 }} />
          <InputBase
            placeholder="Search..."
            sx={{
              color: "#0F172A",
              fontSize: "0.85rem",
              width: 200,
              "& ::placeholder": { color: "#94A3B8" },
            }}
          />
        </Box>

        {/* Notifications */}
        <Tooltip title="View Notices">
          <IconButton
            onClick={() => navigate("/admin/notices")}
            sx={{
              color: "#64748B",
              transition: "all 0.2s",
              "&:hover": { bgcolor: "#F1F5F9", color: "#6D28D9" },
            }}
          >
            <Badge
              badgeContent={0}
              showZero={false}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  height: 18,
                  minWidth: 18,
                  background: "#6D28D9",
                  color: "#FFFFFF",
                  fontWeight: 700,
                },
              }}
            >
              <Bell size={20} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile */}
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
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#6D28D9",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "0.85rem", color: "#0F172A" }}
            >
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.72rem" }}>
              Administrator
            </Typography>
          </Box>
          <ChevronDown size={16} style={{ color: "#94A3B8" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

