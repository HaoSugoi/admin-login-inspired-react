
import React, { useState } from 'react';

const RevenueStatsSection = ({ 
  statistics, 
  rawStats, 
  onSetSaleDate, 
  onSetRentDate, 
  isSettingDate 
}) => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Lấy dữ liệu biểu đồ theo period
  const getChartData = () => {
    switch (timePeriod) {
      case 'day':
        // Dữ liệu theo giờ trong ngày (chia nhỏ từ daily data)
        const dailySaleValue = statistics.dailySale.totalValueToday / 24;
        const dailyRentValue = statistics.dailyRent.totalValueToday / 24;
        
        return [
          { period: "00:00", sales: dailySaleValue, rent: dailyRentValue, total: dailySaleValue + dailyRentValue },
          { period: "06:00", sales: dailySaleValue * 1.2, rent: dailyRentValue * 0.8, total: (dailySaleValue * 1.2) + (dailyRentValue * 0.8) },
          { period: "12:00", sales: dailySaleValue * 1.8, rent: dailyRentValue * 1.5, total: (dailySaleValue * 1.8) + (dailyRentValue * 1.5) },
          { period: "18:00", sales: dailySaleValue * 2.1, rent: dailyRentValue * 1.2, total: (dailySaleValue * 2.1) + (dailyRentValue * 1.2) },
          { period: "23:59", sales: dailySaleValue * 0.5, rent: dailyRentValue * 0.3, total: (dailySaleValue * 0.5) + (dailyRentValue * 0.3) }
        ];
        
      case 'week':
        // Dữ liệu theo ngày trong tuần
        const weeklySaleValue = statistics.monthlySale.totalValueThisMonth / 4;
        const weeklyRentValue = statistics.monthlyRent.totalValueThisMonth / 4;
        
        return [
          { period: "Thứ 2", sales: weeklySaleValue * 0.8, rent: weeklyRentValue * 0.7, total: (weeklySaleValue * 0.8) + (weeklyRentValue * 0.7) },
          { period: "Thứ 3", sales: weeklySaleValue * 1.1, rent: weeklyRentValue * 0.9, total: (weeklySaleValue * 1.1) + (weeklyRentValue * 0.9) },
          { period: "Thứ 4", sales: weeklySaleValue * 0.9, rent: weeklyRentValue * 1.1, total: (weeklySaleValue * 0.9) + (weeklyRentValue * 1.1) },
          { period: "Thứ 5", sales: weeklySaleValue * 1.3, rent: weeklyRentValue * 1.2, total: (weeklySaleValue * 1.3) + (weeklyRentValue * 1.2) },
          { period: "Thứ 6", sales: weeklySaleValue * 1.2, rent: weeklyRentValue * 1.0, total: (weeklySaleValue * 1.2) + (weeklyRentValue * 1.0) },
          { period: "Thứ 7", sales: weeklySaleValue * 1.4, rent: weeklyRentValue * 1.3, total: (weeklySaleValue * 1.4) + (weeklyRentValue * 1.3) },
          { period: "CN", sales: weeklySaleValue * 1.1, rent: weeklyRentValue * 1.1, total: (weeklySaleValue * 1.1) + (weeklyRentValue * 1.1) }
        ];
        
      case 'month':
      default:
        // Sử dụng dữ liệu chart đã được tính toán
        return statistics?.monthlyChartData || [
          { period: "Tuần 1", sales: 0, rent: 0, total: 0 },
          { period: "Tuần 2", sales: 0, rent: 0, total: 0 },
          { period: "Tuần 3", sales: 0, rent: 0, total: 0 },
          { period: "Tuần 4", sales: 0, rent: 0, total: 0 }
        ];
    }
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => item.total), 1);

  const getBarColor = (value, type) => {
    if (type === 'sales') return '#3b82f6'; // Blue
    if (type === 'rent') return '#eab308';  // Yellow
    return '#22c55e'; // Green for total
  };

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'day': return 'Theo Giờ';
      case 'week': return 'Theo Ngày trong Tuần';
      case 'month': return 'Theo Tuần trong Tháng';
      default: return 'Theo Tháng';
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    
    // Call appropriate API based on time period
    if (onSetSaleDate) {
      onSetSaleDate(timePeriod === 'day' ? 'day' : timePeriod === 'week' ? 'month' : 'month', newDate);
    }
    if (onSetRentDate) {
      onSetRentDate(timePeriod === 'day' ? 'day' : timePeriod === 'week' ? 'month' : 'month', newDate);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatNumber = (num) => {
    return (num || 0).toLocaleString('vi-VN');
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Báo Cáo Doanh Thu Chi Tiết</span>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="date"
              className="form-control form-control-sm"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              disabled={isSettingDate}
            />
            <select 
              className="form-select form-select-sm w-auto"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="day">Theo Giờ</option>
              <option value="week">Theo Tuần</option>
              <option value="month">Theo Tháng</option>
            </select>
          </div>
        </div>
        
        {/* Summary Stats với dữ liệu thực tế */}
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-primary">📊 Sale Orders Hôm Nay</h6>
              <p className="mb-0">{formatNumber(statistics.dailySale.ordersToday)}</p>
              <small className="text-muted">{formatCurrency(statistics.dailySale.totalValueToday)}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-warning">📚 Rent Orders Hôm Nay</h6>
              <p className="mb-0">{formatNumber(statistics.dailyRent.ordersToday)}</p>
              <small className="text-muted">{formatCurrency(statistics.dailyRent.totalValueToday)}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-success">🗓️ Tháng Này</h6>
              <p className="mb-0">Sale: {formatNumber(statistics.monthlySale.ordersThisMonth)}</p>
              <small className="text-muted">Rent: {formatNumber(statistics.monthlyRent.ordersThisMonth)}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-info">💰 Tổng Giá Trị</h6>
              <p className="mb-0">{formatCurrency(statistics.monthRevenue)}</p>
              <small className="text-muted">Tháng hiện tại</small>
            </div>
          </div>
        </div>
        
        <div className="chart-container">
          <div className="text-end mb-3">
            <span className="text-muted small">{getPeriodLabel()}</span>
            {isSettingDate && <span className="badge bg-warning ms-2">Đang cập nhật...</span>}
          </div>
          
          <div className="chart-bars">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar-group" style={{ flex: 1, marginRight: '5px' }}>
                {/* Sales bar */}
                <div 
                  className="chart-bar" 
                  style={{
                    height: `${(item.sales / maxValue) * 120}px`,
                    background: `linear-gradient(135deg, ${getBarColor(item.sales, 'sales')}aa 0%, ${getBarColor(item.sales, 'sales')} 100%)`,
                    marginBottom: '2px',
                    minHeight: '10px'
                  }}
                  title={`Sales: ${formatCurrency(item.sales)}`}
                >
                  <div className="chart-value small">{Math.round(item.sales / 1000)}k</div>
                </div>
                
                {/* Rent bar */}
                <div 
                  className="chart-bar" 
                  style={{
                    height: `${(item.rent / maxValue) * 120}px`,
                    background: `linear-gradient(135deg, ${getBarColor(item.rent, 'rent')}aa 0%, ${getBarColor(item.rent, 'rent')} 100%)`,
                    marginBottom: '5px',
                    minHeight: '10px'
                  }}
                  title={`Rent: ${formatCurrency(item.rent)}`}
                >
                  <div className="chart-value small">{Math.round(item.rent / 1000)}k</div>
                </div>
                
                <div className="chart-label small">{item.period}</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-3 d-flex justify-content-center gap-3">
            <div className="d-flex align-items-center">
              <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', marginRight: '5px' }}></div>
              <small>Sales</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '12px', height: '12px', backgroundColor: '#eab308', marginRight: '5px' }}></div>
              <small>Rent</small>
            </div>
          </div>
        </div>

        {/* Chi tiết dữ liệu theo thời gian */}
        <div className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-light">
                  <h6 className="mb-0">📈 Chi Tiết Sale</h6>
                </div>
                <div className="card-body p-2">
                  <small>
                    <strong>Hôm nay:</strong> {formatNumber(statistics.dailySale.ordersToday)} đơn - {formatCurrency(statistics.dailySale.totalValueToday)}
                    <br />
                    <strong>Tháng này:</strong> {formatNumber(statistics.monthlySale.ordersThisMonth)} đơn - {formatCurrency(statistics.monthlySale.totalValueThisMonth)}
                    <br />
                    <strong>Năm này:</strong> {formatNumber(statistics.yearlySale.ordersThisYear)} đơn - {formatCurrency(statistics.yearlySale.totalValueThisYear)}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-light">
                  <h6 className="mb-0">📚 Chi Tiết Rent</h6>
                </div>
                <div className="card-body p-2">
                  <small>
                    <strong>Hôm nay:</strong> {formatNumber(statistics.dailyRent.ordersToday)} đơn - {formatCurrency(statistics.dailyRent.totalValueToday)}
                    <br />
                    <strong>Tháng này:</strong> {formatNumber(statistics.monthlyRent.ordersThisMonth)} đơn - {formatCurrency(statistics.monthlyRent.totalValueThisMonth)}
                    <br />
                    <strong>Năm này:</strong> {formatNumber(statistics.yearlyRent.ordersThisYear)} đơn - {formatCurrency(statistics.yearlyRent.totalValueThisYear)}
                  </small>
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
