
import React, { useState } from 'react';

const OrdersListSection = ({ orders, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    onUpdate(orderId, { status: newStatus });
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Quản Lý Đơn Hàng</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Đơn Hàng
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách Hàng</th>
                <th>Ngày Đặt</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.toString().padStart(3, '0')}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <small className="text-muted">{order.customerId}</small>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.totalAmount.toLocaleString('vi-VN')}đ</td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setEditingOrder(order)}
                    >
                      Sửa
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(order.id)}
                    >
                      Xóa
                    </button>
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

export default OrdersListSection;
