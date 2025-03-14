
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import { City } from '../data/hotels';

interface SearchFormProps {
  className?: string;
  variant?: 'hero' | 'sidebar';
}

const SearchForm = ({ className = '', variant = 'hero' }: SearchFormProps) => {
  const navigate = useNavigate();
  const [city, setCity] = useState<City | ''>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (city) {
      searchParams.append('city', city);
    }
    
    if (checkIn) {
      searchParams.append('checkIn', checkIn);
    }
    
    if (checkOut) {
      searchParams.append('checkOut', checkOut);
    }
    
    if (guests) {
      searchParams.append('guests', guests);
    }
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div 
      className={`${className} ${
        variant === 'hero' 
          ? 'glass-card rounded-2xl p-6 md:p-8 w-full max-w-4xl mx-auto' 
          : 'bg-white rounded-lg p-4 border border-border'
      }`}
    >
      <form onSubmit={handleSearch}>
        <div className={`flex flex-col ${variant === 'hero' ? 'md:flex-row' : ''} gap-4`}>
          <div className={`relative ${variant === 'hero' ? 'md:w-1/3' : 'w-full'}`}>
            <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-1">
              Where
            </label>
            <div className="relative">
              <select
                id="city"
                className="search-input w-full appearance-none pr-10"
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                required
              >
                <option value="">Select destination</option>
                <option value={City.Mumbai}>{City.Mumbai}</option>
                <option value={City.Pune}>{City.Pune}</option>
                <option value={City.Nagpur}>{City.Nagpur}</option>
              </select>
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${variant === 'hero' ? 'md:w-2/3' : 'w-full'}`}>
            <div className="relative flex-1">
              <label htmlFor="check-in" className="block text-sm font-medium text-muted-foreground mb-1">
                Check In
              </label>
              <div className="relative">
                <input
                  id="check-in"
                  type="date"
                  className="search-input w-full"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="relative flex-1">
              <label htmlFor="check-out" className="block text-sm font-medium text-muted-foreground mb-1">
                Check Out
              </label>
              <div className="relative">
                <input
                  id="check-out"
                  type="date"
                  className="search-input w-full"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
            
            <div className="relative sm:w-24">
              <label htmlFor="guests" className="block text-sm font-medium text-muted-foreground mb-1">
                Guests
              </label>
              <div className="relative">
                <select
                  id="guests"
                  className="search-input w-full appearance-none pr-10"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-6 ${variant === 'hero' ? 'flex justify-center' : ''}`}>
          <button
            type="submit"
            className={`${
              variant === 'hero'
                ? 'flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200 font-medium'
                : 'w-full p-3 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-all'
            }`}
          >
            <Search className="h-4 w-4 mr-2" />
            Search Hotels
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
