
import React from 'react';

const RentalStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalRentals}</h3>
            <p className="mb-0">Tổng Lượt Thuê</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.activeRentals}</h3>
            <p className="mb-0">Đang Thuê</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-danger">{statistics.overdueRentals}</h3>
            <p className="mb-0">Quá Hạn</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.totalFines}đ</h3>
            <p className="mb-0">Tổng Tiền Phạt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalStatisticsSection;
