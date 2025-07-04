
import React from 'react';
import AdminTopbar from './AdminTopbar';
import OrdersListSection from './sections/OrdersListSection';
import OrderStatisticsSection from './sections/OrderStatisticsSection';

const OrdersManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Đơn Hàng Bán</h4>
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
      </div>
    </div>
  );
};

export default OrdersManagementContent;
