import { motion } from "framer-motion";
import { useTheme } from "../../theme-provider";

interface Background01Props {
  className?: string;
  showTypography?: boolean;
}

export const Background01 = ({ className = "", showTypography = true }: Background01Props) => {
  const { isNightMode } = useTheme();

  return (
    <div 
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-1000 ${
        isNightMode ? "bg-[#0a0a0a]" : "bg-[#fdfdfd]"
      } ${className}`}
    >
        {/* Subtle Gradient Orbs */}
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: isNightMode ? [0.1, 0.2, 0.1] : [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-multiply ${
                isNightMode ? "bg-blue-900/20" : "bg-gray-200"
            }`}
        />

        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                opacity: isNightMode ? [0.1, 0.15, 0.1] : [0.3, 0.4, 0.3],
                x: [0, -30, 0],
                y: [0, 50, 0]
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
            className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[80px] mix-blend-multiply ${
                isNightMode ? "bg-amber-900/10" : "bg-orange-50"
            }`}
        />

        {/* Cinematic Noise Overlay */}
        <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
        />

        {/* Editorial Typography Element */}
        {showTypography && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center overflow-hidden"
            >
                <div 
                    className={`font-serif italic text-[40vw] leading-none select-none tracking-tighter opacity-[0.03] ${
                        isNightMode ? "text-white" : "text-black"
                    }`}
                >
                    01
                </div>
            </motion.div>
        )}

        {/* Minimal Grid Lines */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />
    </div>
  );
};
