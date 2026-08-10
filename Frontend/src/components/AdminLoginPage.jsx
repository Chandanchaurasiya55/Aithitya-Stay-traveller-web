import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage({ onAdminLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Default admin credentials check
    if (
      (credentials.username.toLowerCase() === 'admin' && credentials.password === 'admin123') ||
      (credentials.username.toLowerCase() === 'atithya' && credentials.password === 'atithya123')
    ) {
      setSuccess(true);
      setTimeout(() => {
        onAdminLoginSuccess();
      }, 1000);
    } else {
      setError('Invalid Admin Username or Password. Hint: use admin / admin123');
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
          <h1 className="font-serif text-3xl font-bold text-[#0F382C]">Admin Portal Login</h1>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Please enter your administrator credentials to access management controls.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-bold text-lg text-[#0F382C]">Access Granted!</h3>
            <p className="text-xs text-stone-500">Opening Administrator Control Panel...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Admin Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-2"
            >
              <Lock className="w-4 h-4 text-[#C8933E]" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
