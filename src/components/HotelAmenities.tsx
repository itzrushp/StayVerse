
import { Wifi, Coffee, UsersRound, Car, Ticket, Trees, Tv, UtensilsCrossed, Wind, DumbbellIcon } from 'lucide-react';

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities = ({ amenities }: HotelAmenitiesProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Free WiFi':
        return <Wifi className="w-4 h-4" />;
      case 'Restaurant':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'Room Service':
        return <Coffee className="w-4 h-4" />;
      case 'Pool':
        return <UsersRound className="w-4 h-4" />;
      case 'Gym':
        return <DumbbellIcon className="w-4 h-4" />;
      case 'Spa':
        return <Wind className="w-4 h-4" />;
      case 'Parking':
        return <Car className="w-4 h-4" />;
      case 'TV':
        return <Tv className="w-4 h-4" />;
      case 'Garden':
        return <Trees className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            {getAmenityIcon(amenity)}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
