import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaMicrosoft, FaLinkedin } from 'react-icons/fa';
import { useUI } from '../../contexts/UIContext';
import './styles.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useUI();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'microsoft' | 'linkedin') => {
    setLoading(true);
    // TODO: Implement OAuth login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
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
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div>
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
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="text-green-500 text-sm mt-2">
                Password strength: Good
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2dd4bf] hover:bg-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2dd4bf] transition-colors duration-200"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="font-medium text-[#2dd4bf] hover:text-[#14b8a6]">
              Forgot your password?
            </a>
          </div>
        </form>

        <div className="text-blue-500 text-sm mt-4 text-center">
          Loading...
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={() => handleOAuthLogin('microsoft')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <FaMicrosoft className="h-5 w-5 text-blue-500" />
              <span className="ml-2">Microsoft</span>
            </button>
            <button
              onClick={() => handleOAuthLogin('linkedin')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <FaLinkedin className="h-5 w-5 text-blue-600" />
              <span className="ml-2">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 