
import React from 'react';
import { useSalesOrdersManagement } from '../hooks/useSalesOrdersManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import SalesOrdersManagementContent from '../components/admin/SalesOrdersManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesOrdersManagement = () => {
  const salesOrdersData = useSalesOrdersManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...salesOrdersData} />
        <SalesOrdersManagementContent {...salesOrdersData} />
      </div>
    </div>
  );
};

export default SalesOrdersManagement;
