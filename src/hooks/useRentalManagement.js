
import { useState } from 'react';

export const useRentalManagement = () => {
  const [activeSection, setActiveSection] = useState('rental');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for rental management
  const [rentals] = useState([
    {
      id: 1,
      bookTitle: "Những Ngày Thơ Bé",
      readerName: "Nguyễn Văn A",
      readerId: "DG001",
      rentDate: "01/12/2024",
      dueDate: "15/12/2024",
      returnDate: null,
      status: "Đang thuê",
      fine: 0
    },
    {
      id: 2,
      bookTitle: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      readerName: "Trần Thị B",
      readerId: "DG002",
      rentDate: "28/11/2024",
      dueDate: "12/12/2024",
      returnDate: null,
      status: "Quá hạn",
      fine: 5000
    },
    {
      id: 3,
      bookTitle: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
      readerName: "Lê Văn C",
      readerId: "DG003",
      rentDate: "20/11/2024",
      dueDate: "04/12/2024",
      returnDate: "03/12/2024",
      status: "Đã trả",
      fine: 0
    }
  ]);

  const [statistics] = useState({
    totalRentals: 156,
    activeRentals: 45,
    overdueRentals: 8,
    totalFines: 125000
  });

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
    rentals,
    statistics,
    handleLogout
  };
};
