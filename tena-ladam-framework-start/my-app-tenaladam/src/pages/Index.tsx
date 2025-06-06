
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-[#7E69AB] via-[#9b87f5] to-[#D3E4FD] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/uploads/56430253-b48d-4304-9ef5-2985d6c239e1.png')] opacity-5" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Welcome to Tenaladam
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Your comprehensive platform for discovering and understanding both modern and traditional medical treatments. Make informed decisions about your health journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/modern-medicines">
                <Button className="bg-white text-medical-darkpurple hover:bg-white/90 text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#7E69AB] via-[#9b87f5] to-[#D3E4FD] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Explore Our Features</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Tenaladam offers a wealth of information and tools to help you understand both modern and traditional approaches to healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-darkpurple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.95-4.419 2.95A1 1 0 014 16V4zm2 0v10.586l3-2a1 1 0 011 0l3 2V4H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-darkpurple">Comprehensive Database</h3>
              <p className="text-gray-600">
                Access detailed information about modern pharmaceuticals and traditional remedies from around the world.
              </p>
            </div>

            <div className="bg-white/90 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-darkpurple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-darkpurple">Comparison Tools</h3>
              <p className="text-gray-600">
                Compare different treatments side by side to understand their benefits, risks, and evidence base.
              </p>
            </div>

            <div className="bg-white/90 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-darkpurple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-medical-darkpurple">Medication Reminders</h3>
              <p className="text-gray-600">
                Set up personalized reminders for your medicines and track your intake history over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#D3E4FD] to-[#E5DEFF] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-medical-darkpurple">Join Our Community</h2>
              <p className="text-gray-700 mb-6">
                Sign up to access personalized medicine reminders and save your favorite treatments for easy reference.
              </p>
              <Link to="/auth">
                <Button className="bg-medical-darkpurple hover:bg-medical-purple text-white px-8 py-2">
                  Create Your Account
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4 text-medical-darkpurple">What Our Users Say</h3>
                <div className="italic text-gray-600 mb-4">
                  "Tenaladam has helped me understand my options beyond conventional medicine. I now feel empowered to discuss alternatives with my doctor."
                </div>
                <div className="font-medium text-right">— Meseret T.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
