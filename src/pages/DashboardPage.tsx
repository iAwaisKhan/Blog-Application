import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../services/api";
import { useTheme } from "../components/theme-provider";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isNightMode } = useTheme();

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Dashboard
        onCreateClick={() => navigate("/studio")}
        onJournalClick={() => navigate("/journal")}
        trendingBlogs={blogs?.slice(0, 2)}
        suggestedBlogs={blogs?.slice(2, 5)}
        onBlogClick={(id) => navigate(`/blog/${id}`)}
        isNightMode={isNightMode}
      />
    </motion.div>
  );
}
