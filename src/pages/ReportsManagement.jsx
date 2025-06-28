
import React from 'react';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import ReportsManagementContent from '../components/admin/ReportsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsManagement = () => {
  const reportsData = useCategoryManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...reportsData} />
        <ReportsManagementContent {...reportsData} />
      </div>
    </div>
  );
};

export default ReportsManagement;
