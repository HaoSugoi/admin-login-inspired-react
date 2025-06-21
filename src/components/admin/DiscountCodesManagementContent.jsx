
import React from 'react';
import AdminTopbar from './AdminTopbar';
import DiscountCodesListSection from './sections/DiscountCodesListSection';
import DiscountCodesStatisticsSection from './sections/DiscountCodesStatisticsSection';

const DiscountCodesManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Mã Giảm Giá</h4>
          </div>
        </div>

        <div className="row">
          <DiscountCodesStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <DiscountCodesListSection 
            discountCodes={props.discountCodes}
            onAdd={props.handleAddDiscountCode}
            onUpdate={props.handleUpdateDiscountCode}
            onDelete={props.handleDeleteDiscountCode}
            onToggleStatus={props.handleToggleCodeStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountCodesManagementContent;
