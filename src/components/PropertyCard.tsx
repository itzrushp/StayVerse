
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../data/hotels';
import { MapPin, Star, Wifi, Users, Coffee } from 'lucide-react';

interface PropertyCardProps {
  hotel: Hotel;
  featured?: boolean;
}

const PropertyCard = ({ hotel, featured = false }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <div 
      className={`${featured ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''} 
        bg-white rounded-xl overflow-hidden shadow-sm border border-border 
        hover-card-animation group`}
    >
      <div className={`relative ${featured ? 'h-72' : 'h-52'} overflow-hidden`}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105
            lazy-image ${!imageLoaded ? 'loading' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Price tag */}
        <div className="absolute bottom-4 right-4 bg-primary text-white px-3 py-1 rounded-lg font-medium shadow-lg">
          {formatter.format(hotel.price)}
          <span className="text-xs block opacity-90">per night</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium ml-1">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="text-xs truncate">{hotel.address}</span>
        </div>
        
        <p className="text-sm text-foreground/90 mb-4">
          {truncate(hotel.description, featured ? 100 : 60)}
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center text-xs text-muted-foreground">
              {amenity === 'Free WiFi' ? (
                <Wifi className="w-3 h-3 mr-1" />
              ) : amenity === 'Restaurant' ? (
                <Coffee className="w-3 h-3 mr-1" />
              ) : (
                <Users className="w-3 h-3 mr-1" />
              )}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <Link 
          to={`/hotel/${hotel.id}`}
          className="block w-full text-center py-2 bg-primary/10 text-primary rounded-lg 
            hover:bg-primary/20 transition-colors text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
