
import React from 'react';

const EmployeeStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalEmployees}</h3>
            <p className="mb-0">Tổng Nhân Viên</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.activeEmployees}</h3>
            <p className="mb-0">Đang Làm Việc</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.newEmployeesThisMonth}</h3>
            <p className="mb-0">Mới Tháng Này</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-danger">{statistics.inactiveEmployees}</h3>
            <p className="mb-0">Nghỉ Việc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatisticsSection;
