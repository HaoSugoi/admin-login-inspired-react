
import React from 'react';
import AdminTopbar from './AdminTopbar';
import CustomersListSection from './sections/CustomersListSection';
import CustomerStatisticsSection from './sections/CustomerStatisticsSection';

const CustomersManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Khách Hàng</h4>
          </div>
        </div>

        <div className="row">
          <CustomerStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <CustomersListSection 
            customers={props.customers}
            onAdd={props.addCustomer}
            onUpdate={props.updateCustomer}
            onDelete={props.deleteCustomer}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersManagementContent;
