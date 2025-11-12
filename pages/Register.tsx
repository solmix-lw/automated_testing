import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    telegramId: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/test');
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const newUser = register(userData);

    alert(`Registration successful! Your Student ID is: ${newUser.studentId}`);
    navigate('/test');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Student Registration</h1>
            <p className="mt-2 text-blue-100">Register to take the test</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="+1 234 567 8900"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="telegramId" className="mb-2 block text-sm font-semibold text-slate-700">
                Telegram ID <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                id="telegramId"
                type="text"
                value={formData.telegramId}
                onChange={(e) => handleChange('telegramId', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="@username"
              />
            </div>

            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                Username *
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.username
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="Choose a username"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="Minimum 6 characters"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-blue-800">
                  A unique Student ID will be automatically generated for you upon registration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700"
              >
                Register
              </button>
              <Link
                to="/"
                className="rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/" className="font-semibold text-blue-600 hover:text-blue-700">
                Go to Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
