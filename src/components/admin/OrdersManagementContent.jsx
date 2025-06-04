
import React from 'react';
import AdminTopbar from './AdminTopbar';
import OrdersListSection from './sections/OrdersListSection';
import RentalOrdersSection from './sections/RentalOrdersSection';
import OrderStatisticsSection from './sections/OrderStatisticsSection';

const OrdersManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Đơn Hàng & Đơn Thuê</h4>
          </div>
        </div>

        <div className="row">
          <OrderStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <OrdersListSection 
            orders={props.orders} 
            onAdd={props.addOrder}
            onUpdate={props.updateOrder}
            onDelete={props.deleteOrder}
          />
        </div>

        <div className="row">
          <RentalOrdersSection 
            rentalOrders={props.rentalOrders}
            onAdd={props.addRentalOrder}
            onUpdate={props.updateRentalOrder}
            onDelete={props.deleteRentalOrder}
            onApprove={props.approveRental}
            onMarkDelivered={props.markAsDelivered}
            onMarkReturned={props.markAsReturned}
            onMarkDamaged={props.markAsDamaged}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersManagementContent;
