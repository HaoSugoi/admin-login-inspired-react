
import React from 'react';
import { useRentalOrdersManagement } from '../hooks/useRentalOrdersManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import RentalOrdersManagementContent from '../components/admin/RentalOrdersManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RentalOrdersManagement = () => {
  const rentalOrdersData = useRentalOrdersManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...rentalOrdersData} />
        <RentalOrdersManagementContent {...rentalOrdersData} />
      </div>
    </div>
  );
};

export default RentalOrdersManagement;
