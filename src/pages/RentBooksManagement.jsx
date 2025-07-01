
import React from 'react';
import { useRentBooksManagement } from '../hooks/useRentBooksManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import RentBooksManagementContent from '../components/admin/RentBooksManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RentBooksManagement = () => {
  const rentBooksData = useRentBooksManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...rentBooksData} />
        <RentBooksManagementContent {...rentBooksData} />
      </div>
    </div>
  );
};

export default RentBooksManagement;
