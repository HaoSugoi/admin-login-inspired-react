import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      toast.success('Đăng nhập thành công!');
      navigate('/admin'); // Chuyển hướng đến trang admin
    } catch (error: any) {
      const errorMessage = error?.message || 'Đăng nhập thất bại';
      toast.error(errorMessage);
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ 
           background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' 
         }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {/* Logo Section */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3">
            <div className="position-relative">
              {/* Book base */}
              <div className="rounded position-relative" 
                   style={{ 
                     width: '64px', 
                     height: '48px', 
                     backgroundColor: '#bbf7d0' 
                   }}>
                <div className="position-absolute rounded" 
                     style={{ 
                       top: '4px', 
                       left: '4px', 
                       right: '4px', 
                       bottom: '4px', 
                       backgroundColor: 'white' 
                     }}></div>
                <div className="position-absolute d-flex flex-column" 
                     style={{ 
                       left: '8px', 
                       top: '8px', 
                       right: '8px', 
                       gap: '4px' 
                     }}>
                  <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
                  <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
                  <div className="rounded" style={{ height: '2px', backgroundColor: '#86efac' }}></div>
                </div>
              </div>
              
              {/* Leaves */}
              <div className="position-absolute" 
                   style={{ 
                     top: '-16px', 
                     left: '50%', 
                     transform: 'translateX(-50%)' 
                   }}>
                <div className="position-relative">
                  {/* Center stem */}
                  <div className="mx-auto" 
                       style={{ 
                         width: '2px', 
                         height: '24px', 
                         backgroundColor: '#059669' 
                       }}></div>
                  
                  {/* Leaves arranged in a fan pattern */}
                  <div className="position-absolute" 
                       style={{ 
                         top: '0', 
                         left: '50%', 
                         transform: 'translateX(-50%)' 
                       }}>
                    {/* Top leaf */}
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(-12deg)', 
                           left: '-4px', 
                           top: '-4px' 
                         }}></div>
                    {/* Left leaves */}
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(-45deg)', 
                           left: '-8px', 
                           top: '4px' 
                         }}></div>
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(-75deg)', 
                           left: '-8px', 
                           top: '12px' 
                         }}></div>
                    {/* Right leaves */}
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(12deg)', 
                           left: '4px', 
                           top: '-4px' 
                         }}></div>
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(45deg)', 
                           left: '8px', 
                           top: '4px' 
                         }}></div>
                    <div className="position-absolute rounded-pill" 
                         style={{ 
                           width: '12px', 
                           height: '24px', 
                           backgroundColor: '#10b981', 
                           transform: 'rotate(75deg)', 
                           left: '8px', 
                           top: '12px' 
                         }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-success fs-5 fw-semibold">Có & Lá</h2>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded p-4 shadow" 
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-secondary fw-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-control border-success"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@email.com"
                required
                disabled={isLoggingIn}
                style={{ 
                  borderColor: '#bbf7d0',
                  borderWidth: '2px'
                }}
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-secondary fw-medium">
                Password
              </label>
              <div className="position-relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control border-success pe-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={isLoggingIn}
                  style={{ 
                    borderColor: '#bbf7d0',
                    borderWidth: '2px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn position-absolute"
                  disabled={isLoggingIn}
                  style={{ 
                    right: '8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    color: '#6c757d',
                    padding: '0'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="keep-signed-in"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                disabled={isLoggingIn}
                style={{ borderColor: '#86efac' }}
              />
              <label className="form-check-label text-secondary" htmlFor="keep-signed-in">
                Keep me signed in
              </label>
            </div>

            {/* Error message */}
            {loginError && (
              <div className="alert alert-danger mb-3" role="alert">
                {loginError.message || 'Đăng nhập thất bại'}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2"
              disabled={isLoggingIn}
              style={{ 
                backgroundColor: '#059669',
                borderColor: '#059669'
              }}
            >
              {isLoggingIn ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang đăng nhập...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <a 
            href="#" 
            className="text-success text-decoration-none"
            style={{ fontSize: '0.875rem' }}
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
