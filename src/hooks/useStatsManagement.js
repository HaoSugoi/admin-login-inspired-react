
import { useState } from 'react';

export const useStatsManagement = () => {
  const [activeSection, setActiveSection] = useState('stats');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [statistics] = useState({
    totalRevenue: 125600000,
    totalOrders: 1234,
    totalBooks: 567,
    totalUsers: 245,
    monthlyData: [
      { month: "Tháng 1", revenue: 8500000, orders: 95 },
      { month: "Tháng 2", revenue: 9200000, orders: 108 },
      { month: "Tháng 3", revenue: 7800000, orders: 89 },
      { month: "Tháng 4", revenue: 10500000, orders: 125 }
    ]
  });

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
    statistics,
    handleLogout
  };
};
