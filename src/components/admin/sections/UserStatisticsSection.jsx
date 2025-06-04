
import React from 'react';

const UserStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalUsers}</h3>
            <p className="mb-0">Tổng Người Dùng</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.activeUsers}</h3>
            <p className="mb-0">Đang Hoạt Động</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.newUsersThisMonth}</h3>
            <p className="mb-0">Mới Tháng Này</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.adminUsers}</h3>
            <p className="mb-0">Quản Trị Viên</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsSection;
