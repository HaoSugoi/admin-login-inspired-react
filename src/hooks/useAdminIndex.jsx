
import { useState, useEffect } from 'react';

export const useAdminIndex = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for books
  const [books] = useState([
    {
      id: 1,
      title: "Những Ngày Thơ Bé",
      author: "Nguyễn Nhật Ánh",
      image: "/placeholder.svg",
      status: "available"
    },
    {
      id: 2,
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh", 
      image: "/placeholder.svg",
      status: "available"
    }
  ]);

  // Mock data for orders
  const [orders] = useState([
    {
      id: "HD00001",
      date: "15 Thg 12/2024",
      status: "Chưa Xác Nhận",
      customer: "Nguyễn Văn A"
    },
    {
      id: "HD00012", 
      date: "15 Thg 12/2024",
      status: "Chưa Xác Nhận",
      customer: "Trần Thị B"
    }
  ]);

  // Mock data for activities
  const [activities] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      action: "Thêm sản phẩm",
      time: "6:30/31/2025"
    },
    {
      id: 2,
      user: "Nguyễn Văn A", 
      action: "Thêm khách hàng",
      time: "6:30/31/2025"
    },
    {
      id: 3,
      user: "Nguyễn thị B",
      action: "Sửa sản phẩm", 
      time: "6:30/31/2025"
    },
    {
      id: 4,
      user: "Nguyễn Thị B",
      action: "Sửa Thể loại",
      time: "6:30/31/2025"
    },
    {
      id: 5,
      user: "Trần Văn C",
      action: "Xuất file báo cáo",
      time: "6:30/31/2025"
    }
  ]);

  // Mock chart data
  const [chartData] = useState([
    { month: 'T12', value: 180 },
    { month: 'T1', value: 220 },
    { month: 'T2', value: 350 },
    { month: 'T3', value: 380 },
    { month: 'T4', value: 280 },
    { month: 'T5', value: 120 },
    { month: 'T6', value: 420 }
  ]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    books,
    orders,
    activities,
    chartData,
    handleLogout
  };
};
