
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-xl md:text-2xl font-bold text-primary">CozyCityStays</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link 
                to="/search?city=Mumbai" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Mumbai
              </Link>
              <Link 
                to="/search?city=Pune" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Pune
              </Link>
              <Link 
                to="/search?city=Nagpur" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Nagpur
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-primary hover:underline transition-all">
                Sign In
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                Register
              </button>
            </div>
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-slide-up overflow-hidden">
          <div className="px-4 py-4 space-y-4 bg-white shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search?city=Mumbai" 
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mumbai
              </Link>
              <Link 
                to="/search?city=Pune" 
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pune
              </Link>
              <Link 
                to="/search?city=Nagpur" 
                className="text-sm font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nagpur
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <button className="px-4 py-2 text-sm font-medium text-primary hover:underline w-full text-left">
                Sign In
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 w-full text-left">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
