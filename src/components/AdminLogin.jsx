import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAdminLogin } from '../hooks/useAdminLogin';
import '../styles/AdminLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    keepSignedIn,
    setKeepSignedIn,
    handleSubmit,
    togglePasswordVisibility
  } = useAdminLogin();

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        {/* Logo Section */}
        <div className="logo-container">
          <div className="logo-icon">
            <div className="position-relative">
              {/* Book base */}
              <div className="book-base">
                <div className="book-inner"></div>
                <div className="book-lines">
                  <div className="book-line"></div>
                  <div className="book-line"></div>
                  <div className="book-line"></div>
                </div>
              </div>
              
              {/* Leaves */}
              <div className="leaves-container">
                <div className="position-relative">
                  {/* Center stem */}
                  <div className="center-stem"></div>
                  
                  {/* Leaves arranged in a fan pattern */}
                  <div className="leaves-group">
                    {/* Top leaf */}
                    <div className="leaf leaf-top"></div>
                    {/* Left leaves */}
                    <div className="leaf leaf-left-1"></div>
                    <div className="leaf leaf-left-2"></div>
                    {/* Right leaves */}
                    <div className="leaf leaf-right-1"></div>
                    <div className="leaf leaf-right-2"></div>
                    <div className="leaf leaf-right-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="brand-title">Có & Lá</h2>
        </div>

        {/* Login Form */}
        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-secondary fw-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-control form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-secondary fw-medium">
                Password
              </label>
              <div className="password-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control form-input pe-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="btn password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="form-check mb-3">
              <input
                className="form-check-input checkbox-custom"
                type="checkbox"
                id="keep-signed-in"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <label className="form-check-label text-secondary" htmlFor="keep-signed-in">
                Keep me signed in
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2 login-button"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="footer-container">
          <a href="#" className="forgot-password-link">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
