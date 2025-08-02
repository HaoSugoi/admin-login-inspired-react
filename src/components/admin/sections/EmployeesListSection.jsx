import React, { useState } from "react";
import AddEmployeeDialog from "../dialogs/AddEmployeeDialog";
import EditEmployeeDialog from "../dialogs/EditEmployeeDialog";
import { Edit, Trash2 } from "lucide-react";
import { userService } from '../../../services/employeeService';
const EmployeesListSection = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEditDialog(true);
  };
  const filteredEmployees = employees.filter((employee) =>
    employee.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.PhoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <div className="mb-3">
  <input
    type="text"
    placeholder="Tìm theo Email hoặc SĐT..."
    className="form-control"  
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
        </div>
       
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ Tên</th>
                <th>Img</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Vai trò</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
            {filteredEmployees.map((employee) => (
                <tr key={employee.Id}>
                  <td>#{employee.Id?.slice(0, 6).toUpperCase() || "N/A"}</td>
                  <td>{employee.UserName}</td>
                  <td>
                    <img
                      src={
                        employee.ImageUser
                          ? `https://chosachonline-datn.onrender.com${employee.ImageUser}`
                          : "/default-avatar.png"
                      }
                      alt="Ảnh đại diện"
                      width={20}
                      height={"auto"}
                      style={{ borderRadius: "10%", objectFit: "cover" }}
                      onError={(e) => { }}
                    />
                  </td>
                  <td>{employee.Email}</td>
                  <td>{employee.PhoneNumber}</td>
                  <td>{employee.Role}</td>
                  
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
                        onClick={() => handleDeleteEmployee(employee.Id)}
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