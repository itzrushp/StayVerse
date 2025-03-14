
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import CityHighlight from '../components/CityHighlight';
import { City, getFeaturedHotels, getCityHotels } from '../data/hotels';

const Index = () => {
  const featuredHotels = getFeaturedHotels();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Hotels Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm uppercase tracking-wider text-primary font-medium">
                Handpicked accommodations
              </span>
              <h2 className="text-3xl font-bold mt-2">Featured Hotels</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Discover our handpicked selection of premium hotels in Mumbai, Pune, and Nagpur, 
                perfect for leisure or business travel.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.map((hotel) => (
                <PropertyCard key={hotel.id} hotel={hotel} featured={true} />
              ))}
            </div>
          </div>
        </section>
        
        {/* City Highlights Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm uppercase tracking-wider text-primary font-medium">
                Explore cities
              </span>
              <h2 className="text-3xl font-bold mt-2">Our Top Destinations</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Explore exceptional hotels in these popular Indian cities, featuring 
                premium accommodations for your perfect stay.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CityHighlight 
                city={City.Mumbai} 
                image="https://images.unsplash.com/photo-1590077428593-a55bb07c4665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80" 
                hotelCount={getCityHotels(City.Mumbai).length} 
              />
              <CityHighlight 
                city={City.Pune} 
                image="https://images.unsplash.com/photo-1612814225802-a1bba7edb7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80" 
                hotelCount={getCityHotels(City.Pune).length} 
              />
              <CityHighlight 
                city={City.Nagpur} 
                image="https://images.unsplash.com/photo-1599930113854-d6d7fd522568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80" 
                hotelCount={getCityHotels(City.Nagpur).length} 
              />
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm uppercase tracking-wider text-primary font-medium">
                Why choose us
              </span>
              <h2 className="text-3xl font-bold mt-2">Benefits of Booking With Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-secondary/50 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Easy Booking</h3>
                <p className="text-muted-foreground">
                  Book your hotel room in minutes with our simple and intuitive booking process.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Your payment information is protected with industry-standard security measures.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our customer service team is available around the clock to assist you.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground mt-3">
                  Get exclusive deals and offers directly to your inbox.
                </p>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow search-input h-12"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors sm:flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
