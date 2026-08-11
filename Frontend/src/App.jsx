import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import PackageDetailModal from './components/PackageDetailModal';
import LoginModal from './components/LoginModal';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';

import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';
import DestinationsPage from './pages/DestinationsPage';
import TourPackagesPage from './pages/TourPackagesPage';
import WeddingsPage from './pages/WeddingsPage';
import CorporatePage from './pages/CorporatePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';

export default function App() {
  // Modals & Auth State with localStorage Persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('atithya_is_user_logged_in') === 'true';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('atithya_is_admin_auth') === 'true';
  });

  // Navigation tab state ('home' default)
  const [activeTab, setActiveTab] = useState(() => {
    const isAuth = localStorage.getItem('atithya_is_admin_auth') === 'true';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('admin') || path.includes('/admin')) {
      return isAuth ? 'admin' : 'admin-login';
    }
    const saved = localStorage.getItem('atithya_active_tab');
    if (saved === 'admin' && !isAuth) return 'admin-login';
    return saved || 'home';
  });

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Sync auth & tab state to localStorage
  useEffect(() => {
    localStorage.setItem('atithya_is_user_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('atithya_is_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('atithya_active_tab', activeTab);
  }, [activeTab]);

  // Check URL hash/path for admin routes (/admin, /admin/login, /admin-login, #admin, etc.)
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const storedAdminAuth = localStorage.getItem('atithya_is_admin_auth') === 'true';

      if (hash.includes('admin') || path.includes('/admin') || search.includes('admin')) {
        if (!storedAdminAuth && !isAdminAuthenticated) {
          setActiveTab('admin-login');
        } else {
          setActiveTab('admin');
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [isAdminAuthenticated]);

  // --- DYNAMIC DATA STATES ---
  const [enquiries, setEnquiries] = useState(() => {
    const local = localStorage.getItem('atithya_enquiries');
    return local ? JSON.parse(local) : [
      {
        id: 'enq-1',
        name: 'Rahul Sharma',
        phone: '+91 9876543210',
        email: 'rahul.sharma@example.com',
        destination: 'Nainital',
        service: 'Nainital Family Getaway',
        guests: '4 Guests, 2 Rooms',
        date: '2026-08-10',
        notes: 'Looking for lake view rooms and transport included.',
        status: 'Pending',
        paidAmount: 5000,
        totalAmount: 15000,
        paymentStatus: 'Partial',
        paymentMethod: 'UPI (GPay)',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'enq-2',
        name: 'Priya Singh',
        phone: '+91 9123456789',
        email: 'priya.singh@gmail.com',
        destination: 'Jim Corbett',
        service: 'Destination Weddings',
        guests: '150 Guests',
        date: '2026-11-20',
        notes: 'Destination wedding venue inquiry for 3 days.',
        status: 'Contacted',
        paidAmount: 50000,
        totalAmount: 250000,
        paymentStatus: 'Partial',
        paymentMethod: 'Bank Transfer (NEFT)',
        createdAt: new Date().toISOString(),
      }
    ];
  });

  const [packages, setPackages] = useState(() => {
    const local = localStorage.getItem('atithya_packages');
    return local ? JSON.parse(local) : [
      {
        id: 'pkg-1',
        title: 'Nainital Family Getaway',
        subtitle: 'Lakes, Mountains & Peace',
        duration: '2 Nights / 3 Days',
        category: 'Family Tours',
        badge: 'Best Seller',
        badgeColor: 'bg-red-600',
        price: '6,999',
        priceUnit: 'person',
        rating: '4.9 (120 Reviews)',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        specs: ['Hotel', 'Sightseeing', 'Breakfast', 'Taxi'],
        highlights: [
          'Handpicked 3-Star & 4-Star mountain view luxury stays',
          'Private dedicated vehicle with experienced local driver',
          'Boating at Naini Lake & ropeway ride',
          'Zero hidden charges & 100% price guarantee'
        ]
      },
      {
        id: 'pkg-2',
        title: 'Jim Corbett Wildlife Tour',
        subtitle: 'Adventure in the Lap of Nature',
        duration: '3 Nights / 4 Days',
        category: 'Adventure',
        badge: 'Popular',
        badgeColor: 'bg-[#0F382C]',
        price: '13,999',
        priceUnit: 'person',
        rating: '4.8 (210 Reviews)',
        image: '/corbett_tiger.png',
        specs: ['Hotel', 'Meals', 'Safari', 'Transport'],
        highlights: [
          'Jeep Safari inside Jim Corbett National Park core zone',
          'Stay at luxury riverside jungle resort',
          'Bonfire and live acoustic music evening',
          'All meals included with local Kumaoni delicacies'
        ]
      },
      {
        id: 'pkg-3',
        title: 'Chardham Yatra Package',
        subtitle: 'Spiritual Journey to the Abode of Gods',
        duration: '9 Nights / 10 Days',
        category: 'Spiritual Tours',
        badge: 'Trending',
        badgeColor: 'bg-amber-600',
        price: '28,999',
        priceUnit: 'person',
        rating: '4.9 (340 Reviews)',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
        specs: ['Hotel', 'Meals', 'Guide', 'Transport'],
        highlights: [
          'Complete VIP Darshan assistance at Yamunotri, Gangotri, Kedarnath & Badrinath',
          'Comfortable AC tempo traveller transfer',
          'Special medical assistance & emergency support',
          'Experienced tour leader throughout the pilgrimage'
        ]
      }
    ];
  });

  const [hotels, setHotels] = useState(() => {
    const local = localStorage.getItem('atithya_hotels');
    return local ? JSON.parse(local) : [
      {
        id: 'htl-1',
        name: 'Corbett Fun Resort',
        location: 'Jim Corbett, Uttarakhand',
        dest: 'Jim Corbett',
        rating: '4.8 (750 Reviews)',
        price: '5,499',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tag: 'Luxury Jungle Resort',
        amenities: ['Pool', 'Restaurant', 'WiFi', 'Parking', 'Spa', 'Jungle View']
      },
      {
        id: 'htl-2',
        name: 'Nainital Lakeview Palace & Resort',
        location: 'Mall Road, Nainital',
        dest: 'Nainital',
        rating: '4.9 (520 Reviews)',
        price: '6,299',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        tag: 'Heritage Lake View',
        amenities: ['Lake View', 'Restaurant', 'WiFi', 'Heater', 'Room Service']
      },
      {
        id: 'htl-3',
        name: 'Mussoorie Hilltop Spa & Resort',
        location: 'Library Bazaar, Mussoorie',
        dest: 'Mussoorie',
        rating: '4.7 (410 Reviews)',
        price: '7,499',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        tag: 'Mountain Panorama',
        amenities: ['Spa', 'Infinity Pool', 'WiFi', 'Bonfire', 'Valley View']
      }
    ];
  });

  const [posts, setPosts] = useState(() => {
    const local = localStorage.getItem('atithya_posts');
    return local ? JSON.parse(local) : [
      {
        id: 'post-1',
        page: 'destinations',
        title: 'Kainchi Dham Ashram',
        subtitle: 'Spiritual Retreat & Neem Karoli Baba Temple',
        image: '/kainchi_dham.png',
        description: 'A world-famous spiritual sanctuary located near Bhowali in Uttarakhand, attracting seekers from across the globe.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'post-2',
        page: 'weddings',
        title: 'Bhimtal Lakefront Mandap',
        subtitle: 'Exclusive Water Pier Wedding Venue',
        image: '/wedding_hero.png',
        description: 'Say your vows under flower-adorned mandaps over serene waters surrounded by misty Himalayan hills.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'post-3',
        page: 'corporate',
        title: 'Corbett Jungle Leadership Retreat',
        subtitle: 'Executive Team Outing & Strategy Meet',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        description: 'Transformative corporate retreats featuring team building games, jungle safaris, and luxury conference facilities.',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('atithya_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('atithya_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('atithya_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('atithya_posts', JSON.stringify(posts));
  }, [posts]);

  // Fetch initial data from Express Backend API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const enqRes = await fetch(`${API_BASE_URL}/enquiries`);
        if (enqRes.ok) {
          const enqJson = await enqRes.json();
          if (enqJson.data && enqJson.data.length > 0) setEnquiries(enqJson.data);
        }

        const pkgRes = await fetch(`${API_BASE_URL}/packages`);
        if (pkgRes.ok) {
          const pkgJson = await pkgRes.json();
          if (pkgJson.data && pkgJson.data.length > 0) setPackages(pkgJson.data);
        }

        const htlRes = await fetch(`${API_BASE_URL}/hotels`);
        if (htlRes.ok) {
          const htlJson = await htlRes.json();
          if (htlJson.data && htlJson.data.length > 0) setHotels(htlJson.data);
        }

        const pstRes = await fetch(`${API_BASE_URL}/posts`);
        if (pstRes.ok) {
          const pstJson = await pstRes.json();
          if (pstJson.data && pstJson.data.length > 0) setPosts(pstJson.data);
        }
      } catch (err) {
        console.log('Backend API offline or connecting... using local persistent state.');
      }
    };

    fetchBackendData();
  }, []);

  // Handlers for Admin & User Operations
  const handleAddEnquiry = async (newEnq) => {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setEnquiries(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const enqObject = {
      id: 'enq-' + Date.now(),
      ...newEnq,
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [enqObject, ...prev]);
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    setEnquiries(prev => prev.map(e => (e.id === id || e._id === id) ? { ...e, status } : e));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) { console.log(err); }
  };

  const handleUpdateEnquiryPayment = async (id, paymentData) => {
    setEnquiries(prev => prev.map(e => (e.id === id || e._id === id) ? { ...e, ...paymentData } : e));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
    } catch (err) { console.log(err); }
  };

  const handleDeleteEnquiry = async (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id && e._id !== id));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddPackage = async (newPkg) => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPkg)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setPackages(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const pkgObj = {
      id: 'pkg-' + Date.now(),
      badge: 'Popular',
      badgeColor: 'bg-[#0F382C]',
      rating: '5.0 (New)',
      ...newPkg
    };
    setPackages(prev => [pkgObj, ...prev]);
  };

  const handleDeletePackage = async (id) => {
    setPackages(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await fetch(`${API_BASE_URL}/packages/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddHotel = async (newHtl) => {
    try {
      const res = await fetch(`${API_BASE_URL}/hotels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHtl)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setHotels(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const htlObj = {
      id: 'htl-' + Date.now(),
      rating: '4.9 (New)',
      ...newHtl
    };
    setHotels(prev => [htlObj, ...prev]);
  };

  const handleDeleteHotel = async (id) => {
    setHotels(prev => prev.filter(h => h.id !== id && h._id !== id));
    try {
      await fetch(`${API_BASE_URL}/hotels/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddPost = async (newPst) => {
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPst)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setPosts(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const pstObj = {
      id: 'post-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...newPst
    };
    setPosts(prev => [pstObj, ...prev]);
  };

  const handleDeletePost = async (id) => {
    setPosts(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleOpenEnquiry = (title = '') => {
    setEnquiryTitle(title);
    setEnquiryModalOpen(true);
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('atithya_is_user_logged_in', 'false');
    setActiveTab('home');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('atithya_is_admin_auth', 'true');
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.setItem('atithya_is_admin_auth', 'false');
    localStorage.setItem('atithya_active_tab', 'admin-login');
    setActiveTab('admin-login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 antialiased selection:bg-[#0F382C] selection:text-white">
      
      {/* Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenLogin={() => setLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onOpenEnquiry={handleOpenEnquiry}
            onSelectPackage={handleSelectPackage}
            setActiveTab={setActiveTab}
            featuredPackages={packages}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsPage
            onOpenEnquiry={handleOpenEnquiry}
            hotelsList={hotels}
            postsList={posts.filter(p => p.page === 'hotels')}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsPage
            onOpenEnquiry={handleOpenEnquiry}
            setActiveTab={setActiveTab}
            postsList={posts.filter(p => p.page === 'destinations')}
          />
        )}

        {activeTab === 'packages' && (
          <TourPackagesPage
            onOpenEnquiry={handleOpenEnquiry}
            onSelectPackage={handleSelectPackage}
            packagesList={packages}
          />
        )}

        {activeTab === 'weddings' && (
          <WeddingsPage 
            onOpenEnquiry={handleOpenEnquiry} 
            postsList={posts.filter(p => p.page === 'weddings')}
          />
        )}

        {activeTab === 'corporate' && (
          <CorporatePage 
            onOpenEnquiry={handleOpenEnquiry} 
            postsList={posts.filter(p => p.page === 'corporate')}
          />
        )}

        {activeTab === 'about' && (
          <AboutUsPage onOpenEnquiry={handleOpenEnquiry} />
        )}

        {activeTab === 'contact' && (
          <ContactUsPage onAddEnquiry={handleAddEnquiry} />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            enquiries={enquiries}
            packages={packages}
            onOpenEnquiry={handleOpenEnquiry}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'admin-login' && (
          <AdminLoginPage
            onAdminLoginSuccess={handleAdminLoginSuccess}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            enquiries={enquiries}
            packages={packages}
            hotels={hotels}
            posts={posts}
            onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
            onUpdateEnquiryPayment={handleUpdateEnquiryPayment}
            onDeleteEnquiry={handleDeleteEnquiry}
            onAddPackage={handleAddPackage}
            onDeletePackage={handleDeletePackage}
            onAddHotel={handleAddHotel}
            onDeleteHotel={handleDeleteHotel}
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
            onAdminLogout={handleAdminLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultPackageTitle={enquiryTitle}
        onAddEnquiry={handleAddEnquiry}
      />

      {/* Detailed Package View Modal */}
      <PackageDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onEnquire={handleOpenEnquiry}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
