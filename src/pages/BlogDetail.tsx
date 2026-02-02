import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../services/api";

export default function BlogDetail() {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blog...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load blog
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-lg"
      />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{blog.date}</p>

      <h1 className="text-3xl font-bold mt-2 dark:text-gray-100">{blog.title}</h1>

      <div className="flex gap-2 mt-3 flex-wrap">
        {blog.category.map((cat: string) => (
          <span
            key={cat}
            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded"
          >
            {cat}
          </span>
        ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </p>
    </div>
  );
}
