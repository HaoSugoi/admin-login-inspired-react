
import React from 'react';

const OrderStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalOrders}</h3>
            <p className="mb-0">Tổng Đơn Hàng</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.pendingOrders}</h3>
            <p className="mb-0">Chờ Xử Lý</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.totalRentals}</h3>
            <p className="mb-0">Tổng Đơn Thuê</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.totalRevenue.toLocaleString('vi-VN')}đ</h3>
            <p className="mb-0">Doanh Thu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatisticsSection;
