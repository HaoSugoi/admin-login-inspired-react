
import React from 'react';

const OverallStatsSection = ({ statistics, isLoading, error, rawStats }) => {
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
            <h3 className="text-warning">{statistics.totalSaleBooks?.toLocaleString('vi-VN') || 0}</h3>
            <p className="mb-0">Tổng Sách Bán</p>
            <small className="text-muted">
              Giá trị: {formatCurrency(rawStats?.overview?.totalSaleBookValue || 0)}
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

      {/* Debug info (chỉ hiện trong development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6>🔍 Debug Info - Raw API Data</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <strong>Overview Stats:</strong>
                    <pre className="small">{JSON.stringify(rawStats?.overview, null, 2)}</pre>
                  </div>
                  <div className="col-md-6">
                    <strong>Daily Sale Stats:</strong>
                    <pre className="small">{JSON.stringify(rawStats?.dailySale, null, 2)}</pre>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <strong>Daily Rent Stats:</strong>
                    <pre className="small">{JSON.stringify(rawStats?.dailyRent, null, 2)}</pre>
                  </div>
                  <div className="col-md-6">
                    <strong>Monthly Sale Stats:</strong>
                    <pre className="small">{JSON.stringify(rawStats?.monthlySale, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallStatsSection;
