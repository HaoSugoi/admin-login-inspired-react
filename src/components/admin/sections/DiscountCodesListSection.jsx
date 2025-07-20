import React, { useState } from 'react';
import AddDiscountCodeDialog from '../dialogs/AddDiscountCodeDialog';
import EditDiscountCodeDialog from '../dialogs/EditDiscountCodeDialog';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const DiscountCodesListSection = ({ discountCodes, onAdd, onUpdateDiscountCode, onDelete, onToggleStatus }) => {
  const [editingCode, setEditingCode] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditCode = (discountCodes) => {
    setEditingCode(discountCodes);
    setShowEditDialog(true);
  };

  const handleDeleteCode = (DiscountCodeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
      onDelete(DiscountCodeId);
    }
  };

  const handleToggleStatus = (discountCodes) => {
    const newStatus = discountCodes.status === 'active' ? 'inactive' : 'active';
    onToggleStatus(discountCodes.DiscountCodeId, newStatus);
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Mã Giảm Giá</span>
          <AddDiscountCodeDialog onAddDiscountCode={onAdd} />
        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên Mã</th>

                <th>Giá Trị</th>
                <th>Sử Dụng</th>
                <th>Số lượng</th>
                <th>Điểm đổi</th>
                <th>Thời gian</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {discountCodes.map((code) => (
                <tr key={code.DiscountCodeId}>
                  <td>
                
                    <code className="bg-light px-2 py-1 rounded">#{code.DiscountCodeId?.slice(0, 6).toUpperCase() || "N/A"}</code>
                  </td>
                  <td>{code.DiscountCodeName}</td>

                  <td>{code.DiscountValue}%</td>
                  <td>{code.RequiredPoints}</td>

                  <td>{code.AvailableQuantity}</td>

                  <td>{code.RequiredPoints}</td>
                  <td>
                    <small>
                      <div>{new Date(code.StartDate).toLocaleDateString()}</div>
                      <div>đến {new Date(code.EndDate).toLocaleDateString()}</div>
                    </small>
                  </td>

                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditCode(code)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleToggleStatus(code)}
                        title="Tạm dừng"
                      >
                        <ToggleRight size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCode(code.DiscountCodeId)}
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

      {editingCode && (
        <EditDiscountCodeDialog
          discountCode={editingCode}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingCode(null);
          }}

          onUpdate={(id, data) => {
            onUpdateDiscountCode({ id, data }); // truyền đúng function xử lý từ cha
          }}
        />
      )}


    </div>
  );
};

export default DiscountCodesListSection;