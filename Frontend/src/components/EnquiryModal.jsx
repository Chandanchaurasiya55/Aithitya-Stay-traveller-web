import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { X, Send, Phone, User, Mail, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, defaultPackageTitle = '', onAddEnquiry }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2 Guests',
    date: '',
    destination: defaultPackageTitle || 'Nainital',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEnquiry = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination || 'Uttarakhand',
      service: defaultPackageTitle || 'General Enquiry',
      guests: formData.guests || '2 Guests',
      date: formData.date || new Date().toISOString().split('T')[0],
      notes: formData.message || '',
      status: 'Pending'
    };

    if (onAddEnquiry) {
      onAddEnquiry(newEnquiry);
    }

    try {
      await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnquiry)
      });
    } catch (err) {
      console.log('Backend sync error (using local state fallback):', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs uppercase tracking-widest text-[#C8933E] font-bold">Atithya Stay</div>
          <h3 className="font-serif text-2xl font-bold mt-1">
            {defaultPackageTitle ? `Enquire for ${defaultPackageTitle}` : 'Plan Your Trip With Us'}
          </h3>
          <p className="text-stone-300 text-xs mt-1">
            Fill in your details and our travel experts will call you shortly.
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#0F382C]">Enquiry Received!</h4>
            <p className="text-stone-600 text-sm">
              Thank you for reaching out. Our expert team will contact you within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Destination / Package</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Nainital / Jim Corbett"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Travel Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Additional Requirements (Optional)</label>
              <textarea
                rows="2"
                placeholder="Number of guests, hotel type, special requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
