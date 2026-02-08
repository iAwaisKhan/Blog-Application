import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Edit3, Trash2, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../services/api";

import { Button } from "../components/ui/button";

export default function StudioDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["blogs"] });

      // Snapshot the previous value
      const previousBlogs = queryClient.getQueryData(["blogs"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["blogs"], (old: any) =>
        old?.filter((blog: any) => blog.id !== deletedId)
      );

      // Return a context object with the snapshotted value
      return { previousBlogs };
    },
    onError: (_err, _deletedId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(["blogs"], context?.previousBlogs);
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 bg-[#fcfaf7] dark:bg-[#0a0a0a] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-serif tracking-tighter text-stone-900 dark:text-white">
              Creator <span className="italic font-light opacity-50">Studio</span>
            </h1>
          </div>

          <Button
            onClick={() => navigate("/studio/new")}
            className="h-16 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold tracking-widest uppercase text-xs">New Narrative</span>
          </Button>
        </header>



        <div className="space-y-4">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-8 py-4 text-[10px] font-black tracking-[0.3em] uppercase opacity-50 dark:opacity-30 border-b border-stone-200 dark:border-stone-500/10 text-stone-600 dark:text-stone-400">
            <span>Article & Identity</span>
            <span className="text-center">Published</span>
            <span className="text-center">Sentiment</span>
            <span className="text-right">Manage</span>
          </div>

          <div className="space-y-3">
            {blogs?.map((blog: any, i: number) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-8 py-6 rounded-[1.5rem] border border-stone-200 dark:border-stone-500/10 bg-white dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-stone-500/5 transition-all group shadow-sm hover:shadow-md dark:shadow-none`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200">
                    <img src={blog.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl line-clamp-1 text-stone-900 dark:text-white">{blog.title}</h3>
                    <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 text-stone-600 dark:text-stone-400">{blog.category[0]}</p>
                  </div>
                </div>

                <div className="text-center text-sm font-medium opacity-60 text-stone-600 dark:text-stone-400">
                  {new Date(blog.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                </div>

                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-widest uppercase rounded-full border border-emerald-500/20">
                    +84% Positive
                  </span>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/studio/edit/${blog.id}`)}
                    className="p-3 rounded-xl bg-stone-100 dark:bg-stone-500/5 hover:bg-amber-500 hover:text-white text-stone-600 dark:text-stone-400 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if (confirm("Discard this narrative?")) deleteMutation.mutate(blog.id) }}
                    className="p-3 rounded-xl bg-stone-100 dark:bg-stone-500/5 hover:bg-red-500 hover:text-white transition-all text-red-500/60"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="p-3 rounded-xl bg-stone-100 dark:bg-stone-500/5 hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-black text-stone-600 dark:text-stone-400 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
