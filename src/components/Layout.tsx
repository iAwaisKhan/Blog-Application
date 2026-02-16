import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "./theme-provider";
import { Background01 } from "./ui/backgrounds/Background01";
import SmoothScroll from "./SmoothScroll";

export default function Layout() {
  const { isNightMode } = useTheme();

  return (
    <SmoothScroll>
      <div className={`flex flex-col min-h-screen transition-colors duration-700 ${isNightMode ? "bg-[#0a0a0a] dark" : "bg-[#fdfdfd]"}`}>
        <Background01 />
        <Header />
        <main className={`flex-1 transition-colors duration-1000 relative ${isNightMode ? "bg-[#0a0a0a]" : "bg-[#fdfdfd]"}`}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
