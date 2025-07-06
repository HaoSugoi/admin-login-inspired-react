
import React, { useState } from "react";
import AddPromotionDialog from "../dialogs/AddPromotionDialog";
import EditPromotionDialog from "../dialogs/EditPromotionDialog";
import { Edit, Trash2, Play, Pause } from "lucide-react";

const PromotionsListSection = ({ promotions, categories, onAdd, onUpdate, onDelete, onToggleStatus }) => {
  const [editingPromotion, setEditingPromotion] = useState(null);

  const handleEditPromotion = (promotion) => {
    setEditingPromotion(promotion);
  };

  const handleDeletePromotion = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
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
          <span>Danh Sách Khuyến Mãi</span>
          <AddPromotionDialog categories={categories} onAdd={onAdd} />
        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên Khuyến Mãi</th>
                <th>Giảm Giá (%)</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {promotions?.map((promotion) => (
                <tr key={promotion.PromotionId}>
                  <td>#{promotion.PromotionId?.toString().slice(0, 6).toUpperCase() || "N/A"}</td>
                  <td>{promotion.PromotionName}</td>
                  <td>{promotion.DiscountPercentage}%</td>
                  <td>{new Date(promotion.StartDate).toLocaleDateString('vi-VN')}</td>
                  <td>{new Date(promotion.EndDate).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <span className={`badge ${promotion.IsActive ? 'bg-success' : 'bg-secondary'}`}>
                      {promotion.IsActive ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditPromotion(promotion)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleToggleStatus(promotion.PromotionId, promotion.IsActive ? 'active' : 'inactive')}
                        title={promotion.IsActive ? 'Tạm dừng' : 'Kích hoạt'}
                      >
                        {promotion.IsActive ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletePromotion(promotion.PromotionId)}
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

      {editingPromotion && (
        <EditPromotionDialog
          promotion={editingPromotion}
          categories={categories}
          onUpdate={onUpdate}
          onClose={() => setEditingPromotion(null)}
        />
      )}
    </div>
  );
};

export default PromotionsListSection;
