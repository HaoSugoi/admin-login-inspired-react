
import React from 'react';

const RevenueChart = ({ chartData }) => {
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="col-lg-6 mb-4">
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
