
import { useState } from 'react';
import { useOrderApi } from './useOrderApi';

export const useSalesOrdersManagement = () => {
  const [activeSection, setActiveSection] = useState('sales-orders');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook
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

  const handleUpdateOrderStatus = (orderId, status) => {
    console.log('Updating order status:', orderId, status);
    // updateOrderStatus({ id: orderId, status }); // Uncomment when API is ready
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,
    
    // Data
    orders: orders || [],
    statistics: statistics || {
      totalOrders: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0
    },
    isLoadingOrders,
    ordersError,
    
    // API functions
    handleCreateOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleUpdateOrderStatus,
    refetchOrders
  };
};
