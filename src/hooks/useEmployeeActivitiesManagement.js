
import { useState } from 'react';

export const useEmployeeActivitiesManagement = () => {
  const [activeSection, setActiveSection] = useState('employee-activities');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchStaffId, setSearchStaffId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data theo cấu trúc API mới
  const [mockActivities] = useState([
    {
      notificationId: "NOT001",
      staffId: "STAFF001",
      description: "Nhân viên đã đăng nhập vào hệ thống",
      createdDate: "2024-01-15T08:30:15",
      staff: {
        id: "STAFF001",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0123456789"
      }
    },
    {
      notificationId: "NOT002",
      staffId: "STAFF001",
      description: "Tạo đơn hàng DH001 cho khách hàng KH001",
      createdDate: "2024-01-15T09:15:30",
      staff: {
        id: "STAFF001",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0123456789"
      }
    },
    {
      notificationId: "NOT003",
      staffId: "STAFF002",
      description: "Cập nhật thông tin sách 'Lập trình React'",
      createdDate: "2024-01-15T10:20:45",
      staff: {
        id: "STAFF002",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0987654321"
      }
    },
    {
      notificationId: "NOT004",
      staffId: "STAFF003",
      description: "Xử lý thanh toán cho đơn hàng DH002",
      createdDate: "2024-01-15T11:45:20",
      staff: {
        id: "STAFF003",
        name: "Lê Văn C",
        email: "levanc@example.com",
        phone: "0111222333"
      }
    },
    {
      notificationId: "NOT005",
      staffId: "STAFF002",
      description: "Xóa đơn hàng DH003 theo yêu cầu khách hàng",
      createdDate: "2024-01-15T14:30:10",
      staff: {
        id: "STAFF002",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0987654321"
      }
    },
    {
      notificationId: "NOT006",
      staffId: "STAFF001",
      description: "Nhân viên đã đăng xuất khỏi hệ thống",
      createdDate: "2024-01-15T17:00:00",
      staff: {
        id: "STAFF001",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0123456789"
      }
    }
  ]);

  const [filteredActivities, setFilteredActivities] = useState(mockActivities);

  const mockStatistics = {
    totalActivities: mockActivities.length,
    activeStaff: [...new Set(mockActivities.map(a => a.staffId))].length,
    todayActivities: mockActivities.filter(a => {
      const today = new Date().toISOString().split('T')[0];
      return a.createdDate.split('T')[0] === today;
    }).length,
    thisWeekActivities: mockActivities.filter(a => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(a.createdDate) >= oneWeekAgo;
    }).length,
    thisMonthActivities: mockActivities.filter(a => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(a.createdDate) >= oneMonthAgo;
    }).length,
    recentActivities: mockActivities.filter(a => {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      return new Date(a.createdDate) >= oneHourAgo;
    }).length
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleSearchChange = (value) => {
    setSearchStaffId(value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchStaffId.trim() === '') {
        setFilteredActivities(mockActivities);
      } else {
        const filtered = mockActivities.filter(activity => 
          activity.staffId.toLowerCase().includes(searchStaffId.toLowerCase()) ||
          activity.staff?.name.toLowerCase().includes(searchStaffId.toLowerCase()) ||
          activity.staff?.email.toLowerCase().includes(searchStaffId.toLowerCase())
        );
        setFilteredActivities(filtered);
      }
      setIsLoading(false);
    }, 1000);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,
    
    // Employee Activities specific data
    activities: filteredActivities,
    statistics: mockStatistics,
    searchStaffId,
    handleSearchChange,
    handleSearch,
    isLoading
  };
};
