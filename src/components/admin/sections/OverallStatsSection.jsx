
import React from 'react';

const OverallStatsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.totalRevenue.toLocaleString('vi-VN')}đ</h3>
            <p className="mb-0">Tổng Doanh Thu</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalOrders}</h3>
            <p className="mb-0">Tổng Đơn Hàng</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.totalBooks}</h3>
            <p className="mb-0">Tổng Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.totalUsers}</h3>
            <p className="mb-0">Tổng Người Dùng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStatsSection;
