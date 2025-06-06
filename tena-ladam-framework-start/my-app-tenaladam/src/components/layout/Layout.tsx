
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout = ({ children, requireAuth = false }: LayoutProps) => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    if (requireAuth) {
      const checkAuth = async () => {
        try {
          const { data } = await supabase.auth.getSession();
          if (!data.session) {
            toast.error("Please log in to access this page");
            navigate("/auth");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          toast.error("Authentication error");
          navigate("/auth");
        } finally {
          setIsCheckingAuth(false);
        }
      };
      
      checkAuth();
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_OUT' && requireAuth) {
            toast.error("Please log in to access this page");
            navigate("/auth");
          }
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate, requireAuth]);
  
  if (isCheckingAuth && requireAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
