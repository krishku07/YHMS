import { motion } from "framer-motion";

const RotatingRing = ({ size = 440, strokeWidth = 2.5 }) => {
  const segments = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const center = size / 2;
  const segmentAngle = 360 / segments;
  const gapAngle = 4;
  const segmentArcAngle = segmentAngle - gapAngle;
  const segmentLength = (Math.PI * radius * 2 * segmentArcAngle) / 360;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        pointerEvents: "none",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const angle = i * segmentAngle - 90; // Start from top
          const radians = (angle * Math.PI) / 180;
          const x1 = center + radius * Math.cos(radians);
          const y1 = center + radius * Math.sin(radians);

          const endAngle = angle + segmentArcAngle;
          const endRadians = (endAngle * Math.PI) / 180;
          const x2 = center + radius * Math.cos(endRadians);
          const y2 = center + radius * Math.sin(endRadians);

          const largeArcFlag = segmentArcAngle > 180 ? 1 : 0;

          return (
            <motion.path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 6px rgba(139,92,246,0.4))`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                filter: [
                  "drop-shadow(0 0 4px rgba(139,92,246,0.3))",
                  "drop-shadow(0 0 12px rgba(139,92,246,0.6))",
                  "drop-shadow(0 0 4px rgba(139,92,246,0.3))",
                ],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Inner glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};

export default RotatingRing;


