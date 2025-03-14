
export interface Hotel {
  id: string;
  name: string;
  city: City;
  address: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  images: string[];
  amenities: string[];
  featured?: boolean;
}

export enum City {
  Mumbai = "Mumbai",
  Pune = "Pune",
  Nagpur = "Nagpur"
}

export const hotels: Hotel[] = [
  {
    id: "m1",
    name: "The Taj Mahal Palace",
    city: City.Mumbai,
    address: "Apollo Bunder, Colaba, Mumbai",
    description: "Historic luxury hotel with stunning sea views and exceptional service.",
    price: 18500,
    rating: 4.8,
    ratingCount: 2145,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Room Service"],
    featured: true
  },
  {
    id: "m2",
    name: "The Oberoi Mumbai",
    city: City.Mumbai,
    address: "Nariman Point, Mumbai",
    description: "Contemporary luxury hotel with panoramic views of the Arabian Sea.",
    price: 16500,
    rating: 4.7,
    ratingCount: 1890,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1749&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"],
    featured: true
  },
  {
    id: "m3",
    name: "Trident Nariman Point",
    city: City.Mumbai,
    address: "Nariman Point, Mumbai",
    description: "Elegant hotel with stunning views of Marine Drive.",
    price: 12000,
    rating: 4.5,
    ratingCount: 1560,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
    ],
    amenities: ["Free WiFi", "Restaurant", "Gym", "Room Service"]
  },
  {
    id: "p1",
    name: "JW Marriott Pune",
    city: City.Pune,
    address: "Senapati Bapat Road, Pune",
    description: "Luxurious 5-star hotel with world-class amenities.",
    price: 12500,
    rating: 4.6,
    ratingCount: 1780,
    images: [
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"],
    featured: true
  },
  {
    id: "p2",
    name: "The Westin Pune",
    city: City.Pune,
    address: "Koregaon Park, Pune",
    description: "Elegant hotel with serene surroundings and premium amenities.",
    price: 11000,
    rating: 4.5,
    ratingCount: 1450,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Restaurant", "Gym", "Room Service"],
    featured: true
  },
  {
    id: "p3",
    name: "Novotel Pune",
    city: City.Pune,
    address: "Nagar Road, Pune",
    description: "Modern hotel with comfortable accommodations and convenient location.",
    price: 7500,
    rating: 4.3,
    ratingCount: 1230,
    images: [
      "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Restaurant", "Gym", "Room Service"]
  },
  {
    id: "n1",
    name: "Radisson Blu Nagpur",
    city: City.Nagpur,
    address: "Wardha Road, Nagpur",
    description: "Contemporary hotel offering comfortable stays with excellent service.",
    price: 8500,
    rating: 4.4,
    ratingCount: 980,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Restaurant", "Gym"],
    featured: true
  },
  {
    id: "n2",
    name: "Le Meridien Nagpur",
    city: City.Nagpur,
    address: "Airport Road, Nagpur",
    description: "Sophisticated hotel with premium amenities and elegant design.",
    price: 9500,
    rating: 4.5,
    ratingCount: 870,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"],
    featured: true
  },
  {
    id: "n3",
    name: "The Pride Hotel Nagpur",
    city: City.Nagpur,
    address: "IT Park, Nagpur",
    description: "Comfort and convenience in the heart of the city.",
    price: 6500,
    rating: 4.2,
    ratingCount: 750,
    images: [
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    amenities: ["Free WiFi", "Restaurant", "Gym", "Room Service"]
  }
];

export const getCityHotels = (city: City) => {
  return hotels.filter(hotel => hotel.city === city);
};

export const getFeaturedHotels = () => {
  return hotels.filter(hotel => hotel.featured);
};

export const getHotelById = (id: string) => {
  return hotels.find(hotel => hotel.id === id);
};

export const getAllCities = () => {
  return Object.values(City);
};

export const searchHotels = (query: string, city?: City) => {
  const lowercaseQuery = query.toLowerCase();
  return hotels.filter(hotel => {
    const matchesCity = city ? hotel.city === city : true;
    const matchesName = hotel.name.toLowerCase().includes(lowercaseQuery);
    const matchesDescription = hotel.description.toLowerCase().includes(lowercaseQuery);
    return matchesCity && (matchesName || matchesDescription);
  });
};
