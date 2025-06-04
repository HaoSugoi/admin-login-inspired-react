
import React from 'react';
import { useUsersManagement } from '../hooks/useUsersManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import UsersManagementContent from '../components/admin/UsersManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersManagement = () => {
  const usersData = useUsersManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...usersData} />
        <UsersManagementContent {...usersData} />
      </div>
    </div>
  );
};

export default UsersManagement;
