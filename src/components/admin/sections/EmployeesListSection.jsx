
import React, { useState } from 'react';
import AddEmployeeDialog from '../dialogs/AddEmployeeDialog';
import EditEmployeeDialog from '../dialogs/EditEmployeeDialog';
import { Edit, Trash2 } from 'lucide-react';

const EmployeesListSection = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEditDialog(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      onDelete(employeeId);
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Nhân Viên</span>
          <AddEmployeeDialog onAddEmployee={onAdd} />
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ Tên</th>
                <th>Email</th>
                <th>Phòng Ban</th>
                <th>Trạng Thái</th>
                <th>Ngày Vào Làm</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>#{employee.id.toString().padStart(3, '0')}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <span className={
                      employee.status === 'Hoạt động' ? 'text-success' : 
                      employee.status === 'Tạm nghỉ' ? 'text-warning' : 'text-danger'
                    }>
                      {employee.status}
                    </span>
                  </td>
                  <td>{employee.joinDate}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditEmployee(employee)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingEmployee && (
        <EditEmployeeDialog
          employee={editingEmployee}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingEmployee(null);
          }}
          onUpdateEmployee={onUpdate}
        />
      )}
    </div>
  );
};

export default EmployeesListSection;
