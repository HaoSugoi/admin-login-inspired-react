
import React from 'react';
import { useStatsManagement } from '../hooks/useStatsManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import StatsManagementContent from '../components/admin/StatsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatsManagement = () => {
  const statsData = useStatsManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...statsData} />
        <StatsManagementContent {...statsData} />
      </div>
    </div>
  );
};

export default StatsManagement;
