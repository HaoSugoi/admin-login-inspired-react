import React, { useState } from "react";
import AddCustomerDialog from "../dialogs/AddCustomerDialog";
import EditCustomerDialog from "../dialogs/EditCustomerDialog";
import { Edit, Trash2 } from "lucide-react";

const CustomersListSection = ({ customers = [], onAdd, onUpdate, onDelete }) => {
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((cus) =>
    (cus.Email?.toLowerCase() || "").includes(searchTerm) ||
    (cus.PhoneNumber || "").includes(searchTerm)
  );
  
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowEditDialog(true);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      onDelete(customerId);
    }
  };

  const handleUpdateCustomer = async (data) => {
    await onUpdate(data);
    setShowEditDialog(false);
    setEditingCustomer(null);
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Khách Hàng</span>
       <input
  type="text"
  className="form-control w-25"
  placeholder="Tìm theo email hoặc số điện thoại..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/>

        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Họ Tên</th>
                <th>Ảnh</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Vai trò</th>
                <th>Điểm đổi</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-3">
                    Không có khách hàng nào.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.Id || index}>
                    <td>#{customer.Id?.slice(0, 6).toUpperCase() || "N/A"}</td>
                    <td>{customer.UserName || "—"}</td>
                    <td>
                      <img
                        src={
                          customer.ImageUser
                        }
                        alt="Ảnh đại diện"
                        width={20}
                        height="auto"
                        style={{ borderRadius: "10%", objectFit: "cover" }}
                      />
                    </td>
                    <td>{customer.Email || "—"}</td>
                    <td>{customer.PhoneNumber || "(Chưa có)"}</td>
                    <td>{customer.Address || "—"}</td>
                    <td>{customer.Role || "—"}</td>
                    <td>{customer.Points}</td>
                  
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditCustomer(customer)}
                          title="Sửa"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteCustomer(customer.Id)}
                          title="Xóa"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingCustomer && (
        <EditCustomerDialog
          customer={editingCustomer}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingCustomer(null);
          }}
          onUpdateCustomer={handleUpdateCustomer}
        />
      )}
    </div>
  );
};

export default CustomersListSection;