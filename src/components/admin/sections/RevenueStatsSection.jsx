import React, { useState, useEffect } from 'react';

const RevenueStatsSection = ({ 
  statistics, 
  isLoading, 
  error,
  onDateChange
}) => {
  const [timePeriod, setTimePeriod] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(timePeriod, selectedDate);
    }
  }, [timePeriod, selectedDate]);

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

  // Lấy dữ liệu biểu đồ từ statistics
  const getChartData = () => {
    if (!statistics) return [];

    if (timePeriod === 'day') {
      return [
        {
          period: 'Hôm nay',
          sales: statistics.dailySale?.totalValueToday || 0,
          rent: statistics.dailyRent?.totalValueToday || 0,
          total: (statistics.dailySale?.totalValueToday || 0) + (statistics.dailyRent?.totalValueToday || 0)
        }
      ];
    }

    if (timePeriod === 'month') {
      // Giả sử monthlySale.createdDates chứa dữ liệu các ngày trong tháng
      const daysInMonth = statistics.monthlySale?.createdDates?.length || 30;
      return Array.from({ length: daysInMonth }, (_, i) => ({
        period: `Ngày ${i + 1}`,
        sales: Math.floor(Math.random() * 1000000) + 500000, // Dữ liệu mẫu
        rent: Math.floor(Math.random() * 800000) + 300000,   // Dữ liệu mẫu
        total: 0 // Sẽ được tính bên dưới
      })).map(item => ({
        ...item,
        total: item.sales + item.rent
      }));
    }

    if (timePeriod === 'year') {
      return Array.from({ length: 12 }, (_, i) => ({
        period: `Tháng ${i + 1}`,
        sales: statistics.yearlySale?.totalValueThisYear ? 
               Math.round(statistics.yearlySale.totalValueThisYear / 12) : 0,
        rent: statistics.yearlyRent?.totalValueThisYear ? 
              Math.round(statistics.yearlyRent.totalValueThisYear / 12) : 0,
        total: 0 // Sẽ được tính bên dưới
      })).map(item => ({
        ...item,
        total: item.sales + item.rent
      }));
    }

    return [];
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => Math.max(item.sales, item.rent, item.total)), 10000);

  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="col-12 mb-4">
        <div className="section-card">
          <div className="placeholder-glow">
            <span className="placeholder col-4 bg-secondary"></span>
            <div className="chart-bars-loading d-flex" style={{ height: '200px' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="placeholder col mx-1" style={{ height: `${Math.random() * 100}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị error state
  if (error) {
    return (
      <div className="col-12 mb-4">
        <div className="alert alert-danger" role="alert">
          <h6>❌ Lỗi tải dữ liệu biểu đồ</h6>
          <p className="mb-0">Không thể tải dữ liệu từ server. Vui lòng thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Biểu Đồ Doanh Thu</h5>
          <div className="d-flex gap-2">
            {timePeriod === 'year' ? (
              <select
                className="form-select form-select-sm"
                value={selectedDate.split('-')[0]}
                onChange={(e) => setSelectedDate(`${e.target.value}-01-01`)}
                disabled={isLoading}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            ) : timePeriod === 'month' ? (
              <input
                type="month"
                className="form-control form-control-sm"
                value={selectedDate.substring(0, 7)}
                onChange={(e) => setSelectedDate(`${e.target.value}-01`)}
                disabled={isLoading}
              />
            ) : (
              <input
                type="date"
                className="form-control form-control-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={isLoading}
              />
            )}
            
            <select 
              className="form-select form-select-sm"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              disabled={isLoading}
            >
              <option value="day">Theo Ngày</option>
              <option value="month">Theo Tháng</option>
              <option value="year">Theo Năm</option>
            </select>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-bars">
            {chartData.map((item, index) => (
              <div key={index} className="bar-group">
                <div className="bar-wrapper">
                  <div 
                    className="bar sales-bar"
                    style={{
                      height: `${(item.sales / maxValue) * 100}%`,
                      backgroundColor: '#3b82f6'
                    }}
                    title={`Sales: ${formatCurrency(item.sales)}`}
                  ></div>
                  <div 
                    className="bar rent-bar"
                    style={{
                      height: `${(item.rent / maxValue) * 100}%`,
                      backgroundColor: '#eab308'
                    }}
                    title={`Rent: ${formatCurrency(item.rent)}`}
                  ></div>
                </div>
                <div className="bar-label">{item.period}</div>
              </div>
            ))}
          </div>
          
          <div className="chart-legend mt-3">
            <div className="d-flex justify-content-center gap-3">
              <div className="legend-item">
                <span className="color-indicator bg-primary"></span>
                <span>Sales</span>
              </div>
              <div className="legend-item">
                <span className="color-indicator bg-warning"></span>
                <span>Rent</span>
              </div>
              <div className="legend-item">
                <span className="color-indicator bg-success"></span>
                <span>Tổng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-summary mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white py-2">
                  <h6 className="mb-0">📊 Doanh Thu Sale</h6>
                </div>
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between">
                    <span>Tổng:</span>
                    <strong>{formatCurrency(statistics.totalSaleAmount)}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Hôm nay:</span>
                    <strong>{formatCurrency(statistics.dailySale.totalValueToday)}</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark py-2">
                  <h6 className="mb-0">📚 Doanh Thu Rent</h6>
                </div>
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between">
                    <span>Tổng:</span>
                    <strong>{formatCurrency(statistics.totalRentAmount)}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Hôm nay:</span>
                    <strong>{formatCurrency(statistics.dailyRent.totalValueToday)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .chart-container {
          padding: 15px;
        }
        
        .chart-bars {
          display: flex;
          height: 200px;
          align-items: flex-end;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .bar-wrapper {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 2px;
        }
        
        .bar {
          width: 100%;
          transition: height 0.3s ease;
          border-radius: 3px 3px 0 0;
        }
        
        .sales-bar {
          background-color: #3b82f6;
        }
        
        .rent-bar {
          background-color: #eab308;
        }
        
        .bar-label {
          margin-top: 5px;
          font-size: 12px;
          text-align: center;
        }
        
        .chart-legend .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
        }
        
        .color-indicator {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
        
        .chart-bars-loading {
          align-items: flex-end;
        }
      `}</style>
    </div>
  );
};

export default RevenueStatsSection;