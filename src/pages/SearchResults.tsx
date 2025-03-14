
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import SearchForm from '../components/SearchForm';
import { City, Hotel, searchHotels } from '../data/hotels';
import { Sliders } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const cityParam = searchParams.get('city') as City | null;
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call with a slight delay for loading state
    setLoading(true);
    const timer = setTimeout(() => {
      const results = searchHotels('', cityParam || undefined);
      setHotels(results);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [cityParam]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="bg-primary/5 py-8">
          <div className="container mx-auto px-4">
            <SearchForm variant="sidebar" className="mb-6 md:mb-0" />
            
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                {cityParam ? `Hotels in ${cityParam}` : 'All Hotels'}
                {(checkInParam && checkOutParam) && (
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    ({checkInParam} - {checkOutParam})
                  </span>
                )}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {cityParam && (
                  <span className="bg-primary/10 text-primary text-sm rounded-full px-3 py-1">
                    {cityParam}
                  </span>
                )}
                
                {checkInParam && checkOutParam && (
                  <span className="bg-secondary text-secondary-foreground text-sm rounded-full px-3 py-1">
                    {checkInParam} to {checkOutParam}
                  </span>
                )}
                
                {guestsParam && (
                  <span className="bg-secondary text-secondary-foreground text-sm rounded-full px-3 py-1">
                    {guestsParam} {parseInt(guestsParam) === 1 ? 'Guest' : 'Guests'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters panel */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-border shadow-sm p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <button 
                    className="md:hidden text-muted-foreground"
                    onClick={toggleFilters}
                  >
                    <Sliders className="h-4 w-4" />
                  </button>
                </div>
                
                <div className={`${showFilters || 'hidden md:block'} space-y-6`}>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="range" className="w-full" min={1000} max={20000} step={1000} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹1,000</span>
                        <span>₹20,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Property Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Hotels</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Resorts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Apartments</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Star Rating</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">5 Stars</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">4 Stars</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">3 Stars</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Free WiFi</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Pool</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Spa</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary" />
                        <span className="ml-2 text-sm">Restaurant</span>
                      </label>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="flex-grow">
              {loading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border animate-pulse">
                      <div className="h-52 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : hotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {hotels.map((hotel) => (
                    <PropertyCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or explore our other destinations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
