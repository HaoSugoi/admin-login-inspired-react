
import React from 'react';

const RevenueStatsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Doanh Thu Theo Tháng</span>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Doanh Thu</th>
                <th>Số Đơn Hàng</th>
                <th>Trung Bình/Đơn</th>
              </tr>
            </thead>
            <tbody>
              {statistics.monthlyData.map((month, index) => (
                <tr key={index}>
                  <td>{month.month}</td>
                  <td>{month.revenue.toLocaleString('vi-VN')}đ</td>
                  <td>{month.orders}</td>
                  <td>{Math.round(month.revenue / month.orders).toLocaleString('vi-VN')}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatsSection;
