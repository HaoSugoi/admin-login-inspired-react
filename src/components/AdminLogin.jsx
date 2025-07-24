
import React from 'react';
import Logo from './auth/Logo';
import LoginForm from './auth/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ 
           background: 'linear-gradient(135deg, #46a162ff 0%, #c1f7d4ff 100%)' 
         }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {/* Logo Section */}
        <Logo />

        {/* Login Form */}
        <LoginForm />

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
