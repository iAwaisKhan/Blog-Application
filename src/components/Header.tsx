import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AuthPanel from "./AuthPanel";
import { useTheme } from "./theme-provider";
import { useMediaQuery } from "../hooks/use-media-query";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Re-fetch context to trigger re-evaluation
  const theme = useTheme();
  const {
    isNightMode,
    setIsNightMode,
    searchQuery,
    setSearchQuery,
    isProfileOpen,
    setIsProfileOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    user,
    login,
    logout,
    isEditProfileOpen,
    setIsEditProfileOpen,
    setUser
  } = theme;

  const navItems = [
    { label: 'Journal', path: '/journal' },
    { label: 'Curation', path: '/curation' },
    { label: 'Studio', path: '/studio' }
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-700 ${
      isNightMode 
        ? 'bg-[#0a0a0a]/80 border-white/5' 
        : 'bg-[#fdfdfd]/80 border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link
              to="/dashboard"
              className={`text-2xl font-serif font-bold tracking-[0.3em] uppercase cursor-pointer transition-all duration-700 hover:tracking-[0.5em] relative group ${
                isNightMode ? 'text-white' : 'text-[#1a1a1a]'
              }`}
            >
              Fare.
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-700 group-hover:w-full" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  to={item.path}
                  className={`text-editorial-cap transition-all duration-500 relative group overflow-hidden ${
                    location.pathname === item.path
                      ? 'text-blue-500'
                      : isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-full block">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 block italic font-serif lowercase tracking-normal">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className={`p-2 rounded-full transition-all duration-500 hover:scale-110 ${
                isNightMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden md:block">
              <div className={`input-container ${isNightMode ? 'dark-mode' : ''}`}>
                <input
                  placeholder=" "
                  className="input-field focus:outline-none focus:ring-0"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value && location.pathname !== '/journal') {
                      navigate('/journal');
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
                onOpenChange={setIsProfileOpen}
              >
                <PopoverTrigger asChild>
                  <button className="flex items-center space-x-3 group outline-none">
                    <span className="hidden sm:inline text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-[#1a1a1a] transition-colors">
                      {user ? 'Profile' : 'Sign In'}
                    </span>
                    {user ? (
                      <Avatar className="w-8 h-8 filter grayscale hover:grayscale-0 transition-all border border-transparent group-hover:border-gray-200">
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

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden transition-colors ${isNightMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]'}`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t animate-in slide-in-from-top duration-300 ${
          isNightMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-100'
        }`}>
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left text-xs font-medium tracking-[0.3em] uppercase transition-colors ${
                  location.pathname === item.path ? (isNightMode ? 'text-white' : 'text-[#1a1a1a]') : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
