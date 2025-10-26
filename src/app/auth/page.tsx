'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Backend base URL
const API_BASE = '/api';

export default function AuthPage() {
  const router = useRouter();
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  // form state
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hide global header/footer on auth page
    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  // Removed automatic redirects to always allow access to auth page

  const handleAuth = () => {
    try {
      localStorage.setItem('authed', 'true');
      // Set an auth cookie for middleware (30 days)
      document.cookie = 'auth=1; Path=/; Max-Age=2592000; SameSite=Lax';
    } catch {}
    router.replace('/home');
  };

  // Submit handlers
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signinData.email, password: signinData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      // Persist token for API calls and set simple cookie for middleware routing
      localStorage.setItem('token', data.token);
      localStorage.setItem('authed', 'true');
      document.cookie = 'auth=1; Path=/; Max-Age=2592000; SameSite=Lax';
      router.replace('/home');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const name = [signupData.firstName, signupData.lastName].filter(Boolean).join(' ').trim();
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: signupData.email, password: signupData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('authed', 'true');
      document.cookie = 'auth=1; Path=/; Max-Age=2592000; SameSite=Lax';
      router.replace('/home');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setError(null);
    try { 
      console.log('Password reset successful');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }

    
  };

  return (
    <motion.section
      key="auth"
      className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-5xl grid md:grid-cols-2 gap-0 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-gray-100"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Visual / Brand side */}
        <div className="relative hidden md:block bg-gradient-to-br from-primary to-secondary text-white p-10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_25%),radial-gradient(circle_at_80%_0%,white,transparent_25%)]" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold">Welcome to CoolAir</h3>
              <p className="mt-3 text-white/90">Premium Air Conditioning Solutions for home and office.</p>
            </div>
            <ul className="space-y-3 text-white/95">
              <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span> Energy-efficient cooling</li>
              <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span> Trusted by thousands</li>
              <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span> 24/7 expert support</li>
            </ul>
          </div>
        </div>

        {/* Auth form side */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{authTab === 'signin' ? 'Sign in' : 'Create account'}</h1>
            <p className="mt-2 text-gray-500">Access CoolAir features and manage your preferences.</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => { setAuthTab('signin'); setError(null); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                authTab === 'signin' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setAuthTab('signup'); setError(null); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                authTab === 'signup' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Sign up
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {authTab === 'signin' ? (
              <motion.form
                key="signin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleLoginSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signinData.email}
                    onChange={(e) => setSigninData((s) => ({ ...s, email: e.target.value }))}
                    required
                    className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signinData.password}
                    onChange={(e) => setSigninData((s) => ({ ...s, password: e.target.value }))}
                    required
                    className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    Remember me
                  </label>
                  
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>

                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
                
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSignupSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData((s) => ({ ...s, firstName: e.target.value }))}
                      required
                      className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData((s) => ({ ...s, lastName: e.target.value }))}
                      required
                      className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData((s) => ({ ...s, email: e.target.value }))}
                    required
                    className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData((s) => ({ ...s, password: e.target.value }))}
                      required
                      className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData((s) => ({ ...s, confirmPassword: e.target.value }))}
                      required
                      className="mt-1 w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
                  <p className="text-sm text-gray-600">I agree to the <a className="text-primary hover:underline" href="#">Terms</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:opacity-95 transition disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer text */}
          <p className="mt-8 text-xs text-gray-500">By continuing, you agree to CoolAir's Terms of Service and acknowledge the Privacy Policy.</p>
        </div>
      </motion.div>
    </motion.section>
  );
}
