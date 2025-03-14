
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { City } from '../data/hotels';
import { MapPin } from 'lucide-react';

interface CityHighlightProps {
  city: City;
  image: string;
  hotelCount: number;
}

const CityHighlight = ({ city, image, hotelCount }: CityHighlightProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleClick = () => {
    navigate(`/search?city=${city}`);
  };
  
  const getDescriptionForCity = (city: City): string => {
    switch (city) {
      case City.Mumbai:
        return "Experience luxury stays in the city that never sleeps";
      case City.Pune:
        return "Discover comfortable accommodations in the cultural capital";
      case City.Nagpur:
        return "Find serene stays in the heart of India";
      default:
        return "";
    }
  };

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-sm cursor-pointer 
        hover-card-animation group"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      <img
        src={image}
        alt={city}
        className={`w-full h-full object-cover aspect-[4/3] 
          lazy-image ${!imageLoaded ? 'loading' : ''}`}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="flex items-center text-white mb-2">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span className="text-sm">{city}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {city}
        </h3>
        <p className="text-sm text-white/80 mb-2">
          {getDescriptionForCity(city)}
        </p>
        <div className="text-xs inline-block py-1 px-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
          {hotelCount} properties
        </div>
      </div>
    </div>
  );
};

export default CityHighlight;
