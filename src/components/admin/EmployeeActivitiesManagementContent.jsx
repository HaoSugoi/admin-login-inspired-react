// src/components/Admin/EmployeeActivitiesManagementContent.jsx
import React from "react";
import AdminTopbar from "./AdminTopbar";
import EmployeeActivitiesSection from "./sections/EmployeeActivitiesSection";
import EmployeeActivitiesStatisticsSection from "./sections/EmployeeActivitiesStatisticsSection";

const EmployeeActivitiesManagementContent = ({
  activities,
  statistics,
  searchStaffId,
  handleSearchChange,
  handleSearch,
  isLoading
}) => {
  return (
    <div className="col-md-9 col-lg-10 main-content px-4 py-3">
      <AdminTopbar />

      <div className="content-section">
        <div className="row mb-3">
          <div className="col-12">
            <h4 className="text-success fw-bold">
              Quản Lý Hoạt Động Nhân Viên
            </h4>
          </div>
        </div>

        {/* Thống kê */}
        <div className="row mb-4">
          <EmployeeActivitiesStatisticsSection statistics={statistics} />
        </div>

        {/* Danh sách hoạt động + Tìm kiếm */}
        <div className="row">
          <EmployeeActivitiesSection
            activities={activities}
            searchStaffId={searchStaffId}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeActivitiesManagementContent