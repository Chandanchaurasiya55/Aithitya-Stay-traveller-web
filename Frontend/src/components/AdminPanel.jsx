import React, { useState } from 'react';
import { 
  BarChart3, Inbox, Package, Hotel, PlusCircle, Trash2, CheckCircle2, 
  Clock, XCircle, Search, Sparkles, Filter, Calendar, MapPin, Users, 
  Phone, Mail, ArrowUpRight, Image as ImageIcon, Eye, Tag, Check, RefreshCw, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function AdminPanel({ 
  enquiries = [], 
  packages = [], 
  hotels = [], 
  posts = [], 
  onUpdateEnquiryStatus, 
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

      {/* Admin 2-Column Grid (25% Left Sidebar | 75% Right Main Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: 25% SIDEBAR (lg:col-span-3)                 */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-6">
          
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
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900 text-center">
              <div className="bg-white/10 p-2.5 rounded-xl">
                <div className="text-lg font-extrabold text-[#C8933E]">{enquiries.length}</div>
                <div className="text-[9px] uppercase text-stone-300 font-bold">Inquiries</div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl">
                <div className="text-lg font-extrabold text-[#C8933E]">{packages.length}</div>
                <div className="text-[9px] uppercase text-stone-300 font-bold">Packages</div>
              </div>
            </div>
          </div>

          {/* Left Vertical Admin Navigation Menu */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-sm space-y-1">
            {[
              { id: 'inquiries', label: 'User Inquiries', icon: Inbox, count: enquiries.length },
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
        {/* RIGHT COLUMN: 75% MAIN CONTENT AREA (lg:col-span-9)      */}
        {/* ======================================================== */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: USER INQUIRIES & FORM DATA */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              
              {/* Controls & Filter Bar */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">User Inquiries ({filteredEnquiries.length})</h2>
                  <p className="text-xs text-stone-500">Live submissions from booking modal & contact forms.</p>
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
                          <th className="py-4 px-6">Requested Service / Destination</th>
                          <th className="py-4 px-6">Travel Date & Guests</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredEnquiries.map((enq) => (
                          <tr key={enq.id || enq._id} className="hover:bg-stone-50/80 transition-colors">
                            
                            {/* Guest Details */}
                            <td className="py-4 px-6 space-y-1">
                              <div className="font-bold text-stone-900 text-sm">{enq.name}</div>
                              <div className="flex items-center gap-3 text-stone-500 text-[11px]">
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
                                <div className="text-[11px] text-stone-500 italic bg-stone-100 p-2 rounded-lg mt-1 border border-stone-200/60 max-w-xs">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: TOUR PACKAGES CREATOR */}
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

          {/* TAB 3: HOTELS & RESORTS CREATOR */}
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

          {/* TAB 4: PAGE POST PUBLISHER */}
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

    </div>
  );
}
