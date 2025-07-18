
import { useState } from 'react';
import { useOrderApi } from './useOrderApi';

export const useOrdersManagement = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook (hiện tại dùng mock data)
  const {
    orders,
    statistics,
    isLoadingOrders,
    ordersError,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    refetchOrders
  } = useOrderApi();

  // Mock data cho đơn hàng bán
  const [mockOrders] = useState([
    {
      id: 1,
      orderNumber: 'DH001',
      customerName: "Nguyễn Văn A",
      customerId: "KH001",
      customerPhone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: 450000,
      status: "Đã giao",
      paymentMethod: "Tiền mặt",
      books: [
        { title: "Những Ngày Thơ Bé", quantity: 2, price: 120000 },
        { title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", quantity: 1, price: 180000 }
      ]
    },
    {
      id: 2,
      orderNumber: 'DH002',
      customerName: "Trần Thị B",
      customerId: "KH002",
      customerPhone: "0907654321",
      orderDate: "2024-01-16",
      totalAmount: 320000,
      status: "Đang xử lý",
      paymentMethod: "Chuyển khoản",
      books: [
        { title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", quantity: 2, price: 140000 }
      ]
    }
  ]);

  const mockStatistics = {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'Chờ xử lý').length,
    processingOrders: mockOrders.filter(o => o.status === 'Đang xử lý').length,
    completedOrders: mockOrders.filter(o => o.status === 'Đã giao').length,
    totalRevenue: mockOrders
      .filter(o => o.status === 'Đã giao')
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions
  const handleCreateOrder = (orderData) => {
    console.log('Creating order:', orderData);
    // createOrder(orderData); // Uncomment when API is ready
  };

  const handleUpdateOrder = (orderId, orderData) => {
    console.log('Updating order:', orderId, orderData);
    // updateOrder({ id: orderId, data: orderData }); // Uncomment when API is ready
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      console.log('Deleting order:', orderId);
      // deleteOrder(orderId); // Uncomment when API is ready
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,
    
    // Sử dụng mock data khi API chưa sẵn sàng
    orders: mockOrders,
    statistics: mockStatistics,
    isLoadingOrders: false,
    ordersError: null,
    
    // API functions
    addOrder: handleCreateOrder,
    updateOrder: handleUpdateOrder,
    deleteOrder: handleDeleteOrder,
    refetchOrders
  };
};
