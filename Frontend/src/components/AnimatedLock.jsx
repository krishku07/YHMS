import { motion } from "framer-motion";

const AnimatedLock = ({ state = "idle" }) => {
  // state: "idle" | "inserting" | "unlocked" | "denied"

  const shackleVariants = {
    idle: { d: "M24 28V18C24 13.58 27.58 10 32 10C36.42 10 40 13.58 40 18V28" },
    unlocked: { d: "M24 28V18C24 10 32 6 32 6C32 6 40 10 40 18V28" },
  };

  const lockBodyVariants = {
    idle: { fill: "rgba(148,163,184,0.3)" },
    unlocked: { fill: "rgba(34,197,94,0.4)" },
    denied: { fill: "rgba(239,68,68,0.3)" },
  };

  const getGlowColor = () => {
    if (state === "unlocked") return "rgba(34,197,94,0.6)";
    if (state === "denied") return "rgba(239,68,68,0.5)";
    return "rgba(139,92,246,0.3)";
  };

  const getCheckVariants = () => {
    if (state === "unlocked") {
      return {
        opacity: 1,
        pathLength: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      };
    }
    return {
      opacity: 0,
      pathLength: 0,
    };
  };

  return (
    <motion.div
      animate={state === "denied" ? { x: [0, -6, 6, -6, 6, 0] } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "relative",
        width: 72,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Glow behind lock */}
      <motion.div
        animate={{
          boxShadow: `0 0 30px ${getGlowColor()}, 0 0 60px ${getGlowColor()}`,
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${getGlowColor().replace("0.6", "0.15").replace("0.5", "0.12").replace("0.3", "0.1")} 0%, transparent 70%)`,
        }}
      />

      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lock Body */}
        <motion.rect
          x="20"
          y="28"
          width="24"
          height="22"
          rx="4"
          variants={lockBodyVariants}
          animate={state === "unlocked" ? "unlocked" : state === "denied" ? "denied" : "idle"}
          initial="idle"
          stroke={state === "unlocked" ? "#10B981" : state === "denied" ? "#EF4444" : "#8B5CF6"}
          strokeWidth="2.5"
          fill="rgba(30,41,59,0.8)"
        />

        {/* Keyhole */}
        <circle cx="32" cy="40" r="4" fill={state === "unlocked" ? "#10B981" : "#64748B"} />
        <rect
          x="30"
          y="40"
          width="4"
          height="5"
          rx="1"
          fill={state === "unlocked" ? "#10B981" : "#64748B"}
        />

        {/* Shackle */}
        <motion.path
          d="M24 28V18C24 13.58 27.58 10 32 10C36.42 10 40 13.58 40 18V28"
          stroke={state === "unlocked" ? "#10B981" : "#8B5CF6"}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial="idle"
          animate={state === "unlocked" ? "unlocked" : "idle"}
          variants={shackleVariants}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Checkmark for unlocked */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={getCheckVariants()}
          style={{
            transformOrigin: "32px 32px",
          }}
        >
          <motion.path
            d="M26 39L31 44L39 34"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={state === "unlocked" ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default AnimatedLock;



