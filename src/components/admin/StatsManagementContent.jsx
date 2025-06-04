
import React from 'react';
import AdminTopbar from './AdminTopbar';
import OverallStatsSection from './sections/OverallStatsSection';
import RevenueStatsSection from './sections/RevenueStatsSection';

const StatsManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Báo Cáo Thống Kê</h4>
          </div>
        </div>

        <div className="row">
          <OverallStatsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <RevenueStatsSection statistics={props.statistics} />
        </div>
      </div>
    </div>
  );
};

export default StatsManagementContent;
