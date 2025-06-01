import React, { useState, lazy, Suspense, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useUI } from '../../contexts/UIContext';
import { submitLoginForm } from '../../services/api';
import ErrorBoundary from '../../components/ErrorBoundary';
import './styles.css';

const SocialLoginButtons = lazy(() => import('../../components/SocialLoginButtons'));

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  rememberDevice: boolean;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useUI();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
    rememberDevice: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitLoginForm(formData);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
              Welcome to Cliniio
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <span id="emailHelp" className="sr-only">Enter your email address.</span>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-label="Email address"
                    aria-describedby="emailHelp"
                    tabIndex={0}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid email address.
              </p>
              <div>
                <span id="passwordHelp" className="sr-only">Enter your account password.</span>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    aria-label="Password"
                    aria-describedby="passwordHelp"
                    tabIndex={0}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className="text-green-500 text-sm mt-2">
                  Password strength: Good
                </div>
                <p className="text-red-500 text-sm mt-2">
                  Password must be at least 8 characters.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    aria-label="Remember me"
                    tabIndex={0}
                    className="h-4 w-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="remember-device"
                    name="remember-device"
                    type="checkbox"
                    aria-label="Remember device"
                    tabIndex={0}
                    className="h-4 w-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-device" className="ml-2 block text-sm text-gray-900">
                    Remember this device
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                tabIndex={0}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2dd4bf] hover:bg-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-[#2dd4bf] transition-colors duration-200"
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <a href="#" tabIndex={0} className="font-medium text-[#2dd4bf] hover:text-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Forgot your password?
              </a>
            </div>
          </form>

          <Suspense fallback={<div>Loading Social Logins...</div>}>
            <SocialLoginButtons />
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(LoginForm); 