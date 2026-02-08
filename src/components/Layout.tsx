import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "./theme-provider";

export default function Layout() {
  const { isNightMode } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-700 ${isNightMode ? "bg-[#0a0a0a] dark" : "bg-[#fdfdfd]"}`}>
      <Header />
      <main className={`flex-1 overflow-y-auto transition-colors duration-1000 relative custom-scrollbar ${isNightMode ? "bg-[#0a0a0a]" : "bg-[#fdfdfd]"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
