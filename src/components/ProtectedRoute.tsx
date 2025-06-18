
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Hiển thị loading trong khi kiểm tra authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component
  return <>{children}</>;
};

export default ProtectedRoute;
