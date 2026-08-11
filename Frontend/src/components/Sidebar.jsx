import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import {
  LayoutDashboard,
  Users,
  IdCard,
  DoorOpen,
  CreditCard,
  FileText,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Home,
  Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useNav,
  DRAWER_WIDTH,
  DRAWER_COLLAPSED_WIDTH,
} from "../context/NavContext";

const menuItems = [
  { text: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/admin" },
  { text: "Students", icon: <Users size={22} />, path: "/admin/students" },
  { text: "Employees", icon: <IdCard size={22} />, path: "/admin/employees" },
  { text: "Room Management", icon: <Home size={22} />, path: "/admin/rooms" },
  { text: "Fee Management", icon: <CreditCard size={22} />, path: "/admin/fees" },
  { text: "Outpass", icon: <FileText size={22} />, path: "/admin/outpass" },
  { text: "Notices", icon: <Megaphone size={22} />, path: "/admin/notices" },
];

function SidebarContent({ collapsed, onToggle, onNavigate }) {
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    onNavigate("/");
  };

  return (
    <>
      {/* Logo Section */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 1.5,
          px: collapsed ? 1 : 2.5,
          py: 1.5,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Box
            sx={{
              width: collapsed ? 40 : 44,
              height: collapsed ? 40 : 44,
              borderRadius: "12px",
background: "linear-gradient(135deg, #5B21B6 0%, #6D28D9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
boxShadow: "0 4px 12px rgba(109,40,217,0.25)",
              flexShrink: 0,
            }}
          >
            <Building2 size={collapsed ? 20 : 24} color="#FFFFFF" />
          </Box>
        </motion.div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "700",
                fontSize: "1.1rem",
                lineHeight: 1.2,
                letterSpacing: "-0.3px",
                color: "#0F172A",
              }}
            >
              HMS
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#64748B", fontSize: "0.65rem", letterSpacing: "0.5px" }}
            >
              Management System
            </Typography>
          </motion.div>
        )}
      </Toolbar>

      {collapsed && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}>
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{ color: "#94A3B8", "&:hover": { background: "#E2E8F0", color: "#475569" } }}
          >
            <ChevronRight size={18} />
          </IconButton>
        </Box>
      )}

      <Divider sx={{ bgcolor: "#F1F5F9", mx: collapsed ? 1 : 2 }} />

      <List sx={{ px: collapsed ? 0.8 : 1.5, pt: 1.5 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => onNavigate(item.path)}
              sx={{
                borderRadius: "10px",
                mb: 0.3,
                py: 1.1,
                px: collapsed ? 1 : 2,
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive ? "#6D28D9" : "transparent",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: isActive ? "#6D28D9" : "#E2E8F0",
                  transform: collapsed ? "none" : "translateX(3px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#FFFFFF" : "#64748B",
                  minWidth: collapsed ? 0 : 38,
                  justifyContent: "center",
                  transition: "color 0.25s ease",
                }}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {item.icon}
                </motion.span>
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#FFFFFF" : "#475569",
                      letterSpacing: "0.2px",
                    },
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* Collapse Toggle (expanded state) */}
      {!collapsed && (
        <Box sx={{ px: 1.5, mb: 0.5 }}>
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              width: "100%",
              borderRadius: "10px",
              py: 0.6,
              color: "#94A3B8",
              "&:hover": { background: "#F1F5F9", color: "#475569" },
            }}
          >
            <ChevronLeft size={18} />
          </IconButton>
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ bgcolor: "#F1F5F9", mx: collapsed ? 1 : 2 }} />

      <List sx={{ px: collapsed ? 0.8 : 1.5, pb: 2.5, pt: 1 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: "10px",
            py: 1.1,
            px: collapsed ? 1 : 2,
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "#FEF2F2",
              transform: collapsed ? "none" : "translateX(3px)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF4444",
              minWidth: collapsed ? 0 : 38,
              justifyContent: "center",
            }}
          >
            <LogOut size={20} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.875rem",
                  color: "#EF4444",
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                },
              }}
            />
          )}
        </ListItemButton>
      </List>
    </>
  );
}

function Sidebar() {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useNav();
  const navigate = useNavigate();

  const currentWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleNavigate = (path) => {
    closeMobile();
    navigate(path);
  };

  return (
    <>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: currentWidth,
          flexShrink: 0,
          transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiDrawer-paper": {
            width: currentWidth,
            boxSizing: "border-box",
            background: "#F5F3FF",
            color: "#0F172A",
            borderRight: "1px solid #E2E8F0",
            boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
            transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            overflowX: "hidden",
          },
        }}
      >
        <SidebarContent collapsed={collapsed} onToggle={toggleCollapsed} onNavigate={handleNavigate} />
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={closeMobile}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            background: "#F5F3FF",
            color: "#0F172A",
            borderRight: "1px solid #E2E8F0",
            boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton
            onClick={closeMobile}
            size="small"
            sx={{ color: "#64748B", "&:hover": { background: "#E2E8F0" } }}
          >
            <Menu size={20} />
          </IconButton>
        </Box>
        <SidebarContent collapsed={false} onToggle={() => {}} onNavigate={handleNavigate} />
      </Drawer>
    </>
  );
}

export default Sidebar;


