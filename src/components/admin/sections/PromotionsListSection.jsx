
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="badge bg-success">Đang hoạt động</span>;
      case 'expired':
        return <span className="badge bg-warning">Hết hạn</span>;
      case 'disabled':
        return <span className="badge bg-secondary">Tạm dừng</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  const getTypeDisplay = (type, value) => {
    if (type === 'percentage') {
      return `${value}%`;
    }
    return `${value.toLocaleString()}đ`;
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
                <th>Sử Dụng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td>
                    <strong className="text-primary">{promotion.code}</strong>
                  </td>
                  <td>
                    <div>
                      <strong>{promotion.name}</strong>
                      {promotion.description && (
                        <small className="d-block text-muted">{promotion.description}</small>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-info">
                      {getTypeDisplay(promotion.type, promotion.value)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${promotion.categoryId ? 'bg-warning' : 'bg-secondary'}`}>
                      {promotion.categoryName}
                    </span>
                  </td>
                  <td>
                    <small>
                      <div>{promotion.startDate}</div>
                      <div>đến {promotion.endDate}</div>
                    </small>
                  </td>
                  <td>
                    <small>
                      {promotion.usageCount}/{promotion.usageLimit}
                      <div className="progress mt-1" style={{height: '4px'}}>
                        <div 
                          className="progress-bar" 
                          style={{
                            width: `${(promotion.usageCount / promotion.usageLimit) * 100}%`
                          }}
                        ></div>
                      </div>
                    </small>
                  </td>
                  <td>{getStatusBadge(promotion.status)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setEditingPromotion(promotion)}
                    >
                      Sửa
                    </button>
                    {promotion.status === 'active' ? (
                      <button 
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => onToggleStatus(promotion.id, 'disabled')}
                      >
                        Tạm dừng
                      </button>
                    ) : (
                      <button 
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => onToggleStatus(promotion.id, 'active')}
                      >
                        Kích hoạt
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(promotion.id)}
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
