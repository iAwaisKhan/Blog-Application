import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Menu, X, LogOut, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Edit3 } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getBlogs, getBlogById, createBlog, deleteBlog } from "../services/api";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import Dashboard from "./Dashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string[];
  content: string;
};

const AuthPanel = ({
  user,
  login,
  logout,
  isEditProfileOpen,
  setIsEditProfileOpen,
  isDesktop,
  setUser
}: any) => {
  return (
    <div className="w-full bg-white overflow-hidden">
      {user ? (
        <div className="p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-blue-50 border-4 border-white shadow-md">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
          <p className="text-gray-500 text-sm mb-6">{user.email}</p>

          <div className="space-y-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg text-sm text-left flex items-center justify-between">
              <span className="text-gray-500">Google Account</span>
              <span className="text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {isDesktop ? (
              <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full py-6 rounded-xl border-gray-200">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newName = formData.get("name") as string;
                      const updatedUser = { ...user, name: newName };
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      setIsEditProfileOpen(false);
                    }}
                    className="grid items-start gap-6 mt-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-left">Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className="bg-gray-50" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-left">Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} />
                    </div>
                    <Button type="submit" className="mt-2 py-6 rounded-xl">Save changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full py-6 rounded-xl border-gray-200">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-white">
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                  </DrawerHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newName = formData.get("name") as string;
                      const updatedUser = { ...user, name: newName };
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      setIsEditProfileOpen(false);
                    }}
                    className="grid items-start gap-6 px-4 pb-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-left">Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className="bg-gray-50" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-left">Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} />
                    </div>
                    <Button type="submit" className="py-6 rounded-xl">Save changes</Button>
                  </form>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline" className="py-6 rounded-xl">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}

            <button
              onClick={logout}
              className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 leading-none mb-2">Login to your account</h3>
            <p className="text-sm text-gray-500">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm text-blue-600 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-3">
            <button type="submit" className="w-full h-10 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition shadow-sm">
              Login
            </button>
            <button
              onClick={() => login()}
              className="w-full h-10 px-4 py-2 border border-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="font-semibold text-blue-600 hover:underline">
                Sign up
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Layout() {
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = useState<'dashboard' | 'journal' | 'studio' | 'detail'>('dashboard');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNightMode, setIsNightMode] = useState(false);
  const blogsPerPage = 4;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        ).then((res) => res.json());

        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setIsProfileOpen(false);
      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsProfileOpen(false);
  };

  const { data: blogs, isLoading: blogsLoading, isError: blogsError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, blogs]);

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsCreateOpen(false);
      setSelectedBlogId(null);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setSelectedBlogId(null);
    },
  });

  const {
    data: selectedBlog,
    isLoading: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["blog", selectedBlogId],
    queryFn: () => getBlogById(selectedBlogId as string),
    enabled: !!selectedBlogId,
  });

  const filteredBlogs = blogs?.filter((blog: Blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil((filteredBlogs?.length || 0) / blogsPerPage);
  const paginatedBlogs = filteredBlogs?.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfdfd]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fdfdfd]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-12">
              <h1
                onClick={() => {
                  setCurrentView('dashboard');
                  setSelectedBlogId(null);
                  setIsProfileOpen(false);
                  setIsCreateOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xl font-serif font-bold tracking-[0.2em] uppercase text-[#1a1a1a] cursor-pointer"
              >
                FARE
              </h1>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-8">
                {['Journal', 'Curation', 'Studio'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      if (item === 'Journal') {
                        setCurrentView('journal');
                        setSelectedBlogId(null);
                        setIsCreateOpen(false);
                        setIsProfileOpen(false);
                      } else if (item === 'Studio') {
                        setCurrentView('studio');
                        setIsCreateOpen(true);
                        setSelectedBlogId(null);
                        setIsProfileOpen(false);
                      }
                    }}
                    className={`text-[10px] font-medium tracking-[0.3em] uppercase transition-colors ${
                      (item === 'Journal' && currentView === 'journal') ||
                      (item === 'Studio' && currentView === 'studio')
                        ? 'text-[#1a1a1a] border-b border-[#1a1a1a] pb-1'
                        : 'text-gray-400 hover:text-[#1a1a1a]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-8">
              {/* Search */}
              <div className="hidden md:block">
                <div className="input-container">
                  <input
                    placeholder=" "
                    className="input-field focus:outline-none focus:ring-0"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value && currentView !== 'journal') {
                        setCurrentView('journal');
                        setSelectedBlogId(null);
                      }
                    }}
                  />
                  <label className="input-label">EXPLORE</label>
                  <span className="input-highlight"></span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Popover
                  open={isProfileOpen}
                  onOpenChange={(open) => {
                    setIsProfileOpen(open);
                    if (open) {
                      setIsCreateOpen(false);
                      setSelectedBlogId(null);
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <button className="flex items-center space-x-3 group">
                      <span className="hidden sm:inline text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-[#1a1a1a] transition-colors">
                        {user ? 'Profile' : 'Sign In'}
                      </span>
                      {user ? (
                        <Avatar className="w-8 h-8 filter grayscale hover:grayscale-0 transition-all">
                          <AvatarImage src={user.picture} alt={user.name} />
                          <AvatarFallback className="bg-gray-100 text-[10px]">{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors">
                          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-[#1a1a1a] transition-colors" />
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 mr-4 mt-4 border-gray-100 shadow-2xl overflow-hidden" align="end">
                    <AuthPanel
                      user={user}
                      login={login}
                      logout={logout}
                      isEditProfileOpen={isEditProfileOpen}
                      setIsEditProfileOpen={setIsEditProfileOpen}
                      isDesktop={isDesktop}
                      setUser={setUser}
                    />
                  </PopoverContent>
                </Popover>

                {/* Mobile Menu */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-gray-400 hover:text-[#1a1a1a]"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Expandable Menus (simplified) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top duration-300">
            <div className="px-6 py-8 space-y-6">
              {['Journal', 'Curation', 'Studio'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Journal') {
                      setCurrentView('journal');
                      setSelectedBlogId(null);
                      setIsCreateOpen(false);
                    } else if (item === 'Studio') {
                      setCurrentView('studio');
                      setIsCreateOpen(true);
                      setSelectedBlogId(null);
                    } else {
                      setCurrentView('dashboard');
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-xs font-medium tracking-[0.3em] uppercase transition-colors ${
                    (item === 'Journal' && currentView === 'journal') ||
                    (item === 'Studio' && currentView === 'studio')
                      ? 'text-[#1a1a1a]'
                      : 'text-gray-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#fdfdfd] relative">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Dashboard
                onCreateClick={() => {
                  setCurrentView('studio');
                  setIsCreateOpen(true);
                }}
                onJournalClick={() => {
                  setCurrentView('journal');
                  setSelectedBlogId(null);
                }}
              />
            </motion.div>
          )}

          {currentView === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-6xl mx-auto px-6 py-16"
            >
              <div className="mb-20 text-center">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-4">The Archive</h2>
                <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">Journal</h1>
              </div>

              {blogsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="text-[10px] tracking-widest text-gray-400 mt-4 uppercase">Synchronizing...</p>
                  </div>
                </div>
              ) : blogsError ? (
                <div className="text-center py-20">
                  <p className="text-[10px] tracking-widest text-red-400 uppercase">Connection failed</p>
                </div>
              ) : filteredBlogs?.length === 0 ? (
                 <div className="text-center py-20">
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase">No records found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                  {paginatedBlogs?.map((blog: Blog) => (
                    <motion.div
                      key={blog.id}
                      layoutId={blog.id}
                      onClick={() => {
                        setSelectedBlogId(blog.id);
                        setCurrentView('detail');
                      }}
                      className="cursor-pointer group"
                    >
                      <div className="space-y-6">
                        <div className="aspect-[16/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                              {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="text-[9px] tracking-widest uppercase text-gray-300">
                              {blog.category[0]}
                            </span>
                          </div>
                          <h3 className="text-2xl font-serif text-[#1a1a1a] group-hover:italic transition-all leading-tight">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-light">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="text-[9px] tracking-[0.3em] uppercase text-gray-400 hover:text-[#1a1a1a] disabled:opacity-30 transition-colors"
                  >
                    PREVIOUS
                  </button>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gray-300">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="text-[9px] tracking-[0.3em] uppercase text-gray-400 hover:text-[#1a1a1a] disabled:opacity-30 transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-2xl mx-auto px-6 py-20"
            >
               <div className="mb-12">
                  <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-2">Create New Entry</h2>
                  <p className="text-sm text-gray-500 tracking-wide uppercase">Share your insights with the FARE community.</p>
               </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      title: formData.get("title") as string,
                      description: formData.get("description") as string,
                      content: formData.get("content") as string,
                      coverImage: formData.get("coverImage") as string || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
                      date: new Date().toISOString(),
                      category: (formData.get("category") as string).split(",").map(c => c.trim()),
                    };
                    createBlogMutation.mutate(data);
                    setCurrentView('journal');
                  }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Title</label>
                    <input
                      name="title"
                      required
                      placeholder="Enter a descriptive title..."
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#1a1a1a] outline-none transition text-xl font-serif"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Categories</label>
                      <input
                        name="category"
                        required
                        placeholder="e.g. Finance, Architecture"
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#1a1a1a] outline-none transition text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Cover Image URL</label>
                      <input
                        name="coverImage"
                        placeholder="https://..."
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#1a1a1a] outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Summary</label>
                    <textarea
                      name="description"
                      required
                      rows={2}
                      placeholder="A brief overview of the content..."
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#1a1a1a] outline-none transition text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Content</label>
                    <textarea
                      name="content"
                      required
                      rows={12}
                      placeholder="Begin writing..."
                      className="w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#1a1a1a] outline-none transition text-base font-serif leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={createBlogMutation.isPending}
                    className="w-full py-5 bg-[#1a1a1a] text-white rounded-sm font-bold hover:bg-black transition shadow-2xl flex items-center justify-center space-x-3 disabled:bg-gray-400 font-serif tracking-[0.2em] uppercase text-xs"
                  >
                    {createBlogMutation.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>Submit Entry</span>
                      </>
                    )}
                  </button>
                </form>
            </motion.div>
          )}

          {currentView === 'detail' && selectedBlog && (
            <motion.div
              key={`detail-${selectedBlog.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#fdfdfd] min-h-screen"
            >
               <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24">
                 {/* Back Button */}
                  <button
                    onClick={() => setCurrentView('journal')}
                    className="flex items-center text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-[#1a1a1a] mb-16 transition-colors group"
                  >
                    <ArrowLeftIcon className="w-3 h-3 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                  </button>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`transition-colors duration-700 p-8 lg:p-16 rounded-3xl ${isNightMode ? 'bg-[#1a1a1a] text-gray-100 shadow-2xl' : 'bg-white border border-gray-100'}`}
                  >
                    {/* Night Mode Toggle */}
                    <div className="flex items-center justify-between mb-16 pb-6 border-b border-gray-100/10">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-50">Reading Mode</span>
                      </div>
                      <Switch
                        checked={isNightMode}
                        onCheckedChange={setIsNightMode}
                      />
                    </div>

                    {/* Header */}
                    <div className="space-y-6 mb-16">
                      <div className="flex gap-4">
                        {selectedBlog.category.map((cat: string) => (
                          <span key={cat} className="text-[10px] tracking-[0.3em] uppercase text-gray-400">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h1 className="text-4xl lg:text-7xl font-serif leading-tight">
                        {selectedBlog.title}
                      </h1>
                      <div className="flex items-center justify-between pt-8 border-t border-gray-100/10">
                         <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                            {new Date(selectedBlog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                         </span>
                         <Button
                          variant="ghost"
                          onClick={() => {
                            if (window.confirm("Delete this entry?")) {
                              deleteBlogMutation.mutate(selectedBlog.id);
                              setCurrentView('journal');
                            }
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-50/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span className="text-[9px] tracking-widest uppercase">Delete</span>
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <motion.div 
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="mb-20"
                    >
                      <img
                        src={selectedBlog.coverImage}
                        alt={selectedBlog.title}
                        className="w-full aspect-[21/9] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
                      />
                    </motion.div>

                    {/* Content */}
                    <div className={`prose prose-xl max-w-none font-serif leading-relaxed space-y-8 ${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedBlog.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-8">{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-white font-serif font-bold tracking-[0.2em] uppercase text-lg">FARE</h3>
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase leading-relaxed">
                Empowering the next generation of creatives with tools, community, and curated knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Webinars</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Case Studies</a>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Job Board</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Practice Tests</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Mentorship</a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">LinkedIn</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition">Instagram</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.2em] uppercase text-gray-500">
              <p>© 2026 FARE. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
