
import React from 'react';

const OrdersSection = ({ orders }) => {
  return (
    <div className="col-lg-4 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Quản Lý Đơn Hàng</span>
          <a href="#" className="view-all-link">Tất cả ›</a>
        </div>
        
        <div className="table-responsive">
          <table className="order-table">
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="fw-bold">{order.id}</div>
                    <div className="text-muted small">{order.date}</div>
                  </td>
                  <td>
                    <span className="status-pending">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
