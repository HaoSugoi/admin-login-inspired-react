
import React, { useState } from 'react';

const RevenueStatsSection = ({ statistics }) => {
  const [timePeriod, setTimePeriod] = useState('month');

  // Mock data for different time periods
  const getChartData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { period: "T2", value: 150 },
          { period: "T3", value: 220 },
          { period: "T4", value: 180 },
          { period: "T5", value: 340 },
          { period: "T6", value: 290 },
          { period: "T7", value: 410 },
          { period: "CN", value: 380 }
        ];
      case 'week':
        return [
          { period: "Tuần 1", value: 1850 },
          { period: "Tuần 2", value: 2200 },
          { period: "Tuần 3", value: 1900 },
          { period: "Tuần 4", value: 2650 }
        ];
      case 'month':
      default:
        return statistics?.monthlyData || [
          { period: "Tháng 1", value: 850 },
          { period: "Tháng 2", value: 1200 },
          { period: "Tháng 3", value: 780 },
          { period: "Tháng 4", value: 1050 }
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
      case 'day': return 'Theo Ngày';
      case 'week': return 'Theo Tuần';
      case 'month': return 'Theo Tháng';
      default: return 'Theo Tháng';
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Báo Cáo Doanh Thu</span>
          <select 
            className="form-select form-select-sm w-auto"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="day">Theo Ngày</option>
            <option value="week">Theo Tuần</option>
            <option value="month">Theo Tháng</option>
          </select>
        </div>
        
        <div className="chart-container">
          <div className="text-end mb-3">
            <span className="text-muted small">{getPeriodLabel()}</span>
          </div>
          
          <div className="chart-bars">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar" style={{
                height: `${(item.value / maxValue) * 150}px`,
                background: `linear-gradient(135deg, ${getBarColor(item.value)}aa 0%, ${getBarColor(item.value)} 100%)`,
                flex: 1
              }}>
                <div className="chart-value">{item.value}k VND</div>
                <div className="chart-label">{item.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatsSection;
