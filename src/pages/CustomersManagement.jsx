
import React from 'react';
import { useCustomersManagement } from '../hooks/useCustomersManagement.jsx';
import AdminSidebar from '../components/admin/AdminSidebar';
import CustomersManagementContent from '../components/admin/CustomersManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomersManagement = () => {
  const customersData = useCustomersManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...customersData} />
        <CustomersManagementContent {...customersData} />
      </div>
    </div>
  );
};

export default CustomersManagement;
