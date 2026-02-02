import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    date: "",
    category: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      ...formData,
      category: formData.category.split(",").map((c) => c.trim()),
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={handleChange}
          required
        />

        <input
          name="coverImage"
          placeholder="Cover Image URL"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={handleChange}
          required
        />

        <input
          name="date"
          placeholder="Date (e.g. 2026-01-19)"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Categories (comma separated)"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Short description"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          rows={3}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Full content"
          className="w-full border p-2 rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          rows={6}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {mutation.isPending ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
