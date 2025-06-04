
import React, { useState } from 'react';

const UsersListSection = ({ users, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleStatusChange = (userId, newStatus) => {
    onUpdate(userId, { status: newStatus });
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Người Dùng</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Người Dùng
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai Trò</th>
                <th>Trạng Thái</th>
                <th>Ngày Tham Gia</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px' }}
                      />
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td><span className="badge bg-primary">{user.role}</span></td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Tạm khóa">Tạm khóa</option>
                      <option value="Đã khóa">Đã khóa</option>
                    </select>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(user.id)}
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

export default UsersListSection;
