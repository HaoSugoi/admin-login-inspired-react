
import React from 'react';
import { useEmployeeActivitiesManagement } from '../hooks/useEmployeeActivitiesManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import EmployeeActivitiesManagementContent from '../components/admin/EmployeeActivitiesManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeActivitiesManagement = () => {
  const activitiesData = useEmployeeActivitiesManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...activitiesData} />
        <EmployeeActivitiesManagementContent {...activitiesData} />
      </div>
    </div>
  );
};

export default EmployeeActivitiesManagement;
