
import { useState } from 'react';

export const useEmployeeActivitiesManagement = () => {
  const [activeSection, setActiveSection] = useState('employee-activities');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data cho hoạt động nhân viên
  const [mockActivities] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Nguyễn Văn A",
      activityType: "Đăng nhập",
      description: "Đăng nhập vào hệ thống",
      status: "Thành công",
      date: "2024-01-15",
      time: "08:30:15",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0"
    },
    {
      id: 2,
      employeeId: "EMP001",
      employeeName: "Nguyễn Văn A",
      activityType: "Tạo đơn hàng",
      description: "Tạo đơn hàng DH001 cho khách hàng KH001",
      status: "Thành công",
      date: "2024-01-15",
      time: "09:15:30",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0"
    },
    {
      id: 3,
      employeeId: "EMP002",
      employeeName: "Trần Thị B",
      activityType: "Cập nhật sách",
      description: "Cập nhật thông tin sách 'Lập trình React'",
      status: "Thành công",
      date: "2024-01-15",
      time: "10:20:45",
      ipAddress: "192.168.1.101",
      userAgent: "Firefox 121.0.0.0"
    },
    {
      id: 4,
      employeeId: "EMP003",
      employeeName: "Lê Văn C",
      activityType: "Xử lý thanh toán",
      description: "Xử lý thanh toán cho đơn hàng DH002",
      status: "Đang xử lý",
      date: "2024-01-15",
      time: "11:45:20",
      ipAddress: "192.168.1.102",
      userAgent: "Chrome 120.0.0.0"
    },
    {
      id: 5,
      employeeId: "EMP002",
      employeeName: "Trần Thị B",
      activityType: "Xóa đơn hàng",
      description: "Xóa đơn hàng DH003 theo yêu cầu khách hàng",
      status: "Thất bại",
      date: "2024-01-15",
      time: "14:30:10",
      ipAddress: "192.168.1.101",
      userAgent: "Firefox 121.0.0.0"
    },
    {
      id: 6,
      employeeId: "EMP001",
      employeeName: "Nguyễn Văn A",
      activityType: "Đăng xuất",
      description: "Đăng xuất khỏi hệ thống",
      status: "Thành công",
      date: "2024-01-15",
      time: "17:00:00",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0"
    }
  ]);

  const [filteredActivities, setFilteredActivities] = useState(mockActivities);

  const mockStatistics = {
    totalActivities: mockActivities.length,
    activeEmployees: [...new Set(mockActivities.map(a => a.employeeId))].length,
    todayActivities: mockActivities.filter(a => a.date === "2024-01-15").length,
    processingActivities: mockActivities.filter(a => a.status === "Đang xử lý").length,
    completedActivities: mockActivities.filter(a => a.status === "Thành công").length,
    errorActivities: mockActivities.filter(a => a.status === "Thất bại").length
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleSearchChange = (value) => {
    setSearchEmployeeId(value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchEmployeeId.trim() === '') {
        setFilteredActivities(mockActivities);
      } else {
        const filtered = mockActivities.filter(activity => 
          activity.employeeId.toLowerCase().includes(searchEmployeeId.toLowerCase()) ||
          activity.employeeName.toLowerCase().includes(searchEmployeeId.toLowerCase())
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
    searchEmployeeId,
    handleSearchChange,
    handleSearch,
    isLoading
  };
};
