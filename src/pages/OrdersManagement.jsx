
import React from 'react';
import { useOrdersManagement } from '../hooks/useOrdersManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import OrdersManagementContent from '../components/admin/OrdersManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrdersManagement = () => {
  const ordersData = useOrdersManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...ordersData} />
        <OrdersManagementContent {...ordersData} />
      </div>
    </div>
  );
};

export default OrdersManagement;
