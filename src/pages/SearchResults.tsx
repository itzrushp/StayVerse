
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import SearchForm from '../components/SearchForm';
import { City, Hotel, searchHotels } from '../data/hotels';
import { Sliders, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define filter state interface
interface FilterState {
  priceRange: number[];
  propertyTypes: string[];
  starRatings: number[];
  amenities: string[];
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [1000, 20000],
    propertyTypes: [],
    starRatings: [],
    amenities: []
  });
  
  // Track if filters are active
  const [filtersActive, setFiltersActive] = useState(false);
  
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
      setFilteredHotels(results);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [cityParam]);
  
  // Apply filters whenever filter state changes
  useEffect(() => {
    if (hotels.length === 0) return;
    
    const filtered = hotels.filter(hotel => {
      // Price filter
      const priceInRange = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
      
      // Property type filter - simplified for demo
      const matchesPropertyType = filters.propertyTypes.length === 0 || 
        (filters.propertyTypes.includes('Hotels') && hotel.name.includes('Hotel')) ||
        (filters.propertyTypes.includes('Resorts') && hotel.name.includes('Resort')) ||
        (filters.propertyTypes.includes('Apartments') && hotel.name.includes('Apartment'));
      
      // Star rating filter
      const matchesStarRating = filters.starRatings.length === 0 || 
        filters.starRatings.some(rating => {
          if (rating === 5) return hotel.rating >= 4.7;
          if (rating === 4) return hotel.rating >= 4.3 && hotel.rating < 4.7;
          if (rating === 3) return hotel.rating >= 4.0 && hotel.rating < 4.3;
          return false;
        });
      
      // Amenities filter
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return priceInRange && matchesPropertyType && matchesStarRating && matchesAmenities;
    });
    
    setFilteredHotels(filtered);
    
    // Check if any filters are active
    const hasActiveFilters = 
      (filters.priceRange[0] !== 1000 || filters.priceRange[1] !== 20000) ||
      filters.propertyTypes.length > 0 ||
      filters.starRatings.length > 0 ||
      filters.amenities.length > 0;
    
    setFiltersActive(hasActiveFilters);
    
  }, [filters, hotels]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };
  
  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: checked 
        ? [...prev.propertyTypes, type] 
        : prev.propertyTypes.filter(t => t !== type)
    }));
  };
  
  const handleStarRatingChange = (rating: number, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      starRatings: checked 
        ? [...prev.starRatings, rating] 
        : prev.starRatings.filter(r => r !== rating)
    }));
  };
  
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity] 
        : prev.amenities.filter(a => a !== amenity)
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      priceRange: [1000, 20000],
      propertyTypes: [],
      starRatings: [],
      amenities: []
    });
    setFiltersActive(false);
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
                
                {filtersActive && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 h-7 text-xs"
                    onClick={resetFilters}
                  >
                    Clear Filters
                    <X className="ml-1 h-3 w-3" />
                  </Button>
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
                        <input 
                          type="range" 
                          className="w-full" 
                          min={1000} 
                          max={20000} 
                          step={1000} 
                          value={filters.priceRange[1]}
                          onChange={handlePriceRangeChange}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹{filters.priceRange[0].toLocaleString()}</span>
                        <span>₹{filters.priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Property Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.propertyTypes.includes('Hotels')} 
                          onCheckedChange={(checked) => handlePropertyTypeChange('Hotels', checked as boolean)} 
                        />
                        <span className="text-sm">Hotels</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.propertyTypes.includes('Resorts')} 
                          onCheckedChange={(checked) => handlePropertyTypeChange('Resorts', checked as boolean)} 
                        />
                        <span className="text-sm">Resorts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.propertyTypes.includes('Apartments')} 
                          onCheckedChange={(checked) => handlePropertyTypeChange('Apartments', checked as boolean)} 
                        />
                        <span className="text-sm">Apartments</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Star Rating</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.starRatings.includes(5)} 
                          onCheckedChange={(checked) => handleStarRatingChange(5, checked as boolean)} 
                        />
                        <span className="text-sm">5 Stars</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.starRatings.includes(4)} 
                          onCheckedChange={(checked) => handleStarRatingChange(4, checked as boolean)} 
                        />
                        <span className="text-sm">4 Stars</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.starRatings.includes(3)} 
                          onCheckedChange={(checked) => handleStarRatingChange(3, checked as boolean)} 
                        />
                        <span className="text-sm">3 Stars</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.amenities.includes('Free WiFi')} 
                          onCheckedChange={(checked) => handleAmenityChange('Free WiFi', checked as boolean)} 
                        />
                        <span className="text-sm">Free WiFi</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.amenities.includes('Pool')} 
                          onCheckedChange={(checked) => handleAmenityChange('Pool', checked as boolean)} 
                        />
                        <span className="text-sm">Pool</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.amenities.includes('Spa')} 
                          onCheckedChange={(checked) => handleAmenityChange('Spa', checked as boolean)} 
                        />
                        <span className="text-sm">Spa</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.amenities.includes('Restaurant')} 
                          onCheckedChange={(checked) => handleAmenityChange('Restaurant', checked as boolean)} 
                        />
                        <span className="text-sm">Restaurant</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
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
              ) : filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredHotels.map((hotel) => (
                    <PropertyCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or explore our other destinations.
                  </p>
                  {filtersActive && (
                    <Button 
                      onClick={resetFilters}
                      className="mt-4"
                      variant="outline"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}
              
              {/* Results summary */}
              {!loading && filteredHotels.length > 0 && (
                <div className="mt-6 text-sm text-muted-foreground">
                  Showing {filteredHotels.length} of {hotels.length} hotels
                  {filtersActive && (
                    <span> with active filters</span>
                  )}
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
