
import { useState } from 'react';
import { useOrderApi } from './useOrderApi';

export const useSalesOrdersManagement = () => {
  const [activeSection, setActiveSection] = useState('sales-orders');
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

  // Mock data cho đơn hàng bán khi API chưa sẵn sàng
  const [mockOrders] = useState([
    {
      id: 1,
      orderNumber: 'DH001',
      customerName: "Nguyễn Văn A",
      customerId: "KH001",
      customerPhone: "0901234567",
      customerEmail: "nguyenvana@email.com",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      totalAmount: 450000,
      status: "Đã giao",
      paymentMethod: "Tiền mặt",
      shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
      books: [
        { id: 1, title: "Những Ngày Thơ Bé", quantity: 2, price: 120000, subtotal: 240000 },
        { id: 2, title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", quantity: 1, price: 180000, subtotal: 180000 }
      ],
      discount: 30000,
      shippingFee: 60000,
      notes: "Giao hàng vào buổi chiều"
    },
    {
      id: 2,
      orderNumber: 'DH002',
      customerName: "Trần Thị B",
      customerId: "KH002",
      customerPhone: "0907654321",
      customerEmail: "tranthib@email.com",
      orderDate: "2024-01-16",
      deliveryDate: null,
      totalAmount: 320000,
      status: "Đang xử lý",
      paymentMethod: "Chuyển khoản",
      shippingAddress: "456 Đường DEF, Quận 3, TP.HCM",
      books: [
        { id: 3, title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", quantity: 2, price: 140000, subtotal: 280000 }
      ],
      discount: 0,
      shippingFee: 40000,
      notes: ""
    },
    {
      id: 3,
      orderNumber: 'DH003',
      customerName: "Lê Văn C",
      customerId: "KH003",
      customerPhone: "0912345678",
      customerEmail: "levanc@email.com",
      orderDate: "2024-01-17",
      deliveryDate: null,
      totalAmount: 200000,
      status: "Chờ xử lý",
      paymentMethod: "COD",
      shippingAddress: "789 Đường GHI, Quận 7, TP.HCM",
      books: [
        { id: 4, title: "Dế Mèn Phiêu Lưu Ký", quantity: 1, price: 150000, subtotal: 150000 }
      ],
      discount: 0,
      shippingFee: 50000,
      notes: "Khách yêu cầu gọi trước khi giao"
    }
  ]);

  const mockStatistics = {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'Chờ xử lý').length,
    processingOrders: mockOrders.filter(o => o.status === 'Đang xử lý').length,
    completedOrders: mockOrders.filter(o => o.status === 'Đã giao').length,
    cancelledOrders: mockOrders.filter(o => o.status === 'Đã hủy').length,
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
    console.log('Creating sales order:', orderData);
    // createOrder(orderData); // Uncomment when API is ready
  };

  const handleUpdateOrder = (orderId, orderData) => {
    console.log('Updating sales order:', orderId, orderData);
    // updateOrder({ id: orderId, data: orderData }); // Uncomment when API is ready
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      console.log('Deleting sales order:', orderId);
      // deleteOrder(orderId); // Uncomment when API is ready
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    console.log('Updating order status:', orderId, newStatus);
    // updateOrderStatus({ id: orderId, status: newStatus }); // Uncomment when API is ready
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
    handleCreateOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleUpdateOrderStatus,
    refetchOrders
  };
};
