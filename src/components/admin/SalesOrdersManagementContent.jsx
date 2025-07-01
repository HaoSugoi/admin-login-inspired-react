
import React from 'react';
import AdminTopbar from './AdminTopbar';
import SalesOrdersListSection from './sections/SalesOrdersListSection';
import SalesOrdersStatisticsSection from './sections/SalesOrdersStatisticsSection';

const SalesOrdersManagementContent = (props) => {
  // Mock data cho đơn hàng bán
  const mockSalesOrders = [
    {
      id: 1,
      orderNumber: 'DH001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0901234567',
      customerEmail: 'nguyenvana@email.com',
      shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
      orderDate: '2024-01-15',
      totalAmount: 450000,
      shippingFee: 50000,
      status: 'Đã giao',
      paymentMethod: 'Tiền mặt',
      books: [
        { title: 'Những Ngày Thơ Bé', quantity: 2, price: 120000, subtotal: 240000 },
        { title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', quantity: 1, price: 160000, subtotal: 160000 }
      ]
    },
    {
      id: 2,
      orderNumber: 'DH002',
      customerName: 'Trần Thị B',
      customerPhone: '0907654321',
      customerEmail: 'tranthib@email.com',
      shippingAddress: '456 Đường DEF, Quận 3, TP.HCM',
      orderDate: '2024-01-16',
      totalAmount: 370000,
      shippingFee: 50000,
      status: 'Đang xử lý',
      paymentMethod: 'Chuyển khoản',
      books: [
        { title: 'Cho Tôi Xin Một Vé Đi Tuổi Thơ', quantity: 2, price: 160000, subtotal: 320000 }
      ]
    }
  ];

  // Statistics for mock data
  const statistics = {
    totalOrders: mockSalesOrders.length,
    pendingOrders: mockSalesOrders.filter(o => o.status === 'Chờ xử lý').length,
    processingOrders: mockSalesOrders.filter(o => o.status === 'Đang xử lý').length,
    completedOrders: mockSalesOrders.filter(o => o.status === 'Đã giao').length,
    cancelledOrders: mockSalesOrders.filter(o => o.status === 'Đã hủy').length,
    totalRevenue: mockSalesOrders
      .filter(o => o.status === 'Đã giao')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)
  };

  // Handler functions for sales orders
  const handleCreateOrder = (data) => {
    console.log('Creating sales order:', data);
  };

  const handleUpdateOrder = (id, data) => {
    console.log('Updating sales order:', id, data);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      console.log('Deleting sales order:', id);
    }
  };

  const handleUpdateOrderStatus = (id, status) => {
    console.log('Updating order status:', id, status);
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Bán Hàng</h4>
          </div>
        </div>

        <div className="row">
          <SalesOrdersStatisticsSection statistics={statistics} />
        </div>

        <div className="row">
          <SalesOrdersListSection 
            orders={mockSalesOrders} 
            onAdd={handleCreateOrder}
            onUpdate={handleUpdateOrder}
            onDelete={handleDeleteOrder}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesOrdersManagementContent;
