import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../services/api";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/theme-provider";

type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string[];
  content: string;
};

export default function CurationPage() {
  const navigate = useNavigate();
  const { isNightMode, savedBlogIds, toggleSave, searchQuery } = useTheme();

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const curatedBlogs = blogs?.filter((blog: Blog) => 
    savedBlogIds.includes(blog.id) && (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="mb-20 text-center">
        <h2 className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-4">Your Library</h2>
        <h1 className={`text-4xl md:text-5xl font-serif transition-colors ${
          isNightMode ? 'text-white' : 'text-[#1a1a1a]'
        }`}>Curation</h1>
      </div>

      {blogsLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
              isNightMode ? 'border-white' : 'border-gray-900'
            }`}></div>
            <p className="text-[10px] tracking-widest text-gray-400 mt-4 uppercase">Loading Library...</p>
          </div>
        </div>
      ) : curatedBlogs?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[10px] tracking-widest text-gray-400 uppercase">Your library is empty</p>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/journal")}
            className="mt-4 text-[9px] tracking-widest uppercase"
          >
            Explore Journal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {curatedBlogs?.map((blog: Blog) => (
            <motion.div
              key={blog.id}
              layoutId={`curation-${blog.id}`}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="cursor-pointer group"
            >
              <div className="space-y-6">
                <div className="aspect-[16/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                      isNightMode ? 'opacity-80' : ''
                    }`}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                      {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="text-[9px] tracking-widest uppercase text-gray-300">
                        {blog.category[0]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(blog.id);
                        }}
                        className="text-blue-500 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-serif transition-colors group-hover:italic leading-tight ${
                    isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>
                    {blog.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 leading-relaxed font-light transition-colors ${
                    isNightMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {blog.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}