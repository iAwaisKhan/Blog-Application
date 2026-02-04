import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Menu, X, LogOut, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Edit3, Bookmark, Upload, Activity, Sun, Moon } from "lucide-react";
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
  setUser,
  isNightMode
}: any) => {
  return (
    <div className={`w-full overflow-hidden ${isNightMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {user ? (
        <div className="p-6 text-center">
          <Avatar className={`w-20 h-20 mx-auto mb-4 ring-4 shadow-md ${isNightMode ? 'ring-white/5 border-white/10' : 'ring-blue-50 border-white'}`}>
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback className={`text-2xl font-bold ${isNightMode ? 'bg-white/5 text-white' : 'bg-blue-100 text-blue-600'}`}>
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className={`text-xl font-bold mb-1 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
          <p className="text-gray-500 text-sm mb-6">{user.email}</p>

          <div className="space-y-3 mb-6">
            <div className={`p-3 rounded-lg text-sm text-left flex items-center justify-between ${isNightMode ? 'bg-white/5 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
              <span>Google Account</span>
              <span className="text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
            
            {/* Metrics Section */}
            <div className={`p-4 border rounded-xl shadow-sm ${isNightMode ? 'bg-black/40 border-white/5' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-left">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 block mb-1">Total Reach</span>
                  <div className={`text-2xl font-serif ${isNightMode ? 'text-white' : 'text-[#1a1a1a]'}`}>12.4k</div>
                </div>
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <div className="h-12 w-full">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M0,45 C30,45 40,20 70,35 C100,50 120,40 150,45 C180,50 190,40 200,30"
                    fill="none"
                    stroke={isNightMode ? "#ffffff" : "#3b82f6"}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {isDesktop ? (
              <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={`w-full py-6 rounded-xl ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200'}`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[425px] ${isNightMode ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-white'}`}>
                  <DialogHeader>
                    <DialogTitle className={isNightMode ? 'text-white' : ''}>Edit profile</DialogTitle>
                    <DialogDescription className={isNightMode ? 'text-gray-400' : ''}>
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
                      <Label htmlFor="email" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className={isNightMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50'} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} className={isNightMode ? 'bg-white/5 border-white/10 text-white' : ''} />
                    </div>
                    <Button type="submit" className={`mt-2 py-6 rounded-xl ${isNightMode ? 'bg-white text-black hover:bg-gray-200' : ''}`}>Save changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className={`w-full py-6 rounded-xl ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200'}`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DrawerTrigger>
                <DrawerContent className={isNightMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white'}>
                  <DrawerHeader className="text-left">
                    <DrawerTitle className={isNightMode ? 'text-white' : ''}>Edit profile</DrawerTitle>
                    <DrawerDescription className={isNightMode ? 'text-gray-400' : ''}>
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
                      <Label htmlFor="email" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Email</Label>
                      <Input type="email" id="email" value={user.email} disabled className={isNightMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50'} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name" className={`text-left ${isNightMode ? 'text-gray-400' : ''}`}>Full Name</Label>
                      <Input name="name" id="name" defaultValue={user.name} className={isNightMode ? 'bg-white/5 border-white/10 text-white' : ''} />
                    </div>
                    <Button type="submit" className={`py-6 rounded-xl ${isNightMode ? 'bg-white text-black hover:bg-gray-200' : ''}`}>Save changes</Button>
                  </form>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline" className={isNightMode ? 'py-6 rounded-xl text-white border-white/10 hover:bg-white/5' : 'py-6 rounded-xl'}>Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}

            <button
              onClick={logout}
              className={`w-full px-4 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${isNightMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`p-6 border-b ${isNightMode ? 'border-white/5' : 'border-gray-100'}`}>
            <h3 className={`text-xl font-bold leading-none mb-2 ${isNightMode ? 'text-white' : 'text-gray-900'}`}>Login to your account</h3>
            <p className="text-sm text-gray-500">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email" className={`text-sm font-semibold ${isNightMode ? 'text-gray-400' : 'text-gray-700'}`}>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className={`flex h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${isNightMode ? 'bg-white/5 border-white/10 text-white' : 'border border-gray-200 bg-white'}`}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className={`text-sm font-semibold ${isNightMode ? 'text-gray-400' : 'text-gray-700'}`}>Password</label>
                    <a
                      href="#"
                      className={`ml-auto inline-block text-sm hover:underline ${isNightMode ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className={`flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${isNightMode ? 'bg-white/5 border-white/10 text-white' : 'border border-gray-200 bg-white'}`}
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'journal' | 'studio' | 'detail' | 'curation'>('dashboard');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNightMode, setIsNightMode] = useState(false);
  const [savedBlogIds, setSavedBlogIds] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const blogsPerPage = 4;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const saved = localStorage.getItem("savedBlogs");
    if (saved) {
      setSavedBlogIds(JSON.parse(saved));
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedBlogIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem("savedBlogs", JSON.stringify(next));
      return next;
    });
  };

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

  const curatedBlogs = blogs?.filter((blog: Blog) => 
    savedBlogIds.includes(blog.id) && (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const totalPages = Math.ceil((filteredBlogs?.length || 0) / blogsPerPage);
  const paginatedBlogs = filteredBlogs?.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-700 ${isNightMode ? 'bg-[#0a0a0a] dark' : 'bg-[#fdfdfd]'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-700 ${
        isNightMode 
          ? 'bg-[#0a0a0a]/80 border-white/5' 
          : 'bg-[#fdfdfd]/80 border-gray-100'
      }`}>
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
                  setUploadedImage(null);
                }}
                className={`text-xl font-serif font-bold tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                }`}
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
                        setUploadedImage(null);
                      } else if (item === 'Studio') {
                        setCurrentView('studio');
                        setIsCreateOpen(true);
                        setSelectedBlogId(null);
                        setIsProfileOpen(false);
                      } else if (item === 'Curation') {
                        setCurrentView('curation');
                        setSelectedBlogId(null);
                        setIsCreateOpen(false);
                        setIsProfileOpen(false);
                        setUploadedImage(null);
                      }
                    }}
                    className={`text-[10px] font-medium tracking-[0.3em] uppercase transition-colors ${
                      (item === 'Journal' && currentView === 'journal') ||
                      (item === 'Studio' && currentView === 'studio') ||
                      (item === 'Curation' && currentView === 'curation')
                        ? (isNightMode ? 'text-white border-b border-white pb-1' : 'text-[#1a1a1a] border-b border-[#1a1a1a] pb-1')
                        : (isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]')
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-8">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className={`p-2 rounded-full transition-all duration-500 hover:scale-110 ${
                  isNightMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                {isNightMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Search */}
              <div className="hidden md:block">
                <div className={`input-container ${isNightMode ? 'dark-mode' : ''}`}>
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
                  <PopoverContent className={`w-80 p-0 mr-4 mt-4 border-gray-100 shadow-2xl overflow-hidden ${isNightMode ? 'bg-[#0a0a0a] border-white/5 shadow-white/5' : 'bg-white'}`} align="end">
                    <AuthPanel
                      user={user}
                      login={login}
                      logout={logout}
                      isEditProfileOpen={isEditProfileOpen}
                      setIsEditProfileOpen={setIsEditProfileOpen}
                      isDesktop={isDesktop}
                      setUser={setUser}
                      isNightMode={isNightMode}
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
                      setUploadedImage(null);
                    } else if (item === 'Studio') {
                      setCurrentView('studio');
                      setIsCreateOpen(true);
                      setSelectedBlogId(null);
                    } else if (item === 'Curation') {
                      setCurrentView('curation');
                      setSelectedBlogId(null);
                      setIsCreateOpen(false);
                      setUploadedImage(null);
                    } else {
                      setCurrentView('dashboard');
                      setUploadedImage(null);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-xs font-medium tracking-[0.3em] uppercase transition-colors ${
                    (item === 'Journal' && currentView === 'journal') ||
                    (item === 'Studio' && currentView === 'studio') ||
                    (item === 'Curation' && currentView === 'curation')
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
      <main className={`flex-1 overflow-y-auto transition-colors duration-700 relative ${
        isNightMode ? 'bg-[#0a0a0a]' : 'bg-[#fdfdfd]'
      }`}>
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
                  setSelectedBlogId("11");
                  setCurrentView('detail');
                }}
                trendingBlogs={blogs?.slice(0, 2)}
                suggestedBlogs={blogs?.slice(2, 5)}
                onBlogClick={(id) => {
                  setSelectedBlogId(id);
                  setCurrentView('detail');
                }}
                isNightMode={isNightMode}
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
                <h1 className={`text-4xl md:text-5xl font-serif transition-colors ${
                  isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                }`}>Journal</h1>
              </div>

              {blogsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
                      isNightMode ? 'border-white' : 'border-gray-900'
                    }`}></div>
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
                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                              isNightMode ? 'opacity-80' : ''
                            }`}
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                              {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="text-[9px] tracking-widest uppercase text-gray-300">
                                {blog.category[0]}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSave(blog.id);
                                }}
                                className={`transition-colors ${savedBlogIds.includes(blog.id) ? 'text-blue-500' : 'text-gray-300 hover:text-[#1a1a1a]'}`}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${savedBlogIds.includes(blog.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>
                          <h3 className={`text-2xl font-serif transition-colors group-hover:italic leading-tight ${
                             isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                          }`}>
                            {blog.title}
                          </h3>
                          <p className={`text-sm line-clamp-2 leading-relaxed font-light transition-colors ${
                            isNightMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
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
                <div className={`mt-24 pt-12 border-t flex justify-between items-center transition-colors ${
                  isNightMode ? 'border-white/5' : 'border-gray-100'
                }`}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={`text-[9px] tracking-[0.3em] uppercase disabled:opacity-30 transition-colors ${
                      isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]'
                    }`}
                  >
                    PREVIOUS
                  </button>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gray-300">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={`text-[9px] tracking-[0.3em] uppercase disabled:opacity-30 transition-colors ${
                      isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]'
                    }`}
                  >
                    NEXT
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'curation' && (
            <motion.div
              key="curation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-6xl mx-auto px-6 py-16"
            >
              <div className="mb-20 text-center">
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-4">Your Library</h2>
                <h1 className={`text-4xl md:text-5xl font-serif transition-colors ${
                  isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                }`}>Curation</h1>
              </div>

              {curatedBlogs?.length === 0 ? (
                 <div className="text-center py-20">
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase">Your library is empty</p>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentView('journal')}
                    className="mt-4 text-[9px] tracking-widest uppercase"
                  >
                    Explore Journal
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                  {curatedBlogs?.map((blog: Blog) => (
                    <motion.div
                      key={blog.id}
                      layoutId={`curation-${blog.id}`}
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
                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                               isNightMode ? 'opacity-80' : ''
                            }`}
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                              {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="text-[9px] tracking-widest uppercase text-gray-300">
                                {blog.category[0]}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSave(blog.id);
                                }}
                                className="text-blue-500 transition-colors"
                              >
                                <Bookmark className="w-3.5 h-3.5 fill-current" />
                              </button>
                            </div>
                          </div>
                          <h3 className={`text-2xl font-serif transition-colors group-hover:italic leading-tight ${
                             isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                          }`}>
                            {blog.title}
                          </h3>
                          <p className={`text-sm line-clamp-2 leading-relaxed font-light transition-colors ${
                              isNightMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-2xl mx-auto px-6 py-20"
            >
               <div className="mb-16">
                  <h2 className={`text-5xl font-serif mb-4 tracking-tight transition-colors ${
                     isNightMode ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>Create New Entry</h2>
                  <p className={`text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 leading-relaxed ${isNightMode ? 'text-white' : 'text-black'}`}>
                    Share your insights with the FARE community.
                  </p>
               </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      title: formData.get("title") as string,
                      description: formData.get("description") as string,
                      content: formData.get("content") as string,
                      coverImage: uploadedImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
                      date: new Date().toISOString(),
                      category: (formData.get("category") as string).split(",").map(c => c.trim()),
                    };
                    createBlogMutation.mutate(data);
                    setUploadedImage(null);
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
                      className={`w-full px-0 py-3 bg-transparent border-b outline-none transition text-xl font-serif ${
                         isNightMode ? 'border-white/10 focus:border-white text-white bg-transparent' : 'border-gray-200 focus:border-[#1a1a1a] text-[#1a1a1a]'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Categories</label>
                      <input
                        name="category"
                        required
                        placeholder="e.g. Finance, Architecture"
                        className={`w-full px-0 py-3 bg-transparent border-b outline-none transition text-sm ${
                           isNightMode ? 'border-white/10 focus:border-white text-white bg-transparent' : 'border-gray-200 focus:border-[#1a1a1a] text-[#1a1a1a]'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Cover Image</label>
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setUploadedImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="cover-upload"
                        />
                        <label
                          htmlFor="cover-upload"
                          className={`flex items-center justify-between w-full px-0 py-3 bg-transparent border-b cursor-pointer transition ${
                             isNightMode ? 'border-white/10 group-hover:border-white' : 'border-gray-200 group-hover:border-[#1a1a1a]'
                          }`}
                        >
                          <span className={`text-[10px] tracking-widest uppercase ${isNightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {uploadedImage ? "Change Image" : "Upload File"}
                          </span>
                          <Upload className={`w-4 h-4 transition-colors ${isNightMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-400 group-hover:text-[#1a1a1a]'}`} />
                        </label>
                      </div>
                      {uploadedImage && (
                        <div className="mt-4 relative group aspect-[21/9] overflow-hidden rounded-lg border border-white/5">
                          <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setUploadedImage(null)}
                            className={`absolute top-2 right-2 p-1.5 backdrop-blur-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition shadow-sm ${
                               isNightMode ? 'bg-black/50 hover:bg-black' : 'bg-white/80 hover:bg-white'
                            }`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Summary</label>
                    <textarea
                      name="description"
                      required
                      rows={2}
                      placeholder="A brief overview of the content..."
                      className={`w-full px-0 py-3 bg-transparent border-b outline-none transition text-sm resize-none ${
                        isNightMode ? 'border-white/10 focus:border-white text-gray-300 bg-transparent' : 'border-gray-200 focus:border-[#1a1a1a] text-gray-600'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Content</label>
                    <textarea
                      name="content"
                      required
                      rows={12}
                      placeholder="Begin writing..."
                      className={`w-full px-4 py-4 rounded-lg outline-none transition text-base font-serif leading-relaxed ${
                         isNightMode ? 'bg-white/5 border-white/10 focus:bg-white/[0.08] focus:border-white text-white' : 'bg-gray-50 border-gray-100 focus:bg-white focus:border-[#1a1a1a] text-[#1a1a1a]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={createBlogMutation.isPending}
                    className={`w-full py-5 rounded-sm font-bold transition shadow-2xl flex items-center justify-center space-x-3 disabled:bg-gray-400 font-serif tracking-[0.2em] uppercase text-xs ${
                       isNightMode ? 'bg-white text-[#1a1a1a] hover:bg-gray-200' : 'bg-[#1a1a1a] text-white hover:bg-black'
                    }`}
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
                         <div className="flex items-center space-x-4">
                           <Button
                            variant="ghost"
                            onClick={() => toggleSave(selectedBlog.id)}
                            className={`${savedBlogIds.includes(selectedBlog.id) ? 'text-blue-500 hover:text-blue-400' : 'text-gray-400 hover:text-[#1a1a1a]'} transition-colors`}
                          >
                            <Bookmark className={`w-4 h-4 mr-2 ${savedBlogIds.includes(selectedBlog.id) ? 'fill-current' : ''}`} />
                            <span className="text-[9px] tracking-widest uppercase">{savedBlogIds.includes(selectedBlog.id) ? 'Saved' : 'Save'}</span>
                          </Button>
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

      {/* Minimal Footer */}
      <footer className={`py-12 px-8 border-t transition-colors duration-700 mt-20 ${
        isNightMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h3 className={`font-serif font-bold tracking-[0.4em] uppercase text-xs transition-colors ${
              isNightMode ? 'text-white' : 'text-[#1a1a1a]'
            }`}>FARE</h3>
            <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase italic">Est. 2026</p>
          </div>

          <nav className="flex items-center gap-12">
            {['Journal', 'Studio', 'Library', 'Privacy'].map((item) => (
              <button 
                key={item}
                className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors ${
                  isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]'
                }`}
                onClick={() => {
                  if (item === 'Journal') setCurrentView('journal');
                  if (item === 'Studio') setCurrentView('studio');
                  if (item === 'Library') setCurrentView('curation');
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className={`text-[8px] tracking-[0.3em] uppercase transition-colors ${
            isNightMode ? 'text-gray-700' : 'text-gray-300'
          }`}>
            © FARE — CURATING THE FUTURE
          </div>
        </div>
      </footer>
    </div>
  );
}
