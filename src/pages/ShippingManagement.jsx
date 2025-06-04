
import React from 'react';
import { useShippingManagement } from '../hooks/useShippingManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import ShippingManagementContent from '../components/admin/ShippingManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShippingManagement = () => {
  const shippingData = useShippingManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...shippingData} />
        <ShippingManagementContent {...shippingData} />
      </div>
    </div>
  );
};

export default ShippingManagement;
