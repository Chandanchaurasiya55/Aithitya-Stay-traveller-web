import React, { useState } from 'react';
import { 
  Hotel, MapPin, Star, Wifi, Waves, Utensils, Sparkles, Car, ShieldCheck, 
  Search, Filter, Calendar, Users, Headphones, Phone, MessageCircle 
} from 'lucide-react';

export default function HotelsPage({ onOpenEnquiry, hotelsList = [] }) {
  const [selectedDestination, setSelectedDestination] = useState('All');

  const defaultHotels = [
    {
      id: 1,
      name: 'Corbett Fun Resort',
      location: 'Jim Corbett, Uttarakhand',
      dest: 'Jim Corbett',
      rating: '4.8 (750 Reviews)',
      price: '5,499',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      tag: 'Luxury Jungle Resort',
      amenities: ['Pool', 'Restaurant', 'WiFi', 'Parking', 'Spa', 'Jungle View']
    },
    {
      id: 2,
      name: 'Nainital Lakeview Palace & Resort',
      location: 'Mall Road, Nainital',
      dest: 'Nainital',
      rating: '4.9 (520 Reviews)',
      price: '6,299',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      tag: 'Heritage Lake View',
      amenities: ['Lake View', 'Restaurant', 'WiFi', 'Heater', 'Room Service']
    },
    {
      id: 3,
      name: 'Mussoorie Hilltop Spa & Resort',
      location: 'Library Bazaar, Mussoorie',
      dest: 'Mussoorie',
      rating: '4.7 (410 Reviews)',
      price: '7,499',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      tag: 'Mountain Panorama',
      amenities: ['Spa', 'Infinity Pool', 'WiFi', 'Bonfire', 'Valley View']
    },
    {
      id: 4,
      name: 'Bhimtal Serenity Water Resort',
      location: 'Bhimtal Lake Side',
      dest: 'Bhimtal',
      rating: '4.8 (310 Reviews)',
      price: '4,999',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      tag: 'Lakeside Bliss',
      amenities: ['Boating', 'Restaurant', 'WiFi', 'Garden', 'Parking']
    },
    {
      id: 5,
      name: 'Rishikesh Ganga River Retreat',
      location: 'Tapovan, Rishikesh',
      dest: 'Rishikesh',
      rating: '4.9 (680 Reviews)',
      price: '5,999',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      tag: 'Wellness & Yoga',
      amenities: ['Yoga Deck', 'River View', 'Organic Dining', 'WiFi']
    },
    {
      id: 6,
      name: 'Auli Snow Peak Chalet & Lodge',
      location: 'Cliff Top, Auli',
      dest: 'Auli',
      rating: '4.8 (290 Reviews)',
      price: '8,999',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      tag: 'Snow & Ski Resort',
      amenities: ['Ski Equipment', 'Fireplace', 'Heated Rooms', 'Dining']
    }
  ];

  const hotels = (hotelsList && hotelsList.length > 0) ? hotelsList : defaultHotels;

  const filteredHotels = selectedDestination === 'All' 
    ? hotels 
    : hotels.filter(h => h.dest === selectedDestination || h.location?.includes(selectedDestination));

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F382C] text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[420px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-7xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hotel className="w-4 h-4" />
            <span>Handpicked Stays</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Luxury Hotels & Resorts <br /> in Uttarakhand
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto">
            Book verified stays with best price guarantee, breathtaking Himalayan views & 24x7 guest support.
          </p>
        </div>
      </section>

      {/* Floating Search & Filter Bar (Relative with negative top margin - NO clipping/cutoff) */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-stone-200 text-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                <select 
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Destinations</option>
                  <option value="Jim Corbett">Jim Corbett</option>
                  <option value="Nainital">Nainital</option>
                  <option value="Mussoorie">Mussoorie</option>
                  <option value="Bhimtal">Bhimtal</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Auli">Auli</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-in / Check-out</label>
                <input type="date" className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Users className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>2 Guests, 1 Room</option>
                  <option>4 Guests, 2 Rooms</option>
                  <option>Family Suite</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => onOpenEnquiry('Hotel Booking Inquiry')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors h-full"
            >
              <Search className="w-4 h-4" />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">VERIFIED PROPERTIES</span>
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Top Rated Stays</h2>
          </div>
          <span className="text-xs font-bold text-stone-500">{filteredHotels.length} Stays Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-60 overflow-hidden bg-stone-100">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md">
                    {hotel.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors">
                    {hotel.name}
                  </h3>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-600 pt-2">
                    {hotel.amenities.map((am, i) => (
                      <span key={i} className="bg-[#FAF7F2] border border-stone-200 px-2.5 py-1 rounded-md font-medium">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Starting from</span>
                  <div className="text-xl font-extrabold text-[#0F382C]">₹{hotel.price} <span className="text-xs font-normal text-stone-500">/Night</span></div>
                </div>
                <button
                  onClick={() => onOpenEnquiry(`Booking for ${hotel.name}`)}
                  className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Book Hotel
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Why Book Hotels Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Verified Stays</h4>
            <p className="text-xs text-stone-500">Every resort & hotel is physically verified by our team.</p>
          </div>
          <div className="space-y-2">
            <Sparkles className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Best Price Guarantee</h4>
            <p className="text-xs text-stone-500">Unbeatable rates with zero hidden booking charges.</p>
          </div>
          <div className="space-y-2">
            <Headphones className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">24x7 Assistance</h4>
            <p className="text-xs text-stone-500">On-ground support throughout your stay in Uttarakhand.</p>
          </div>
          <div className="space-y-2">
            <Car className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Free Pick & Drop</h4>
            <p className="text-xs text-stone-500">Complimentary transfer assistance on selected packages.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
