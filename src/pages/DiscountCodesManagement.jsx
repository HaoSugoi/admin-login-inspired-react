
import React from 'react';
import { useDiscountCodesManagement } from '../hooks/useDiscountCodesManagement.jsx';
import AdminSidebar from '../components/admin/AdminSidebar';
import DiscountCodesManagementContent from '../components/admin/DiscountCodesManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DiscountCodesManagement = () => {
  const discountData = useDiscountCodesManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...discountData} />
        <DiscountCodesManagementContent {...discountData} />
      </div>
    </div>
  );
};

export default DiscountCodesManagement;
