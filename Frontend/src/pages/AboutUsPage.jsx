import React from 'react';
import { 
  Users, MapPin, Award, Headphones, Heart, ShieldCheck, Sparkles, 
  Hotel, ArrowRight, MessageCircle, CheckCircle2, Compass, Car, RefreshCw 
} from 'lucide-react';

export default function AboutUsPage({ onOpenEnquiry }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section (Screenshot 2) */}
      <section className="relative bg-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-block text-[#C8933E] font-serif italic text-2xl font-semibold">
              About
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F382C] leading-tight">
              Atithya Stay
            </h1>
            <div className="w-20 h-1 bg-[#C8933E] rounded-full" />
            
            <h3 className="text-xl font-bold text-stone-800">
              More than a stay, it's an experience.
            </h3>
            
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              At Atithya Stay, we believe every journey has a story. We are passionate about creating exceptional stays, memorable experiences and warm hospitality across the breathtaking destinations of Uttarakhand.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('General Inquiry')}
                className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <span>Plan Your Journey With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
                alt="Uttarakhand Resort & Mountains"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

        </div>

        {/* Feature Pills Banner (Dark Green matching Screenshot 2) */}
        <div className="max-w-7xl mx-auto mt-12 bg-[#0F382C] text-white rounded-2xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8933E] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">Trusted by Thousands</div>
              <div className="text-[11px] text-stone-300">of Happy Travelers</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8933E] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">Local Expertise</div>
              <div className="text-[11px] text-stone-300">Deep knowledge of Uttarakhand</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8933E] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">Best Price Guarantee</div>
              <div className="text-[11px] text-stone-300">Quality stays at best prices</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8933E] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">24x7 Support</div>
              <div className="text-[11px] text-stone-300">We are with you at every step</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section (Screenshot 2 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Collage */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
              alt="Himalayan Travelers"
              className="w-full h-60 object-cover rounded-2xl col-span-2 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
              alt="Temples of Uttarakhand"
              className="w-full h-40 object-cover rounded-2xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Scenic River Valley"
              className="w-full h-40 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C8933E]">Our Story</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F382C]">
              Hospitality Rooted in the Heart of the Himalayas
            </h2>
            
            <p className="text-stone-600 text-sm leading-relaxed">
              Founded with a deep love for travel and a passion for Uttarakhand, Atithya Stay was created to bridge the gap between travelers and reliable hospitality.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              From cozy hotels to luxury resorts, from thrilling adventures to soulful spiritual journeys – we offer curated experiences that showcase the true beauty of the Himalayas.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you're planning a family vacation, a destination wedding, a corporate retreat or an adventure getaway, we are here to make it seamless and unforgettable.
            </p>
          </div>

        </div>
      </section>

      {/* Counter Stats Banner (Screenshot 2) */}
      <section className="bg-[#0F382C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { count: '10,000+', label: 'Happy Guests', icon: Users },
            { count: '500+', label: 'Hotels & Resorts', icon: Hotel },
            { count: '25+', label: 'Top Destinations', icon: MapPin },
            { count: '100+', label: 'Tour Packages', icon: Compass },
            { count: '4.8/5', label: 'Average Rating', icon: Award },
            { count: '24x7', label: 'Customer Support', icon: Headphones },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-1 p-2">
                <Icon className="w-6 h-6 text-[#C8933E] mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold text-white">{stat.count}</div>
                <div className="text-xs text-stone-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Values Section (Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Our Values</h2>
          <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Integrity', desc: 'We believe in honesty, transparency and building long-term relationships.', icon: ShieldCheck },
            { title: 'Excellence', desc: 'We are committed to delivering the highest standards of service in everything we do.', icon: Award },
            { title: 'Hospitality', desc: 'Rooted in Indian culture, we treat every guest like family.', icon: Heart },
            { title: 'Sustainability', desc: 'We promote responsible travel and support local communities.', icon: Sparkles },
            { title: 'Safety First', desc: 'Your safety and comfort is our top priority always.', icon: ShieldCheck },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#0F382C] flex items-center justify-center mx-auto border border-stone-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-stone-900">{val.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What Makes Us Different (Screenshot 2) */}
      <section className="bg-[#FAF7F2] py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">What Makes Us Different</h2>
            <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { title: 'Handpicked Stays', desc: 'Carefully selected hotels & resorts for a perfect stay.', icon: Hotel },
              { title: 'Curated Experiences', desc: 'Unique experiences designed just for you.', icon: Sparkles },
              { title: 'Seamless Travel', desc: 'Comfortable transfers and smooth travel arrangements.', icon: Car },
              { title: 'Customized Packages', desc: 'Tailor-made itineraries as per your needs and budget.', icon: Compass },
              { title: '24x7 Assistance', desc: 'Round-the-clock support for a worry-free journey.', icon: Headphones },
              { title: 'Best Price Guarantee', desc: 'Get the best value for your money, always.', icon: Award },
            ].map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0F382C] flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{diff.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Have Questions? Banner CTA (Screenshot 2 bottom) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F382C] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <Headphones className="w-10 h-10 text-[#C8933E]" />
            <div>
              <h3 className="font-serif text-2xl font-bold">Have Questions?</h3>
              <p className="text-stone-300 text-xs mt-1">We're here to help you plan the perfect trip.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenEnquiry('General Support')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Talk to Our Expert →
            </button>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-stone-200 hover:text-white"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Or WhatsApp Us +91 9258677823</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
