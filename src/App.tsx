import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy Pages for Performance
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CurationPage = lazy(() => import("./pages/CurationPage"));
const StudioDashboard = lazy(() => import("./pages/StudioDashboard"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-px w-24 bg-amber-500/30" />
      <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-20">Synchronizing</span>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="journal" element={<BlogList />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            
            {/* Studio Routes */}
            <Route path="studio">
              <Route index element={<StudioDashboard />} />
              <Route path="new" element={<CreateBlog />} />
              <Route path="edit/:id" element={<CreateBlog />} />
            </Route>

            <Route path="curation" element={<CurationPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
