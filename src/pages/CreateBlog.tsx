import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Upload, X, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, getBlogById, updateBlog } from "../services/api";
import { useTheme } from "../components/theme-provider";

export default function CreateBlog() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isNightMode } = useTheme();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    description: "",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { data: existingBlog, isLoading: isFetching } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as string),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        category: existingBlog.category.join(", "),
        content: existingBlog.content,
        description: existingBlog.description || "",
      });
      setUploadedImage(existingBlog.coverImage);
    }
  }, [existingBlog]);

  const mutation = useMutation({
    mutationFn: isEdit 
      ? (data: any) => updateBlog({ id: id as string, data })
      : createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate(isEdit ? `/blog/${id}` : "/journal");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formData,
      category: formData.category.split(",").map(c => c.trim()),
      coverImage: uploadedImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
      date: existingBlog?.date || new Date().toISOString(),
    };
    mutation.mutate(data);
  };

  if (isFetching) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-b-2 border-amber-500 rounded-full" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-32 pb-24 transition-colors duration-700 ${isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fcfaf7]'}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-24 text-center relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-[10px] font-black tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Dismiss
          </button>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-stone-500/10 mb-8 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
              {isEdit ? "Refining Narrative" : "Creative Studio"}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif tracking-tighter"
          >
            {isEdit ? "Revise the" : "Draft a New"} 
            <span className="block italic font-light opacity-50">{isEdit ? "Insight" : "Narrative"}</span>
          </motion.h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-24">
          <section className="space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">01. Identity</p>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="The headline of your insight..."
                className={`w-full bg-transparent border-none outline-none text-4xl md:text-6xl font-serif placeholder:opacity-10 transition-all ${
                  isNightMode ? 'text-stone-100' : 'text-stone-900'
                }`}
              />
              <div className="h-px w-full bg-gradient-to-r from-stone-500/20 via-stone-500/40 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">02. Taxonomy</p>
                <input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="Finance, Design, Life..."
                  className="w-full bg-transparent border-b border-stone-500/20 py-4 outline-none focus:border-amber-500 transition-colors placeholder:text-sm"
                />
              </div>
              <div className="space-y-6">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">03. Visual Presence</p>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setUploadedImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="flex items-center justify-between w-full py-4 border-b border-stone-500/20 cursor-pointer group hover:border-amber-500 transition-colors">
                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                      {uploadedImage ? "Replace Visual" : "Upload Atmosphere"}
                    </span>
                    <Upload className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all" />
                  </label>
                  {uploadedImage && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-8 aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl relative group"
                    >
                      <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setUploadedImage(null)} className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-xl rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <div className="space-y-6">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">04. The Core</p>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={2}
                placeholder="A brief summary for the preview..."
                className={`w-full bg-stone-500/5 backdrop-blur-sm rounded-xl p-6 border border-stone-500/10 outline-none focus:border-amber-500/30 transition-all text-sm italic placeholder:opacity-20 mb-6 ${
                  isNightMode ? 'text-stone-400' : 'text-stone-600'
                }`}
              />
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={10}
                placeholder="Where the story begins to breathe..."
                className={`w-full bg-stone-500/5 backdrop-blur-sm rounded-[2rem] p-12 border border-stone-500/10 outline-none focus:border-amber-500/30 transition-all text-xl font-serif leading-relaxed placeholder:opacity-20 ${
                  isNightMode ? 'text-stone-300' : 'text-stone-800'
                }`}
              />
            </div>
          </section>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-8 rounded-full font-serif text-2xl tracking-tight transition-all shadow-2xl disabled:opacity-50 overflow-hidden relative group ${
              isNightMode ? 'bg-amber-100 text-stone-900 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {mutation.isPending ? (
              <div className="flex items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                <span className="text-xs font-black uppercase tracking-widest">Processing...</span>
              </div>
            ) : (
              <>
                <span className="relative z-10">{isEdit ? "Update Publication" : "Commence Publication"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

}
