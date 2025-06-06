
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#7E69AB] to-[#9b87f5] text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Tenaladam</h3>
            <p className="text-white/80 text-sm">
              Bridging the knowledge gap between modern and traditional medicine for informed health decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modern-medicines" className="text-white/80 hover:text-white">
                  Modern Medicines
                </Link>
              </li>
              <li>
                <Link to="/traditional-medicines" className="text-white/80 hover:text-white">
                  Traditional Medicines
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-white/80 hover:text-white">
                  Medicine Comparison
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  References
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p>© {new Date().getFullYear()} Tenaladam. All rights reserved.</p>
          <p className="mt-2">
            <strong>Disclaimer:</strong> This website is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
