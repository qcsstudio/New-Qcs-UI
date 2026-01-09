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
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: 'linear-gradient(135deg, #ffedd5, #ffffff, #fed7aa)',
      }}
    >
      <div
        className="w-100"
        style={{ maxWidth: '420px' }}
      >
        <div
          className="p-4 rounded-4 shadow-lg border"
          style={{
            backdropFilter: 'blur(16px)',
            background: 'rgba(255,255,255,0.4)',
            borderColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <h2 className="text-center fw-bold text-warning-emphasis">
            Welcome Back
          </h2>
          <p className="text-center text-muted small mb-4">
            Login to your dashboard
          </p>

          <form onSubmit={handleLogin} className="d-grid gap-3">
            <div>
              <label className="form-label small fw-medium text-secondary">
                User Id
              </label>
              <input
                type="text"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="form-control shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderColor: '#fed7aa',
                }}
              />
            </div>

            <div>
              <label className="form-label small fw-medium text-secondary">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="form-control shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderColor: '#fed7aa',
                }}
              />
            </div>

            {error && (
              <div className="text-danger text-center small">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center text-muted small mt-4">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
