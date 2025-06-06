
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NotificationBell from "../notification/NotificationBell";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Check if there's a "traditional" keyword in the search
      if (searchQuery.toLowerCase().includes("traditional")) {
        navigate(`/traditional-medicines?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate(`/modern-medicines?search=${encodeURIComponent(searchQuery.trim())}`);
      }
      setSearchOpen(false);
      setSearchQuery("");
    }
  };
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className='bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] shadow-sm relative'>
      <div className='absolute inset-0 opacity-10'>
        <img
          src='/uploads/56430253-b48d-4304-9ef5-2985d6c239e1.png'
          alt=''
          className='w-full h-full object-cover'
        />
      </div>

      <div className='container mx-auto px-4 py-4 relative'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='flex items-center space-x-2'>
            <div className='bg-white p-3 rounded-full hover:bg-opacity-90 transition-colors'>
              <img
                src='/uploads/56430253-b48d-4304-9ef5-2985d6c239e1.png'
                alt='Tenaladam Logo'
                className='h-12 w-auto'
              />
            </div>
            <span className='text-2xl font-bold text-white'>Tenaladam</span>
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            <Link
              to='/modern-medicines'
              className='text-white hover:text-white/80 font-medium transition-colors'
            >
              Modern Medicines
            </Link>
            <Link
              to='/traditional-medicines'
              className='text-white hover:text-white/80 font-medium transition-colors'
            >
              Traditional Medicines
            </Link>
            <Link
              to='/compare'
              className='text-white hover:text-white/80 font-medium transition-colors'
            >
              Compare
            </Link>
            <Link
              to='/reminders'
              className='text-white hover:text-white/80 font-medium transition-colors'
            >
              Reminders
            </Link>
            <Link
              to='/about'
              className='text-white hover:text-white/80 font-medium transition-colors'
            >
              About
            </Link>
          </div>

          <div className='flex items-center space-x-2'>
            {searchOpen ? (
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-8 pr-10 text-sm rounded-full bg-white/90 border-none"
                  autoFocus
                />
                <Search className="absolute left-2 h-4 w-4 text-gray-500" />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 h-9 w-9 text-gray-500"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:bg-white/10'
                onClick={() => setSearchOpen(true)}
              >
                <Search className='h-5 w-5' />
              </Button>
            )}
            
            <NotificationBell />
            
            <Link to="/profile">
              <Button
                variant='ghost'
                size='sm'
                className='text-white hover:bg-white/10 flex items-center gap-1'
              >
                <User className='h-4 w-4' />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
            
            <Button
              variant='ghost'
              size='sm'
              className='text-white hover:bg-white/10 flex items-center gap-1'
              onClick={handleSignOut}
            >
              <LogOut className='h-4 w-4' />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
