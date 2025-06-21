
import React from 'react';

const RevenueChart = ({ chartData }) => {
  const maxValue = Math.max(...chartData.map(item => item.value));

  const getBarColor = (value) => {
    const multiplier = Math.floor(value / 10);
    const hue = (multiplier * 36) % 360; // Thay đổi màu sắc theo bội số của 10
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Báo Cáo Doanh Thu</span>
          <select className="form-select form-select-sm w-auto">
            <option>Theo Tháng</option>
            <option>Theo Quý</option>
            <option>Theo Năm</option>
          </select>
        </div>
        
        <div className="chart-container">
          <div className="text-end mb-3">
            <span className="text-muted small">50 Đánh Giá</span>
          </div>
          
          <div className="chart-bars">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar" style={{
                height: `${(item.value / maxValue) * 150}px`,
                background: `linear-gradient(135deg, ${getBarColor(item.value)}aa 0%, ${getBarColor(item.value)} 100%)`,
                flex: 1
              }}>
                <div className="chart-value">${item.value}k</div>
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
