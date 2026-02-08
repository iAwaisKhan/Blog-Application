import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string[];
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const { isNightMode } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <Link to={`/blog/${blog.id}`} className="group block">
        <div className="space-y-6">
          <motion.div 
            layoutId={`blog-image-${blog.id}`}
            className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100"
          >
            <motion.div
              className="absolute inset-0 z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              initial={false}
            />
            <motion.img
              src={blog.coverImage}
              alt={blog.title}
              className={`h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                isNightMode ? 'opacity-80' : 'grayscale group-hover:grayscale-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6 z-20">
              <span className="text-white text-[10px] tracking-[0.4em] font-bold uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-700">Read Entry</span>
            </div>
          </motion.div>

          <div className="space-y-3 px-1">
            <div className="flex items-center gap-4">
              <span className="text-editorial-cap text-blue-500">{blog.category[0]}</span>
              <span className="text-editorial-cap opacity-40">{new Date(blog.date).toLocaleDateString()}</span>
            </div>

            <motion.h3 
              layoutId={`blog-title-${blog.id}`}
              className={`text-4xl font-serif leading-tight group-hover:italic transition-all duration-700 ${
                isNightMode ? 'text-white' : 'text-[#1a1a1a]'
              }`}
            >
              {blog.title}
            </motion.h3>

            <p className={`text-editorial-body line-clamp-2 opacity-60 transition-colors ${
              isNightMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'
            }`}>
              {blog.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
