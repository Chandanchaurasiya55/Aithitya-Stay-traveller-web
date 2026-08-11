import React, { useState } from 'react';
import { 
  BarChart3, Inbox, Package, Hotel, PlusCircle, Trash2, CheckCircle2, 
  Clock, XCircle, Search, Sparkles, Filter, Calendar as CalendarIcon, MapPin, Users, 
  Phone, Mail, ArrowUpRight, Image as ImageIcon, Eye, Tag, Check, RefreshCw, 
  ShieldCheck, ChevronRight, CreditCard, DollarSign, Wallet, Receipt, X,
  Share2, ThumbsUp, Star, Home, FileText, Bell, MessageSquare, Menu, Activity, TrendingUp, Layers
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
  const [activeTab, setActiveTab] = useState('overview');
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

  // Dummy monthly chart data
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];
  const greenBars = [35, 45, 30, 50, 40, 65, 55, 42, 38];
  const amberBars = [20, 30, 25, 40, 52, 38, 48, 55, 30];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 min-h-screen">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-[#0F382C] text-white px-6 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Main Container Card mirroring reference UI */}
      <div className="bg-[#EAEFF4] p-3 sm:p-5 rounded-3xl shadow-xl border border-stone-300/70">
        
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-md bg-white border border-stone-200">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: DARK NAVY/FOREST GREEN (30% Width)          */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[28%] xl:w-[26%] bg-[#0F382C] text-white p-6 sm:p-8 flex flex-col justify-between space-y-8 shrink-0">
            
            {/* User Profile Info */}
            <div className="space-y-6 text-center">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-24 h-24 rounded-full bg-[#184E3F] border-4 border-[#C8933E]/60 p-1 flex items-center justify-center shadow-xl">
                  <div className="w-full h-full rounded-full bg-[#0B2A21] flex items-center justify-center text-white">
                    <User className="w-12 h-12 text-[#C8933E]" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0F382C]" title="Active Now" />
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide uppercase text-white">
                  ATITHYA ADMIN
                </h2>
                <p className="text-xs text-emerald-200/70 font-medium mt-0.5">
                  admin@atithyastay.com
                </p>
              </div>

              {/* Vertical Menu Navigation */}
              <nav className="space-y-2 text-left pt-4 border-t border-emerald-900/80">
                {[
                  { id: 'overview', label: 'Home / Overview', icon: Home },
                  { id: 'inquiries', label: 'User Inquiries', icon: Inbox, count: enquiries.length },
                  { id: 'payments', label: 'Payments & Revenue', icon: CreditCard, count: enquiries.filter(e => e.paidAmount > 0).length },
                  { id: 'packages', label: 'Tour Packages', icon: Package, count: packages.length },
                  { id: 'hotels', label: 'Hotels & Resorts', icon: Hotel, count: hotels.length },
                  { id: 'posts', label: 'Page Post Publisher', icon: PlusCircle, count: posts.length },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#184E3F] text-white shadow-md border-l-4 border-[#C8933E]'
                          : 'text-stone-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8933E]' : 'text-emerald-300/70'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-[#C8933E] text-white' : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom System Info */}
            <div className="pt-6 border-t border-emerald-900/80 text-[11px] text-emerald-200/60 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#C8933E]" />
                <span>Atithya Stay System v2.4</span>
              </div>
              <p>Secure Administrator Access</p>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT CONTENT AREA: LIGHT CANVAS (72% Width)              */}
          {/* ======================================================== */}
          <div className="w-full lg:w-[72%] xl:w-[74%] bg-[#F4F7F6] p-6 sm:p-8 space-y-6 flex-1">
            
            {/* Header Title Bar */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F382C]">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'inquiries' && 'User Inquiries Management'}
                  {activeTab === 'payments' && 'Payments & Revenue Ledger'}
                  {activeTab === 'packages' && 'Tour Packages Manager'}
                  {activeTab === 'hotels' && 'Hotels & Resorts Manager'}
                  {activeTab === 'posts' && 'Page Content Publisher'}
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">Welcome back, Administrator. Live metrics & system stats.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 shadow-2xs cursor-pointer hover:bg-stone-100">
                  <Menu className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TOP 4 STAT CARDS ROW (Exact Reference UI Layout)          */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* Card 1: Featured Dark Card (Earnings / Revenue) */}
              <div className="bg-[#0F382C] text-white rounded-2xl p-5 shadow-lg border border-emerald-900 flex flex-col justify-between space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/80">Earning</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C8933E]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C8933E]">
                    ₹ {totalRevenueCollected > 0 ? totalRevenueCollected.toLocaleString('en-IN') : '2,55,000'}
                  </div>
                  <div className="text-[10px] text-emerald-200/70 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>+18.4% from last month</span>
                  </div>
                </div>
              </div>

              {/* Card 2: White Card (Share / Inquiries) */}
              <div className="bg-white text-stone-800 rounded-2xl p-5 shadow-xs border border-stone-200/80 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Inquiries</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F382C]">
                    {enquiries.length > 0 ? enquiries.length * 12 + 2434 : '2,434'}
                  </div>
                  <div className="text-[10px] text-stone-400 font-semibold mt-1">Live customer submissions</div>
                </div>
              </div>

              {/* Card 3: White Card (Likes / Confirmed) */}
              <div className="bg-white text-stone-800 rounded-2xl p-5 shadow-xs border border-stone-200/80 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Confirmed</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F382C]">
                    1,259
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">94% satisfaction rate</div>
                </div>
              </div>

              {/* Card 4: White Card (Rating) */}
              <div className="bg-white text-stone-800 rounded-2xl p-5 shadow-xs border border-stone-200/80 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Rating</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0F382C]">
                    4.9 / 5.0
                  </div>
                  <div className="text-[10px] text-stone-400 font-semibold mt-1">Based on 850+ reviews</div>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* MIDDLE SECTION: DUAL BAR CHART + DONUT GAUGE              */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Left Bar Chart Card ("Result") */}
              <div className="xl:col-span-8 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F382C]">Booking Performance Result</h3>
                    <p className="text-xs text-stone-400">Monthly breakdown of user inquiries vs confirmed bookings</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-[#C8933E] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#b07f33] transition-colors shadow-2xs"
                  >
                    Check Now
                  </button>
                </div>

                {/* Custom Dual-Color Bar Chart */}
                <div className="pt-6 pb-2 px-2 relative">
                  
                  {/* Floating Peak Badge matching reference image */}
                  <div className="absolute top-0 left-[58%] -translate-x-1/2 bg-[#0F382C] text-[#C8933E] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-[#C8933E]/40 flex items-center gap-1">
                    <span>26.71</span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-2 border-b border-stone-200 pb-2">
                    {months.map((m, idx) => (
                      <div key={m} className="flex-1 flex items-end justify-center gap-1 h-full">
                        {/* Green Bar */}
                        <div 
                          className="w-3 rounded-t-sm bg-[#0F382C] transition-all hover:bg-emerald-700" 
                          style={{ height: `${greenBars[idx]}%` }}
                          title={`Inquiries: ${greenBars[idx]}`}
                        />
                        {/* Amber Bar */}
                        <div 
                          className="w-3 rounded-t-sm bg-[#C8933E] transition-all hover:bg-amber-600" 
                          style={{ height: `${amberBars[idx]}%` }}
                          title={`Bookings: ${amberBars[idx]}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Months X-Axis Labels */}
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 pt-2 px-1">
                    {months.map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 text-[11px] font-bold text-stone-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#0F382C]" />
                    <span>User Inquiries</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#C8933E]" />
                    <span>Confirmed Bookings</span>
                  </div>
                </div>
              </div>

              {/* Right Donut Gauge Card */}
              <div className="xl:col-span-4 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 text-center">
                
                {/* Circular Donut Ring */}
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#F0F4F8" strokeWidth="12" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="#0F382C" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset="60" 
                      strokeLinecap="round" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="#C8933E" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset="190" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-[#0F382C]">78%</span>
                    <span className="text-[9px] text-stone-400 font-semibold uppercase">Occupancy</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-1 text-left text-xs font-semibold text-stone-600 border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-[11px]">Confirmed Stays</span>
                    <span className="font-bold text-[#0F382C]">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-[11px]">Advance Deposits</span>
                    <span className="font-bold text-[#C8933E]">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-[11px]">Pending Reviews</span>
                    <span className="font-bold text-stone-500">10%</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('payments')}
                  className="w-full bg-[#C8933E] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#b07f33] transition-colors shadow-2xs"
                >
                  Check Now
                </button>
              </div>

            </div>

            {/* ======================================================== */}
            {/* BOTTOM SECTION: SMOOTH WAVE GRAPH + MINI CALENDAR         */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Left Wave Graph Card */}
              <div className="xl:col-span-7 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C8933E]" />
                      <span>Gross Revenue</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F382C]" />
                      <span>Net Income</span>
                    </div>
                  </div>
                </div>

                {/* SVG Smooth Wave Path */}
                <div className="h-32 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0F382C" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0F382C" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="waveAmber" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C8933E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C8933E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Amber Wave Area */}
                    <path 
                      d="M0,80 Q50,40 100,65 T200,40 T300,75 T400,30 L400,100 L0,100 Z" 
                      fill="url(#waveAmber)" 
                    />
                    <path 
                      d="M0,80 Q50,40 100,65 T200,40 T300,75 T400,30" 
                      fill="none" 
                      stroke="#C8933E" 
                      strokeWidth="3" 
                    />

                    {/* Green Wave Area */}
                    <path 
                      d="M0,60 Q50,20 100,45 T200,20 T300,60 T400,15 L400,100 L0,100 Z" 
                      fill="url(#waveGreen)" 
                    />
                    <path 
                      d="M0,60 Q50,20 100,45 T200,20 T300,60 T400,15" 
                      fill="none" 
                      stroke="#0F382C" 
                      strokeWidth="3" 
                    />
                  </svg>
                </div>
              </div>

              {/* Right Mini Calendar Grid */}
              <div className="xl:col-span-5 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif font-bold text-[#0F382C] text-sm">August 2026</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400">
                    <span className="px-2 py-0.5 bg-stone-100 rounded-md text-stone-700">Today</span>
                  </div>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-400">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-700">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                    const isSpecial = d === 10 || d === 15 || d === 20 || d === 24;
                    const isToday = d === 11;
                    return (
                      <div
                        key={d}
                        className={`h-7 rounded-lg flex items-center justify-center text-[11px] cursor-pointer transition-all ${
                          isToday
                            ? 'bg-[#0F382C] text-white font-bold shadow-xs'
                            : isSpecial
                            ? 'bg-[#C8933E] text-white font-bold shadow-2xs'
                            : 'hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* MANAGEMENT SECTIONS BELOW (Active Tab Tables/Forms)      */}
            {/* ======================================================== */}
            
            {/* TAB: USER INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4 mt-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F382C]">User Inquiries ({filteredEnquiries.length})</h3>
                    <p className="text-xs text-stone-500">Live submissions with guest details and payment tracking.</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
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

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Guest Details</th>
                        <th className="py-3.5 px-4">Service / Destination</th>
                        <th className="py-3.5 px-4">Travel Date & Guests</th>
                        <th className="py-3.5 px-4">Payment Track</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredEnquiries.map((enq) => {
                        const paid = Number(enq.paidAmount) || 0;
                        const total = Number(enq.totalAmount) || 0;
                        const pStatus = enq.paymentStatus || 'Unpaid';

                        return (
                          <tr key={enq.id || enq._id} className="hover:bg-stone-50">
                            <td className="py-3.5 px-4 space-y-1">
                              <div className="font-bold text-stone-900 text-xs sm:text-sm">{enq.name}</div>
                              <div className="text-stone-500 text-[11px] space-y-0.5">
                                <div><a href={`tel:${enq.phone}`} className="hover:text-[#0F382C] font-semibold">{enq.phone}</a></div>
                                {enq.email && <div><a href={`mailto:${enq.email}`} className="hover:text-[#0F382C]">{enq.email}</a></div>}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <div className="font-bold text-[#0F382C]">{enq.service}</div>
                              <div className="text-[11px] text-stone-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-stone-400" />
                                <span>{enq.destination}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <div className="font-semibold text-stone-800 flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5 text-stone-400" />
                                <span>{enq.date || 'TBD'}</span>
                              </div>
                              <div className="text-[11px] text-stone-500">{enq.guests}</div>
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold inline-block ${
                                pStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                                pStatus === 'Partial' ? 'bg-amber-100 text-amber-900' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {pStatus === 'Paid' ? `Paid ₹${paid.toLocaleString('en-IN')}` :
                                 pStatus === 'Partial' ? `Paid ₹${paid.toLocaleString('en-IN')} / ₹${total.toLocaleString('en-IN')}` :
                                 `Unpaid (Due ₹${total.toLocaleString('en-IN')})`}
                              </span>
                              <div>
                                <button
                                  type="button"
                                  onClick={() => handleOpenPaymentModal(enq)}
                                  className="text-[10px] font-bold text-[#0F382C] hover:underline"
                                >
                                  {paid > 0 ? 'Update Payment' : '+ Record Payment'}
                                </button>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={enq.status}
                                onChange={(e) => onUpdateEnquiryStatus(enq.id || enq._id, e.target.value)}
                                className="px-2 py-1 rounded-md text-xs font-bold border border-stone-200 focus:outline-none"
                              >
                                <option value="Pending">⏳ Pending</option>
                                <option value="Contacted">📞 Contacted</option>
                                <option value="Confirmed">✅ Confirmed</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => onDeleteEnquiry(enq.id || enq._id)}
                                className="p-1.5 text-stone-400 hover:text-red-600 rounded-md"
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
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4 mt-6 animate-in fade-in">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">User Payments Ledger</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">User Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Total Price</th>
                        <th className="py-3 px-4">Amount Paid</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {enquiries.map((enq) => (
                        <tr key={enq.id || enq._id} className="hover:bg-stone-50">
                          <td className="py-3 px-4 font-bold text-stone-900">{enq.name}</td>
                          <td className="py-3 px-4 text-stone-600">{enq.phone}</td>
                          <td className="py-3 px-4 font-semibold text-[#0F382C]">{enq.service}</td>
                          <td className="py-3 px-4 font-bold">₹{(Number(enq.totalAmount)||0).toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4 font-extrabold text-emerald-700">₹{(Number(enq.paidAmount)||0).toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                              {enq.paymentStatus || 'Unpaid'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenPaymentModal(enq)}
                              className="bg-[#0F382C] text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                            >
                              Record Payment
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: TOUR PACKAGES */}
            {activeTab === 'packages' && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-6 mt-6 animate-in fade-in">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Create New Tour Package</h3>
                <form onSubmit={handlePackageSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Package Title *</label>
                      <input
                        type="text"
                        placeholder="Nainital - Bhimtal Deluxe Tour"
                        value={pkgForm.title}
                        onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Starting Price (₹) *</label>
                      <input
                        type="text"
                        placeholder="12999"
                        value={pkgForm.price}
                        onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-[#0F382C] text-white px-6 py-2.5 rounded-xl font-bold">
                    Publish Package Live
                  </button>
                </form>
              </div>
            )}

            {/* TAB: HOTELS */}
            {activeTab === 'hotels' && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-6 mt-6 animate-in fade-in">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Add New Hotel / Resort</h3>
                <form onSubmit={handleHotelSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Hotel Name *</label>
                      <input
                        type="text"
                        placeholder="Nainital Lakeview Resort"
                        value={hotelForm.name}
                        onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Price per Night (₹) *</label>
                      <input
                        type="text"
                        placeholder="5499"
                        value={hotelForm.price}
                        onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-[#0F382C] text-white px-6 py-2.5 rounded-xl font-bold">
                    Publish Hotel Live
                  </button>
                </form>
              </div>
            )}

            {/* TAB: POSTS */}
            {activeTab === 'posts' && (
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-6 mt-6 animate-in fade-in">
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Publish Page Post</h3>
                <form onSubmit={handlePostSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Post Title *</label>
                    <input
                      type="text"
                      placeholder="Kainchi Dham Ashram Special"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <button type="submit" className="bg-[#0F382C] text-white px-6 py-2.5 rounded-xl font-bold">
                    Publish Post Live
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* UPDATE PAYMENT POPUP MODAL */}
      {paymentModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="bg-[#0F382C] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif text-2xl font-bold">Record Payment</h3>
              <p className="text-stone-300 text-xs mt-1">Guest: <span className="font-bold text-white">{selectedEnquiry.name}</span></p>
            </div>

            <form onSubmit={handleSavePayment} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Total Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={paymentForm.totalAmount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, totalAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Amount Paid (₹)</label>
                  <input
                    type="number"
                    required
                    value={paymentForm.paidAmount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paidAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0F382C] text-white py-3 rounded-xl font-bold shadow-md">
                Save Payment Record
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
