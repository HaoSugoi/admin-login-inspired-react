import React from 'react';
import AdminTopbar from './AdminTopbar';
import PromotionsListSection from './sections/PromotionsListSection';
import PromotionsStatisticsSection from './sections/PromotionsStatisticsSection';
import { usePromotionApi } from '../../hooks/usePromotionApi';

const PromotionsManagementContent = (props) => {
  const {
    promotions,
    isLoadingPromotions,
    promotionsError,
    createPromotion,
    updatePromotion,
    deletePromotion,
  } = usePromotionApi();

  const handleAdd = (data) => createPromotion(data);
  const handleUpdate = (id, data) => updatePromotion({ id, data });
  const handleDelete = (id) => deletePromotion(id);
  const handleToggleStatus = (id, newStatus) => updatePromotion({ id, data: { status: newStatus } });
 
  // Bạn có thể tính toán thống kê ở đây:
  const statistics = {
    total: promotions.length,
    active: promotions.filter(p => new Date(p.StartDate) <= new Date() && new Date(p.EndDate) >= new Date()).length,
    expired: promotions.filter(p => new Date(p.EndDate) < new Date()).length,
    used: 0 // Nếu bạn có trường usageCount hoặc usageLimit
  };

  if (isLoadingPromotions) return <div>Đang tải khuyến mãi...</div>;
  if (promotionsError) return <div>Lỗi khi tải khuyến mãi: {promotionsError.message}</div>;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Khuyến Mãi</h4>
          </div>
        </div>

        <div className="row">
          <PromotionsStatisticsSection statistics={statistics} />
        </div>

        <div className="row">
          <PromotionsListSection 
            promotions={promotions}
            categories={props.categories ?? []} // nếu bạn muốn truyền từ ngoài vào
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionsManagementContent;