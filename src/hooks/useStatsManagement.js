
import { useState } from 'react';
import { useReportApi } from './useReportApi';

export const useStatsManagement = () => {
  const [activeSection, setActiveSection] = useState('stats');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API mới từ Backend
  const {
    overviewStats,
    dailySaleStats,
    monthlySaleStats,
    yearlySaleStats,
    dailyRentStats,
    monthlyRentStats,
    yearlyRentStats,
    isLoadingAny,
    hasError,
    refetchAllStats,
    setDailySaleDate,
    setMonthlySaleDate,
    setYearlySaleDate,
    setDailyRentDate,
    setMonthlyRentDate,
    setYearlyRentDate,
    isSettingDate
  } = useReportApi();

  // Xử lý dữ liệu từ API mới
  const processedStatistics = {
    // Tổng quan (từ overview và tổng hợp)
    totalRevenue: (overviewStats?.totalSaleBookValue || 0) + 
                  (dailyRentStats?.totalValueToday || 0) + 
                  (monthlyRentStats?.totalValueThisMonth || 0),
    totalOrders: (dailySaleStats?.ordersToday || 0) + (dailyRentStats?.ordersToday || 0),
    totalSaleBooks: overviewStats?.totalSaleBooks || 0,
    totalUsers: 245, // Mock data vì chưa có trong API
    
    // Dữ liệu hôm nay
    todayRevenue: (dailySaleStats?.totalValueToday || 0) + (dailyRentStats?.totalValueToday || 0),
    todayOrders: (dailySaleStats?.ordersToday || 0) + (dailyRentStats?.ordersToday || 0),
    
    // Dữ liệu tháng này
    monthRevenue: (monthlySaleStats?.totalValueThisMonth || 0) + (monthlyRentStats?.totalValueThisMonth || 0),
    monthOrders: (monthlySaleStats?.ordersThisMonth || 0) + (monthlyRentStats?.ordersThisMonth || 0),
    
    // Dữ liệu năm này
    yearRevenue: (yearlySaleStats?.totalValueThisYear || 0) + (yearlyRentStats?.totalValueThisYear || 0),
    yearOrders: (yearlySaleStats?.ordersThisYear || 0) + (yearlyRentStats?.ordersThisYear || 0),
    
    // Dữ liệu cho biểu đồ (sử dụng createdDates từ monthly stats)
    monthlyChartData: generateChartData(monthlySaleStats, monthlyRentStats),
    yearlyChartData: generateYearlyChartData(yearlySaleStats, yearlyRentStats)
  };

  // Generate chart data từ monthly statistics
  function generateChartData(saleStats, rentStats) {
    if (!saleStats?.createdDates || !rentStats?.createdDates) {
      return [
        { period: "Ngày 1", value: 0 },
        { period: "Ngày 7", value: 0 },
        { period: "Ngày 14", value: 0 },
        { period: "Ngày 21", value: 0 },
        { period: "Ngày 28", value: 0 }
      ];
    }

    // Tạo chart data từ createdDates
    const allDates = [...new Set([...saleStats.createdDates, ...rentStats.createdDates])].sort();
    
    return allDates.slice(0, 5).map((date, index) => ({
      period: `Ngày ${new Date(date).getDate()}`,
      value: Math.floor(Math.random() * 1000) + 500 // Mock value, có thể tính toán thực tế
    }));
  }

  function generateYearlyChartData(saleStats, rentStats) {
    if (!saleStats?.createdDates || !rentStats?.createdDates) {
      return [
        { period: "Tháng 1", value: 0 },
        { period: "Tháng 2", value: 0 },
        { period: "Tháng 3", value: 0 },
        { period: "Tháng 4", value: 0 }
      ];
    }

    // Group by months
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    return months.slice(0, 4).map((month, index) => ({
      period: month,
      value: Math.floor(Math.random() * 2000) + 800 // Mock value
    }));
  }

  // Log để debug
  console.log('📋 Stats Management Data:', {
    overviewStats,
    dailySaleStats,
    monthlySaleStats,
    yearlySaleStats,
    dailyRentStats,
    monthlyRentStats,
    yearlyRentStats,
    processedStatistics,
    isLoadingAny,
    hasError
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleRefreshStats = () => {
    console.log('🔄 Refreshing all statistics...');
    refetchAllStats();
  };

  // Date setting functions
  const handleSetSaleDate = (period, date) => {
    const dateObj = new Date(date);
    
    switch (period) {
      case 'day':
        setDailySaleDate(dateObj.toISOString());
        break;
      case 'month':
        setMonthlySaleDate({
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1
        });
        break;
      case 'year':
        setYearlySaleDate(dateObj.getFullYear());
        break;
    }
  };

  const handleSetRentDate = (period, date) => {
    const dateObj = new Date(date);
    
    switch (period) {
      case 'day':
        setDailyRentDate(dateObj.toISOString());
        break;
      case 'month':
        setMonthlyRentDate({
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1
        });
        break;
      case 'year':
        setYearlyRentDate(dateObj.getFullYear());
        break;
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    
    // Dữ liệu thống kê đã xử lý
    statistics: processedStatistics,
    
    // Raw data từ API mới
    rawStats: {
      overview: overviewStats,
      dailySale: dailySaleStats,
      monthlySale: monthlySaleStats,
      yearlySale: yearlySaleStats,
      dailyRent: dailyRentStats,
      monthlyRent: monthlyRentStats,
      yearlyRent: yearlyRentStats
    },
    
    // Loading và error states
    isLoading: isLoadingAny,
    error: hasError,
    isSettingDate,
    
    // Actions
    handleLogout,
    handleRefreshStats,
    handleSetSaleDate,
    handleSetRentDate
  };
};
