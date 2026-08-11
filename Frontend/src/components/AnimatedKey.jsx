import { motion } from "framer-motion";

const AnimatedKey = ({ state = "idle", onAnimationComplete }) => {
  // state: "idle" | "entering" | "inserted" | "turning" | "removing"

  const getKeyVariants = () => {
    switch (state) {
      case "entering":
        return {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
        };
      case "inserted":
        return {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 0.9,
        };
      case "turning":
        return {
          x: 0,
          y: 0,
          rotate: 90,
          opacity: 1,
          scale: 0.9,
        };
      case "removing":
        return {
          x: 80,
          y: 0,
          rotate: 0,
          opacity: 0,
          scale: 0.7,
        };
      default:
        return {
          x: 80,
          y: 0,
          rotate: 0,
          opacity: 0,
          scale: 0.7,
        };
    }
  };

  return (
    <motion.div
      initial={{ x: 80, opacity: 0, scale: 0.7, rotate: 0 }}
      animate={getKeyVariants()}
      transition={{
        duration: state === "turning" ? 0.35 : 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onAnimationComplete}
      style={{
        position: "absolute",
        width: 64,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Key Stem */}
        <rect
          x="4"
          y="26"
          width="28"
          height="6"
          rx="3"
          fill="#8B5CF6"
          fillOpacity="0.9"
        />
        {/* Key Bow (handle) */}
        <circle
          cx="8"
          cy="29"
          r="8"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Key Teeth */}
        <rect x="28" y="26" width="4" height="8" rx="1" fill="#8B5CF6" fillOpacity="0.9" />
        <rect x="24" y="26" width="4" height="6" rx="1" fill="#8B5CF6" fillOpacity="0.9" />
        <rect x="28" y="30" width="4" height="8" rx="1" fill="#8B5CF6" fillOpacity="0.7" />
        {/* Glow effect */}
        <circle cx="8" cy="29" r="10" fill="url(#keyGlow)" opacity="0.4" />
        <defs>
          <radialGradient id="keyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AnimatedKey;


