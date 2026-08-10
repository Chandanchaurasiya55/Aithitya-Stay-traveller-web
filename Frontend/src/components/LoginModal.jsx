import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, LogIn, UserPlus, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Atithya Stay Member</span>
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {isRegister ? 'Register Guest Account' : 'Account Login'}
          </h3>
          <p className="text-stone-300 text-xs mt-1">
            {isRegister 
              ? 'Fill in your details to create a new Atithya Stay account.' 
              : 'Sign in to access your bookings, itinerary vouchers & billing.'}
          </p>
        </div>

        {/* Content */}
        {loggedIn ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#0F382C]">
              {isRegister ? 'Account Created Successfully!' : 'Welcome Back!'}
            </h4>
            <p className="text-stone-600 text-xs font-semibold">
              Opening your Traveler Dashboard...
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Register Fields */}
              {isRegister && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              {isRegister ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone Number or Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="+91 9876543210 or email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Address / City *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 Park Street, Delhi / Nainital"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-3"
              >
                {isRegister ? <UserPlus className="w-4 h-4 text-[#C8933E]" /> : <LogIn className="w-4 h-4 text-[#C8933E]" />}
                <span>{isRegister ? 'Register Account' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Switch Between Login and Register */}
            <div className="text-center pt-2 border-t border-stone-100">
              {isRegister ? (
                <p className="text-xs text-stone-500 font-medium">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-[#0F382C] font-extrabold hover:underline"
                  >
                    Sign In Now
                  </button>
                </p>
              ) : (
                <p className="text-xs text-stone-500 font-medium">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-[#0F382C] font-extrabold hover:underline"
                  >
                    Register Now
                  </button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
