
import { useState } from 'react';

export const useBooksManagement = () => {
  const [activeSection, setActiveSection] = useState('books');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for books management
  const [books] = useState([
    {
      id: 1,
      title: "Những Ngày Thơ Bé",
      author: "Nguyễn Nhật Ánh",
      isbn: "978-604-2-12345-1",
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      publishYear: 2020,
      quantity: 50,
      available: 35,
      status: "available"
    },
    {
      id: 2,
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh", 
      isbn: "978-604-2-12345-2",
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      publishYear: 2018,
      quantity: 30,
      available: 20,
      status: "available"
    },
    {
      id: 3,
      title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
      author: "Nguyễn Nhật Ánh",
      isbn: "978-604-2-12345-3", 
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      publishYear: 2019,
      quantity: 25,
      available: 15,
      status: "available"
    }
  ]);

  const [categories] = useState([
    { id: 1, name: "Tiểu thuyết", count: 45 },
    { id: 2, name: "Khoa học", count: 30 },
    { id: 3, name: "Lịch sử", count: 25 },
    { id: 4, name: "Thiếu nhi", count: 40 }
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
    categories,
    handleLogout
  };
};
