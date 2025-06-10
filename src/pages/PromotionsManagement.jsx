
import React from 'react';
import { usePromotionsManagement } from '../hooks/usePromotionsManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import PromotionsManagementContent from '../components/admin/PromotionsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PromotionsManagement = () => {
  const promotionsData = usePromotionsManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...promotionsData} />
        <PromotionsManagementContent {...promotionsData} />
      </div>
    </div>
  );
};

export default PromotionsManagement;
