
import React from 'react';
import { useRentalManagement } from '../hooks/useRentalManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import RentalManagementContent from '../components/admin/RentalManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RentalManagement = () => {
  const rentalData = useRentalManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...rentalData} />
        <RentalManagementContent {...rentalData} />
      </div>
    </div>
  );
};

export default RentalManagement;
