
import React from 'react';
import AdminTopbar from './AdminTopbar';
import ShippingListSection from './sections/ShippingListSection';
import ShippingStatisticsSection from './sections/ShippingStatisticsSection';

const ShippingManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Vận Chuyển</h4>
          </div>
        </div>

        <div className="row">
          <ShippingStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <ShippingListSection 
            shipments={props.shipments}
            onUpdateStatus={props.updateShipmentStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingManagementContent;
