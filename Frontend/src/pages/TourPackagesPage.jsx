import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, Search, Tag, ShieldCheck, Hotel, PhoneCall, 
  Sparkles, Compass, Utensils, Car, Flame, Heart, Award, Clock, Headphones, RefreshCw, MessageCircle
} from 'lucide-react';

export default function TourPackagesPage({ onOpenEnquiry, onSelectPackage, packagesList = [] }) {
  const [activeCategory, setActiveCategory] = useState('All Packages');
  const [searchDestination, setSearchDestination] = useState('');

  const categories = [
    { id: 'All Packages', label: 'All Packages', icon: Sparkles },
    { id: 'Family Tours', label: 'Family Tours', icon: Users },
    { id: 'Honeymoon', label: 'Honeymoon', icon: Heart },
    { id: 'Corporate Tours', label: 'Corporate Tours', icon: Tag },
    { id: 'Adventure', label: 'Adventure', icon: Compass },
    { id: 'Spiritual Tours', label: 'Spiritual Tours', icon: Award },
    { id: 'Student Groups', label: 'Student Groups', icon: Users },
  ];

  const defaultPackages = [
    {
      id: 1,
      title: 'Nainital - Bhimtal - Mukteshwar',
      subtitle: 'Lakes, Mountains & Peace',
      duration: '4N / 5D',
      category: 'Family Tours',
      price: '12,999',
      priceUnit: 'person',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      specs: ['Hotels', 'Meals', 'Sightseeing', 'Transport']
    },
    {
      id: 2,
      title: 'Jim Corbett Wildlife Tour',
      subtitle: 'Adventure in the Lap of Nature',
      duration: '3N / 4D',
      category: 'Adventure',
      price: '13,999',
      priceUnit: 'person',
      image: '/corbett_tiger.png',
      specs: ['Hotels', 'Meals', 'Safari', 'Transport']
    },
    {
      id: 3,
      title: 'Chardham Yatra Package',
      subtitle: 'Spiritual Journey to the Abode of Gods',
      duration: '5N / 6D',
      category: 'Spiritual Tours',
      price: '19,999',
      priceUnit: 'person',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      specs: ['Hotels', 'Meals', 'Darshan', 'Transport']
    }
  ];

  const packages = packagesList.length > 0 ? packagesList : defaultPackages;

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = activeCategory === 'All Packages' || pkg.category === activeCategory;
    const matchesSearch = !searchDestination || pkg.title.toLowerCase().includes(searchDestination.toLowerCase()) || pkg.subtitle.toLowerCase().includes(searchDestination.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F382C] text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[420px] flex flex-col justify-center">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')` }}
        />

        <div className="relative max-w-7xl mx-auto text-center space-y-4 z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Tour Packages
          </h1>
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Curated experiences for every kind of traveler
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[#C8933E]">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Tag className="w-4 h-4" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Hotel className="w-4 h-4" />
              <span>Verified Hotels</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Headphones className="w-4 h-4" />
              <span>24x7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Perfectly Floating Search Bar (Relative with negative top margin - NO clipping/cutoff) */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-stone-200 text-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            
            {/* Destination Input */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-stone-800 placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
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
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
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
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Users className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>2 Guests, 1 Room</option>
                  <option>4 Guests, 2 Rooms</option>
                  <option>6+ Group Tour</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setActiveCategory('All Packages')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors h-full"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

          </div>
        </div>
      </div>

      {/* Filter Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none justify-start lg:justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Package Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md border border-white/20">
                  {pkg.duration}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-1">
                    {pkg.subtitle}
                  </p>

                  {/* Specs Icons */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-stone-100 text-xs text-stone-600 font-medium">
                    {pkg.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Hotel className="w-3.5 h-3.5 text-[#0F382C]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA Button */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">From</span>
                    <div className="text-lg font-extrabold text-stone-900">
                      ₹{pkg.price} <span className="text-xs font-normal text-stone-500">/{pkg.priceUnit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm group-hover:shadow"
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Book With Atithya Stay? */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">
              Why Book With Atithya Stay?
            </h2>
            <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: 'Best Price Guarantee', desc: 'We ensure the best prices always', icon: Tag },
              { title: 'Verified Hotels', desc: 'Handpicked & quality assured stays', icon: ShieldCheck },
              { title: '24x7 Support', desc: 'We are here to help you anytime', icon: Headphones },
              { title: 'Customized Packages', desc: 'Tailor-made for your unique needs', icon: Compass },
              { title: 'Safe & Secure Booking', desc: '100% secure payment & data protection', icon: ShieldCheck },
              { title: 'Flexible Cancellation', desc: 'Easy cancellation on selected packages', icon: RefreshCw },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-4 rounded-xl text-center space-y-2 border border-transparent hover:border-stone-200 hover:bg-[#FAF7F2] transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0F382C] flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{feature.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-tight">{feature.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Help Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F382C] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Headphones className="w-7 h-7 text-[#C8933E]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold">Need Help Choosing a Package?</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                Our travel experts are here to help you plan the perfect trip.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Package Consultation')}
              className="border-2 border-[#C8933E] text-[#C8933E] hover:bg-[#C8933E] hover:text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              Talk to Our Expert
            </button>
            
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Or WhatsApp Us +91 9258677823</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
