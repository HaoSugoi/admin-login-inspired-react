
import React from 'react';
import { useRolesManagement } from '../hooks/useRolesManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import RolesManagementContent from '../components/admin/RolesManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RolesManagement = () => {
  const rolesData = useRolesManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...rolesData} />
        <RolesManagementContent {...rolesData} />
      </div>
    </div>
  );
};

export default RolesManagement;
