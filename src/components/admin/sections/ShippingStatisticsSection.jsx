
import React from 'react';

const ShippingStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalShipments}</h3>
            <p className="mb-0">Tổng Đơn Giao</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.pendingShipments}</h3>
            <p className="mb-0">Chờ Xử Lý</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.inTransitShipments}</h3>
            <p className="mb-0">Đang Giao</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.deliveredShipments}</h3>
            <p className="mb-0">Đã Giao</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingStatisticsSection;
