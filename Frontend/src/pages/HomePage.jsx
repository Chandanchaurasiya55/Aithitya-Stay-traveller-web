import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, Search, Star, ShieldCheck, Tag, Headphones, 
  Car, Hotel, Compass, Award, Phone, MessageCircle, ChevronRight, ChevronLeft,
  Sparkles, Camera, Utensils, Wifi, Waves, Trees, CheckCircle2
} from 'lucide-react';

export default function HomePage({ onOpenEnquiry, onSelectPackage, setActiveTab, featuredPackages = [] }) {
  const [activeResortImage, setActiveResortImage] = useState(0);

  const resortImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  ];

  // Destinations list
  const popularDestinations = [
    { 
      name: 'Jim Corbett', 
      tag: 'Wildlife Adventure', 
      img: '/corbett_tiger.png' 
    },
    { 
      name: 'Nainital', 
      tag: 'Lake Paradise', 
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' 
    },
    { 
      name: 'Bhimtal', 
      tag: 'Serene & Peaceful', 
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' 
    },
    { 
      name: 'Mukteshwar', 
      tag: 'Himalayan Views', 
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' 
    },
    { 
      name: 'Kainchi Dham', 
      tag: 'Spiritual Retreat', 
      img: '/kainchi_dham.png' 
    },
    { 
      name: 'Mussoorie', 
      tag: 'Queen of Hills', 
      img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80' 
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Exact Home Page Hero Section (Matching User Screenshot 100%) */}
      <section className="relative bg-stone-900 text-white min-h-[640px] flex flex-col justify-between px-4 sm:px-6 lg:px-8 pb-28 pt-10 overflow-visible">
        
        {/* Custom Generated Nainital Lake Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('/nainital_hero.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/30" />

        {/* Hero Main Content Area */}
        <div className="relative max-w-7xl mx-auto w-full my-auto pt-6 z-10 text-center sm:text-left">
          
          {/* Left Column Text & Action Buttons */}
          <div className="max-w-3xl space-y-4">
            
            {/* Gold Script Heading */}
            <div className="font-serif italic text-3xl sm:text-4xl text-[#C8933E] font-medium tracking-wide">
              Discover The Beauty of
            </div>

            {/* Giant Title */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none drop-shadow-md">
              Uttarakhand
            </h1>
            
            <div className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              with Atithya Stay
            </div>

            {/* Category Bullets */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-stone-100 pt-2">
              <span>Hotels</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Resorts</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Tour Packages</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Destination Weddings</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Corporate Tours</span>
            </div>

            {/* CTA Buttons (Screenshot Match) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenEnquiry('Hotel & Trip Booking')}
                className="bg-[#D49E35] hover:bg-[#B88628] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2.5 transition-all"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Now</span>
              </button>

              <a
                href="https://wa.me/919258677823"
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900/50 hover:bg-stone-900/80 text-white border border-white/30 backdrop-blur-md px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2.5 transition-all"
              >
                <MessageCircle className="w-4.5 h-4.5 text-emerald-400 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

        </div>

        {/* Floating Bottom Search Bar (Exact Screenshot Replica) */}
        <div className="absolute -bottom-10 left-4 right-4 max-w-6xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-stone-200 text-stone-800 z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            
            {/* Destination Input */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>Where are you going?</option>
                  <option>Nainital</option>
                  <option>Jim Corbett</option>
                  <option>Bhimtal</option>
                  <option>Mussoorie</option>
                  <option>Rishikesh</option>
                </select>
              </div>
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-in</label>
                <input
                  type="date"
                  className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-out</label>
                <input
                  type="date"
                  className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
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

            {/* Search Hotels Button */}
            <button
              onClick={() => setActiveTab('hotels')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors h-full"
            >
              <span>Search Hotels</span>
            </button>

          </div>
        </div>

      </section>

      {/* Spacer to prevent search bar overlap */}
      <div className="h-10" />

      {/* Popular Destinations (Exact Screenshot Cards & Images) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#C8933E] tracking-widest block">
              EXPLORE TOP PLACES
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">
              Popular Destinations
            </h2>
          </div>

          <button 
            onClick={() => setActiveTab('destinations')}
            className="text-xs font-bold text-stone-600 hover:text-[#0F382C] flex items-center gap-1 transition-colors"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Tall Cards Grid with Right Arrow Button */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-stone-200"
                onClick={() => setActiveTab('packages')}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-3 right-3 text-white space-y-0.5">
                  <div className="flex items-center gap-1 font-serif text-base font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                    <span>{dest.name}</span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium pl-4">{dest.tag}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Slider Right Arrow Button (Exact Screenshot Match) */}
          <button className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A261E] text-white items-center justify-center shadow-xl border border-emerald-800 hover:bg-[#061B15] transition-transform hover:scale-110 z-10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </section>

      {/* 5-Stats Icon Row (Exact Screenshot Match) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 md:divide-x divide-stone-200">
          
          <div className="p-2 space-y-2">
            <div className="w-12 h-12 rounded-xl bg-white text-[#C8933E] border border-stone-200 flex items-center justify-center mx-auto shadow-2xs">
              <Hotel className="w-6 h-6" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0F382C]">500+</div>
            <div className="text-xs font-bold text-stone-800">Hotels & Resorts</div>
            <div className="text-[11px] text-stone-500">Across Uttarakhand</div>
          </div>

          <div className="p-2 space-y-2 pt-4 sm:pt-2">
            <div className="w-12 h-12 rounded-xl bg-white text-[#C8933E] border border-stone-200 flex items-center justify-center mx-auto shadow-2xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0F382C]">25+</div>
            <div className="text-xs font-bold text-stone-800">Top Destinations</div>
            <div className="text-[11px] text-stone-500">To Explore</div>
          </div>

          <div className="p-2 space-y-2 pt-4 md:pt-2">
            <div className="w-12 h-12 rounded-xl bg-white text-[#C8933E] border border-stone-200 flex items-center justify-center mx-auto shadow-2xs">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0F382C]">10K+</div>
            <div className="text-xs font-bold text-stone-800">Happy Travelers</div>
            <div className="text-[11px] text-stone-500">Every Year</div>
          </div>

          <div className="p-2 space-y-2 pt-4 md:pt-2">
            <div className="w-12 h-12 rounded-xl bg-white text-[#C8933E] border border-stone-200 flex items-center justify-center mx-auto shadow-2xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0F382C]">24x7</div>
            <div className="text-xs font-bold text-stone-800">Customer Support</div>
            <div className="text-[11px] text-stone-500">Always With You</div>
          </div>

          <div className="p-2 space-y-2 pt-4 lg:pt-2 col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-white text-[#C8933E] border border-stone-200 flex items-center justify-center mx-auto shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0F382C]">100%</div>
            <div className="text-xs font-bold text-stone-800">Secure & Safe</div>
            <div className="text-[11px] text-stone-500">Booking</div>
          </div>

        </div>
      </section>

      {/* Featured Tour Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#C8933E] tracking-wider">POPULAR PACKAGES</span>
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Featured Packages</h2>
          </div>
          <button 
            onClick={() => setActiveTab('packages')}
            className="text-xs font-bold text-stone-600 hover:text-[#0F382C] flex items-center gap-1"
          >
            <span>View All Packages</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              <div>
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase`}>
                    {pkg.badge}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{pkg.duration}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors">
                    {pkg.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-600">
                    {pkg.specs.map((sp, i) => (
                      <span key={i} className="bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/60 font-medium">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Starting</span>
                  <div className="text-lg font-extrabold text-stone-900">₹{pkg.price} <span className="text-xs font-normal text-stone-500">/Person</span></div>
                </div>
                <button
                  onClick={() => onOpenEnquiry(pkg.title)}
                  className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Corbett Fun Resort Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-lg">
            <img
              src={resortImages[activeResortImage]}
              alt="Corbett Fun Resort"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                onClick={() => setActiveResortImage((prev) => (prev > 0 ? prev - 1 : resortImages.length - 1))}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveResortImage((prev) => (prev < resortImages.length - 1 ? prev + 1 : 0))}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">Luxury Stays</span>
            
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl font-bold text-[#0F382C]">Corbett Fun Resort</h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-stone-700 ml-1">4.8 (750 Reviews)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Experience luxury amidst the wilderness, premium rooms, delicious cuisine, and world-class hospitality in the heart of Jim Corbett National Park.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Waves className="w-4 h-4 text-[#0F382C]" />
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Utensils className="w-4 h-4 text-[#0F382C]" />
                <span>Restaurant</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Wifi className="w-4 h-4 text-[#0F382C]" />
                <span>Free WiFi</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Prices start from</span>
                <div className="text-2xl font-bold text-[#0F382C]">₹5,499 <span className="text-xs font-normal text-stone-500">/Night</span></div>
              </div>

              <button
                onClick={() => onOpenEnquiry('Corbett Fun Resort Booking')}
                className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
              >
                Book Hotel
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Ready For Your Next Adventure? Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F382C] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready For Your Next Adventure?</h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">Let's explore the beauty of Uttarakhand together.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Next Adventure Booking')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Book Now
            </button>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919258677823"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
