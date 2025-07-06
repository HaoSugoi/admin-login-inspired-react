
import React, { useState } from "react";
import AddEmployeeDialog from "../dialogs/AddEmployeeDialog";
import EditEmployeeDialog from "../dialogs/EditEmployeeDialog";
import { Edit, Trash2 } from "lucide-react";

const EmployeesListSection = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEditDialog(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      onDelete(id);
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
                <th>Img</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Địa chỉ</th>
                <th>Điểm đổi</th>
                <th>Ngày sinh</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.Id}>
                  <td>#{employee.Id?.slice(0, 6).toUpperCase() || "N/A"}</td>
                  <td>{employee.UserName}</td>
                  <td>   
                    <img
                      src={
                        employee.ImageUser
                          ? `https://localhost:7003${employee.ImageUser}`
                          : "/default-avatar.png"
                      }
                      alt="Ảnh đại diện"
                      width={20}
                      height={"auto"}
                      style={{ borderRadius: "10%", objectFit: "cover" }}
                      onError={(e) => {}}
                    />
                  </td>
                  <td>{employee.Email}</td>
                  <td>{employee.Role}</td>
                  <td>{employee.Address}</td>
                  <td>{employee.points}</td>
                  <td>{employee.DateOfBirth}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary text-white border-0"
                        onClick={() => handleEditEmployee(employee)}
                        title="Sửa"
                        style={{ backgroundColor: '#3b82f6', color: 'white' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger text-white border-0"
                        onClick={() => handleDeleteEmployee(employee.Id)}
                        title="Xóa"
                        style={{ backgroundColor: '#ef4444', color: 'white' }}
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
