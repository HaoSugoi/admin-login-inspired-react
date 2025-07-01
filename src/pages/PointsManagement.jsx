
import React from 'react';
import { usePointsManagement } from '../hooks/usePointsManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import PointsManagementContent from '../components/admin/PointsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PointsManagement = () => {
  const pointsData = usePointsManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...pointsData} />
        <PointsManagementContent {...pointsData} />
      </div>
    </div>
  );
};

export default PointsManagement;
