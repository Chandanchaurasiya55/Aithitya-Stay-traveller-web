import React, { useState } from 'react';
import { 
  Users, Building2, Calendar, MapPin, Send, CheckCircle2, ChevronRight, ChevronLeft,
  Utensils, Car, Compass, Award, ShieldCheck, Headphones, Tag, Phone
} from 'lucide-react';

export default function CorporatePage({ onOpenEnquiry, postsList = [] }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const defaultCorporateDestinations = [
    { title: 'Jim Corbett', sub: 'Nature, Adventure & Relaxation', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80' },
    { title: 'Nainital', sub: 'Lakeside Meetings & Leisure', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
    { title: 'Bhimtal', sub: 'Peaceful & Productive', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    { title: 'Mussoorie', sub: 'The Queen of Hills', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Kausani', sub: 'Himalayan Views & Serenity', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
    { title: 'Ranikhet', sub: 'Colonial Charm & Calm', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80' },
  ];

  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || p.description || 'Corporate Retreat Venue',
    image: p.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  }));

  const corporateDestinations = [...dynamicPosts, ...defaultCorporateDestinations];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Corporate Hero Section with Form Overlay (Screenshot 3) */}
      <section className="relative bg-[#0F382C] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 min-h-[520px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80')` }}
        />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Corporate Info */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
              Corporate Tours & Retreats
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-xl">
              Reward your team with refreshing getaways in the lap of Himalayas. We handle everything you need for a perfect corporate experience.
            </p>

            {/* Highlights Icons Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C8933E]" />
                <span className="text-xs font-semibold">Team Building Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C8933E]" />
                <span className="text-xs font-semibold">Conference & Meetings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8933E]" />
                <span className="text-xs font-semibold">Comfortable Stay</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C8933E]" />
                <span className="text-xs font-semibold">Customizable Packages</span>
              </div>
            </div>
          </div>

          {/* Right Form Overlay (Screenshot 3 Box) */}
          <div className="lg:col-span-5 bg-stone-900/90 backdrop-blur-md rounded-2xl p-6 border border-emerald-800/60 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-stone-700 pb-2">
              Plan Your Corporate Tour
            </h3>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-base font-bold text-white">Enquiry Sent!</div>
                <p className="text-xs text-stone-300">Our corporate team will connect with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-400 focus:outline-none focus:border-[#C8933E]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-400 focus:outline-none focus:border-[#C8933E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-400 focus:outline-none focus:border-[#C8933E]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-400 focus:outline-none focus:border-[#C8933E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-300 focus:outline-none focus:border-[#C8933E]">
                    <option>No. of People</option>
                    <option>10 - 25 People</option>
                    <option>25 - 50 People</option>
                    <option>50 - 100+ People</option>
                  </select>

                  <select className="bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-300 focus:outline-none focus:border-[#C8933E]">
                    <option>Destination Preference</option>
                    <option>Jim Corbett</option>
                    <option>Nainital</option>
                    <option>Mussoorie</option>
                    <option>Rishikesh</option>
                  </select>
                </div>

                <div>
                  <input
                    type="date"
                    className="w-full bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-300 focus:outline-none focus:border-[#C8933E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Popular Corporate Destinations (Screenshot 3 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#0F382C]">
            Popular Corporate Destinations
          </h2>
          <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {corporateDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="relative h-60 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-stone-200"
              onClick={() => onOpenEnquiry(`Corporate Tour in ${dest.title}`)}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-xl font-bold">{dest.title}</h3>
                <p className="text-xs text-stone-300 mt-0.5">{dest.sub}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#C8933E] font-semibold mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Uttarakhand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Corporate Services (Screenshot 3 Grid) */}
      <section className="bg-[#FAF7F2] py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Our Corporate Services</h2>
            <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { title: 'Team Building Activities', desc: 'Fun-filled indoor & outdoor activities to build stronger teams.', icon: Users },
              { title: 'Conference & Meetings', desc: 'Well-equipped conference rooms & business facilities.', icon: Building2 },
              { title: 'Comfortable Stay', desc: 'Premium hotels & resorts for a relaxing stay.', icon: CheckCircle2 },
              { title: 'Food & Catering', desc: 'Delicious multi-cuisine food & customized menus.', icon: Utensils },
              { title: 'Transport & Transfers', desc: 'Safe & comfortable travel for your entire team.', icon: Car },
              { title: 'Customizable Packages', desc: 'Tailor-made itineraries as per your needs & budget.', icon: Compass },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0F382C] flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{srv.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter & CTA (Screenshot 3 Bottom) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F382C] rounded-2xl p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-white/20 w-full lg:w-auto">
            <div className="px-3">
              <div className="font-serif text-3xl font-bold text-[#C8933E]">500+</div>
              <div className="text-xs text-stone-300 font-medium mt-1">Corporate Groups Served</div>
            </div>
            <div className="px-3">
              <div className="font-serif text-3xl font-bold text-[#C8933E]">50+</div>
              <div className="text-xs text-stone-300 font-medium mt-1">Top Hotels & Resorts</div>
            </div>
            <div className="px-3">
              <div className="font-serif text-3xl font-bold text-[#C8933E]">100%</div>
              <div className="text-xs text-stone-300 font-medium mt-1">Customer Satisfaction</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
            <div className="text-center sm:text-right">
              <div className="font-serif text-lg font-bold">Looking for a Customized Corporate Package?</div>
              <p className="text-xs text-stone-300">Our travel experts are here to help you plan the perfect trip.</p>
            </div>
            <button
              onClick={() => onOpenEnquiry('Custom Corporate Package')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shrink-0 shadow-md transition-all"
            >
              Talk to Our Expert
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
