
import React from 'react';
import { useAuthorsManagement } from '../hooks/useAuthorsManagement.jsx';
import AdminSidebar from '../components/admin/AdminSidebar';
import AuthorsManagementContent from '../components/admin/AuthorsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthorsManagement = () => {
  const authorsData = useAuthorsManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...authorsData} />
        <AuthorsManagementContent {...authorsData} />
      </div>
    </div>
  );
};

export default AuthorsManagement;
