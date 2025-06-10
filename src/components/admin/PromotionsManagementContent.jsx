
import React from 'react';
import AdminTopbar from './AdminTopbar';
import PromotionsListSection from './sections/PromotionsListSection';
import PromotionsStatisticsSection from './sections/PromotionsStatisticsSection';

const PromotionsManagementContent = (props) => {
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
          <PromotionsStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <PromotionsListSection 
            promotions={props.promotions}
            categories={props.categories}
            onAdd={props.handleAddPromotion}
            onUpdate={props.handleUpdatePromotion}
            onDelete={props.handleDeletePromotion}
            onToggleStatus={props.handleTogglePromotionStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionsManagementContent;
