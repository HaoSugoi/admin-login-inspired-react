
import { useState } from 'react';

export const useOrdersManagement = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data cho đơn hàng
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      customerId: "KH001",
      orderDate: "01/12/2024",
      totalAmount: 250000,
      status: "Chờ xử lý",
      books: [
        { title: "Những Ngày Thơ Bé", quantity: 1, price: 120000 },
        { title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", quantity: 1, price: 130000 }
      ]
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      customerId: "KH002",
      orderDate: "30/11/2024",
      totalAmount: 180000,
      status: "Đã giao",
      books: [
        { title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", quantity: 2, price: 90000 }
      ]
    }
  ]);

  // Mock data cho đơn thuê
  const [rentalOrders, setRentalOrders] = useState([
    {
      id: 1,
      readerName: "Lê Văn C",
      readerId: "DG001",
      requestDate: "28/11/2024",
      approvalDate: null,
      deliveryDate: null,
      returnDate: null,
      status: "Chờ xác nhận",
      books: [
        { title: "Dế Mèn Phiêu Lưu Ký", duration: 14 }
      ],
      notes: ""
    },
    {
      id: 2,
      readerName: "Phạm Thị D",
      readerId: "DG002",
      requestDate: "25/11/2024",
      approvalDate: "26/11/2024",
      deliveryDate: "27/11/2024",
      returnDate: null,
      status: "Đã giao",
      books: [
        { title: "Thần Đồng Đất Việt", duration: 21 }
      ],
      notes: ""
    }
  ]);

  const [statistics] = useState({
    totalOrders: 156,
    pendingOrders: 23,
    completedOrders: 128,
    totalRevenue: 45600000,
    totalRentals: 89,
    pendingRentals: 12,
    activeRentals: 34,
    overdueRentals: 5
  });

  // Hàm xử lý đơn hàng
  const addOrder = (orderData) => {
    const newOrder = {
      id: orders.length + 1,
      ...orderData,
      orderDate: new Date().toLocaleDateString('vi-VN'),
      status: "Chờ xử lý"
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (orderId, updatedData) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // Hàm xử lý đơn thuê
  const addRentalOrder = (rentalData) => {
    const newRental = {
      id: rentalOrders.length + 1,
      ...rentalData,
      requestDate: new Date().toLocaleDateString('vi-VN'),
      status: "Chờ xác nhận"
    };
    setRentalOrders([...rentalOrders, newRental]);
  };

  const updateRentalOrder = (rentalId, updatedData) => {
    setRentalOrders(rentalOrders.map(rental => 
      rental.id === rentalId ? { ...rental, ...updatedData } : rental
    ));
  };

  const deleteRentalOrder = (rentalId) => {
    setRentalOrders(rentalOrders.filter(rental => rental.id !== rentalId));
  };

  const approveRental = (rentalId) => {
    updateRentalOrder(rentalId, {
      status: "Đã xác nhận",
      approvalDate: new Date().toLocaleDateString('vi-VN')
    });
  };

  const markAsDelivered = (rentalId) => {
    updateRentalOrder(rentalId, {
      status: "Đã giao",
      deliveryDate: new Date().toLocaleDateString('vi-VN')
    });
  };

  const markAsReturned = (rentalId) => {
    updateRentalOrder(rentalId, {
      status: "Đã trả",
      returnDate: new Date().toLocaleDateString('vi-VN')
    });
  };

  const markAsDamaged = (rentalId, notes) => {
    updateRentalOrder(rentalId, {
      status: "Sách bị hỏng/mất",
      notes: notes,
      returnDate: new Date().toLocaleDateString('vi-VN')
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    orders,
    rentalOrders,
    statistics,
    addOrder,
    updateOrder,
    deleteOrder,
    addRentalOrder,
    updateRentalOrder,
    deleteRentalOrder,
    approveRental,
    markAsDelivered,
    markAsReturned,
    markAsDamaged,
    handleLogout
  };
};
