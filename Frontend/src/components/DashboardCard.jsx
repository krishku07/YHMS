import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

function DashboardCard({ title, value, icon, color = "#6D28D9" }) {
  const isNumeric = typeof value === "number" && !Number.isNaN(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <Card
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "default",
          "&:hover": {
            boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            borderColor: `${color}66`,
          },
        }}
      >
        {/* Top accent */}
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
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  fontWeight: 500,
                  mb: 0.5,
                  fontSize: "0.8rem",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#0F172A",
                  lineHeight: 1.2,
                  letterSpacing: "-0.5px",
                }}
              >
                {isNumeric ? <AnimatedCounter value={value} /> : value}
              </Typography>
            </Box>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                color: "#FFFFFF",
                p: 1.5,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 12px ${color}33`,
                transition: "all 0.25s ease",
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default DashboardCard;
