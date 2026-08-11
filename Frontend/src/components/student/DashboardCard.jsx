import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function DashboardCard({ title, subtitle, icon, color = "#6D28D9", path }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <Card
        elevation={0}
        onClick={() => path && navigate(path)}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          cursor: path ? "pointer" : "default",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            borderColor: `${color}66`,
          },
          "&:hover .card-arrow": {
            transform: "translateX(4px)",
          },
        }}
      >
        {/* Top accent gradient line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${color}, ${color}88, transparent)`,
          }}
        />

        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1rem", mb: 0.5 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography sx={{ color: "#64748B", fontSize: "0.8rem", fontWeight: 400 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Box sx={{
              width: 46, height: 46, borderRadius: "12px",
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              display: "flex", alignItems: "center",
              justifyContent: "center", color: "#FFFFFF", flexShrink: 0, ml: 2,
              boxShadow: `0 4px 12px ${color}33`,
              transition: "all 0.25s ease",
            }}>
              {icon}
            </Box>
          </Box>
          {path && (
            <Box className="card-arrow" sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1.5, transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <Typography sx={{ color: color, fontSize: "0.8rem", fontWeight: 500 }}>View Details</Typography>
              <ArrowRight size={14} style={{ color }} />
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default DashboardCard;
