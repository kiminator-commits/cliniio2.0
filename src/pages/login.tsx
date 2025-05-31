import React, { useState } from 'react';
import { FaGoogle, FaMicrosoft, FaFacebook, FaLinkedin, FaTerminal } from 'react-icons/fa';

const getPasswordStrength = (password: string) => {
  if (!password) return '';
  if (password.length < 6) return 'Weak';
  if (password.length < 10) return 'Medium';
  return 'Strong';
};

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-login-container mx-auto bg-background text-text shadow-login-container rounded-login-container p-login-container">
        <h2 className="text-heading font-bold mb-lg text-center text-text">Login to Cliniio</h2>
        <form className="space-y-md">
          <div>
            <label htmlFor="email" className="block text-small font-medium text-text mb-xs">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-form-input px-md py-sm border border-border rounded-form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base transition-all duration-200"
              placeholder="test@cliniio.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-small font-medium text-text mb-xs">
              Password <span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-form-input px-md py-sm border border-border rounded-form-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base pr-16 transition-all duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-sm top-1/2 transform -translate-y-1/2 text-small text-secondary hover:text-hover-secondary focus:outline-none focus:ring-2 focus:ring-primary rounded p-xs"
                onClick={() => setShowPassword(s => !s)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {password && (
                <>
                  Strength: <span className={
                    passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }>{passwordStrength}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="rememberMe" className="text-small text-text">
              Remember me
            </label>
          </div>

          <div className="flex items-center gap-sm">
            <input
              type="checkbox"
              id="rememberDevice"
              checked={rememberDevice}
              onChange={e => setRememberDevice(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="rememberDevice" className="text-small text-text">
              Remember this device
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-teal text-white h-form-input px-md rounded-form-input hover:bg-teal-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal focus:ring-offset-white disabled:opacity-50 text-large font-medium animate-pulse-slow"
            disabled={!email || !password}
          >
            Login
          </button>
        </form>

        <div className="mt-md text-center">
          <button type="button" className="text-small text-primary hover:text-hover-primary focus:outline-none">
            Forgot Password?
          </button>
        </div>

        <div className="mt-lg">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-border" />
            <span className="mx-md text-secondary text-small">Or continue with</span>
            <div className="flex-grow border-t border-border" />
          </div>
          <div className="flex justify-center gap-sm mt-md">
            <button className="hover:bg-gray-100 rounded-full p-sm" aria-label="Google"><FaGoogle className="text-[#EA4335] text-2xl" /></button>
            <button className="hover:bg-gray-100 rounded-full p-sm" aria-label="Microsoft"><FaMicrosoft className="text-[#0078D4] text-2xl" /></button>
            <button className="hover:bg-gray-100 rounded-full p-sm" aria-label="Facebook"><FaFacebook className="text-[#1877F3] text-2xl" /></button>
            <button className="hover:bg-gray-100 rounded-full p-sm" aria-label="LinkedIn"><FaLinkedin className="text-[#0A66C2] text-2xl" /></button>
            <button className="hover:bg-gray-100 rounded-full p-sm" aria-label="Other"><FaTerminal className="text-[#b2f2bb] text-2xl" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 