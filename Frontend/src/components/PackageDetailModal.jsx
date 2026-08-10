import React from 'react';
import { X, Calendar, MapPin, CheckCircle, Utensils, Hotel, Car, Compass, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PackageDetailModal({ pkg, onClose, onEnquire }) {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Image Header (Fixed Height) */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-stone-900">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
            <span className="inline-block bg-[#C8933E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {pkg.duration}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold leading-snug">{pkg.title}</h2>
            <p className="text-stone-200 text-xs font-medium">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Scrollable Content Body (Hidden Scrollbar) */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Duration</span>
              <span className="text-xs font-bold text-[#0F382C]">{pkg.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Starting Price</span>
              <span className="text-xs font-bold text-[#C8933E]">₹{pkg.price} <span className="text-[10px] text-stone-500 font-normal">/{pkg.priceUnit || 'person'}</span></span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Location</span>
              <span className="text-xs font-bold text-stone-800">Uttarakhand</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Assistance</span>
              <span className="text-xs font-bold text-emerald-700">24x7 Included</span>
            </div>
          </div>

          {/* Key Inclusions */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#0F382C] mb-2.5">Package Inclusions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-semibold text-stone-700">
                <Hotel className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                <span>Verified Hotels</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-semibold text-stone-700">
                <Utensils className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                <span>Daily Meals</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-semibold text-stone-700">
                <Compass className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                <span>Sightseeing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-semibold text-stone-700">
                <Car className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                <span>Private Transport</span>
              </div>
            </div>
          </div>

          {/* Highlights & Summary */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#0F382C] mb-2">Highlights of this Experience</h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Handpicked 3-Star & 4-Star mountain view luxury stays</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Private dedicated vehicle with experienced local driver</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Customizable itinerary to suit your family or group preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero hidden charges & 100% price guarantee</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sticky Actions Bar at Bottom */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 shrink-0 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-stone-400 font-bold uppercase">Package Price From</div>
            <div className="text-xl font-bold text-[#0F382C]">
              ₹{pkg.price} <span className="text-xs font-normal text-stone-500">/{pkg.priceUnit || 'person'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <a
              href="tel:+919258677823"
              className="border border-[#0F382C] text-[#0F382C] hover:bg-[#0F382C]/5 px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Expert</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onEnquire(pkg.title);
              }}
              className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
