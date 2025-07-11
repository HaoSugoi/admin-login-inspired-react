
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

  // Xử lý dữ liệu từ API với cấu trúc response thực tế
  const processedStatistics = {
    // === TỔNG QUAN (từ /api/Report) ===
    totalRevenue: overviewStats?.GrandTotalAmount || 0,
    totalOrders: overviewStats?.TotalOrders || 0,
    totalSaleAmount: overviewStats?.TotalSaleAmount || 0,
    totalRentAmount: overviewStats?.TotalRentAmount || 0,
    totalSaleOrders: overviewStats?.TotalSaleOrders || 0,
    totalRentOrders: overviewStats?.TotalRentOrders || 0,
    
    // === DOANH THU BÁN SÁCH ===
    // Daily Sale
    dailySale: {
      createdDate: dailySaleStats?.CreatedDate || null,
      ordersToday: dailySaleStats?.OrdersToday || 0,
      totalValueToday: dailySaleStats?.TotalValueToday || 0
    },
    
    // Monthly Sale
    monthlySale: {
      createdDates: dailySaleStats?.CreatedDates || [],
      ordersThisMonth: monthlySaleStats?.OrdersThisMonth || 0,
      totalValueThisMonth: monthlySaleStats?.TotalValueThisMonth || 0
    },
    
    // Yearly Sale
    yearlySale: {
      createdDates: yearlySaleStats?.CreatedDates || [],
      ordersThisYear: yearlySaleStats?.OrdersThisYear || 0,
      totalValueThisYear: yearlySaleStats?.TotalValueThisYear || 0
    },
    
    // === DOANH THU CHO THUÊ SÁCH ===
    // Daily Rent
    dailyRent: {
      createdDate: dailyRentStats?.CreatedDate || null,
      ordersToday: dailyRentStats?.OrdersToday || 0,
      totalValueToday: dailyRentStats?.TotalValueToday || 0
    },
    
    // Monthly Rent
    monthlyRent: {
      createdDates: monthlyRentStats?.CreatedDates || [],
      ordersThisMonth: monthlyRentStats?.OrdersThisMonth || 0,
      totalValueThisMonth: monthlyRentStats?.TotalValueThisMonth || 0
    },
    
    // Yearly Rent
    yearlyRent: {
      createdDates: yearlyRentStats?.CreatedDates || [],
      ordersThisYear: yearlyRentStats?.OrdersThisYear || 0,
      totalValueThisYear: yearlyRentStats?.TotalValueThisYear || 0
    },
    
    // === TÍNH TOÁN TỔNG HỢP ===
    // Hôm nay (Sale + Rent)
    todayRevenue: (dailySaleStats?.TotalValueToday || 0) + (dailyRentStats?.TotalValueToday || 0),
    todayOrders: (dailySaleStats?.OrdersToday || 0) + (dailyRentStats?.OrdersToday || 0),
    
    // Tháng này (Sale + Rent)
    monthRevenue: (monthlySaleStats?.TotalValueThisMonth || 0) + (monthlyRentStats?.TotalValueThisMonth || 0),
    monthOrders: (monthlySaleStats?.OrdersThisMonth || 0) + (monthlyRentStats?.OrdersThisMonth || 0),
    
    // Năm này (Sale + Rent)  
    yearRevenue: (yearlySaleStats?.TotalValueThisYear || 0) + (yearlyRentStats?.TotalValueThisYear || 0),
    yearOrders: (yearlySaleStats?.OrdersThisYear || 0) + (yearlyRentStats?.OrdersThisYear || 0),
    
    // Dữ liệu cho biểu đồ
    monthlyChartData: generateMonthlyChartData(monthlySaleStats, monthlyRentStats),
    yearlyChartData: generateYearlyChartData(yearlySaleStats, yearlyRentStats)
  };

  // Generate monthly chart data từ CreatedDates
  function generateMonthlyChartData(saleStats, rentStats) {
    if (!saleStats?.CreatedDates && !rentStats?.CreatedDates) {
      return [
        { period: "Tuần 1", sales: 0, rent: 0, total: 0 },
        { period: "Tuần 2", sales: 0, rent: 0, total: 0 },
        { period: "Tuần 3", sales: 0, rent: 0, total: 0 },
        { period: "Tuần 4", sales: 0, rent: 0, total: 0 }
      ];
    }

    // Phân chia dữ liệu theo tuần trong tháng
    const saleValue = saleStats?.TotalValueThisMonth || 0;
    const rentValue = rentStats?.TotalValueThisMonth || 0;
    const totalDays = Math.max(
      (saleStats?.CreatedDates || []).length, 
      (rentStats?.CreatedDates || []).length
    );
    
    return [
      { 
        period: "Tuần 1", 
        sales: Math.floor(saleValue / 4), 
        rent: Math.floor(rentValue / 4), 
        total: Math.floor((saleValue + rentValue) / 4) 
      },
      { 
        period: "Tuần 2", 
        sales: Math.floor(saleValue / 4), 
        rent: Math.floor(rentValue / 4), 
        total: Math.floor((saleValue + rentValue) / 4) 
      },
      { 
        period: "Tuần 3", 
        sales: Math.floor(saleValue / 4), 
        rent: Math.floor(rentValue / 4), 
        total: Math.floor((saleValue + rentValue) / 4) 
      },
      { 
        period: "Tuần 4", 
        sales: Math.floor(saleValue / 4), 
        rent: Math.floor(rentValue / 4), 
        total: Math.floor((saleValue + rentValue) / 4) 
      }
    ];
  }

  function generateYearlyChartData(saleStats, rentStats) {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    const saleValue = saleStats?.TotalValueThisYear || 0;
    const rentValue = rentStats?.TotalValueThisYear || 0;
    
    return months.slice(0, 6).map((month, index) => {
      const salesMonthly = Math.floor(saleValue / 12);
      const rentMonthly = Math.floor(rentValue / 12);
      
      return {
        period: month,
        sales: salesMonthly,
        rent: rentMonthly,
        total: salesMonthly + rentMonthly
      };
    });
  }

  // Debug log với cấu trúc dữ liệu chi tiết
  console.log('📊 Stats Management - Detailed Data:', {
    '🔍 Raw API Data': {
      overviewStats,
      dailySaleStats,
      monthlySaleStats, 
      yearlySaleStats,
      dailyRentStats,
      monthlyRentStats,
      yearlyRentStats
    },
    '📋 Processed Statistics': processedStatistics,
    '⚡ Status': { isLoadingAny, hasError }
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

  // Date setting functions cho từng loại API
  const handleSetSaleDate = (period, date) => {
    const dateObj = new Date(date);
    console.log(`📅 Setting Sale Date - Period: ${period}, Date: ${date}`);
    
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
      default:
        console.warn('Unknown period:', period);
    }
  };

  const handleSetRentDate = (period, date) => {
    const dateObj = new Date(date);
    console.log(`📅 Setting Rent Date - Period: ${period}, Date: ${date}`);
    
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
      default:
        console.warn('Unknown period:', period);
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    
    // Dữ liệu thống kê đã xử lý chi tiết
    statistics: processedStatistics,
    
    // Raw data từ API cho debugging
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
