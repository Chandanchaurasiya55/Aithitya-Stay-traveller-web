import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Headphones, ShieldCheck, Sparkles 
} from 'lucide-react';

export default function ContactUsPage({ onAddEnquiry }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEnquiry = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: 'Uttarakhand',
      service: formData.subject || 'General Contact Inquiry',
      guests: '2 Guests',
      date: new Date().toISOString().split('T')[0],
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

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 3000);
  };

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
            <Headphones className="w-4 h-4" />
            <span>24x7 Customer Support</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Get in Touch With Us
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about your trip, package customization, or resort bookings? We're here to help you 24x7.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-[#C8933E] tracking-widest">CONTACT INFO</span>
              <h2 className="font-serif text-3xl font-bold text-[#0F382C]">We'd Love to Hear From You</h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Reach out to our travel experts for customized itineraries, resort bookings, group tours, or wedding inquiries.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F382C] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Call Us 24x7</h4>
                  <a href="tel:+919258677823" className="text-xs text-[#0F382C] font-extrabold hover:underline block mt-0.5">
                    +91 9258677823
                  </a>
                  <span className="text-[11px] text-stone-500">Toll-free customer support line</span>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">WhatsApp Instant Support</h4>
                  <a 
                    href="https://wa.me/919258677823" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-emerald-700 font-extrabold hover:underline block mt-0.5"
                  >
                    +91 9258677823
                  </a>
                  <span className="text-[11px] text-stone-500">Chat directly with travel desk</span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F382C] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Email Address</h4>
                  <a href="mailto:info@atithyastay.com" className="text-xs text-stone-700 font-bold hover:underline block mt-0.5">
                    info@atithyastay.com
                  </a>
                  <span className="text-[11px] text-stone-500">Replies within 1 business hour</span>
                </div>
              </div>

              {/* Office Location */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F382C] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Office Location</h4>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    Uttarakhand, India
                  </p>
                  <span className="text-[11px] text-stone-500">Serving Nainital, Corbett, Mussoorie & Rishikesh</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-[#0F382C] mb-2">Send Us a Message</h3>
            <p className="text-xs text-stone-500 mb-6">Fill in the details below and we will get back to you immediately.</p>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-[#0F382C]">Message Sent Successfully!</h4>
                <p className="text-xs text-stone-600">Thank you for contacting Atithya Stay. Our travel expert will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tour Package Booking">Tour Package Booking</option>
                    <option value="Hotel & Resort Booking">Hotel & Resort Booking</option>
                    <option value="Corporate Retreat">Corporate Retreat</option>
                    <option value="Destination Wedding">Destination Wedding</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Message / Travel Plans</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about your travel dates, destination preferences, number of guests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 focus:ring-2 focus:ring-[#0F382C] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
