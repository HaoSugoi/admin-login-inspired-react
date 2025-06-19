
import React from 'react';
import { useEmployeesManagement } from '../hooks/useEmployeesManagement.jsx';
import AdminSidebar from '../components/admin/AdminSidebar';
import EmployeesManagementContent from '../components/admin/EmployeesManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeesManagement = () => {
  const employeesData = useEmployeesManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...employeesData} />
        <EmployeesManagementContent {...employeesData} />
      </div>
    </div>
  );
};

export default EmployeesManagement;
