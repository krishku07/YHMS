import { Box, Skeleton as MuiSkeleton } from "@mui/material";
import { motion } from "framer-motion";

// Improved shimmer keyframes for MUI skeletons
const shimmerStyle = {
  "& .MuiSkeleton-root": {
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-200%",
      width: "200%",
      height: "100%",
background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.06), transparent)",
      animation: "shimmer 2s infinite",
    },
  },
};

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  if (type === "card") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...shimmerStyle }}>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Box
              sx={{
background: "rgba(0,0,0,0.04)",
                borderRadius: 3,
                p: 3,
                border: "1px solid #E2E8F0",
              }}
            >
<MuiSkeleton
                variant="text"
                width="40%"
                sx={{ bgcolor: "rgba(0,0,0,0.06)", mb: 1, borderRadius: 1 }}
              />
              <MuiSkeleton
                variant="text"
                width="80%"
                height={32}
                sx={{ bgcolor: "rgba(0,0,0,0.06)", borderRadius: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <MuiSkeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ bgcolor: "rgba(0,0,0,0.06)" }}
                />
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  }

  if (type === "table") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ...shimmerStyle }}>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 1.5,
                borderRadius: 2,
              }}
            >
              {Array.from({ length: 4 }).map((_, j) => (
                <MuiSkeleton
                  key={j}
                  variant="rectangular"
                  height={20}
                  sx={{
                    flex: 1,
                    bgcolor: "rgba(0,0,0,0.06)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  }

  if (type === "stats") {
    return (
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", ...shimmerStyle }}>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ flex: "1 1 200px" }}
          >
            <Box
              sx={{
                background: "rgba(0,0,0,0.04)",
                borderRadius: 3,
                p: 2.5,
                border: "1px solid #E2E8F0",
              }}
            >
              <MuiSkeleton
                variant="text"
                width="50%"
                sx={{ bgcolor: "rgba(0,0,0,0.06)", mb: 1, borderRadius: 1 }}
              />
              <MuiSkeleton
                variant="text"
                height={36}
                width="70%"
                sx={{ bgcolor: "rgba(0,0,0,0.06)", borderRadius: 1 }}
              />
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  }

  if (type === "profile") {
    return (
      <Box sx={{ ...shimmerStyle }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
          <MuiSkeleton variant="circular" width={90} height={90} sx={{ bgcolor: "rgba(0,0,0,0.06)" }} />
          <Box sx={{ flex: 1 }}>
            <MuiSkeleton variant="text" width="40%" height={32} sx={{ bgcolor: "rgba(0,0,0,0.06)", mb: 1, borderRadius: 1 }} />
            <MuiSkeleton variant="text" width="25%" sx={{ bgcolor: "rgba(0,0,0,0.06)", borderRadius: 1 }} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} sx={{ flex: "1 1 200px", p: 2, background: "rgba(0,0,0,0.02)", borderRadius: 2, border: "1px solid #E2E8F0" }}>
              <MuiSkeleton variant="text" width="50%" sx={{ bgcolor: "rgba(0,0,0,0.06)", mb: 0.5, borderRadius: 1 }} />
              <MuiSkeleton variant="text" width="80%" sx={{ bgcolor: "rgba(0,0,0,0.06)", borderRadius: 1 }} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return null;
};

export default SkeletonLoader;

