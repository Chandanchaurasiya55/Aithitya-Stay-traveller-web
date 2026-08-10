import React from 'react';
import { MapPin, Compass, ArrowRight, Sun, Calendar, Sparkles, Hotel, Tag } from 'lucide-react';

export default function DestinationsPage({ onOpenEnquiry, setActiveTab, postsList = [] }) {
  const defaultDestinations = [
    {
      title: 'Jim Corbett',
      sub: 'Wildlife Adventure & Jungle Safari',
      tag: 'Wildlife Adventure',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Oct - June',
      stays: '50+ Verified Resorts',
      desc: 'Home of the Royal Bengal Tiger, dense sal forests, river safaris, and luxury wilderness lodges.'
    },
    {
      title: 'Nainital',
      sub: 'Lakeside Romance & Mountain Views',
      tag: 'Lake Paradise',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      bestTime: 'All Year Round',
      stays: '60+ Lake View Stays',
      desc: 'Emerald green Naini Lake, famous Mall Road, cable car rides, and peaceful boat rides.'
    },
    {
      title: 'Bhimtal',
      sub: 'Serene Lakes & Tranquil Hills',
      tag: 'Serene & Peaceful',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Sept - May',
      stays: '30+ Boutique Stays',
      desc: 'Quiet lake island, butterfly research center, water sports, and tranquil pine forest walks.'
    },
    {
      title: 'Mukteshwar',
      sub: 'Himalayan Views & Apple Orchards',
      tag: 'Himalayan Views',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      bestTime: 'March - Nov',
      stays: '25+ Mountain Cottages',
      desc: '360-degree snow peak views of Nanda Devi, Chauli Ki Jali, and peaceful fruit orchards.'
    },
    {
      title: 'Kainchi Dham',
      sub: 'Spiritual Retreat & Ashram Serenity',
      tag: 'Spiritual Retreat',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      bestTime: 'All Year Round',
      stays: '20+ Guest Houses',
      desc: 'World famous ashram of Neem Karoli Baba, divine spiritual vibrations and peaceful valley setting.'
    },
    {
      title: 'Mussoorie',
      sub: 'Queen of Hills & Colonial Charm',
      tag: 'Queen of Hills',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      bestTime: 'March - June, Oct - Jan',
      stays: '70+ Luxury Hotels',
      desc: 'Kempty Falls, Gun Hill cable car, Camel’s Back Road, and iconic British colonial architecture.'
    },
    {
      title: 'Auli',
      sub: 'Ski Capital & Snow Slopes',
      tag: 'Snow & Adventure',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Dec - March (Snow)',
      stays: '15+ Ski Chalets',
      desc: 'World-class skiing slopes, artificial lake, ropeway ride, and panoramic views of Nanda Devi.'
    },
    {
      title: 'Rishikesh',
      sub: 'Yoga Capital & River Rafting',
      tag: 'Adventure & Yoga',
      image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Sept - May',
      stays: '45+ Ganga View Resorts',
      desc: 'White water rafting, cliff jumping, Ganga Aarti at Triveni Ghat, and international yoga centers.'
    }
  ];

  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || 'Custom Highlighted Destination',
    tag: 'Featured',
    image: p.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    bestTime: 'All Seasons',
    stays: 'Available Stays',
    desc: p.description || 'Custom destination highlight published from Admin Dashboard.'
  }));

  const destinations = [...dynamicPosts, ...defaultDestinations];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F382C] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Explore Uttarakhand</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Popular Travel Destinations
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto">
            Discover the most breathtaking hill stations, national parks, lakes and pilgrimage sites across Uttarakhand.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-md">
                    {dest.tag}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold">{dest.title}</h3>
                    <p className="text-xs text-stone-300 font-medium">{dest.sub}</p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {dest.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-600 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0F382C]" />
                      <span>{dest.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-[#0F382C]" />
                      <span>{dest.stays}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveTab('packages')}
                  className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
