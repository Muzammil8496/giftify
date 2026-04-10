// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, Gift, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { loginAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError('');

    try {
      const response = await loginAPI(formData.email, formData.password);

      if (response.success === true) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        window.dispatchEvent(new Event('authChange'));
        navigate(from, { replace: true });
        return;
      }

      setApiError(response.message || 'Invalid email or password');
    } catch (error) {
      setApiError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#fff7f5] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          
          {/* Left Panel - Login Form */}
          <div className="p-8 md:p-10 lg:p-12">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-semibold text-gray-800">mekog.</span>
            </div>

            {/* Success Message from Register */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
            <p className="text-gray-500 mb-6">Login to your account to continue</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Secure login</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">24/7 support</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                }`}>
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ayesha@gmail.com"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                }`}>
                  <Lock className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-[#ff5f8f] hover:text-[#ff8b5c] transition font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* API Error */}
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {apiError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login to my account
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <div className="w-4 h-4 bg-[#1877F2] rounded text-white flex items-center justify-center text-xs font-bold">f</div>
                Continue with Facebook
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#ff5f8f] font-semibold hover:underline">
                Register for free
              </Link>
            </p>
          </div>

          {/* Right Panel */}
          <div className="relative bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] p-8 md:p-10 flex items-center justify-center overflow-hidden">
            <div className="absolute w-64 h-64 rounded-full bg-white/10 top-[-80px] right-[-80px]"></div>
            <div className="absolute w-48 h-48 rounded-full bg-white/8 bottom-[-60px] left-[-60px]"></div>
            <div className="absolute w-32 h-32 rounded-full bg-white/12 bottom-20 right-10"></div>
            
            <div className="relative text-center z-10">
              <div className="text-7xl mb-4 animate-bounce">✨</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Good to see you again</h2>
              <p className="text-white/80 text-sm max-w-xs mx-auto">
                Your wishlist, orders and custom gifts are waiting for you
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Your wishlist</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Order history</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Custom gifts</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Saved addresses</span>
              </div>

              <div className="mt-8 space-y-2 text-left">
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>🎁 Perfect gift recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>⭐ 50,000+ happy customers</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>🚚 Free delivery on orders $50+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;