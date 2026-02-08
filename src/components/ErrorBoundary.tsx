import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] dark:bg-[#0a0a0a] p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md space-y-8"
          >
            <h1 className="text-9xl font-serif italic text-amber-500/20">Oops</h1>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif tracking-tight">System Disruption</h2>
              <p className="text-stone-500 font-medium leading-relaxed">
                The editorial digital engine encountered an unexpected anomaly. 
                Our team of digital artisans has been notified.
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = "/"}
              className="h-14 px-8 rounded-2xl bg-stone-900 text-white dark:bg-white dark:text-black uppercase text-[10px] font-black tracking-widest"
            >
              Return to Safe Harbor
            </Button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
