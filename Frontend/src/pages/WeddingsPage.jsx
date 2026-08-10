import React from 'react';
import { 
  Heart, Sparkles, Utensils, Music, Camera, Car, ShieldCheck, 
  MapPin, CheckCircle2, MessageCircle, Phone, Award, Users 
} from 'lucide-react';

export default function WeddingsPage({ onOpenEnquiry, postsList = [] }) {
  const defaultWeddingDestinations = [
    { title: 'Jim Corbett', sub: 'Wild Luxury & Nature', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
    { title: 'Nainital', sub: 'Lakeside Romance', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
    { title: 'Bhimtal', sub: 'Serene & Beautiful', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    { title: 'Mukteshwar', sub: 'Himalayan Views', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Kausani', sub: 'Panoramic Himalayas', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
    { title: 'Ranikhet', sub: 'Colonial Charm', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80' },
  ];

  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || p.description || 'Exclusive Venue',
    image: p.image || '/wedding_hero.png'
  }));

  const weddingDestinations = [...dynamicPosts, ...defaultWeddingDestinations];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Wedding Hero Section */}
      <section className="relative bg-stone-900 text-white min-h-[500px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 pb-20">
        {/* Background Wedding Mandap Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('/wedding_hero.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Heart className="w-4 h-4 fill-current" />
            <span>Destination Weddings</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Destination Weddings <br /> in Uttarakhand
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Stunning Locations. Perfect Planning. Unforgettable Memories. <br />
            We create magical weddings in the lap of Himalayas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnquiry('Destination Wedding Plan')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all"
            >
              Plan Your Dream Wedding
            </button>

            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0F382C] px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </section>

      {/* Feature Pills Bar Overlay (Relative block with negative margin - NO clipping/cutoff) */}
      <div className="relative -mt-12 sm:-mt-14 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F382C] text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-emerald-800">
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C8933E]" />
              <span>Venue Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#C8933E]" />
              <span>Catering</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C8933E]" />
              <span>Decoration</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#C8933E]" />
              <span>Entertainment</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#C8933E]" />
              <span>Photography</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#C8933E]" />
              <span>Guest Transport</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8933E]" />
              <span>Wedding Assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Best Wedding Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#0F382C]">
            Our Best Wedding Destinations
          </h2>
          <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-stone-200"
              onClick={() => onOpenEnquiry(`Wedding in ${dest.title}`)}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-xl font-bold">{dest.title}</h3>
                <p className="text-xs text-stone-300 mt-0.5">{dest.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* We Take Care Of Everything */}
      <section className="bg-[#FAF7F2] py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">We Take Care Of Everything</h2>
            <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { title: 'Venue Booking', desc: 'Premium resorts & hotels in the best locations', icon: Sparkles },
              { title: 'Catering & Beverages', desc: 'Delicious menus customized for your celebration', icon: Utensils },
              { title: 'Decor & Theme', desc: 'Beautiful setups tailored to your style', icon: Heart },
              { title: 'Entertainment', desc: 'DJ, Live music, artists & performances', icon: Music },
              { title: 'Photography', desc: 'Capture every moment beautifully', icon: Camera },
              { title: 'Guest Transport', desc: 'Comfortable transfers for your guests', icon: Car },
              { title: 'On-Ground Support', desc: 'Dedicated team for smooth wedding experience', icon: ShieldCheck },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0F382C] flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{item.title}</h4>
                  <p className="text-[10px] text-stone-500 leading-tight">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Let's Make Your Dream Wedding a Reality CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 bg-[#0F382C] text-white p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C8933E] flex items-center justify-center text-white font-bold">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-serif text-xl font-bold">Let's Make Your Dream Wedding a Reality</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              From planning to execution, we make your special day perfect in every way.
            </p>
            <button
              onClick={() => onOpenEnquiry('Dream Wedding Enquiry')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Enquire Now
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="font-serif text-2xl font-bold text-[#0F382C]">200+</div>
              <div className="text-[11px] text-stone-600 font-medium">Weddings Planned</div>
            </div>
            <div className="p-3">
              <div className="font-serif text-2xl font-bold text-[#0F382C]">50+</div>
              <div className="text-[11px] text-stone-600 font-medium">Premium Venues</div>
            </div>
            <div className="p-3">
              <div className="font-serif text-2xl font-bold text-[#0F382C]">100%</div>
              <div className="text-[11px] text-stone-600 font-medium">Guest Satisfaction</div>
            </div>
            <div className="p-3">
              <div className="font-serif text-2xl font-bold text-[#0F382C]">24x7</div>
              <div className="text-[11px] text-stone-600 font-medium">Wedding Support</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
