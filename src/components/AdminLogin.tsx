import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, keepSignedIn });
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              {/* Book base */}
              <div className="w-16 h-12 bg-green-200 rounded-sm relative">
                <div className="absolute inset-1 bg-white rounded-sm"></div>
                <div className="absolute left-2 top-2 right-2 space-y-1">
                  <div className="h-0.5 bg-green-300 rounded"></div>
                  <div className="h-0.5 bg-green-300 rounded"></div>
                  <div className="h-0.5 bg-green-300 rounded"></div>
                </div>
              </div>
              
              {/* Leaves */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Center stem */}
                  <div className="w-0.5 h-6 bg-green-600 mx-auto"></div>
                  
                  {/* Leaves arranged in a fan pattern */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    {/* Top leaf */}
                    <div className="w-3 h-6 bg-green-500 rounded-full transform -rotate-12 absolute -left-1 -top-1"></div>
                    {/* Left leaves */}
                    <div className="w-3 h-6 bg-green-500 rounded-full transform -rotate-45 absolute -left-2 top-1"></div>
                    <div className="w-3 h-6 bg-green-500 rounded-full transform -rotate-75 absolute -left-2 top-3"></div>
                    {/* Right leaves */}
                    <div className="w-3 h-6 bg-green-500 rounded-full transform rotate-12 absolute left-1 -top-1"></div>
                    <div className="w-3 h-6 bg-green-500 rounded-full transform rotate-45 absolute left-2 top-1"></div>
                    <div className="w-3 h-6 bg-green-500 rounded-full transform rotate-75 absolute left-2 top-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-green-600 text-lg font-semibold">Có & Lá</h2>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@email.com"
                className="w-full border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border-green-200 focus:border-green-500 focus:ring-green-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keep-signed-in"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
                className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <label 
                htmlFor="keep-signed-in" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-200"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <a 
            href="#" 
            className="text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
