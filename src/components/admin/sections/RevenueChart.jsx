import React, { useState, useEffect } from 'react';
import { useReportApi } from '../../../hooks/useReportApi';

const RevenueChart = () => {
  const [timePeriod, setTimePeriod] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoveredBar, setHoveredBar] = useState(null);
  
  const {
    dailySaleStats,
    monthlySaleStats,
    yearlySaleStats,
    dailyRentStats,
    monthlyRentStats,
    yearlyRentStats,
    setDailySaleDate,
    setMonthlySaleDate,
    setYearlySaleDate,
    setDailyRentDate,
    setMonthlyRentDate,
    setYearlyRentDate,
    isLoadingAny,
    isSettingDate
  } = useReportApi();

  // Gọi API khi thay đổi period hoặc ngày
  useEffect(() => {
    const dateObj = new Date(selectedDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0
    
    switch (timePeriod) {
      case 'day':
        setDailySaleDate(selectedDate);
        setDailyRentDate(selectedDate);
        break;
      case 'month':
        setMonthlySaleDate({ year, month });
        setMonthlyRentDate({ year, month });
        break;
      case 'year':
        setYearlySaleDate(year);
        setYearlyRentDate(year);
        break;
      default:
        break;
    }
  }, [timePeriod, selectedDate]);

  // Chuẩn bị dữ liệu cho biểu đồ
  const prepareChartData = () => {
    let data = [];
    let salesData = [];
    let rentData = [];

    switch (timePeriod) {
      case 'day':
        // Xử lý dữ liệu theo giờ trong ngày
        salesData = dailySaleStats?.data || Array(24).fill({ Orders: 0, TotalValue: 0 });
        rentData = dailyRentStats?.data || Array(24).fill({ Orders: 0, TotalValue: 0 });
        
        data = Array.from({ length: 24 }, (_, i) => ({
          period: `${i}:00`,
          salesValue: salesData[i]?.TotalValue || 0,
          rentValue: rentData[i]?.TotalValue || 0,
          totalValue: (salesData[i]?.TotalValue || 0) + (rentData[i]?.TotalValue || 0)
        }));
        break;

      case 'month':
        // Xử lý dữ liệu theo ngày trong tháng
        salesData = monthlySaleStats?.data || Array(31).fill({ Orders: 0, TotalValue: 0 });
        rentData = monthlyRentStats?.data || Array(31).fill({ Orders: 0, TotalValue: 0 });
        
        const daysInMonth = new Date(
          new Date(selectedDate).getFullYear(), 
          new Date(selectedDate).getMonth() + 1, 
          0
        ).getDate();
        
        data = Array.from({ length: daysInMonth }, (_, i) => ({
          period: `Ngày ${i + 1}`,
          salesValue: salesData[i]?.TotalValue || 0,
          rentValue: rentData[i]?.TotalValue || 0,
          totalValue: (salesData[i]?.TotalValue || 0) + (rentData[i]?.TotalValue || 0)
        }));
        break;

      case 'year':
        // Xử lý dữ liệu theo tháng trong năm
        salesData = yearlySaleStats?.data || Array(12).fill({ Orders: 0, TotalValue: 0 });
        rentData = yearlyRentStats?.data || Array(12).fill({ Orders: 0, TotalValue: 0 });
        
        data = Array.from({ length: 12 }, (_, i) => ({
          period: `T${i + 1}`,
          salesValue: salesData[i]?.TotalValue || 0,
          rentValue: rentData[i]?.TotalValue || 0,
          totalValue: (salesData[i]?.TotalValue || 0) + (rentData[i]?.TotalValue || 0)
        }));
        break;

      default:
        break;
    }

    return data;
  };

  const chartData = prepareChartData();
  const maxValue = Math.max(...chartData.map(item => item.totalValue), 1); // Đảm bảo ít nhất là 1

  // Màu sắc cho biểu đồ
  const colorPalette = [
    '#3b82f6', '#60a5fa', '#93c5fd', // Xanh dương
    '#eab308', '#f59e0b', '#fbbf24', // Vàng
    '#22c55e', '#4ade80', '#86efac', // Xanh lá
    '#ef4444', '#f87171', '#fca5a5'  // Đỏ
  ];

  const getBarColor = (index) => {
    return colorPalette[index % colorPalette.length];
  };

  const formatValue = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'day': return `Ngày ${selectedDate}`;
      case 'month': 
        const date = new Date(selectedDate);
        return `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'year': 
        return `Năm ${new Date(selectedDate).getFullYear()}`;
      default: return '';
    }
  };

  const isLoading = isLoadingAny || isSettingDate;

  return (
    <div className="revenue-chart-container">
      <div className="chart-controls">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={isLoading}
        />
        
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          disabled={isLoading}
        >
          <option value="day">Theo Giờ</option>
          <option value="month">Theo Ngày</option>
          <option value="year">Theo Tháng</option>
        </select>
      </div>

      <div className="chart-title">{getPeriodLabel()}</div>

      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <div className="chart-bars">
            {chartData.map((item, index) => (
              <div 
                key={index} 
                className="bar-container"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div 
                  className="bar-total"
                  style={{
                    height: `${(item.totalValue / maxValue) * 100}%`,
                    backgroundColor: getBarColor(index)
                  }}
                >
                  {hoveredBar === index && (
                    <div className="tooltip">
                      <div>Sales: {formatValue(item.salesValue)}</div>
                      <div>Rent: {formatValue(item.rentValue)}</div>
                      <div>Total: {formatValue(item.totalValue)}</div>
                    </div>
                  )}
                </div>
                <div className="bar-label">{item.period}</div>
              </div>
            ))}
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <span className="color-sales"></span>
              <span>Doanh thu bán hàng</span>
            </div>
            <div className="legend-item">
              <span className="color-rent"></span>
              <span>Doanh thu cho thuê</span>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .revenue-chart-container {
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .chart-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .chart-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .chart-bars {
          display: flex;
          height: 300px;
          align-items: flex-end;
          gap: 8px;
        }
        
        .bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .bar-total {
          width: 100%;
          position: relative;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        
        .bar-label {
          margin-top: 5px;
          font-size: 12px;
          text-align: center;
        }
        
        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          margin-bottom: 5px;
        }
        
        .loading-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          gap: 10px;
        }
        
        .spinner {
          border: 4px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          border-top: 4px solid #3b82f6;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }
        
        .color-sales {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #3b82f6;
          border-radius: 3px;
        }
        
        .color-rent {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: #eab308;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default RevenueChart;