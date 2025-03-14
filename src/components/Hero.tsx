
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80')" 
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 pt-24 pb-12 md:py-32">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4 animate-fade-in">
            Discover Your Perfect Stay
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Dream Hotel in <span className="text-gradient font-display">India</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
            Discover exceptional hotels in Mumbai, Pune, and Nagpur with our curated selection of premium accommodations.
          </p>
        </div>
        
        <div className="animate-fade-in-delayed">
          <SearchForm variant="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
