
import React from 'react';

const PromotionsStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Thống Kê Khuyến Mãi</span>
        </div>
        
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-primary">{statistics.totalPromotions}</h4>
              <p className="mb-0">Tổng Khuyến Mãi</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-success">{statistics.activePromotions}</h4>
              <p className="mb-0">Đang Hoạt Động</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-warning">{statistics.expiredPromotions}</h4>
              <p className="mb-0">Đã Hết Hạn</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-info">{statistics.totalUsage}</h4>
              <p className="mb-0">Lượt Sử Dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsStatisticsSection;
