
import React from 'react';

const RevenueChart = ({ chartData }) => {
  const maxValue = Math.max(...chartData.map(item => item.value));

  const getBarColor = (value) => {
    // Chuyển đổi từ k sang triệu (value * 1000 / 1000000 = value / 1000)
    const millions = value * 1000 / 1000000; // value là theo k, chuyển thành triệu
    
    if (millions < 1) return '#22c55e'; // Xanh lá - dưới 1 triệu
    if (millions < 2) return '#eab308'; // Vàng - 1-2 triệu
    if (millions < 3) return '#3b82f6'; // Xanh lam - 2-3 triệu
    return '#ef4444'; // Đỏ - trên 3 triệu
  };

  return (
    <div className="col-8 mb-4"> {/* Thu nhỏ từ col-12 xuống col-8 (30% nhỏ hơn) */}
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
