
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

  // Xử lý dữ liệu từ API mới với cấu trúc response thực tế
  const processedStatistics = {
    // Tổng quan (từ /api/Report)
    totalRevenue: overviewStats?.GrandTotalAmount || 0,
    totalOrders: overviewStats?.TotalOrders || 0,
    totalSaleAmount: overviewStats?.TotalSaleAmount || 0,
    totalRentAmount: overviewStats?.TotalRentAmount || 0,
    totalSaleOrders: overviewStats?.TotalSaleOrders || 0,
    totalRentOrders: overviewStats?.TotalRentOrders || 0,
    
    // Dữ liệu hôm nay
    todayRevenue: (dailySaleStats?.TotalValueToday || 0) + (dailyRentStats?.TotalValueToday || 0),
    todayOrders: (dailySaleStats?.OrdersToday || 0) + (dailyRentStats?.OrdersToday || 0),
    todaySaleRevenue: dailySaleStats?.TotalValueToday || 0,
    todayRentRevenue: dailyRentStats?.TotalValueToday || 0,
    
    // Dữ liệu tháng này
    monthRevenue: (monthlySaleStats?.TotalValueThisMonth || 0) + (monthlyRentStats?.TotalValueThisMonth || 0),
    monthOrders: (monthlySaleStats?.OrdersThisMonth || 0) + (monthlyRentStats?.OrdersThisMonth || 0),
    
    // Dữ liệu năm này
    yearRevenue: (yearlySaleStats?.TotalValueThisYear || 0) + (yearlyRentStats?.TotalValueThisYear || 0),
    yearOrders: (yearlySaleStats?.OrdersThisYear || 0) + (yearlyRentStats?.OrdersThisYear || 0),
    
    // Dữ liệu cho biểu đồ (sử dụng createdDates từ monthly stats)
    monthlyChartData: generateChartData(monthlySaleStats, monthlyRentStats),
    yearlyChartData: generateYearlyChartData(yearlySaleStats, yearlyRentStats)
  };

  // Generate chart data từ monthly statistics
  function generateChartData(saleStats, rentStats) {
    if (!saleStats?.CreatedDates || !rentStats?.CreatedDates) {
      return [
        { period: "Ngày 1", sales: 0, rent: 0, total: 0 },
        { period: "Ngày 7", sales: 0, rent: 0, total: 0 },
        { period: "Ngày 14", sales: 0, rent: 0, total: 0 },
        { period: "Ngày 21", sales: 0, rent: 0, total: 0 },
        { period: "Ngày 28", sales: 0, rent: 0, total: 0 }
      ];
    }

    // Tạo chart data từ createdDates thực tế
    const allDates = [...new Set([
      ...(saleStats.CreatedDates || []), 
      ...(rentStats.CreatedDates || [])
    ])].sort();
    
    return allDates.slice(0, 5).map((date, index) => {
      const dateObj = new Date(date);
      const salesValue = Math.floor((saleStats?.TotalValueThisMonth || 0) / allDates.length);
      const rentValue = Math.floor((rentStats?.TotalValueThisMonth || 0) / allDates.length);
      
      return {
        period: `Ngày ${dateObj.getDate()}`,
        sales: salesValue,
        rent: rentValue,
        total: salesValue + rentValue
      };
    });
  }

  function generateYearlyChartData(saleStats, rentStats) {
    // Tương tự cho yearly data
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    return months.slice(0, 4).map((month, index) => {
      const salesValue = Math.floor((saleStats?.TotalValueThisYear || 0) / 12);
      const rentValue = Math.floor((rentStats?.TotalValueThisYear || 0) / 12);
      
      return {
        period: month,
        sales: salesValue,
        rent: rentValue,
        total: salesValue + rentValue
      };
    });
  }

  // Log để debug với cấu trúc dữ liệu mới
  console.log('📋 Stats Management Data (Updated API):', {
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
