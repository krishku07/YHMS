import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

/**
 * Premium Gradient Stat Card with animated counter, icon tile, and hover lift.
 * Accepts `animate` flag to enable the counter animation (default true).
 */
function StatCard({ label, value, icon, color = "#6D28D9", animate = true, index = 0 }) {
  const isNumeric = typeof value === "number" && !Number.isNaN(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          p: 3,
          borderRadius: "16px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            borderColor: `${color}66`,
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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                color: "#0F172A",
                mt: 0.5,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
              }}
            >
              {isNumeric && animate ? (
                <AnimatedCounter value={value} />
              ) : (
                value
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: `0 4px 12px ${color}33`,
              flexShrink: 0,
              transition: "all 0.25s ease",
            }}
          >
            {icon}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
}

export default StatCard;
