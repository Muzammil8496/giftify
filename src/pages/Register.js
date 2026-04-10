import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Gift,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { registerAPI } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validatePasswordStrength = (password) => {
    return {
      hasCapital: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    };
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const strength = validatePasswordStrength(formData.password);
      if (!strength.hasMinLength) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!strength.hasCapital) {
        newErrors.password = 'Password must contain at least one capital letter';
      } else if (!strength.hasNumber) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!strength.hasSpecial) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await registerAPI(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );

      if (response.success === true) {
        navigate('/login', {
          state: {
            message: response.message || 'Account created successfully. Please login.',
          },
        });
        return;
      }

      setApiError(response.message || 'Registration failed. Please try again.');
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData.password ? validatePasswordStrength(formData.password) : null;
  const isPasswordStrong =
    passwordStrength &&
    passwordStrength.hasCapital &&
    passwordStrength.hasNumber &&
    passwordStrength.hasSpecial &&
    passwordStrength.hasMinLength;

  return (
    <div className="min-h-screen bg-[#fff7f5] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-semibold text-gray-800">mekog.</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h1>
            <p className="text-gray-500 mb-6">Join thousands of happy gift buyers</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Free to join</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">No spam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Secure</span>
              </div>
            </div>

            {apiError && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {apiError}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full name <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                  }`}
                >
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ayesha Khan"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                  }`}
                >
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone number <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 focus-within:border-[#ff5f8f] transition-all">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                  }`}
                >
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

                {formData.password && (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-1 flex-1 rounded-full ${
                          isPasswordStrong ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      ></div>
                      <span className={`text-xs ${isPasswordStrong ? 'text-green-600' : 'text-red-500'}`}>
                        {isPasswordStrong ? '✓ Strong password' : 'Weak password'}
                      </span>
                    </div>
                    <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                      <li className={formData.password.length >= 8 ? 'text-green-600 line-through' : ''}>
                        • Minimum 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'text-green-600 line-through' : ''}>
                        • Capital letter (A-Z)
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? 'text-green-600 line-through' : ''}>
                        • Number (0-9)
                      </li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600 line-through' : ''}>
                        • Special character (!@#$%^&*)
                      </li>
                    </ul>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 py-2.5 transition-all ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[#ff5f8f]'
                  }`}
                >
                  <Lock className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword &&
                  !errors.confirmPassword && (
                    <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Passwords match
                    </p>
                  )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Create account
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
              <button className="w-full py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button className="w-full py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-[#1877F2] rounded text-white flex items-center justify-center text-xs font-bold">
                  f
                </div>
                Continue with Facebook
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#ff5f8f] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-[#ff8b5c] via-[#ff5f8f] to-[#6c5cff] p-8 md:p-10 flex items-center justify-center overflow-hidden">
            <div className="absolute w-64 h-64 rounded-full bg-white/10 top-[-80px] right-[-80px]"></div>
            <div className="absolute w-48 h-48 rounded-full bg-white/8 bottom-[-60px] left-[-60px]"></div>
            <div className="absolute w-32 h-32 rounded-full bg-white/12 bottom-20 right-10"></div>

            <div className="relative text-center z-10">
              <div className="text-7xl mb-4 animate-bounce">🎁</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Perfect gifts, every time</h2>
              <p className="text-white/80 text-sm max-w-xs mx-auto">
                Join mekog and discover beautiful gifts for every occasion and every budget
              </p>

              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Perfume</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Watches</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Jewelry</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Custom Gifts</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Flowers</span>
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-xs">Bundles</span>
              </div>

              <div className="mt-6 p-3 bg-white/10 rounded-xl text-left">
                <p className="text-white text-xs font-semibold mb-2">Password Requirements:</p>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>✓ Capital letter (A-Z)</li>
                  <li>✓ Number (0-9)</li>
                  <li>✓ Special character (!@#$%^&*)</li>
                  <li>✓ Minimum 8 characters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;