
import React from 'react';
import { useAdminIndex } from '../hooks/useAdminIndex';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import AdminDashboardContent from '../components/admin/AdminDashboardContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const adminData = useAdminIndex();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...adminData} />
        <AdminDashboardContent {...adminData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
