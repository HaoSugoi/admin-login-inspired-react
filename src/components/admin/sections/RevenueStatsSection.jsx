import React, { useState, useEffect } from 'react';

const RevenueStatsSection = ({ 
  statistics, 
  rawStats, 
  onSetSaleDate, 
  onSetRentDate, 
  isSettingDate 
}) => {
  const [timePeriod, setTimePeriod] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const periodType = timePeriod === 'day' ? 'day' : timePeriod === 'week' ? 'month' : 'month';
    if (onSetSaleDate) onSetSaleDate(periodType, selectedDate);
    if (onSetRentDate) onSetRentDate(periodType, selectedDate);
  }, [timePeriod, selectedDate]);

  const getChartData = () => {
    if (rawStats && rawStats[timePeriod]) {
      return rawStats[timePeriod];
    }

    // Fallback data structure
    const periods = {
      day: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      week: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
      month: Array.from({ length: 4 }, (_, i) => `Tuần ${i + 1}`)
    };

    return periods[timePeriod].map(period => ({
      period,
      sales: 0,
      rent: 0,
      total: 0
    }));
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(item => Math.max(item.sales, item.rent)), 10000);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'day': 
        return `Ngày ${new Date(selectedDate).toLocaleDateString('vi-VN')}`;
      case 'week': 
        return `Tuần của ${new Date(selectedDate).toLocaleDateString('vi-VN')}`;
      case 'month': 
        return `Tháng ${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getFullYear()}`;
      default: return '';
    }
  };

  return (
    <div className="revenue-stats-container">
      <div className="chart-controls mb-3">
        <input
          type="date"
          className="form-control form-control-sm"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={isSettingDate}
        />
        
        <select 
          className="form-select form-select-sm"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          disabled={isSettingDate}
        >
          <option value="day">Theo Giờ</option>
          <option value="week">Theo Tuần</option>
          <option value="month">Theo Tháng</option>
        </select>
      </div>

      <h5 className="text-center mb-3">{getPeriodLabel()}</h5>

      {isSettingDate ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <div className="chart-bars mb-3">
            {chartData.map((item, index) => (
              <div 
                key={index} 
                className="bar-container"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="bars-wrapper">
                  <div 
                    className="bar sales-bar"
                    style={{
                      height: `${(item.sales / maxValue) * 100}%`,
                      backgroundColor: '#3b82f6'
                    }}
                  />
                  <div 
                    className="bar rent-bar"
                    style={{
                      height: `${(item.rent / maxValue) * 100}%`,
                      backgroundColor: '#eab308'
                    }}
                  />
                </div>
                <div className="bar-label small">{item.period}</div>
                
                {hoveredBar === index && (
                  <div className="chart-tooltip">
                    <div><strong>Sales:</strong> {formatCurrency(item.sales)}</div>
                    <div><strong>Rent:</strong> {formatCurrency(item.rent)}</div>
                    <div><strong>Total:</strong> {formatCurrency(item.total)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="chart-summary">
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm mb-3">
                  <div className="card-header bg-primary text-white py-2">
                    <h6 className="mb-0">📊 Tổng Sale</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between">
                      <span>Đơn hàng:</span>
                      <strong>{statistics.totalSaleOrders.toLocaleString('vi-VN')}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Giá trị:</span>
                      <strong>{formatCurrency(statistics.totalSaleAmount)}</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card shadow-sm mb-3">
                  <div className="card-header bg-warning text-dark py-2">
                    <h6 className="mb-0">📚 Tổng Rent</h6>
                  </div>
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between">
                      <span>Đơn hàng:</span>
                      <strong>{statistics.totalRentOrders.toLocaleString('vi-VN')}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Giá trị:</span>
                      <strong>{formatCurrency(statistics.totalRentAmount)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .revenue-stats-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .chart-controls {
          display: flex;
          gap: 10px;
        }
        
        .chart-bars {
          display: flex;
          height: 200px;
          align-items: flex-end;
          gap: 8px;
          padding: 0 10px;
        }
        
        .bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .bars-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        
        .bar {
          width: 100%;
          transition: height 0.3s ease;
        }
        
        .sales-bar {
          border-radius: 4px 4px 0 0;
        }
        
        .rent-bar {
          border-radius: 0 0 4px 4px;
          margin-top: 1px;
        }
        
        .bar-label {
          margin-top: 5px;
          text-align: center;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .chart-tooltip {
          position: absolute;
          bottom: calc(100% + 5px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          min-width: 160px;
          z-index: 10;
          pointer-events: none;
        }
        
        .chart-summary .card-header {
          font-size: 14px;
        }
        
        .chart-summary .card-body {
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export default RevenueStatsSection;