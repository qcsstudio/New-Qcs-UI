'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-center text-3xl font-bold text-orange-600">Welcome Back</h2>
        <p className="text-center text-sm text-gray-700 mt-1 mb-6">Login to your dashboard</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Id</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 bg-white/60 border border-orange-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 bg-white/60 border border-orange-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-sm text-gray-600 text-center mt-6">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
