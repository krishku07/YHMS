import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  out: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const AnimatedPageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;

