import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if we are running in a browser environment
    if (typeof window === 'undefined') return;

    try {
      // Initialize Lenis with smooth scrolling settings
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
      
      lenisRef.current = lenis;

      // Connect Lenis raf loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(rafId);
        lenisRef.current = null;
      };
    } catch (error) {
      console.error("Lenis initialization failed:", error);
    }
  }, []);

  return <>{children}</>;
}
