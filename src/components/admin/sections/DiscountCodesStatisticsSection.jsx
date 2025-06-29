
import React from 'react';

const DiscountCodesStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="stats-card bg-primary">
            <div className="stats-value">{statistics.totalCodes}</div>
            <div className="stats-label">Tổng Mã Giảm Giá</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card bg-success">
            <div className="stats-value">{statistics.activeCodes}</div>
            <div className="stats-label">Mã Đang Hoạt Động</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card bg-warning">
            <div className="stats-value">{statistics.usedCodes}</div>
            <div className="stats-label">Mã Đã Sử Dụng</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card bg-info">
            <div className="stats-value">{statistics.totalSavings}đ</div>
            <div className="stats-label">Tổng Tiết Kiệm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodesStatisticsSection;
