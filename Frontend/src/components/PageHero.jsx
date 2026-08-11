import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Reusable Hero Section for every page.
 * Displays a gradient header with title, description, icon, and optional action button.
 */
function PageHero({ icon, title, subtitle, actionLabel, onAction, actionIcon, accent = "#6D28D9" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, md: 4 },
          mb: 3,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 55%, #EDE9FE 100%)",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {/* Decorative gradient blob */}
        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            left: "30%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}0D 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  boxShadow: `0 6px 16px ${accent}33`,
                  flexShrink: 0,
                }}
              >
                {icon}
              </Box>
            </motion.div>
            <Box>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  letterSpacing: "-0.5px",
                  color: "#0F172A",
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography sx={{ color: "#64748B", fontSize: "0.9rem", mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {actionLabel && onAction && (
            <Button
              variant="contained"
              size="large"
              startIcon={actionIcon}
              onClick={onAction}
              sx={{
                bgcolor: accent,
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.9rem",
                px: 3,
                py: 1.2,
                borderRadius: "10px",
                boxShadow: `0 4px 12px ${accent}40`,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#5B21B6",
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 20px ${accent}55`,
                },
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}

export default PageHero;
