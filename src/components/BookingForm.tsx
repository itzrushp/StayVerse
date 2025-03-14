import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { format, differenceInDays, isWeekend, addDays } from 'date-fns';
import { CalendarIcon, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hotel } from '../data/hotels';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Holidays in 2024 (sample data)
const HOLIDAYS = [
  new Date('2024-01-26'), // Republic Day
  new Date('2024-08-15'), // Independence Day
  new Date('2024-10-02'), // Gandhi Jayanti
  new Date('2024-12-25'), // Christmas
];

// Function to check if a date is a holiday
const isHoliday = (date: Date) => {
  return HOLIDAYS.some(holiday => 
    holiday.getDate() === date.getDate() && 
    holiday.getMonth() === date.getMonth()
  );
};

// Room availability data (sample)
const ROOM_AVAILABILITY = {
  high: [0.8, 0.9, 1.0], // 80-100% occupancy
  medium: [0.5, 0.6, 0.7], // 50-70% occupancy
  low: [0.1, 0.2, 0.3, 0.4], // 10-40% occupancy
};

interface BookingFormProps {
  hotel: Hotel;
  onSuccess: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  guests: z.string().min(1, { message: "Number of guests is required" }),
  rooms: z.string().min(1, { message: "Number of rooms is required" }),
});

const BookingForm = ({ hotel, onSuccess }: BookingFormProps) => {
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date>(addDays(new Date(), 1));
  const [checkOut, setCheckOut] = useState<Date>(addDays(new Date(), 2));
  const [basePrice, setBasePrice] = useState(hotel.price);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rooms, setRooms] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  
  // Debug states to show pricing factors
  const [hasWeekendStay, setHasWeekendStay] = useState(false);
  const [hasHolidayStay, setHasHolidayStay] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState<'high' | 'medium' | 'low'>('medium');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      guests: "2",
      rooms: "1",
    },
  });

  // Calculate dynamic price based on factors
  useEffect(() => {
    let price = hotel.price;
    const nights = differenceInDays(checkOut, checkIn);
    
    // Generate an array of all dates in the stay
    const stayDates = Array.from({ length: nights }, (_, i) => addDays(checkIn, i));
    
    // Check if any date in the stay is a weekend
    const hasWeekend = stayDates.some(date => isWeekend(date));
    setHasWeekendStay(hasWeekend);
    
    // Check if any date in the stay is a holiday
    const hasHoliday = stayDates.some(date => isHoliday(date));
    setHasHolidayStay(hasHoliday);
    
    // Simulate random room availability
    const availabilityLevel = Object.keys(ROOM_AVAILABILITY)[Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low';
    setCurrentAvailability(availabilityLevel);
    const availabilityValues = ROOM_AVAILABILITY[availabilityLevel];
    const availability = availabilityValues[Math.floor(Math.random() * availabilityValues.length)];
    
    // Price adjustments
    if (hasWeekend) price *= 1.2; // 20% more expensive on weekends
    if (hasHoliday) price *= 1.5; // 50% more expensive on holidays
    
    console.log('Price calculation:', {
      basePrice: hotel.price,
      nights,
      hasWeekend,
      hasHoliday,
      availabilityLevel,
      finalPrice: price
    });
    
    // Round to nearest integer
    price = Math.round(price);
    setBasePrice(price);
    
    // Calculate total price based on nights and rooms
    const numRooms = parseInt(rooms);
    const roomsPrice = price * numRooms * nights;
    const serviceFee = Math.round(roomsPrice * 0.1);
    setTotalPrice(roomsPrice + serviceFee);
    
  }, [checkIn, checkOut, hotel.price, rooms]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call for booking
    setTimeout(() => {
      console.log("Booking submitted:", {
        ...data,
        checkIn,
        checkOut,
        hotel: hotel.id,
        totalPrice,
      });
      
      toast({
        title: "Booking successful!",
        description: "Your hotel has been booked successfully.",
      });
      
      // Save booking to localStorage for reference
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const newBooking = {
        id: Math.random().toString(36).substring(2, 9),
        ...data,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        hotel: {
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          image: hotel.images[0],
        },
        price: basePrice,
        totalPrice,
        bookingDate: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Dates</Label>
          <div className="flex gap-2 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : <span>Check-in date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => date && setCheckIn(date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : <span>Check-out date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={(date) => date && setCheckOut(date)}
                  disabled={(date) => date <= checkIn || date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setRooms(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Guest Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">
                ₹{basePrice} x {differenceInDays(checkOut, checkIn)} nights x {rooms} room{parseInt(rooms) > 1 ? 's' : ''}
              </span>
              <span className="text-sm">
                ₹{basePrice * differenceInDays(checkOut, checkIn) * parseInt(rooms)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Service fee</span>
              <span className="text-sm">₹{Math.round(basePrice * differenceInDays(checkOut, checkIn) * parseInt(rooms) * 0.1)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border mt-2">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <div className="bg-primary/5 p-3 rounded-lg mt-4 text-xs">
              <p className="font-medium mb-1">Dynamic pricing factors:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className={hasWeekendStay ? "font-semibold text-primary" : ""}>
                  Weekend stays: +20% on weekend days {hasWeekendStay && "✓"}
                </li>
                <li className={hasHolidayStay ? "font-semibold text-primary" : ""}>
                  Holiday stays: +50% on holidays {hasHolidayStay && "✓"}
                </li>
                <li className={currentAvailability === 'high' ? "font-semibold text-primary" : ""}>
                  High room demand: up to +30% {currentAvailability === 'high' && "✓"}
                </li>
                <li className={currentAvailability === 'low' ? "font-semibold text-primary" : ""}>
                  Low room demand: up to -10% {currentAvailability === 'low' && "✓"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Confirm Booking"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
