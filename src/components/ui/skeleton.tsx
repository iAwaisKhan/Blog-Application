import { motion } from "framer-motion";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`bg-stone-200 dark:bg-stone-800 rounded-sm ${className}`}
    />
  );
};
