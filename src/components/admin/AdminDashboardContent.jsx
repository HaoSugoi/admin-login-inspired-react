
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
        {/* Hàng đầu tiên: Báo cáo Doanh Thu */}
        <div className="row">
          <RevenueChart chartData={props.chartData} />
        </div>

        {/* Hàng thứ hai: Quản lý Đơn Hàng và Hoạt động gần đây */}
        <div className="row">
          <OrdersSection orders={props.orders} />
          <ActivitySection activities={props.activities} />
        </div>

        {/* Hàng thứ ba: Quản lý Sách và Quản lý Sách Thuê */}
        
      </div>
    </div>
  );
};

export default AdminDashboardContent;
