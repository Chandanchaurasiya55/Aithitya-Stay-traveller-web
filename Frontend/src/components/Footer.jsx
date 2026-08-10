import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, MessageCircle } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenEnquiry }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNavClick = (tabId) => {
    if (setActiveTab) setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A261E] text-stone-300 pt-14 pb-6 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <img 
                src="/logo.jpeg" 
                alt="Atithya Stay Logo" 
                className="h-14 w-auto object-contain bg-white p-1 rounded-md" 
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted travel partner for hotels, resorts, tour packages and unforgettable experiences across Uttarakhand.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-stone-300 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-stone-300 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-stone-300 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919258677823" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {['Home', 'Hotels', 'Destinations', 'Tour Packages', 'Weddings', 'Corporate', 'About Us', 'Contact Us'].map((name) => {
                const idMap = {
                  'Home': 'home',
                  'Hotels': 'hotels',
                  'Destinations': 'destinations',
                  'Tour Packages': 'packages',
                  'Weddings': 'weddings',
                  'Corporate': 'corporate',
                  'About Us': 'about',
                  'Contact Us': 'contact'
                };
                return (
                  <li key={name}>
                    <button
                      onClick={() => handleNavClick(idMap[name])}
                      className="text-stone-400 hover:text-[#C8933E] transition-colors"
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Top Destinations
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs font-medium">
              {['Jim Corbett', 'Nainital', 'Bhimtal', 'Mukteshwar', 'Rishikesh', 'Kausani', 'Ranikhet', 'Auli', 'Chardham Yatra'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="text-stone-400 hover:text-[#C8933E] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8933E] shrink-0 mt-0.5" />
                <span className="text-stone-400">Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8933E] shrink-0" />
                <a href="tel:+919258677823" className="text-stone-400 hover:text-white transition-colors">
                  +91 9258677823
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8933E] shrink-0" />
                <a href="mailto:info@atithyastay.com" className="text-stone-400 hover:text-white transition-colors">
                  info@atithyastay.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C8933E] shrink-0" />
                <span className="text-stone-400">www.atithyastay.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Newsletter
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Subscribe for exclusive offers and travel inspiration across Uttarakhand.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-l-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C8933E]"
                />
                <button
                  type="submit"
                  className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-3.5 py-2 rounded-r-lg flex items-center justify-center transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">Thank you for subscribing!</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © 2025 Atithya Stay. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
