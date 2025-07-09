
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
      { period: "Tháng 1", value: 850 },
      { period: "Tháng 2", value: 1200 },
      { period: "Tháng 3", value: 780 },
      { period: "Tháng 4", value: 1050 },
      { period: "Tháng 5", value: 1380 },
      { period: "Tháng 6", value: 950 }
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
