import React, { useState, useEffect } from 'react';

const RevenueStatsSection = ({ 
  statistics, 
  rawStats, 
  onSetSaleDate, 
  onSetRentDate, 
  isSettingDate 
}) => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Xử lý khi thay đổi period hoặc ngày
  useEffect(() => {
    const periodType = timePeriod === 'day' ? 'day' : timePeriod === 'week' ? 'month' : 'month';
    
    if (onSetSaleDate) onSetSaleDate(periodType, selectedDate);
    if (onSetRentDate) onSetRentDate(periodType, selectedDate);
  }, [timePeriod, selectedDate]);

  // Lấy dữ liệu biểu đồ từ rawStats
  const getChartData = () => {
    if (rawStats && rawStats[timePeriod]) {
      return rawStats[timePeriod];
    }

    // Fallback data khi chưa có dữ liệu
    return Array.from({ length: timePeriod === 'day' ? 5 : timePeriod === 'week' ? 7 : 4 }, (_, i) => ({
      period: timePeriod === 'day' 
        ? `${i * 6}:00` 
        : timePeriod === 'week' 
          ? `Thứ ${i + 2}` 
          : `Tuần ${i + 1}`,
      sales: 0,
      rent: 0,
      total: 0
    }));
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => item.total), 1) || 1;

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Hàm định dạng số
  const formatNumber = (num) => {
    return (num || 0).toLocaleString('vi-VN');
  };

  // Xác định nhãn cho period
  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'day': return 'Theo Giờ';
      case 'week': return 'Theo Ngày trong Tuần';
      case 'month': return 'Theo Tuần trong Tháng';
      default: return 'Theo Tháng';
    }
  };

  return (
    <div className="col-12 mb-4 position-relative">
      {isSettingDate && (
        <div className="overlay d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold">Báo Cáo Doanh Thu Chi Tiết</span>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="date"
              className="form-control form-control-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={isSettingDate}
            />
            <select 
              className="form-select form-select-sm w-auto"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              disabled={isSettingDate}
            >
              <option value="day">Theo Giờ</option>
              <option value="week">Theo Tuần</option>
              <option value="month">Theo Tháng</option>
            </select>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-primary mb-2">📊 Sale Orders Hôm Nay</h6>
                <p className="fs-5 mb-1 fw-bold">{formatNumber(statistics.dailySale.ordersToday)}</p>
                <small className="text-muted">{formatCurrency(statistics.dailySale.totalValueToday)}</small>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-warning mb-2">📚 Rent Orders Hôm Nay</h6>
                <p className="fs-5 mb-1 fw-bold">{formatNumber(statistics.dailyRent.ordersToday)}</p>
                <small className="text-muted">{formatCurrency(statistics.dailyRent.totalValueToday)}</small>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-success mb-2">🗓️ Tháng Này</h6>
                <p className="mb-1 fw-bold">Sale: {formatNumber(statistics.monthlySale.ordersThisMonth)}</p>
                <p className="mb-0">Rent: {formatNumber(statistics.monthlyRent.ordersThisMonth)}</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h6 className="text-info mb-2">💰 Tổng Giá Trị</h6>
                <p className="fs-5 mb-1 fw-bold">{formatCurrency(statistics.monthRevenue)}</p>
                <small className="text-muted">Tháng hiện tại</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* Biểu đồ */}
        <div className="chart-container bg-light p-3 rounded mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Biểu đồ doanh thu</h6>
            <div>
              <span className="text-muted small">{getPeriodLabel()}</span>
              {isSettingDate && <span className="badge bg-warning ms-2">Đang cập nhật...</span>}
            </div>
          </div>
          
          <div className="chart-bars d-flex align-items-end" style={{ height: '200px' }}>
            {chartData.map((item, index) => (
              <div 
                key={index} 
                className="chart-bar-group d-flex flex-column align-items-center" 
                style={{ flex: 1, margin: '0 5px' }}
              >
                <div className="d-flex flex-column align-items-end w-100" style={{ height: '150px' }}>
                  {/* Sales bar */}
                  <div 
                    className="chart-bar rounded-top"
                    style={{
                      height: `${(item.sales / maxValue) * 100}%`,
                      backgroundColor: '#3b82f6',
                      width: '100%',
                      minHeight: '2px',
                      position: 'relative'
                    }}
                    title={`Sales: ${formatCurrency(item.sales)}`}
                  >
                    {item.sales > 0 && (
                      <div className="chart-value position-absolute small fw-bold" 
                        style={{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }}>
                        {item.sales > 1000000 
                          ? `${Math.round(item.sales / 1000000)}M` 
                          : `${Math.round(item.sales / 1000)}k`}
                      </div>
                    )}
                  </div>
                  
                  {/* Rent bar */}
                  <div 
                    className="chart-bar rounded-bottom"
                    style={{
                      height: `${(item.rent / maxValue) * 100}%`,
                      backgroundColor: '#eab308',
                      width: '100%',
                      minHeight: '2px',
                      position: 'relative'
                    }}
                    title={`Rent: ${formatCurrency(item.rent)}`}
                  >
                    {item.rent > 0 && (
                      <div className="chart-value position-absolute small fw-bold" 
                        style={{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }}>
                        {item.rent > 1000000 
                          ? `${Math.round(item.rent / 1000000)}M` 
                          : `${Math.round(item.rent / 1000)}k`}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="chart-label small mt-2 fw-bold text-center" style={{ width: '100%' }}>
                  {item.period}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chú thích */}
          <div className="mt-3 d-flex justify-content-center gap-4">
            <div className="d-flex align-items-center">
              <div className="color-indicator" style={{ backgroundColor: '#3b82f6' }}></div>
              <small className="ms-1">Sales</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="color-indicator" style={{ backgroundColor: '#eab308' }}></div>
              <small className="ms-1">Rent</small>
            </div>
          </div>
        </div>

        {/* Chi tiết dữ liệu */}
        <div className="mt-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">📈 Chi Tiết Sale</h6>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Hôm nay:</span>
                      <span>
                        {formatNumber(statistics.dailySale.ordersToday)} đơn - 
                        <strong className="text-primary"> {formatCurrency(statistics.dailySale.totalValueToday)}</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Tháng này:</span>
                      <span>
                        {formatNumber(statistics.monthlySale.ordersThisMonth)} đơn - 
                        <strong className="text-primary"> {formatCurrency(statistics.monthlySale.totalValueThisMonth)}</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Năm này:</span>
                      <span>
                        {formatNumber(statistics.yearlySale.ordersThisYear)} đơn - 
                        <strong className="text-primary"> {formatCurrency(statistics.yearlySale.totalValueThisYear)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0">📚 Chi Tiết Rent</h6>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Hôm nay:</span>
                      <span>
                        {formatNumber(statistics.dailyRent.ordersToday)} đơn - 
                        <strong className="text-warning"> {formatCurrency(statistics.dailyRent.totalValueToday)}</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Tháng này:</span>
                      <span>
                        {formatNumber(statistics.monthlyRent.ordersThisMonth)} đơn - 
                        <strong className="text-warning"> {formatCurrency(statistics.monthlyRent.totalValueThisMonth)}</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Năm này:</span>
                      <span>
                        {formatNumber(statistics.yearlyRent.ordersThisYear)} đơn - 
                        <strong className="text-warning"> {formatCurrency(statistics.yearlyRent.totalValueThisYear)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default RevenueStatsSection;