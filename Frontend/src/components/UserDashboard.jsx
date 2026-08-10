import React, { useState } from 'react';
import { 
  Ticket, Calendar, MapPin, CheckCircle2, Clock, Download, Phone, 
  MessageCircle, CreditCard, ShieldCheck, Hotel, Utensils, Car, Sparkles, User, FileText, ChevronRight,
  LogOut, Headphones, Mail, Settings, Edit3, Award
} from 'lucide-react';

export default function UserDashboard({ enquiries = [], packages = [], onOpenEnquiry, onLogout }) {
  // Sample user booking history
  const sampleBookings = [
    {
      bookingId: 'AS-2026-8941',
      title: 'Nainital Family Getaway',
      destination: 'Nainital, Uttarakhand',
      dates: '12 Aug 2026 - 15 Aug 2026',
      duration: '3 Nights / 4 Days',
      guests: '2 Adults, 1 Child (1 Room)',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      billing: {
        basePrice: 13998,
        taxes: 2519, // 18% GST
        discount: 1000,
        total: 15517,
        paymentStatus: 'Paid (Credit Card)',
        invoiceDate: '28 Jul 2026'
      },
      inclusions: ['4-Star Lakeview Hotel', 'Daily Breakfast & Dinner', 'Private AC Sedan', 'Naini Lake Boat Ride']
    },
    {
      bookingId: 'AS-2026-6210',
      title: 'Jim Corbett Wildlife Safari Tour',
      destination: 'Jim Corbett, Uttarakhand',
      dates: '20 Oct 2026 - 23 Oct 2026',
      duration: '3 Nights / 4 Days',
      guests: '2 Adults (1 Room)',
      status: 'Processing',
      image: '/corbett_tiger.png',
      billing: {
        basePrice: 27998,
        taxes: 5039,
        discount: 1500,
        total: 31537,
        paymentStatus: 'Advance Paid (₹10,000)',
        invoiceDate: '28 Jul 2026'
      },
      inclusions: ['Riverside Jungle Resort', 'All Meals Included', 'Exclusive Jeep Safari', 'Bonfire Evening']
    }
  ];

  const [activeTab, setActiveTab] = useState('bookings');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'Guest Traveler',
    phone: '+91 9876543210',
    email: 'guest.traveler@example.com',
    address: '12, Mall Road, Nainital, Uttarakhand - 263001'
  });

  const handlePrintInvoice = (booking) => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      
      {/* Dashboard 2-Column Grid (25% Left Sidebar | 75% Right Main Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: 25% SIDEBAR (lg:col-span-3)                 */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* User Profile Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-bold text-3xl mx-auto shadow-md border-2 border-[#C8933E]/40">
                <User className="w-10 h-10" />
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active Traveler" />
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F382C]">{profile.name}</h2>
              <p className="text-[11px] text-stone-500 font-semibold">{profile.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-[#C8933E]/15 text-[#C8933E] border border-[#C8933E]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>Prime Gold Member</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-left text-xs space-y-2 text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0F382C]" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                <span className="line-clamp-1">{profile.address}</span>
              </div>
            </div>
          </div>

          {/* Left Vertical Navigation Menu */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-sm space-y-1">
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>My Bookings</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === 'bookings' ? 'bg-[#C8933E] text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {sampleBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'billing'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className={`w-4 h-4 ${activeTab === 'billing' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Billing & Invoices</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Profile & Address</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'support'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className={`w-4 h-4 ${activeTab === 'support' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

          </div>

          {/* Quick Support Banner in Sidebar */}
          <div className="bg-gradient-to-br from-[#0F382C] to-[#164e3e] text-white rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#C8933E] font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Need Assistance?</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              Our 24x7 travel desk is ready to assist you with tour changes or hotel upgrades.
            </p>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: 75% MAIN CONTENT AREA (lg:col-span-9)      */}
        {/* ======================================================== */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">My Booked Trips & Packages</h2>
                  <p className="text-xs text-stone-500">Manage active vouchers, travel itineraries, and guest lists.</p>
                </div>
                <button
                  onClick={() => onOpenEnquiry('New Package Inquiry')}
                  className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
                >
                  <span>Book New Tour</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {sampleBookings.map((booking) => (
                  <div key={booking.bookingId} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12">
                    
                    {/* Image */}
                    <div className="md:col-span-4 relative min-h-[220px] bg-stone-900">
                      <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-4 left-4 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                        booking.status === 'Confirmed' ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">REF ID: {booking.bookingId}</span>
                            <h3 className="font-serif text-xl font-bold text-[#0F382C]">{booking.title}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Paid Total</span>
                            <div className="text-lg font-extrabold text-[#0F382C]">₹{booking.billing.total.toLocaleString('en-IN')}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Dates</span>
                            <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                              <Calendar className="w-3.5 h-3.5 text-[#0F382C]" />
                              <span>{booking.dates}</span>
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Duration</span>
                            <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-[#0F382C]" />
                              <span>{booking.duration}</span>
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Guests</span>
                            <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                              <User className="w-3.5 h-3.5 text-[#0F382C]" />
                              <span>{booking.guests}</span>
                            </span>
                          </div>
                        </div>

                        {/* Inclusions */}
                        <div>
                          <div className="flex flex-wrap gap-1.5">
                            {booking.inclusions.map((inc, i) => (
                              <span key={i} className="bg-emerald-50 text-[#0F382C] border border-emerald-200 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>{inc}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <ShieldCheck className="w-4 h-4" />
                          <span>{booking.billing.paymentStatus}</span>
                        </div>

                        <button
                          onClick={() => setSelectedInvoice(booking)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border border-stone-300 transition-all"
                        >
                          <FileText className="w-4 h-4 text-[#0F382C]" />
                          <span>View Invoice</span>
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BILLING & INVOICES */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">Billing Statements & Vouchers</h2>
                <p className="text-xs text-stone-500">Download GST invoice receipts for your booked tour packages.</p>
              </div>

              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-4 px-6">Booking Ref</th>
                        <th className="py-4 px-6">Package</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Total Amount</th>
                        <th className="py-4 px-6 text-right">Invoice Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium">
                      {sampleBookings.map((b) => (
                        <tr key={b.bookingId} className="hover:bg-stone-50 transition-colors">
                          <td className="py-4 px-6 font-bold text-stone-900">{b.bookingId}</td>
                          <td className="py-4 px-6 font-bold text-[#0F382C]">{b.title}</td>
                          <td className="py-4 px-6 text-stone-600">{b.billing.invoiceDate}</td>
                          <td className="py-4 px-6">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                              {b.billing.paymentStatus}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-extrabold text-stone-900 text-sm">₹{b.billing.total.toLocaleString('en-IN')}</td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedInvoice(b)}
                              className="bg-[#0F382C] text-white hover:bg-[#0C2D23] px-3.5 py-2 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE & ADDRESS */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">My Account Profile & Address</h2>
                <p className="text-xs text-stone-500">Update your contact information for hassle-free hotel check-ins.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Profile Updated Successfully!'); }} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Address / Location</label>
                  <textarea
                    rows={3}
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0F382C] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#0C2D23] transition-all"
                >
                  <Edit3 className="w-4 h-4 text-[#C8933E]" />
                  <span>Save Profile Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SUPPORT */}
          {activeTab === 'support' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">24x7 Customer Support Desk</h2>
                <p className="text-xs text-stone-500">Contact our tour team directly for emergency assistance or package changes.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <Phone className="w-8 h-8 text-[#0F382C]" />
                  <h3 className="font-bold text-stone-900 text-sm">Emergency Phone Line</h3>
                  <p className="text-xs text-stone-600">Available 24 hours a day, 7 days a week for active trips.</p>
                  <a href="tel:+919258677823" className="inline-block text-[#0F382C] font-extrabold text-sm hover:underline">
                    +91 9258677823
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <MessageCircle className="w-8 h-8 text-emerald-600 fill-current" />
                  <h3 className="font-bold text-stone-900 text-sm">WhatsApp Live Chat</h3>
                  <p className="text-xs text-stone-600">Instant assistance for booking vouchers & cab details.</p>
                  <a 
                    href="https://wa.me/919258677823" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block text-emerald-700 font-extrabold text-sm hover:underline"
                  >
                    Chat Now on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* BILLING INVOICE MODAL POPUP */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="Logo" className="h-10 w-auto object-contain mix-blend-multiply" />
                <div>
                  <div className="font-serif text-lg font-bold text-[#0F382C]">Atithya Stay Invoice</div>
                  <div className="text-[10px] text-stone-400 font-bold">GSTIN: 05AAACA1234F1Z9</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            {/* Bill Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Booking Ref</span>
                  <span className="font-bold text-stone-900">{selectedInvoice.bookingId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Date</span>
                  <span className="font-bold text-stone-900">{selectedInvoice.billing.invoiceDate}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Package Title</span>
                <div className="font-serif text-lg font-bold text-[#0F382C]">{selectedInvoice.title}</div>
                <div className="text-stone-500 text-[11px]">{selectedInvoice.destination} • {selectedInvoice.duration}</div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-stone-200 pt-4 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Base Package Charges</span>
                  <span>₹{selectedInvoice.billing.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST (18%)</span>
                  <span>₹{selectedInvoice.billing.taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount</span>
                  <span>- ₹{selectedInvoice.billing.discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0F382C] border-t border-stone-300 pt-2">
                  <span>Total Amount Paid</span>
                  <span>₹{selectedInvoice.billing.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Print / Download Button */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handlePrintInvoice(selectedInvoice)}
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4 text-[#C8933E]" />
                <span>Print / Download PDF Receipt</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
