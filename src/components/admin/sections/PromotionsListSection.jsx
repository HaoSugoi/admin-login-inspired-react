import React, { useState } from 'react';
import AddPromotionDialog from '../dialogs/AddPromotionDialog';
import EditPromotionDialog from '../dialogs/EditPromotionDialog';

const PromotionsListSection = ({
  promotions,
  categories,
  onAdd,
  onUpdate,
  onDelete,
  onToggleStatus
}) => {
  const [editingPromotion, setEditingPromotion] = useState(null);

  const getStatusBadge = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return <span className="badge bg-secondary">Chưa bắt đầu</span>;
    if (now > end) return <span className="badge bg-warning">Hết hạn</span>;
    return <span className="badge bg-success">Đang hoạt động</span>;
  };

  return (
    <div className="col-12">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Khuyến Mãi</span>
          <AddPromotionDialog categories={categories} onAdd={onAdd} />
        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên Khuyến Mãi</th>
                <th>Giá Trị</th>
                <th>Thể Loại Áp Dụng</th>
                <th>Thời Gian</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion.PromotionId}>
                  <td>
                
                    <strong className="text-primary">#{promotion.PromotionId?.slice(0, 6).toUpperCase() || "N/A"}</strong>
                  </td>
                  <td>
                    <div>
                      <strong>{promotion.PromotionName}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-info">
                      {promotion.DiscountPercentage}%
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      {/* Nếu có category, hiển thị ở đây */}
                      Chưa có
                    </span>
                  </td>
                  <td>
                    <small>
                      <div>{new Date(promotion.StartDate).toLocaleDateString()}</div>
                      <div>đến {new Date(promotion.EndDate).toLocaleDateString()}</div>
                    </small>
                  </td>
                  <td>{getStatusBadge(promotion.StartDate, promotion.EndDate)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setEditingPromotion(promotion)}
                    >
                      Sửa
                    </button>
                    <button
className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(promotion.PromotionId)}
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