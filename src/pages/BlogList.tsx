import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { getBlogs } from "../services/api";
import { useTheme } from "../components/theme-provider";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { Skeleton } from "../components/ui/skeleton";
import { Reveal } from "../components/ui/reveal";

type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string[];
  content: string;
};

export default function BlogList() {
  const { isNightMode, savedBlogIds, toggleSave, searchQuery } = useTheme();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const { data: blogs, isLoading: blogsLoading, isError: blogsError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, blogs]);

  const filteredBlogs = blogs?.filter((blog: Blog) => {
    const query = searchQuery.toLowerCase();
    return (
      (blog.title?.toLowerCase().includes(query) ?? false) ||
      (blog.description?.toLowerCase().includes(query) ?? false) ||
      (blog.category?.some(cat => cat?.toLowerCase().includes(query)) ?? false)
    );
  });

  const totalPages = Math.ceil((filteredBlogs?.length || 0) / blogsPerPage);
  const paginatedBlogs = filteredBlogs?.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="mb-32 text-center space-y-8">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`font-serif text-7xl md:text-[9rem] tracking-tighter leading-none transition-colors ${
            isNightMode ? 'text-stone-100' : 'text-stone-900'
          }`}
        >
          {searchQuery ? (
            <>Search: <span className="italic font-light opacity-50 underline decoration-amber-500/30 underline-offset-8">{searchQuery}</span></>
          ) : (
            <>Selected <span className="italic font-light opacity-50">Journal</span></>
          )}
        </motion.h1>
      </div>

      {blogsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="aspect-[4/5] rounded-[2rem]" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : blogsError ? (
        <div className="text-center py-20 border border-red-500/20 rounded-[2rem] bg-red-500/5">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-red-500/60">Connection Lost with Archive</p>
        </div>
      ) : !blogs || filteredBlogs?.length === 0 ? (
        <div className="text-center py-40">
          <p className="text-2xl font-serif italic text-stone-500">No records match your inquiry.</p>
          <button 
            onClick={() => navigate('/journal')}
            className="mt-8 text-[10px] font-black tracking-[0.3em] uppercase underline underline-offset-4"
          >
            View All Entries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {paginatedBlogs?.map((blog: Blog, i: number) => (
            <Reveal key={blog.id} width="100%" delay={0.1 * (i % 2)}>
              <div className="relative">
                <div className="absolute top-6 right-6 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(blog.id);
                    }}
                    className={`p-3 rounded-full transition-all duration-500 group border ${
                      savedBlogIds.includes(blog.id) 
                        ? 'bg-amber-500 border-amber-500 text-white shadow-[0_10px_20px_-5px_rgba(245,158,11,0.5)]' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 transition-transform group-active:scale-90 ${savedBlogIds.includes(blog.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="transform transition-transform hover:-translate-y-2 duration-700">
                  <BlogCard blog={blog} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`mt-40 pt-16 border-t flex justify-between items-center transition-colors ${
            isNightMode ? 'border-stone-500/10' : 'border-stone-200'
          }`}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase disabled:opacity-20 transition-all hover:gap-6"
          >
            <span className="h-px w-8 bg-current transition-all group-hover:w-12" />
            Previous
          </button>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-serif">{currentPage}</span>
            <span className="text-[10px] opacity-20 font-black tracking-widest">/ {totalPages}</span>
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase disabled:opacity-20 transition-all hover:gap-6"
          >
            Next
            <span className="h-px w-8 bg-current transition-all group-hover:w-12" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
