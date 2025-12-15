import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -30,
  },
};

const pageTransition = {
  duration: 0.35,
  ease: "easeInOut",
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
