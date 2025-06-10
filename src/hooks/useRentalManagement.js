
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

  // Mock data for book conditions
  const [bookConditions, setBookConditions] = useState([
    {
      id: 1,
      bookTitle: "Những Ngày Thơ Bé",
      conditionType: "Mới 100%",
      conditionPercentage: 100,
      quantity: 5,
      description: "Sách mới, chưa sử dụng"
    },
    {
      id: 2,
      bookTitle: "Những Ngày Thơ Bé",
      conditionType: "Rất tốt 90%",
      conditionPercentage: 90,
      quantity: 8,
      description: "Sách đã sử dụng nhưng còn rất tốt"
    },
    {
      id: 3,
      bookTitle: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      conditionType: "Tốt 80%",
      conditionPercentage: 80,
      quantity: 12,
      description: "Sách có dấu hiệu sử dụng nhẹ"
    },
    {
      id: 4,
      bookTitle: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
      conditionType: "Khá tốt 70%",
      conditionPercentage: 70,
      quantity: 6,
      description: "Sách có một số dấu hiệu cũ"
    },
    {
      id: 5,
      bookTitle: "Dế Mèn Phiêu Lưu Ký",
      conditionType: "Hỏng nhẹ 30%",
      conditionPercentage: 30,
      quantity: 3,
      description: "Sách bị rách nhẹ, vẫn đọc được"
    }
  ]);

  // Calculate condition statistics
  const conditionStats = {
    excellent: bookConditions.filter(c => c.conditionPercentage >= 90).reduce((sum, c) => sum + c.quantity, 0),
    good: bookConditions.filter(c => c.conditionPercentage >= 70 && c.conditionPercentage < 90).reduce((sum, c) => sum + c.quantity, 0),
    average: bookConditions.filter(c => c.conditionPercentage >= 50 && c.conditionPercentage < 70).reduce((sum, c) => sum + c.quantity, 0),
    poor: bookConditions.filter(c => c.conditionPercentage < 50).reduce((sum, c) => sum + c.quantity, 0),
    total: bookConditions.reduce((sum, c) => sum + c.quantity, 0)
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  // Book condition management functions
  const addBookCondition = (conditionData) => {
    const newCondition = {
      id: Date.now(),
      ...conditionData
    };
    setBookConditions([...bookConditions, newCondition]);
    console.log('Added condition:', newCondition);
  };

  const updateBookCondition = (id, conditionData) => {
    setBookConditions(bookConditions.map(condition => 
      condition.id === id ? { ...condition, ...conditionData } : condition
    ));
    console.log('Updated condition:', id, conditionData);
  };

  const deleteBookCondition = (id) => {
    setBookConditions(bookConditions.filter(condition => condition.id !== id));
    console.log('Deleted condition:', id);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    rentals,
    statistics,
    bookConditions,
    conditionStats,
    addBookCondition,
    updateBookCondition,
    deleteBookCondition,
    handleLogout
  };
};
