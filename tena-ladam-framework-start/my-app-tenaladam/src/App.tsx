
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

import { checkAndPopulateMedicines } from "@/utils/seedMedicines";

// Lazy loaded pages
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const ModernMedicines = lazy(() => import("@/pages/ModernMedicines"));
const TraditionalMedicines = lazy(() => import("@/pages/TraditionalMedicines"));
const MedicineDetail = lazy(() => import("@/pages/MedicineDetail"));
const CompareMedicines = lazy(() => import("@/pages/CompareMedicines"));
const Reminders = lazy(() => import("@/pages/Reminders"));
const IntakeHistory = lazy(() => import("@/pages/IntakeHistory"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Auth = lazy(() => import("@/pages/Auth"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    const seedDatabase = async () => {
      try {
        await checkAndPopulateMedicines();
      } catch (error) {
        console.error("Failed to populate database:", error);
      }
    };

    seedDatabase();
  }, []);
  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/modern-medicines" element={<ModernMedicines />} />
            <Route path="/traditional-medicines" element={<TraditionalMedicines />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/compare" element={<CompareMedicines />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/intake-history" element={<IntakeHistory />} />
            {/* Add a redirect from /history to /intake-history */}
            <Route path="/history" element={<Navigate to="/intake-history" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <SonnerToaster position="top-right" />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
