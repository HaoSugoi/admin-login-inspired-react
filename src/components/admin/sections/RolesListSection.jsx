
import React, { useState } from 'react';

const RolesListSection = ({ roles, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Vai Trò</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Vai Trò
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên Vai Trò</th>
                <th>Mô Tả</th>
                <th>Quyền Hạn</th>
                <th>Số Người Dùng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>
                    <span className="fw-bold">{role.name}</span>
                  </td>
                  <td>{role.description}</td>
                  <td>
                    {role.permissions.map((permission, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        {permission}
                      </span>
                    ))}
                  </td>
                  <td>
                    <span className="badge bg-info">{role.userCount}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(role.id)}
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

export default RolesListSection;
