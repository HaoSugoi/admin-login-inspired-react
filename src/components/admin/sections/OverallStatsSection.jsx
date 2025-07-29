
import React from 'react';

const OverallStatsSection = ({ statistics, isLoading, error, rawStats }) => {
  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="col-12 mb-4">
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-md-2 mb-3">
              <div className="section-card text-center">
                <div className="placeholder-glow">
                  <span className="placeholder col-6 bg-secondary"></span>
                  <p className="placeholder col-8 bg-secondary mt-2"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Hiển thị error state
  if (error) {
    return (
      <div className="col-12 mb-4">
        <div className="alert alert-danger" role="alert">
          <h6>❌ Lỗi tải dữ liệu thống kê</h6>
          <p className="mb-0">Không thể tải dữ liệu từ server. Vui lòng thử lại sau.</p>
        </div>
      </div>
    );
  }

  // Format số tiền Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Format số với separator
  const formatNumber = (num) => {
    return (num || 0).toLocaleString('vi-VN');
  };

  return (
    <div className="col-12 mb-4">
      {/* Tổng quan chính */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{formatCurrency(statistics.totalRevenue)}</h3>
            <p className="mb-0"><strong>Tổng Doanh Thu</strong></p>
            <small className="text-muted">
              Hôm nay: {formatCurrency(statistics.todayRevenue)}
            </small>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{formatNumber(statistics.totalOrders)}</h3>
            <p className="mb-0"><strong>Tổng Đơn Hàng</strong></p>
            <small className="text-muted">
              Hôm nay: {formatNumber(statistics.todayOrders)}
            </small>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{formatCurrency(statistics.monthRevenue)}</h3>
            <p className="mb-0"><strong>Doanh Thu Tháng</strong></p>
            <small className="text-muted">
              Đơn hàng: {formatNumber(statistics.monthOrders)}
            </small>
          </div>
        </div>
      </div>

      {/* Chi tiết Sale và Rent */}
    
      {/* Thông tin ngày tạo */}
    
    </div>
  );
};

export default OverallStatsSection;
