import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Activity } from "lucide-react";

export default function Dashboard({
  onCreateClick,
  onJournalClick
}: {
  onCreateClick: () => void;
  onJournalClick: () => void;
}) {
  return (
    <div className="w-full h-full bg-[#fdfdfd] overflow-y-auto custom-scrollbar p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-0 top-0 text-[18rem] lg:text-[24rem] font-serif font-bold leading-none select-none pointer-events-none"
          >
            01
          </motion.div>
          <div className="relative z-10 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-serif font-medium text-[#1a1a1a] max-w-2xl leading-tight"
            >
              The intersection of minimalism & motion.
            </motion.h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={onJournalClick}
              className="px-8 py-3 border border-[#1a1a1a] text-sm font-medium tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              Read More
            </motion.button>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={onJournalClick}
            className="lg:col-span-2 aspect-[4/3] lg:aspect-auto lg:h-[500px] border border-gray-100 bg-white p-8 lg:p-12 flex flex-col justify-between relative group cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">Featured Concept</span>
              <h2 className="text-3xl lg:text-4xl font-serif font-medium text-[#1a1a1a] max-w-md">
                Structural Elegance in Modern Web Design
              </h2>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-[1px] bg-gray-300 transition-all group-hover:w-24" />
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400">Spatial Dynamics 2024</p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-300">Vol. 001 — Archive</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-[#1a1a1a] transition-colors" />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 border border-gray-50 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-gray-50 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {/* Metrics Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white border border-gray-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-[240px]"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400">Reach Metrics</span>
                  <div className="text-3xl font-serif text-[#1a1a1a]">12.4k</div>
                </div>
                <Activity className="w-4 h-4 text-gray-300" />
              </div>
              
              <div className="h-24 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    d="M0,45 C30,45 40,20 70,35 C100,50 120,40 150,45 C180,50 190,40 200,30"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <motion.circle 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    cx="200" cy="30" r="2" fill="#1a1a1a" 
                  />
                </svg>
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={onCreateClick}
              className="bg-[#fafafa] border border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer hover:bg-white hover:border-solid hover:border-gray-300 transition-all h-[240px]"
            >
               <div className="space-y-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-500">FARE Space / Dashboard View</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-500">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 group-hover:text-[#1a1a1a] transition-colors">Create New Draft</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
