import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

const LoginForm = () => {
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
      navigate('/admin');
    } catch (error) {
      const errorMessage = (error as Error)?.message || 'Đăng nhập thất bại';
      toast.error(errorMessage);
      console.error('Login failed:', error);
    }
  };

  return (
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
  );
};

export default LoginForm;
