import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Activity, TrendingUp, Sparkles } from "lucide-react";

export default function Dashboard({
  onCreateClick,
  onJournalClick,
  trendingBlogs = [],
  suggestedBlogs = [],
  onBlogClick,
  isNightMode = false
}: {
  onCreateClick: () => void;
  onJournalClick: () => void;
  trendingBlogs?: any[];
  suggestedBlogs?: any[];
  onBlogClick: (id: string) => void;
  isNightMode?: boolean;
}) {
  return (
    <div className={`w-full h-full transition-colors duration-700 overflow-y-auto custom-scrollbar p-8 lg:p-12 ${
      isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fdfdfd]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isNightMode ? 0.1 : 0.05, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute left-0 top-0 text-[18rem] lg:text-[24rem] font-serif font-bold leading-none select-none pointer-events-none ${
              isNightMode ? 'text-white' : 'text-[#1a1a1a]'
            }`}
          >
            01
          </motion.div>
          <div className="relative z-10 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-5xl lg:text-7xl font-serif font-medium max-w-2xl leading-tight ${
                isNightMode ? 'text-white' : 'text-[#1a1a1a]'
              }`}
            >
              The intersection of minimalism & motion.
            </motion.h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={onJournalClick}
              className={`px-8 py-3 border text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                isNightMode 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              Read More
            </motion.button>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Trending & Suggested Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Trending Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Trending Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trendingBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    onClick={() => onBlogClick(blog.id)}
                    className="group cursor-pointer space-y-4"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                          isNightMode ? 'opacity-80' : 'grayscale group-hover:grayscale-0'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] tracking-[0.2em] font-bold text-blue-500 uppercase">{blog.category[0]}</span>
                        <span className="text-[8px] tracking-[0.2em] text-gray-400 uppercase">{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className={`text-lg font-serif group-hover:italic transition-all ${
                        isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                      }`}>{blog.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggested Section */}
            <div className={`space-y-6 pt-12 border-t ${isNightMode ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-gray-400" />
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Suggested For You</h2>
              </div>
              <div className="space-y-8">
                {suggestedBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    onClick={() => onBlogClick(blog.id)}
                    className="flex gap-6 group cursor-pointer items-center"
                  >
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isNightMode ? 'opacity-80' : 'grayscale group-hover:grayscale-0'
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-[8px] tracking-[0.2em] font-bold text-gray-400 uppercase">{blog.category[0]}</span>
                      <h3 className={`text-xl font-serif group-hover:text-blue-600 transition-colors leading-tight ${
                        isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                      }`}>{blog.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1 font-light italic">{blog.description}</p>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 transition-colors ${
                      isNightMode ? 'text-gray-600 group-hover:text-white' : 'text-gray-200 group-hover:text-[#1a1a1a]'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:gap-8 h-fit">
            {/* Creator Studio Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              <div 
                onClick={onCreateClick}
                className={`relative group cursor-pointer overflow-hidden p-10 h-[400px] flex flex-col justify-between transition-all duration-500 ${
                  isNightMode ? 'bg-black border border-white/10 hover:border-white/20' : 'bg-[#1a1a1a]'
                }`}
              >
                {/* Decorative background element */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2">Creator Studio</p>
                  <h3 className="text-2xl font-serif text-white leading-tight">Bring your next <br />vision to life.</h3>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-white/60 uppercase tracking-widest">Quick Start</span>
                    <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 transition-all duration-500" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                    <Plus className="w-5 h-5 text-[#1a1a1a]" />
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className={`p-8 flex flex-col gap-6 transition-colors ${
                isNightMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fafafa] border-gray-100 border'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Live Analytics</span>
                  </div>
                  <Activity className="w-3.5 h-3.5 text-gray-300" />
                </div>
                
                <div className="space-y-4">
                  <div className={`flex justify-between items-end border-b pb-4 ${
                    isNightMode ? 'border-white/5' : 'border-gray-100'
                  }`}>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Engagement</span>
                    <span className={`text-xl font-serif ${isNightMode ? 'text-white' : 'text-[#1a1a1a]'}`}>+24%</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Active Readers</span>
                    <span className={`text-xl font-serif ${isNightMode ? 'text-white' : 'text-[#1a1a1a]'}`}>142</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
