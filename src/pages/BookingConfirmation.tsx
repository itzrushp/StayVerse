
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getHotelById, Hotel } from '../data/hotels';
import { CheckCircle, Calendar, MapPin, Users, Hotel as HotelIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: string;
  rooms: string;
  checkIn: string;
  checkOut: string;
  hotel: {
    id: string;
    name: string;
    city: string;
    image: string;
  };
  price: number;
  totalPrice: number;
  bookingDate: string;
}

const BookingConfirmation = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      // Get hotel data
      const fetchedHotel = getHotelById(id);
      if (fetchedHotel) {
        setHotel(fetchedHotel);
      }
      
      // Get last booking from localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const latestBooking = bookings.length > 0 ? 
        bookings[bookings.length - 1] : null;
      
      if (latestBooking && latestBooking.hotel.id === id) {
        setBooking(latestBooking);
      }
      
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-60 bg-gray-200 rounded-lg mb-6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!hotel || !booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Booking Information Not Found</h1>
            <p className="mb-6">We couldn't find your booking information. Please try again or contact customer support.</p>
            <Link to="/">
              <Button>Return to Homepage</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 rounded-lg p-6 flex items-center mb-8">
              <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">Booking Confirmed!</h1>
                <p className="text-green-700">
                  Your booking at {hotel.name} has been confirmed. A confirmation email has been sent to {booking.email}.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Booking ID</span>
                  <span className="font-medium">{booking.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Booking Date</span>
                  <span className="font-medium">{new Date(booking.bookingDate).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="text-sm">{hotel.address}, {hotel.city}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary w-4 h-4" />
                    <div>
                      <div className="text-xs text-muted-foreground">Check-in</div>
                      <div className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary w-4 h-4" />
                    <div>
                      <div className="text-xs text-muted-foreground">Check-out</div>
                      <div className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-primary w-4 h-4" />
                    <div>
                      <div className="text-xs text-muted-foreground">Guests</div>
                      <div className="font-medium">{booking.guests} guest{parseInt(booking.guests) > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <HotelIcon className="text-primary w-4 h-4" />
                  <div>
                    <div className="text-xs text-muted-foreground">Room</div>
                    <div className="font-medium">{booking.rooms} room{parseInt(booking.rooms) > 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Name</div>
                    <div>{booking.firstName} {booking.lastName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div>{booking.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div>{booking.phone}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Room Rate</span>
                    <span>₹{booking.price} x {
                      (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 
                      (1000 * 60 * 60 * 24)
                    } nights x {booking.rooms} room{parseInt(booking.rooms) > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹{booking.totalPrice - (booking.price * (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 
                      (1000 * 60 * 60 * 24) * parseInt(booking.rooms))}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border mt-2">
                    <span>Total Paid</span>
                    <span>₹{booking.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link to="/">
                <Button variant="outline">Return to Homepage</Button>
              </Link>
              <Button onClick={() => window.print()}>
                Print Booking
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
