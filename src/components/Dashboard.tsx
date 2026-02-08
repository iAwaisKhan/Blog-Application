import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import { Reveal } from "./ui/reveal";

export default function Dashboard({
  onJournalClick,
  trendingBlogs = [],
  suggestedBlogs = [],
  onBlogClick,
  isNightMode = false
}: {
  onCreateClick?: () => void;
  onJournalClick: () => void;
  trendingBlogs?: any[];
  suggestedBlogs?: any[];
  onBlogClick: (id: string) => void;
  isNightMode?: boolean;
}) {
  return (
    <div className={`w-full transition-colors duration-700 p-8 lg:p-12 pt-0 lg:pt-0 ${
      isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fdfdfd]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: isNightMode ? 0.1 : 0.05, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-0 top-0 text-[18rem] lg:text-[24rem] font-serif font-bold leading-none select-none pointer-events-none translate-y-[-10%] ${
              isNightMode ? 'text-white' : 'text-[#1a1a1a]'
            }`}
          >
            01
          </motion.div>
          <div className="relative z-10 space-y-12">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`text-6xl lg:text-[7.5rem] font-serif font-medium max-w-4xl leading-[0.95] tracking-tight mask-reveal ${
                isNightMode ? 'text-white' : 'text-[#1a1a1a]'
              }`}
            >
              The intersection of <br />minimalism & motion.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={onJournalClick}
                whileHover={{ 
                  scale: 1.05,
                  letterSpacing: "0.5em",
                  transition: { duration: 0.4 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`px-12 py-5 border text-editorial-cap transition-all duration-500 rounded-sm relative overflow-hidden group ${
                  isNightMode 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                <span className="relative z-10">Enter Journal</span>
                <motion.div 
                  className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity"
                  initial={false}
                  whileHover={{ opacity: 0.1 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="space-y-12">
          {/* Trending & Suggested Section */}
          <div className="space-y-12">
            {/* Trending Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <h2 className="text-editorial-cap">Trending Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {trendingBlogs.map((blog, idx) => (
                <Reveal key={blog.id} width="100%" delay={0.2 + idx * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -12 }}
                    onClick={() => onBlogClick(blog.id)}
                    className="group cursor-pointer space-y-6"
                  >
                    <motion.div 
                      layoutId={`blog-image-${blog.id}`}
                      className="aspect-[16/9] overflow-hidden bg-gray-100 rounded-sm"
                    >
                      <motion.img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                          isNightMode ? 'opacity-80' : 'grayscale group-hover:grayscale-0'
                        }`}
                      />
                    </motion.div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.4em] font-bold text-blue-500 uppercase">{blog.category[0]}</span>
                        <span className="text-editorial-cap opacity-50">{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <motion.h3 
                        layoutId={`blog-title-${blog.id}`}
                        className={`text-4xl font-serif group-hover:italic transition-all duration-700 leading-tight ${
                        isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                      }`}>{blog.title}</motion.h3>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
            </div>

            {/* Suggested Section */}
            <div className={`space-y-8 pt-16 border-t ${isNightMode ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-gray-400" />
                <h2 className="text-editorial-cap">Suggested For You</h2>
              </div>
              <div className="space-y-10">
                {suggestedBlogs.map((blog, idx) => (
                  <Reveal key={blog.id} width="100%" delay={0.4 + idx * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 15 }}
                      onClick={() => onBlogClick(blog.id)}
                      className="flex gap-10 group cursor-pointer items-center transition-all duration-700"
                    >
                      <motion.div 
                        layoutId={`blog-image-${blog.id}`}
                        className="w-36 h-36 flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm"
                      >
                        <motion.img 
                          src={blog.coverImage} 
                          alt={blog.title} 
                          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                            isNightMode ? 'opacity-80' : 'grayscale group-hover:grayscale-0'
                          }`}
                        />
                      </motion.div>
                      <div className="flex-1 space-y-3">
                        <span className="text-editorial-cap text-blue-400">{blog.category[0]}</span>
                        <motion.h3 
                          layoutId={`blog-title-${blog.id}`}
                          className={`text-3xl font-serif group-hover:text-blue-500 transition-colors leading-tight ${
                          isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                        }`}>{blog.title}</motion.h3>
                        <p className="text-editorial-body line-clamp-1 italic">{blog.description}</p>
                      </div>
                      <ArrowUpRight className={`w-6 h-6 transition-all duration-700 transform group-hover:translate-x-2 group-hover:-translate-y-2 ${
                        isNightMode ? 'text-gray-600 group-hover:text-white' : 'text-gray-200 group-hover:text-[#1a1a1a]'
                      }`} />
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
