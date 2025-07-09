
import React from 'react';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import CategoryManagementContent from '../components/admin/CategoryManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsManagement = () => {
  const reportsData = useCategoryManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...reportsData} />
        <CategoryManagementContent {...reportsData} />
      </div>
    </div>
  );
};

export default ReportsManagement;
