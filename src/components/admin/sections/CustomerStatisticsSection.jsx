
import React from 'react';

const CustomerStatisticsSection = ({ statistics = {} }) => {
  const {
    totalCustomers = 0,
    activeCustomers = 0,
    newCustomersThisMonth = 0,
    inactiveCustomers = 0,
  } = statistics;

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{totalCustomers}</h3>
            <p className="mb-0">Tổng Khách Hàng</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{activeCustomers}</h3>
            <p className="mb-0">Đang Hoạt Động</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{newCustomersThisMonth}</h3>
            <p className="mb-0">Mới Tháng Này</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-danger">{inactiveCustomers}</h3>
            <p className="mb-0">Không Hoạt Động</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CustomerStatisticsSection;
