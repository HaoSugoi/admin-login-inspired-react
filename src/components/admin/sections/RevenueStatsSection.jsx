
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

  // Mock data for different time periods - sẽ được thay thế bằng real data
  const getChartData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { period: "00:00", value: rawStats?.dailySale?.totalValueToday / 24 || 150 },
          { period: "06:00", value: rawStats?.dailyRent?.totalValueToday / 24 || 220 },
          { period: "12:00", value: (rawStats?.dailySale?.totalValueToday + rawStats?.dailyRent?.totalValueToday) / 12 || 180 },
          { period: "18:00", value: rawStats?.dailySale?.totalValueToday / 12 || 340 },
          { period: "23:59", value: rawStats?.dailyRent?.totalValueToday / 12 || 290 }
        ];
      case 'week':
        return [
          { period: "Thứ 2", value: 1850 },
          { period: "Thứ 3", value: 2200 },
          { period: "Thứ 4", value: 1900 },
          { period: "Thứ 5", value: 2650 },
          { period: "Thứ 6", value: 2400 },
          { period: "Thứ 7", value: 2800 },
          { period: "CN", value: 2200 }
        ];
      case 'month':
      default:
        return statistics?.monthlyChartData || [
          { period: "Tuần 1", value: rawStats?.monthlySale?.totalValueThisMonth / 4 || 850 },
          { period: "Tuần 2", value: rawStats?.monthlyRent?.totalValueThisMonth / 4 || 1200 },
          { period: "Tuần 3", value: (rawStats?.monthlySale?.totalValueThisMonth + rawStats?.monthlyRent?.totalValueThisMonth) / 6 || 780 },
          { period: "Tuần 4", value: rawStats?.monthlySale?.totalValueThisMonth / 3 || 1050 }
        ];
    }
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => item.value));

  const getBarColor = (value) => {
    const millions = value * 1000 / 1000000;
    
    if (millions < 1) return '#22c55e';
    if (millions < 2) return '#eab308';
    if (millions < 3) return '#3b82f6';
    return '#ef4444';
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
      onSetSaleDate(timePeriod, newDate);
    }
    if (onSetRentDate) {
      onSetRentDate(timePeriod, newDate);
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

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Báo Cáo Doanh Thu (API Mới)</span>
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
        
        {/* Summary Stats */}
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-primary">Sale Orders</h6>
              <p className="mb-0">Hôm nay: {rawStats?.dailySale?.ordersToday || 0}</p>
              <small className="text-muted">{formatCurrency(rawStats?.dailySale?.totalValueToday || 0)}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-success">Rent Orders</h6>
              <p className="mb-0">Hôm nay: {rawStats?.dailyRent?.ordersToday || 0}</p>
              <small className="text-muted">{formatCurrency(rawStats?.dailyRent?.totalValueToday || 0)}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-warning">Tháng này</h6>
              <p className="mb-0">Sale: {rawStats?.monthlySale?.ordersThisMonth || 0}</p>
              <small className="text-muted">Rent: {rawStats?.monthlyRent?.ordersThisMonth || 0}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <h6 className="text-info">Tổng giá trị</h6>
              <p className="mb-0">{formatCurrency(statistics?.monthRevenue || 0)}</p>
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
              <div key={index} className="chart-bar" style={{
                height: `${(item.value / maxValue) * 150}px`,
                background: `linear-gradient(135deg, ${getBarColor(item.value)}aa 0%, ${getBarColor(item.value)} 100%)`,
                flex: 1
              }}>
                <div className="chart-value">{Math.round(item.value)}k VND</div>
                <div className="chart-label">{item.period}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Data Debug (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3">
            <details>
              <summary className="text-muted small">🔍 Debug: Raw API Data</summary>
              <div className="row mt-2">
                <div className="col-md-6">
                  <strong>Monthly Sale:</strong>
                  <pre className="small">{JSON.stringify(rawStats?.monthlySale, null, 2)}</pre>
                </div>
                <div className="col-md-6">
                  <strong>Monthly Rent:</strong>
                  <pre className="small">{JSON.stringify(rawStats?.monthlyRent, null, 2)}</pre>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueStatsSection;
