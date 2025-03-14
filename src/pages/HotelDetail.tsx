
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getHotelById, Hotel } from '../data/hotels';
import { Calendar } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import HotelAmenities from '../components/HotelAmenities';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      // Simulate API call
      setLoading(true);
      const timer = setTimeout(() => {
        const fetchedHotel = getHotelById(id);
        
        if (fetchedHotel) {
          setHotel(fetchedHotel);
          setMainImage(fetchedHotel.images[0]);
        } else {
          // Hotel not found, redirect to search
          navigate('/search');
          toast({
            title: "Hotel not found",
            description: "The hotel you're looking for doesn't exist.",
            variant: "destructive"
          });
        }
        setLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id, navigate, toast]);
  
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-80 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!hotel) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Gallery Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 rounded-lg overflow-hidden h-80">
              <img 
                src={mainImage} 
                alt={hotel.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {hotel.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden cursor-pointer ${
                    mainImage === image ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image} 
                    alt={`${hotel.name} - ${index + 1}`} 
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hotel Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-6">
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <p className="text-muted-foreground mb-4">{hotel.address}, {hotel.city}</p>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">{hotel.rating}</span>/5
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({hotel.ratingCount} reviews)
                  </span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">About this hotel</h2>
                  <p className="text-foreground/90">{hotel.description}</p>
                </div>
                
                <HotelAmenities amenities={hotel.amenities} />
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map view of {hotel.address}, {hotel.city}</p>
                </div>
              </div>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold">₹{hotel.price}</span>
                    <span className="text-sm text-muted-foreground"> / night</span>
                  </div>
                  <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <span className="font-medium">{hotel.rating}</span>/5
                  </div>
                </div>
                
                <button 
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-4"
                  onClick={() => setShowBookingModal(true)}
                >
                  Reserve
                </button>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Free cancellation before check-in</span>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">₹{hotel.price} x 1 night</span>
                    <span className="text-sm">₹{hotel.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Service fee</span>
                    <span className="text-sm">₹{Math.round(hotel.price * 0.1)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-4 pt-4 border-t border-border">
                    <span>Total</span>
                    <span>₹{hotel.price + Math.round(hotel.price * 0.1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book your stay at {hotel.name}</DialogTitle>
            <DialogDescription>
              Fill in the details to complete your booking
            </DialogDescription>
          </DialogHeader>
          <BookingForm hotel={hotel} onSuccess={() => {
            setShowBookingModal(false);
            navigate(`/booking-confirmation/${hotel.id}`);
          }} />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;
