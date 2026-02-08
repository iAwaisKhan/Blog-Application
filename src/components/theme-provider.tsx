import React, { createContext, useContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";

type ThemeContextType = {
  isNightMode: boolean;
  setIsNightMode: (val: boolean) => void;
  toggleNightMode: () => void;
  user: any;
  setUser: (user: any) => void;
  savedBlogIds: string[];
  toggleSave: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (val: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (val: boolean) => void;
  login: () => void;
  logout: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [savedBlogIds, setSavedBlogIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const saved = localStorage.getItem("savedBlogs");
    if (saved) setSavedBlogIds(JSON.parse(saved));
  }, []);

  const toggleNightMode = () => setIsNightMode(prev => !prev);

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

  return (
    <ThemeContext.Provider value={{ 
      isNightMode, 
      setIsNightMode,
      toggleNightMode, 
      user, 
      setUser, 
      savedBlogIds, 
      toggleSave,
      searchQuery,
      setSearchQuery,
      isProfileOpen,
      setIsProfileOpen,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isEditProfileOpen,
      setIsEditProfileOpen,
      login,
      logout
    }}>
      <div className={isNightMode ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
