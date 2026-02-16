import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, useScroll, useTransform } from "framer-motion";

export const FeatherPen = () => {
    const { scrollY } = useScroll();
    
    // Parallax effect
    const y = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ y }}
            className="fixed top-20 right-5 md:right-10 lg:right-20 z-0 hidden lg:block opacity-90 pointer-events-none w-[400px] h-[400px]"
        >
             <DotLottieReact
                src="https://lottie.host/29f49e47-b20e-46ef-a88a-e81c51c42c83/ZIqdmUb9wl.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </motion.div>
    );
};
