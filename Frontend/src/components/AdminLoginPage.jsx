import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Sparkles, CheckCircle2, UserPlus, Mail, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage({ onAdminLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({ 
    fullName: '',
    username: '', 
    email: '',
    securityKey: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getStoredAdmins = () => {
    const local = localStorage.getItem('atithya_admins');
    return local ? JSON.parse(local) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      // Registration Logic
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }
      if (credentials.password.length < 4) {
        setError('Password must be at least 4 characters long.');
        return;
      }

      // Save to registered admins in localStorage
      const existingAdmins = getStoredAdmins();
      const newAdmin = {
        fullName: credentials.fullName,
        username: credentials.username.toLowerCase(),
        email: credentials.email,
        password: credentials.password,
        createdAt: new Date().toISOString()
      };

      existingAdmins.push(newAdmin);
      localStorage.setItem('atithya_admins', JSON.stringify(existingAdmins));

      setSuccess(true);
      setTimeout(() => {
        onAdminLoginSuccess();
      }, 1000);

    } else {
      // Login Logic
      const inputIdentifier = credentials.username.trim().toLowerCase();
      const storedAdmins = getStoredAdmins();
      const isStoredAdminValid = storedAdmins.some(
        a => (
          (a.username && a.username.toLowerCase() === inputIdentifier) ||
          (a.email && a.email.toLowerCase() === inputIdentifier)
        ) && a.password === credentials.password
      );

      if (
        (inputIdentifier === 'admin' && credentials.password === 'admin123') ||
        (inputIdentifier === 'atithya' && credentials.password === 'atithya123') ||
        isStoredAdminValid
      ) {
        setSuccess(true);
        setTimeout(() => {
          onAdminLoginSuccess();
        }, 1000);
      } else {
        setError('Invalid Admin Username or Password.');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-stone-200 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Restricted Access</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#0F382C]">
            {isRegister ? 'Register Admin Account' : 'Admin Portal Login'}
          </h1>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            {isRegister 
              ? 'Create a new administrator account with full control access.' 
              : 'Please enter your administrator credentials to access management controls.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-bold text-lg text-[#0F382C]">
              {isRegister ? 'Admin Account Created!' : 'Access Granted!'}
            </h3>
            <p className="text-xs text-stone-500">Opening Administrator Control Panel...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Register Fields */}
            {isRegister && (
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Super Admin"
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-stone-700 mb-1">Admin Username or Email *</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Enter username or email"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="admin@atithya.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-stone-700 mb-1">Password *</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block font-bold text-stone-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={credentials.confirmPassword}
                    onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-2"
            >
              {isRegister ? <UserPlus className="w-4 h-4 text-[#C8933E]" /> : <Lock className="w-4 h-4 text-[#C8933E]" />}
              <span>{isRegister ? 'Register Admin Account' : 'Unlock Admin Panel'}</span>
            </button>
          </form>
        )}

        {/* Switch between Login and Register at bottom */}
        <div className="text-center pt-3 border-t border-stone-100">
          {isRegister ? (
            <p className="text-xs text-stone-500 font-medium">
              Already have an admin account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(''); }}
                className="text-[#0F382C] font-extrabold hover:underline"
              >
                Sign In to Admin Portal
              </button>
            </p>
          ) : (
            <p className="text-xs text-stone-500 font-medium">
              Don't have an admin account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(''); }}
                className="text-[#0F382C] font-extrabold hover:underline"
              >
                Register Admin Account
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
