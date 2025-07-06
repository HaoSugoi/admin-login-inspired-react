
import React, { useState } from "react";
import AddDiscountCodeDialog from "../dialogs/AddDiscountCodeDialog";
import EditDiscountCodeDialog from "../dialogs/EditDiscountCodeDialog";
import { Edit, Trash2, Play, Pause } from "lucide-react";

const DiscountCodesListSection = ({ discountCodes, onAdd, onUpdateDiscountCode, onDelete, onToggleStatus }) => {
  const [editingDiscountCode, setEditingDiscountCode] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditDiscountCode = (discountCode) => {
    setEditingDiscountCode(discountCode);
    setShowEditDialog(true);
  };

  const handleDeleteDiscountCode = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) {
      onDelete(id);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    onToggleStatus(id, newStatus);
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
                <th>Giá Trị (%)</th>
                <th>Số Lượng</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th>Điểm Yêu Cầu</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {discountCodes?.map((discountCode) => (
                <tr key={discountCode.DiscountCodeId}>
                  <td>#{discountCode.DiscountCodeId?.toString().slice(0, 6).toUpperCase() || "N/A"}</td>
                  <td>{discountCode.DiscountCodeName}</td>
                  <td>{discountCode.DiscountValue}%</td>
                  <td>{discountCode.AvailableQuantity}</td>
                  <td>{new Date(discountCode.StartDate).toLocaleDateString('vi-VN')}</td>
                  <td>{new Date(discountCode.EndDate).toLocaleDateString('vi-VN')}</td>
                  <td>{discountCode.RequiredPoints || 0} điểm</td>
                  <td>
                    <span className={`badge ${discountCode.IsActive ? 'bg-success' : 'bg-secondary'}`}>
                      {discountCode.IsActive ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditDiscountCode(discountCode)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleToggleStatus(discountCode.DiscountCodeId, discountCode.IsActive ? 'active' : 'inactive')}
                        title={discountCode.IsActive ? 'Tạm dừng' : 'Kích hoạt'}
                      >
                        {discountCode.IsActive ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteDiscountCode(discountCode.DiscountCodeId)}
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

      {editingDiscountCode && (
        <EditDiscountCodeDialog
          discountCode={editingDiscountCode}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingDiscountCode(null);
          }}
          onUpdate={onUpdateDiscountCode}
        />
      )}
    </div>
  );
};

export default DiscountCodesListSection;
