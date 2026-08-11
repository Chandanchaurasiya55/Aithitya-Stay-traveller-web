import React, { useState } from 'react';
import { 
  BarChart3, Inbox, Package, Hotel, PlusCircle, Trash2, CheckCircle2, 
  Clock, XCircle, Search, Sparkles, Filter, Calendar, MapPin, Users, 
  Phone, Mail, ArrowUpRight, Image as ImageIcon, Eye, Tag, Check, RefreshCw, 
  ShieldCheck, ChevronRight, CreditCard, DollarSign, Wallet, Receipt, X
} from 'lucide-react';

export default function AdminPanel({ 
  enquiries = [], 
  packages = [], 
  hotels = [], 
  posts = [], 
  onUpdateEnquiryStatus, 
  onUpdateEnquiryPayment,
  onDeleteEnquiry, 
  onAddPackage, 
  onDeletePackage, 
  onAddHotel, 
  onDeleteHotel, 
  onAddPost, 
  onDeletePost 
}) {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    paidAmount: '',
    totalAmount: '',
    paymentStatus: 'Unpaid',
    paymentMethod: 'UPI'
  });

  // Package Form State
  const [pkgForm, setPkgForm] = useState({
    title: '',
    subtitle: '',
    duration: '3 Nights / 4 Days',
    category: 'Family Tours',
    price: '',
    priceUnit: 'person',
    badge: 'Popular',
    image: '',
    specsInput: 'Hotel, Meals, Sightseeing, Transport',
    highlightsInput: 'Handpicked 3-Star & 4-Star luxury stays\nPrivate vehicle with local driver\nZero hidden charges & 100% price guarantee'
  });

  // Hotel Form State
  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: '',
    dest: 'Nainital',
    rating: '4.8 (New)',
    price: '',
    image: '',
    tag: 'Luxury Resort',
    amenitiesInput: 'Pool, Restaurant, WiFi, Parking, Spa'
  });

  // Page Post Form State
  const [postForm, setPostForm] = useState({
    page: 'destinations',
    title: '',
    subtitle: '',
    image: '',
    description: ''
  });

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Payment calculations
  const totalRevenueCollected = enquiries.reduce((acc, curr) => acc + (Number(curr.paidAmount) || 0), 0);
  const totalDueBalance = enquiries.reduce((acc, curr) => {
    const total = Number(curr.totalAmount) || 0;
    const paid = Number(curr.paidAmount) || 0;
    return acc + Math.max(0, total - paid);
  }, 0);
  const totalBookingVolume = enquiries.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch = 
      !searchQuery ||
      (enq.name && enq.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (enq.phone && enq.phone.includes(searchQuery)) ||
      (enq.email && enq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (enq.service && enq.service.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open Payment Modal
  const handleOpenPaymentModal = (enq) => {
    setSelectedEnquiry(enq);
    setPaymentForm({
      paidAmount: enq.paidAmount || 0,
      totalAmount: enq.totalAmount || 0,
      paymentStatus: enq.paymentStatus || 'Unpaid',
      paymentMethod: enq.paymentMethod || 'UPI (GPay)'
    });
    setPaymentModalOpen(true);
  };

  // Submit Payment Record
  const handleSavePayment = (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    const targetId = selectedEnquiry.id || selectedEnquiry._id;
    const updated = {
      paidAmount: Number(paymentForm.paidAmount) || 0,
      totalAmount: Number(paymentForm.totalAmount) || 0,
      paymentStatus: paymentForm.paymentStatus,
      paymentMethod: paymentForm.paymentMethod
    };

    if (onUpdateEnquiryPayment) {
      onUpdateEnquiryPayment(targetId, updated);
    }
    showNotification(`Payment details updated for ${selectedEnquiry.name}!`);
    setPaymentModalOpen(false);
    setSelectedEnquiry(null);
  };

  // Submit Package Handler
  const handlePackageSubmit = (e) => {
    e.preventDefault();
    if (!pkgForm.title || !pkgForm.price) {
      alert('Please fill in Title and Price');
      return;
    }

    const specs = pkgForm.specsInput.split(',').map(s => s.trim()).filter(Boolean);
    const highlights = pkgForm.highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);

    onAddPackage({
      ...pkgForm,
      specs,
      highlights,
      image: pkgForm.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    });

    showNotification(`Package "${pkgForm.title}" Published Successfully!`);
    setPkgForm({
      title: '',
      subtitle: '',
      duration: '3 Nights / 4 Days',
      category: 'Family Tours',
      price: '',
      priceUnit: 'person',
      badge: 'Popular',
      image: '',
      specsInput: 'Hotel, Meals, Sightseeing, Transport',
      highlightsInput: 'Handpicked 3-Star & 4-Star luxury stays\nPrivate vehicle with local driver\nZero hidden charges & 100% price guarantee'
    });
  };

  // Submit Hotel Handler
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    if (!hotelForm.name || !hotelForm.price) {
      alert('Please fill in Hotel Name and Price');
      return;
    }

    const amenities = hotelForm.amenitiesInput.split(',').map(a => a.trim()).filter(Boolean);

    onAddHotel({
      ...hotelForm,
      amenities,
      image: hotelForm.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    });

    showNotification(`Hotel "${hotelForm.name}" Added Successfully!`);
    setHotelForm({
      name: '',
      location: '',
      dest: 'Nainital',
      rating: '4.8 (New)',
      price: '',
      image: '',
      tag: 'Luxury Resort',
      amenitiesInput: 'Pool, Restaurant, WiFi, Parking, Spa'
    });
  };

  // Submit Post Handler
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postForm.title) {
      alert('Please fill in Post Title');
      return;
    }

    onAddPost({
      ...postForm,
      image: postForm.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    });

    showNotification(`New Post Published for "${postForm.page.toUpperCase()}" Page!`);
    setPostForm({
      page: 'destinations',
      title: '',
      subtitle: '',
      image: '',
      description: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-[#0F382C] text-white px-6 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Admin 2-Column Layout: Left Sidebar strictly 30% width | Right Main Content 70% width */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: 30% SIDEBAR (w-full lg:w-[30%] lg:max-w-[30%]) */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[30%] lg:max-w-[30%] shrink-0 space-y-6">
          
          {/* Admin Profile Card */}
          <div className="bg-[#0F382C] text-white rounded-3xl p-6 shadow-xl space-y-4 text-center border border-emerald-900">
            <div className="w-16 h-16 rounded-2xl bg-[#C8933E] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md border border-amber-300/40">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>System Administrator</span>
              </div>
              <h2 className="font-serif text-lg font-bold">Atithya Stay Admin</h2>
              <p className="text-[11px] text-stone-300">admin@atithyastay.com</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-emerald-900 text-center">
              <div className="bg-white/10 p-2 rounded-xl">
                <div className="text-sm font-extrabold text-[#C8933E]">{enquiries.length}</div>
                <div className="text-[8px] uppercase text-stone-300 font-bold">Inquiries</div>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <div className="text-sm font-extrabold text-emerald-400">₹{totalRevenueCollected.toLocaleString('en-IN')}</div>
                <div className="text-[8px] uppercase text-stone-300 font-bold">Paid</div>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <div className="text-sm font-extrabold text-[#C8933E]">{packages.length}</div>
                <div className="text-[8px] uppercase text-stone-300 font-bold">Packages</div>
              </div>
            </div>
          </div>

          {/* Left Vertical Admin Navigation Menu */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-sm space-y-1">
            {[
              { id: 'inquiries', label: 'User Inquiries', icon: Inbox, count: enquiries.length },
              { id: 'payments', label: 'Payments & Revenue', icon: CreditCard, count: enquiries.filter(e => (e.paidAmount > 0 || e.totalAmount > 0)).length },
              { id: 'packages', label: 'Tour Packages', icon: Package, count: packages.length },
              { id: 'hotels', label: 'Hotels & Resorts', icon: Hotel, count: hotels.length },
              { id: 'posts', label: 'Page Post Publisher', icon: PlusCircle, count: posts.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0F382C] text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#C8933E] text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: 70% MAIN CONTENT AREA (w-full lg:w-[70%])  */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[70%] flex-1 space-y-6">
          
          {/* TAB 1: USER INQUIRIES & PAYMENT STATUS TABLE */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              
              {/* Controls & Filter Bar */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">User Inquiries ({filteredEnquiries.length})</h2>
                  <p className="text-xs text-stone-500">Live submissions with guest details and payment tracking.</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search name or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  {/* Filter Select */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <Inbox className="w-12 h-12 text-stone-300 mx-auto" />
                    <h3 className="font-bold text-stone-700 text-sm">No User Inquiries Found</h3>
                    <p className="text-xs text-stone-400">Submissions from user forms will automatically appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-4 px-6">Guest Details</th>
                          <th className="py-4 px-6">Requested Service</th>
                          <th className="py-4 px-6">Travel Date & Guests</th>
                          <th className="py-4 px-6">Payment Track</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredEnquiries.map((enq) => {
                          const paid = Number(enq.paidAmount) || 0;
                          const total = Number(enq.totalAmount) || 0;
                          const pStatus = enq.paymentStatus || 'Unpaid';

                          return (
                            <tr key={enq.id || enq._id} className="hover:bg-stone-50/80 transition-colors">
                              
                              {/* Guest Details */}
                              <td className="py-4 px-6 space-y-1">
                                <div className="font-bold text-stone-900 text-sm">{enq.name}</div>
                                <div className="flex flex-col gap-0.5 text-stone-500 text-[11px]">
                                  <a href={`tel:${enq.phone}`} className="flex items-center gap-1 hover:text-[#0F382C]">
                                    <Phone className="w-3 h-3 text-[#C8933E]" />
                                    <span>{enq.phone}</span>
                                  </a>
                                  {enq.email && (
                                    <a href={`mailto:${enq.email}`} className="flex items-center gap-1 hover:text-[#0F382C]">
                                      <Mail className="w-3 h-3 text-[#C8933E]" />
                                      <span>{enq.email}</span>
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Service / Destination */}
                              <td className="py-4 px-6 space-y-1">
                                <div className="font-bold text-[#0F382C]">{enq.service}</div>
                                <div className="text-[11px] text-stone-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-stone-400" />
                                  <span>{enq.destination}</span>
                                </div>
                                {enq.notes && (
                                  <div className="text-[11px] text-stone-500 italic bg-stone-100 p-2 rounded-lg mt-1 border border-stone-200/60 max-w-xs line-clamp-2">
                                    "{enq.notes}"
                                  </div>
                                )}
                              </td>

                              {/* Travel Date & Guests */}
                              <td className="py-4 px-6 space-y-1">
                                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{enq.date || 'TBD'}</span>
                                </div>
                                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{enq.guests}</span>
                                </div>
                              </td>

                              {/* Payment Track & Amount Received */}
                              <td className="py-4 px-6 space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 border ${
                                    pStatus === 'Paid'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : pStatus === 'Partial'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : 'bg-red-50 text-red-800 border-red-200'
                                  }`}>
                                    {pStatus === 'Paid' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                    {pStatus === 'Partial' && <Clock className="w-3 h-3 text-amber-600" />}
                                    {pStatus === 'Unpaid' && <XCircle className="w-3 h-3 text-red-600" />}
                                    <span>
                                      {pStatus === 'Paid' 
                                        ? `Paid ₹${paid.toLocaleString('en-IN')}`
                                        : pStatus === 'Partial'
                                        ? `Paid ₹${paid.toLocaleString('en-IN')} / ₹${total.toLocaleString('en-IN')}`
                                        : `Unpaid (Due ₹${total.toLocaleString('en-IN')})`}
                                    </span>
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleOpenPaymentModal(enq)}
                                  className="text-[10px] font-bold text-[#0F382C] hover:text-[#C8933E] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 border border-stone-200"
                                >
                                  <CreditCard className="w-3 h-3 text-[#C8933E]" />
                                  <span>{paid > 0 ? 'Update Payment' : '+ Record Payment'}</span>
                                </button>
                              </td>

                              {/* Status Select */}
                              <td className="py-4 px-6">
                                <select
                                  value={enq.status}
                                  onChange={(e) => onUpdateEnquiryStatus(enq.id || enq._id, e.target.value)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer focus:outline-none border ${
                                    enq.status === 'Confirmed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : enq.status === 'Contacted'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : 'bg-red-50 text-red-800 border-red-200'
                                  }`}
                                >
                                  <option value="Pending">⏳ Pending</option>
                                  <option value="Contacted">📞 Contacted</option>
                                  <option value="Confirmed">✅ Confirmed</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => onDeleteEnquiry(enq.id || enq._id)}
                                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: DEDICATED PAYMENTS & REVENUE DASHBOARD */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              
              {/* Payment Summary Metrics Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-stone-500 font-bold uppercase">Total Payments Collected</div>
                  <div className="text-2xl font-serif font-bold text-[#0F382C]">
                    ₹{totalRevenueCollected.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-stone-500 font-bold uppercase">Outstanding Due Balance</div>
                  <div className="text-2xl font-serif font-bold text-amber-700">
                    ₹{totalDueBalance.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F382C]/10 text-[#0F382C] flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-stone-500 font-bold uppercase">Total Booking Value</div>
                  <div className="text-2xl font-serif font-bold text-stone-900">
                    ₹{totalBookingVolume.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* User Payments Ledger Table */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F382C]">User Payments Ledger</h3>
                  <p className="text-xs text-stone-500">Overview of all guest payments, advance deposits, and remaining balances.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">User Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Total Price</th>
                        <th className="py-3 px-4">Amount Paid</th>
                        <th className="py-3 px-4">Remaining Balance</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {enquiries.map((enq) => {
                        const paid = Number(enq.paidAmount) || 0;
                        const total = Number(enq.totalAmount) || 0;
                        const remaining = Math.max(0, total - paid);
                        const status = enq.paymentStatus || 'Unpaid';

                        return (
                          <tr key={enq.id || enq._id} className="hover:bg-stone-50">
                            <td className="py-3 px-4 font-bold text-stone-900">{enq.name}</td>
                            <td className="py-3 px-4 text-stone-600">{enq.phone}</td>
                            <td className="py-3 px-4 font-semibold text-[#0F382C]">{enq.service}</td>
                            <td className="py-3 px-4 font-bold text-stone-900">₹{total.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-4 font-extrabold text-emerald-700">₹{paid.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-4 font-bold text-amber-700">₹{remaining.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-4 text-stone-500 font-medium">{enq.paymentMethod || 'UPI'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                                status === 'Partial' ? 'bg-amber-100 text-amber-900' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleOpenPaymentModal(enq)}
                                className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-3 py-1.5 rounded-xl font-bold text-[11px] shadow-2xs"
                              >
                                Record Payment
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TOUR PACKAGES CREATOR */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Create Package Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">Create New Tour Package</h2>
                  <p className="text-xs text-stone-500">Fill details below to publish a new package live to Tour Packages & Home Page.</p>
                </div>

                <form onSubmit={handlePackageSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Package Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Nainital - Bhimtal - Mukteshwar Deluxe Tour"
                      value={pkgForm.title}
                      onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Subtitle / Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. Lakes, Mountains & Peace"
                        value={pkgForm.subtitle}
                        onChange={(e) => setPkgForm({ ...pkgForm, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                      <select
                        value={pkgForm.category}
                        onChange={(e) => setPkgForm({ ...pkgForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      >
                        <option value="Family Tours">Family Tours</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Corporate Tours">Corporate Tours</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Spiritual Tours">Spiritual Tours</option>
                        <option value="Student Groups">Student Groups</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="3 Nights / 4 Days"
                        value={pkgForm.duration}
                        onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Starting Price (₹) *</label>
                      <input
                        type="text"
                        placeholder="12,999"
                        value={pkgForm.price}
                        onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Price Unit</label>
                      <select
                        value={pkgForm.priceUnit}
                        onChange={(e) => setPkgForm({ ...pkgForm, priceUnit: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      >
                        <option value="person">per person</option>
                        <option value="couple">per couple</option>
                        <option value="group">per group</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={pkgForm.image}
                      onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Specs / Inclusions (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="Hotel, Meals, Sightseeing, Transport, Safari"
                      value={pkgForm.specsInput}
                      onChange={(e) => setPkgForm({ ...pkgForm, specsInput: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Highlights (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Handpicked 3-Star stays&#10;Private dedicated vehicle&#10;Zero hidden charges"
                      value={pkgForm.highlightsInput}
                      onChange={(e) => setPkgForm({ ...pkgForm, highlightsInput: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4 text-[#C8933E]" />
                    <span>Publish Package Live</span>
                  </button>
                </form>
              </div>

              {/* Manage Live Packages */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Live Packages ({packages.length})</h3>
                <div className="space-y-4 max-h-[680px] overflow-y-auto pr-1">
                  {packages.map((pkg) => (
                    <div key={pkg.id || pkg._id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex gap-4 items-center justify-between">
                      <img src={pkg.image} alt={pkg.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-[#C8933E] uppercase">{pkg.category}</span>
                        <h4 className="font-bold text-stone-900 text-xs line-clamp-1">{pkg.title}</h4>
                        <div className="text-xs font-extrabold text-[#0F382C]">₹{pkg.price} <span className="text-[10px] text-stone-500 font-normal">/{pkg.priceUnit}</span></div>
                      </div>
                      <button
                        onClick={() => onDeletePackage(pkg.id || pkg._id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HOTELS & RESORTS CREATOR */}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Add Hotel Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">Add New Hotel / Resort</h2>
                  <p className="text-xs text-stone-500">Publish a new verified stay directly to the Hotels page.</p>
                </div>

                <form onSubmit={handleHotelSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Hotel Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Nainital Lakeview Resort"
                      value={hotelForm.name}
                      onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Full Location Address</label>
                      <input
                        type="text"
                        placeholder="e.g. Mall Road, Nainital, Uttarakhand"
                        value={hotelForm.location}
                        onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Destination Filter Zone</label>
                      <select
                        value={hotelForm.dest}
                        onChange={(e) => setHotelForm({ ...hotelForm, dest: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      >
                        <option value="Nainital">Nainital</option>
                        <option value="Jim Corbett">Jim Corbett</option>
                        <option value="Mussoorie">Mussoorie</option>
                        <option value="Bhimtal">Bhimtal</option>
                        <option value="Rishikesh">Rishikesh</option>
                        <option value="Auli">Auli</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Price per Night (₹) *</label>
                      <input
                        type="text"
                        placeholder="5,499"
                        value={hotelForm.price}
                        onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Property Tag</label>
                      <input
                        type="text"
                        placeholder="Luxury Jungle Resort / Heritage Lake View"
                        value={hotelForm.tag}
                        onChange={(e) => setHotelForm({ ...hotelForm, tag: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={hotelForm.image}
                      onChange={(e) => setHotelForm({ ...hotelForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Amenities Badges (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="Pool, Restaurant, WiFi, Parking, Spa, Lake View"
                      value={hotelForm.amenitiesInput}
                      onChange={(e) => setHotelForm({ ...hotelForm, amenitiesInput: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4 text-[#C8933E]" />
                    <span>Publish Hotel Live</span>
                  </button>
                </form>
              </div>

              {/* Manage Live Hotels */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Live Hotels ({hotels.length})</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {hotels.map((htl) => (
                    <div key={htl.id || htl._id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex gap-4 items-center justify-between">
                      <img src={htl.image} alt={htl.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-[#C8933E] uppercase">{htl.dest}</span>
                        <h4 className="font-bold text-stone-900 text-xs line-clamp-1">{htl.name}</h4>
                        <div className="text-xs font-extrabold text-[#0F382C]">₹{htl.price} <span className="text-[10px] text-stone-500 font-normal">/Night</span></div>
                      </div>
                      <button
                        onClick={() => onDeleteHotel(htl.id || htl._id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                        title="Delete Hotel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PAGE POST PUBLISHER */}
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Create Post Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">Publish Post to Specific Page</h2>
                  <p className="text-xs text-stone-500">Create custom destination posts, wedding feature cards, or corporate retreat highlights targeting any website page.</p>
                </div>

                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Target Website Page *</label>
                    <select
                      value={postForm.page}
                      onChange={(e) => setPostForm({ ...postForm, page: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-bold focus:outline-none"
                    >
                      <option value="destinations">📍 Destinations Page</option>
                      <option value="weddings">💍 Weddings Page</option>
                      <option value="corporate">🏢 Corporate Page</option>
                      <option value="hotels">🏨 Hotels Page</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Post Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kainchi Dham Ashram Tour"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Subtitle / Category Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Spiritual Retreat & Neem Karoli Baba Temple"
                      value={postForm.subtitle}
                      onChange={(e) => setPostForm({ ...postForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={postForm.image}
                      onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Description / Summary</label>
                    <textarea
                      rows={3}
                      placeholder="Write a brief overview of this post..."
                      value={postForm.description}
                      onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4 text-[#C8933E]" />
                    <span>Publish Post to Page Live</span>
                  </button>
                </form>
              </div>

              {/* Manage Published Posts */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Published Page Posts ({posts.length})</h3>
                <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                  {posts.map((pst) => (
                    <div key={pst.id || pst._id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex gap-4 items-center justify-between">
                      <img src={pst.image} alt={pst.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1 flex-1">
                        <span className="text-[9px] font-bold text-white bg-[#0F382C] px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {pst.page}
                        </span>
                        <h4 className="font-bold text-stone-900 text-xs line-clamp-1">{pst.title}</h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1">{pst.subtitle || pst.description}</p>
                      </div>
                      <button
                        onClick={() => onDeletePost(pst.id || pst._id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ======================================================== */}
      {/* UPDATE PAYMENT POPUP MODAL                                */}
      {/* ======================================================== */}
      {paymentModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200">
            
            {/* Header */}
            <div className="bg-[#0F382C] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                <CreditCard className="w-3 h-3" />
                <span>Guest Payment Tracking</span>
              </div>

              <h3 className="font-serif text-2xl font-bold">Record Payment</h3>
              <p className="text-stone-300 text-xs mt-1">
                Guest: <span className="font-bold text-white">{selectedEnquiry.name}</span> ({selectedEnquiry.service})
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSavePayment} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Total Package Cost (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 font-bold text-stone-400">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="15000"
                      value={paymentForm.totalAmount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, totalAmount: e.target.value })}
                      className="w-full pl-8 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-bold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Amount Received (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 font-bold text-emerald-600">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="5000"
                      value={paymentForm.paidAmount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paidAmount: e.target.value })}
                      className="w-full pl-8 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-emerald-800 font-extrabold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Payment Status</label>
                  <select
                    value={paymentForm.paymentStatus}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-bold focus:outline-none"
                  >
                    <option value="Paid">✅ Paid (Full)</option>
                    <option value="Partial">⏳ Partial (Advance Paid)</option>
                    <option value="Unpaid">❌ Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Payment Method</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-bold focus:outline-none"
                  >
                    <option value="UPI (GPay)">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT / IMPS)</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Cash Deposit">Cash Deposit</option>
                  </select>
                </div>
              </div>

              {/* Outstanding Calc Preview */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex justify-between items-center text-xs font-semibold">
                <span className="text-stone-500">Calculated Remaining Balance:</span>
                <span className="font-extrabold text-amber-700">
                  ₹{Math.max(0, (Number(paymentForm.totalAmount) || 0) - (Number(paymentForm.paidAmount) || 0)).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C8933E]" />
                <span>Save & Update Payment Record</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
