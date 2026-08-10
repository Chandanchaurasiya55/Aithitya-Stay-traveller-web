import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, User, LogOut, ChevronDown, Ticket } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin, isLoggedIn, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-2xs">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-22 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group shrink-0 py-1"
        >
          <img 
            src="/logo.jpeg" 
            alt="Atithya Stay Logo" 
            className="h-16 sm:h-20 lg:h-22 w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-105" 
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#0F382C] font-bold'
                    : 'text-stone-700 hover:text-[#0F382C]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C8933E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Login Button OR Profile Avatar Icon */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-emerald-50 hover:bg-emerald-100 text-[#0F382C] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-300 shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span>My Profile</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100 hover:text-[#0F382C] transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-[#C8933E]" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-2 shadow-sm border border-emerald-900 transition-all hover:scale-105"
            >
              <User className="w-4 h-4 text-[#C8933E]" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button & Mobile Profile Icon */}
        <div className="lg:hidden flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="sm:hidden bg-[#0F382C] text-white p-2 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <User className="w-4 h-4 text-[#C8933E]" />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="sm:hidden bg-[#0F382C] text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <User className="w-4 h-4 text-[#C8933E]" />
              <span>Login</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-[#0F382C] text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-bold text-[#0F382C] bg-emerald-50"
            >
              My Dashboard
            </button>
          )}

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="bg-[#0F382C] text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5 text-[#C8933E]" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
