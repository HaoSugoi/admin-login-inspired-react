
import React from 'react';

const OverallStatsSection = ({ statistics, isLoading, error }) => {
  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="col-12 mb-4">
        <div className="row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="col-md-3 mb-3">
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

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{formatCurrency(statistics.totalRevenue)}</h3>
            <p className="mb-0">Tổng Doanh Thu</p>
            <small className="text-muted">
              Hôm nay: {formatCurrency(statistics.todayRevenue)}
            </small>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalOrders?.toLocaleString('vi-VN') || 0}</h3>
            <p className="mb-0">Tổng Đơn Hàng</p>
            <small className="text-muted">
              Hôm nay: {statistics.todayOrders?.toLocaleString('vi-VN') || 0}
            </small>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.totalBooks?.toLocaleString('vi-VN') || 0}</h3>
            <p className="mb-0">Tổng Sách</p>
            <small className="text-muted">
              Tuần này: {statistics.weekOrders?.toLocaleString('vi-VN') || 0} đơn
            </small>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.totalUsers?.toLocaleString('vi-VN') || 0}</h3>
            <p className="mb-0">Tổng Người Dùng</p>
            <small className="text-muted">
              Tháng này: {formatCurrency(statistics.monthRevenue)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStatsSection;
