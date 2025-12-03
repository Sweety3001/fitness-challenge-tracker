import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-black/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          FitTrack
        </h2>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-white/90 hover:text-white transition font-medium">
            Features
          </a>
          <a href="#testimonials" className="text-white/90 hover:text-white transition font-medium">
            Testimonials
          </a>
          <a href="#cta" className="text-white/90 hover:text-white transition font-medium">
            Get Started
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login"
            className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition font-medium backdrop-blur-sm"
          >
            Login
          </Link>

          <Link to="/signup"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full shadow hover:shadow-md transition font-medium"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg absolute top-full left-0 w-full py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-white/90 hover:text-white transition font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-white/90 hover:text-white transition font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#cta" 
              className="text-white/90 hover:text-white transition font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
              <Link 
                to="/login"
                className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full shadow hover:shadow-md transition font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;