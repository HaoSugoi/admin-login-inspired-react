
import React from 'react';
import AdminTopbar from './AdminTopbar';
import BooksSection from './sections/BooksSection';
import OrdersSection from './sections/OrdersSection';
import ActivitySection from './sections/ActivitySection';
import RevenueChart from './sections/RevenueChart';

const AdminDashboardContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <BooksSection books={props.books} />
          <OrdersSection orders={props.orders} />
        </div>

        <div className="row">
          <ActivitySection activities={props.activities} />
          <RevenueChart chartData={props.chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
