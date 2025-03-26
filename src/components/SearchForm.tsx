import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Search, Users } from 'lucide-react';
import { City } from '../data/hotels';

interface SearchFormProps {
  className?: string;
  variant?: 'hero' | 'sidebar';
  onSearch?: (searchParams: URLSearchParams) => void;
  initialCity?: City;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  className = '',
  variant = 'hero',
  onSearch,
  initialCity = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = '2',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [city, setCity] = useState<City | ''>(initialCity);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const checkInParam = params.get('checkIn');
    const checkOutParam = params.get('checkOut');
    const guestsParam = params.get('guests');

    if (cityParam && Object.values(City).includes(cityParam as City)) {
      setCity(cityParam as City);
    } else {
      setCity('');
    }

    if (checkInParam && isValidDate(checkInParam)) {
      setCheckIn(checkInParam);
    } else {
      setCheckIn('');
    }

    if (checkOutParam && isValidDate(checkOutParam)) {
      setCheckOut(checkOutParam);
    } else {
      setCheckOut('');
    }

    if (guestsParam) setGuests(guestsParam);
  }, [location.search]);

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    if (isValidDate(newCheckIn)) {
      setCheckIn(newCheckIn);
      if (newCheckIn > checkOut) {
        setCheckOut('');
      }
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    if (isValidDate(newCheckOut) && newCheckOut >= checkIn) {
      setCheckOut(newCheckOut);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city || !checkIn || !checkOut) {
      alert('Please fill in all required fields.');
      return;
    }

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
    
    if (onSearch) {
      onSearch(searchParams);
    } else {
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div 
      className={`
        ${className}
        ${variant === 'hero' 
          ? 'glass-card rounded-2xl p-6 md:p-8 w-full max-w-4xl mx-auto shadow-lg'
          : 'bg-white rounded-lg p-4 border border-border shadow-sm'}
      `}
    >
      <form onSubmit={handleSearch}>
        <div className={`grid grid-cols-1 ${variant === 'hero' ? 'md:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
          <div className="col-span-1">
            <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-1">
              Where
            </label>
            <div className="relative">
              <select
                id="city"
                className="search-input w-full appearance-none pr-10 py-2 px-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                value={city}
                onChange={(e) => {
                  const selectedCity = e.target.value as City;
                  if (Object.values(City).includes(selectedCity)) {
                    setCity(selectedCity);
                  } else {
                    setCity('');
                  }
                }}
                required
              >
                <option value="">Select destination</option>
                {Object.values(City).map((cityOption) => (
                  <option key={cityOption} value={cityOption}>
                    {cityOption}
                  </option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
          
          <div className={`col-span-1 ${variant === 'hero' ? 'md:col-span-2' : 'sm:col-span-1'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label htmlFor="check-in" className="block text-sm font-medium text-muted-foreground mb-1">
                  Check In
                </label>
                <div className="relative">
                  <input
                    id="check-in"
                    type="date"
                    className="search-input w-full py-2 px-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer" // Added cursor-pointer
                    value={checkIn}
                    onChange={handleCheckInChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    onClick={(e) => e.currentTarget.showPicker()} // Added onClick to show the date picker
                  />
                  <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer" onClick={(e) => e.currentTarget.previousElementSibling?.dispatchEvent(new Event('click', { bubbles: true }))} />
                </div>
              </div>
              
              <div className="col-span-1">
                <label htmlFor="check-out" className="block text-sm font-medium text-muted-foreground mb-1">
                  Check Out
                </label>
                <div className="relative">
                  <input
                    id="check-out"
                    type="date"
                    className="search-input w-full py-2 px-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer" // Added cursor-pointer
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    required
                    onClick={(e) => e.currentTarget.showPicker()} // Added onClick to show the date picker
                  />
                  <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer" onClick={(e) => e.currentTarget.previousElementSibling?.dispatchEvent(new Event('click', { bubbles: true }))} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="guests" className="block text-sm font-medium text-muted-foreground mb-1">
              Guests
            </label>
            <div className="relative">
              <select
                id="guests"
                className="search-input w-full appearance-none pr-10 py-2 px-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className={`mt-6 ${variant === 'hero' ? 'flex justify-center' : 'flex justify-end'}`}>
          <button
            type="submit"
            className={`
              ${variant === 'hero'
                ? 'flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200 font-medium w-full md:w-auto'
                : 'w-full p-3 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-all'}
            `}
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
