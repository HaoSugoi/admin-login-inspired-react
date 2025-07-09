
import { useState } from 'react';
import { useReportApi } from './useReportApi';

export const useStatsManagement = () => {
  const [activeSection, setActiveSection] = useState('stats');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API thật từ Backend
  const {
    bookStatistics,
    isLoadingBookStats,
    bookStatsError,
    refetchBookStats,
    isLoadingAny,
    hasError
  } = useReportApi();

  // Xử lý dữ liệu từ API hoặc fallback data
  const processedStatistics = bookStatistics ? {
    // Dữ liệu tổng quan
    totalRevenue: (bookStatistics.overview?.totalRentBookValue || 0) + (bookStatistics.overview?.totalSaleBookValue || 0),
    totalOrders: (bookStatistics.overview?.totalRentBookItems || 0),
    totalBooks: (bookStatistics.overview?.totalRentBooks || 0) + (bookStatistics.overview?.totalSaleBooks || 0),
    totalUsers: 245, // Chưa có trong API, giữ nguyên mock data
    
    // Dữ liệu hôm nay
    todayRevenue: (bookStatistics.daily?.rentBookValueToday || 0) + (bookStatistics.daily?.saleBookValueToday || 0),
    todayOrders: (bookStatistics.daily?.rentBooksToday || 0) + (bookStatistics.daily?.saleBooksToday || 0),
    
    // Dữ liệu tuần này
    weekRevenue: (bookStatistics.weekly?.rentBookValueThisWeek || 0) + (bookStatistics.weekly?.saleBookValueThisWeek || 0),
    weekOrders: (bookStatistics.weekly?.rentBooksThisWeek || 0) + (bookStatistics.weekly?.saleBooksThisWeek || 0),
    
    // Dữ liệu tháng này
    monthRevenue: (bookStatistics.monthly?.rentBookValueThisMonth || 0) + (bookStatistics.monthly?.saleBookValueThisMonth || 0),
    monthOrders: (bookStatistics.monthly?.rentBooksThisMonth || 0) + (bookStatistics.monthly?.saleBooksThisMonth || 0),
    
    // Dữ liệu biểu đồ (mock data cho biểu đồ - có thể tạo endpoint riêng sau)
    monthlyData: [
      { period: "Tháng 1", value: 850 },
      { period: "Tháng 2", value: 1200 },
      { period: "Tháng 3", value: 780 },
      { period: "Tháng 4", value: 1050 },
      { period: "Tháng 5", value: 1380 },
      { period: "Tháng 6", value: 950 }
    ]
  } : {
    // Fallback data khi chưa có API response
    totalRevenue: 0,
    totalOrders: 0,
    totalBooks: 0,
    totalUsers: 0,
    todayRevenue: 0,
    todayOrders: 0,
    weekRevenue: 0,
    weekOrders: 0,
    monthRevenue: 0,
    monthOrders: 0,
    monthlyData: []
  };

  // Log để debug
  console.log('📋 Stats Management Data:', {
    bookStatistics,
    processedStatistics,
    isLoadingBookStats,
    bookStatsError: bookStatsError?.message
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleRefreshStats = () => {
    console.log('🔄 Refreshing statistics...');
    refetchBookStats();
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    
    // Dữ liệu thống kê đã xử lý
    statistics: processedStatistics,
    
    // Raw data từ API (để debug)
    rawBookStatistics: bookStatistics,
    
    // Loading và error states
    isLoading: isLoadingBookStats || isLoadingAny,
    error: bookStatsError || hasError,
    
    // Actions
    handleLogout,
    handleRefreshStats
  };
};
