
import React from 'react';
import AdminTopbar from './AdminTopbar';
import EmployeeActivitiesSection from './sections/EmployeeActivitiesSection';
import EmployeeActivitiesStatisticsSection from './sections/EmployeeActivitiesStatisticsSection';

const EmployeeActivitiesManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Hoạt Động Nhân Viên</h4>
          </div>
        </div>

        <div className="row">
          <EmployeeActivitiesStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <EmployeeActivitiesSection 
            activities={props.activities}
            searchStaffId={props.searchStaffId}
            onSearchChange={props.handleSearchChange}
            onSearch={props.handleSearch}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeActivitiesManagementContent;
