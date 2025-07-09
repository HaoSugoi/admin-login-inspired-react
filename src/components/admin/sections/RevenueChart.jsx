
import React, { useState } from 'react';

const RevenueChart = ({ chartData: defaultChartData }) => {
  const [timePeriod, setTimePeriod] = useState('month');

  const getChartData = () => {
    switch (timePeriod) {
      case 'day':
        return [
          { month: "T2", value: 150 },
          { month: "T3", value: 220 },
          { month: "T4", value: 180 },
          { month: "T5", value: 340 },
          { month: "T6", value: 290 },
          { month: "T7", value: 410 },
          { month: "CN", value: 380 }
        ];
      case 'week':
        return [
          { month: "Tuần 1", value: 1850 },
          { month: "Tuần 2", value: 2200 },
          { month: "Tuần 3", value: 1900 },
          { month: "Tuần 4", value: 2650 }
        ];
      case 'month':
      default:
        return defaultChartData || [
          { month: "T1", value: 850 },
          { month: "T2", value: 1200 },
          { month: "T3", value: 780 },
          { month: "T4", value: 1050 }
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
    <div className="col-12 mb-10">
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
                <div className="chart-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
