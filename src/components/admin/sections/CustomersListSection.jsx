
import React from 'react';
import AddCustomerDialog from '../dialogs/AddCustomerDialog';
import { Edit, Trash2 } from 'lucide-react';

const CustomersListSection = ({ customers, onAdd, onUpdate, onDelete }) => {
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      onDelete(customerId);
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Khách Hàng</span>
          <AddCustomerDialog onAddCustomer={onAdd} />
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Họ Tên</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Trạng Thái</th>
                <th>Ngày Tham Gia</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>#{customer.id.toString().padStart(3, '0')}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span className={
                      customer.status === 'Hoạt động' ? 'text-success' : 
                      customer.status === 'Tạm khóa' ? 'text-warning' : 'text-danger'
                    }>
                      {customer.status}
                    </span>
                  </td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => console.log('Edit customer:', customer.id)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCustomer(customer.id)}
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
    </div>
  );
};

export default CustomersListSection;
