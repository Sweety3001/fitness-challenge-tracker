const Footer = () => {
  return (
    <footer className="py-8 text-center bg-gradient-to-r from-purple-900 to-indigo-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent inline-block">
              FitTrack
            </h2>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">Testimonials</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          
          <div className="text-sm">
            <p>© {new Date().getFullYear()} FitTrack — All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-purple-800/50 text-sm">
          <p className="max-w-3xl mx-auto">
            FitTrack is dedicated to helping you achieve your fitness goals through innovative tracking technology and community support.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;