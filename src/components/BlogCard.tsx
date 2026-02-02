import { Link } from "react-router-dom";

type Blog = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string[];
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-48 w-full object-cover"
        />

        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date}</p>

          <h2 className="text-lg font-semibold mt-1 dark:text-gray-100">
            {blog.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
            {blog.description}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            {blog.category.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
