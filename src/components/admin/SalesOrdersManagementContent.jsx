
import React from 'react';
import AdminTopbar from './AdminTopbar';
import SalesOrdersListSection from './sections/SalesOrdersListSection';
import SalesOrdersStatisticsSection from './sections/SalesOrdersStatisticsSection';

const SalesOrdersManagementContent = (props) => {
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
          <SalesOrdersStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <SalesOrdersListSection 
            orders={props.orders} 
            onAdd={props.handleCreateOrder}
            onUpdate={props.handleUpdateOrder}
            onDelete={props.handleDeleteOrder}
            onUpdateStatus={props.handleUpdateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesOrdersManagementContent;
