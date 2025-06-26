import { useState } from 'react';

export const useAdminIndex = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Cập nhật dữ liệu chart với các mức giá khác nhau để hiển thị màu sắc đa dạng
  const [chartData] = useState([
    { month: "T1", value: 850 },   // 850k = 0.85 triệu (xanh lá)
    { month: "T2", value: 1200 },  // 1.2 triệu (vàng)
    { month: "T3", value: 2300 },  // 2.3 triệu (xanh lam)
    { month: "T4", value: 3800 },  // 3.8 triệu (đỏ)
    { month: "T5", value: 1800 },  // 1.8 triệu (vàng)
    { month: "T6", value: 4200 },  // 4.2 triệu (đỏ)
    { month: "T7", value: 950 },   // 0.95 triệu (xanh lá)
    { month: "T8", value: 2750 },  // 2.75 triệu (xanh lam)
    { month: "T9", value: 1650 },  // 1.65 triệu (vàng)
    { month: "T10", value: 3200 }, // 3.2 triệu (đỏ)
    { month: "T11", value: 750 },  // 0.75 triệu (xanh lá)
    { month: "T12", value: 2100 }  // 2.1 triệu (xanh lam)
  ]);

  const [orders] = useState([
    { id: 1, customer: "Nguyễn Văn A", total: 250000, status: "Đang xử lý", date: "2024-01-15" },
    { id: 2, customer: "Trần Thị B", total: 180000, status: "Hoàn thành", date: "2024-01-14" },
    { id: 3, customer: "Lê Văn C", total: 320000, status: "Đang giao", date: "2024-01-13" },
    { id: 4, customer: "Phạm Thị D", total: 150000, status: "Đã hủy", date: "2024-01-12" },
    { id: 5, customer: "Hoàng Văn E", total: 280000, status: "Hoàn thành", date: "2024-01-11" }
  ]);

  const [activities] = useState([
    { id: 1, user: "Admin", action: "Thêm sách mới", time: "10 phút trước" },
    { id: 2, user: "Nhân viên A", action: "Xử lý đơn hàng #123", time: "25 phút trước" },
    { id: 3, user: "Nhân viên B", action: "Cập nhật kho", time: "1 giờ trước" },
    { id: 4, user: "Admin", action: "Duyệt đơn thuê", time: "2 giờ trước" },
    { id: 5, user: "Nhân viên C", action: "Phản hồi khách hàng", time: "3 giờ trước" }
  ]);

  const [books] = useState([
    { id: 1, title: "Lập trình React", author: "Nguyễn ABC", category: "Công nghệ", stock: 25, status: "Có sẵn" },
    { id: 2, title: "Thiết kế UI/UX", author: "Trần DEF", category: "Thiết kế", stock: 15, status: "Có sẵn" },
    { id: 3, title: "Marketing Online", author: "Lê GHI", category: "Kinh doanh", stock: 8, status: "Sắp hết" },
    { id: 4, title: "Tâm lý học", author: "Phạm JKL", category: "Tâm lý", stock: 0, status: "Hết hàng" },
    { id: 5, title: "Lịch sử Việt Nam", author: "Hoàng MNO", category: "Lịch sử", stock: 12, status: "Có sẵn" }
  ]);

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
    chartData,
    orders,
    activities,
    books,
    handleLogout
  };
};
