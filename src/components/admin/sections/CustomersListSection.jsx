
import React, { useState } from 'react';

const CustomersListSection = ({ customers, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleStatusChange = (customerId, newStatus) => {
    onUpdate(customerId, { status: newStatus });
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Khách Hàng</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Khách Hàng
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Trạng Thái</th>
                <th>Ngày Tham Gia</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={customer.avatar} 
                        alt={customer.name}
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px' }}
                      />
                      {customer.name}
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={customer.status}
                      onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Tạm khóa">Tạm khóa</option>
                      <option value="Đã khóa">Đã khóa</option>
                    </select>
                  </td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(customer.id)}
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

export default CustomersListSection;
