import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft as ArrowLeftIcon, Bookmark, Trash2, Edit3 } from "lucide-react";
import { getBlogById, deleteBlog } from "../services/api";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { useTheme } from "../components/theme-provider";
import { Skeleton } from "../components/ui/skeleton";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isNightMode, setIsNightMode, savedBlogIds, toggleSave } = useTheme();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const {
    data: selectedBlog,
    isLoading: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as string),
    enabled: !!id,
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/journal");
    },
  });

  if (blogLoading) {
    return (
      <div className={`min-h-screen pt-32 pb-24 ${isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fcfaf7]'}`}>
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div className="space-y-12">
              <div className="space-y-6">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-2/3" />
              </div>
              <div className="flex items-center gap-8 pt-8">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <Skeleton className="aspect-[4/5] rounded-[3rem]" />
          </div>
          <div className="grid lg:grid-cols-[1fr_2.5fr_1fr] gap-20">
            <div className="space-y-8">
              <Skeleton className="h-20 w-full rounded-3xl" />
              <Skeleton className="h-20 w-full rounded-3xl" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (blogError || !selectedBlog) {
    return (
      <div className="text-center py-20 min-h-screen">
        <p className="text-[10px] tracking-widest text-red-400 uppercase">Article not found</p>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/journal")}
          className="mt-4 text-[9px] tracking-widest uppercase"
        >
          Back to Journal
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-700 ${isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fcfaf7]'}`}
    >
      {/* Immersive Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 pt-32 pb-24">
        {/* Back Button */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12 flex items-center gap-4"
        >
          <button
            onClick={() => navigate("/journal")}
            className="group flex items-center gap-3 py-2 px-4 rounded-full border border-stone-500/10 hover:border-amber-500/30 transition-all bg-white/5 backdrop-blur-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Feed</span>
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <div className="space-y-12">
            <header className="space-y-6">
              <div className="flex gap-4">
                {selectedBlog.category.map((cat: string) => (
                  <span key={cat} className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/20">
                    {cat}
                  </span>
                ))}
              </div>
              <motion.h1 
                layoutId={`blog-title-${selectedBlog.id}`}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tighter"
              >
                {selectedBlog.title}
              </motion.h1>
            </header>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8 pt-8 border-t border-stone-500/10"
            >
              <div className="flex -space-x-3">
                {[1,2].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-black bg-stone-200 dark:bg-stone-800" />
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Written by</p>
                <p className="text-xl font-serif italic">The Editorial Board</p>
              </div>
              <div className="h-12 w-px bg-stone-500/20 mx-4" />
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Published</p>
                <p className="text-sm font-medium">
                  {new Date(selectedBlog.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            layoutId={`blog-image-${selectedBlog.id}`}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative group"
          >
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              src={selectedBlog.coverImage}
              alt={selectedBlog.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_2.5fr_1fr] gap-20">
          <aside className="sticky top-32 h-fit space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Reading Tools</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-stone-500/5 backdrop-blur-sm border border-stone-500/10 hover:border-amber-500/30 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Night Perspective</span>
                  <Switch checked={isNightMode} onCheckedChange={setIsNightMode} />
                </div>
                <Button
                  onClick={() => toggleSave(selectedBlog.id)}
                  variant="outline"
                  className={`h-20 rounded-3xl gap-4 border-stone-500/20 text-lg font-serif transition-all ${savedBlogIds.includes(selectedBlog.id) ? "bg-amber-500 text-white border-amber-500" : "hover:bg-stone-500/5"}`}
                >
                  <Bookmark className={`h-6 w-6 ${savedBlogIds.includes(selectedBlog.id) ? "fill-current" : ""}`} />
                  {savedBlogIds.includes(selectedBlog.id) ? "In Collection" : "Save for Later"}
                </Button>
                <Button
                  onClick={() => navigate(`/studio/edit/${selectedBlog.id}`)}
                  variant="outline"
                  className="h-20 rounded-3xl gap-4 border-stone-500/20 text-xs font-bold tracking-widest uppercase hover:bg-amber-500 hover:text-white transition-all"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Narrative
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm("Archive this entry for eternity?")) {
                      deleteBlogMutation.mutate(selectedBlog.id);
                    }
                  }}
                  variant="ghost"
                  className="h-20 rounded-3xl gap-4 text-xs font-bold tracking-widest uppercase text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Entry
                </Button>
              </div>
            </div>
          </aside>

          <article className={`prose prose-stone lg:prose-2xl dark:prose-invert max-w-none transition-opacity duration-1000 ${isNightMode ? 'text-stone-300' : 'text-stone-800'}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-relaxed space-y-12 drop-cap-container"
            >
              {selectedBlog.content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Discourse</p>
                <div className="flex flex-col gap-3">
                  {["Twitter", "Threads", "RSS Feed", "Copy Link"].map(p => (
                    <button key={p} className="text-left text-sm font-medium hover:text-amber-600 transition-colors py-2 border-b border-stone-500/10">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
