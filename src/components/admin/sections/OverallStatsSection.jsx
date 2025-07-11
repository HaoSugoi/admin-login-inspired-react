
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
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📊 Thống Kê Bán Sách</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 className="text-primary">{formatNumber(statistics.totalSaleOrders)}</h4>
                    <p className="mb-0">Tổng Đơn Bán</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 className="text-success">{formatCurrency(statistics.totalSaleAmount)}</h4>
                    <p className="mb-0">Tổng Giá Trị</p>
                  </div>
                </div>
              </div>
              
              <hr />
              
              <div className="row">
                <div className="col-12 mb-2">
                  <strong>📅 Hôm nay:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.dailySale.ordersToday)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.dailySale.totalValueToday)}</small>
                </div>
                <div className="col-12 mb-2">
                  <strong>🗓️ Tháng này:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.monthlySale.ordersThisMonth)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.monthlySale.totalValueThisMonth)}</small>
                </div>
                <div className="col-12">
                  <strong>📆 Năm này:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.yearlySale.ordersThisYear)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.yearlySale.totalValueThisYear)}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">📚 Thống Kê Cho Thuê</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 className="text-warning">{formatNumber(statistics.totalRentOrders)}</h4>
                    <p className="mb-0">Tổng Đơn Thuê</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center mb-3">
                    <h4 className="text-success">{formatCurrency(statistics.totalRentAmount)}</h4>
                    <p className="mb-0">Tổng Giá Trị</p>
                  </div>
                </div>
              </div>
              
              <hr />
              
              <div className="row">
                <div className="col-12 mb-2">
                  <strong>📅 Hôm nay:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.dailyRent.ordersToday)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.dailyRent.totalValueToday)}</small>
                </div>
                <div className="col-12 mb-2">
                  <strong>🗓️ Tháng này:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.monthlyRent.ordersThisMonth)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.monthlyRent.totalValueThisMonth)}</small>
                </div>
                <div className="col-12">
                  <strong>📆 Năm này:</strong>
                  <br />
                  <small>Đơn hàng: {formatNumber(statistics.yearlyRent.ordersThisYear)}</small>
                  <br />
                  <small>Giá trị: {formatCurrency(statistics.yearlyRent.totalValueThisYear)}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin ngày tạo */}
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <h6>📍 Thông Tin Ngày Dữ Liệu:</h6>
            <div className="row">
              <div className="col-md-6">
                <strong>Sale:</strong>
                <br />
                <small>Ngày hôm nay: {statistics.dailySale.createdDate ? new Date(statistics.dailySale.createdDate).toLocaleDateString('vi-VN') : 'N/A'}</small>
                <br />
                <small>Số ngày tháng này: {statistics.monthlySale.createdDates.length}</small>
              </div>
              <div className="col-md-6">
                <strong>Rent:</strong>
                <br />
                <small>Ngày hôm nay: {statistics.dailyRent.createdDate ? new Date(statistics.dailyRent.createdDate).toLocaleDateString('vi-VN') : 'N/A'}</small>
                <br />
                <small>Số ngày tháng này: {statistics.monthlyRent.createdDates.length}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStatsSection;
