
import React, { useState } from 'react';

const EmployeesListSection = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleStatusChange = (employeeId, newStatus) => {
    onUpdate(employeeId, { status: newStatus });
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Nhân Viên</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Nhân Viên
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Chức Vụ</th>
                <th>Phòng Ban</th>
                <th>Lương</th>
                <th>Trạng Thái</th>
                <th>Ngày Vào Làm</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={employee.avatar} 
                        alt={employee.name}
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px' }}
                      />
                      {employee.name}
                    </div>
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td><span className="badge bg-info">{employee.position}</span></td>
                  <td><span className="badge bg-secondary">{employee.department}</span></td>
                  <td>{Number(employee.salary).toLocaleString('vi-VN')} VND</td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={employee.status}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Tạm nghỉ">Tạm nghỉ</option>
                      <option value="Nghỉ việc">Nghỉ việc</option>
                    </select>
                  </td>
                  <td>{employee.joinDate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(employee.id)}
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

export default EmployeesListSection;
