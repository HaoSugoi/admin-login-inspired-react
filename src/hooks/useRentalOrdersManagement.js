
import { useState } from 'react';
import { useRentalApi } from './useRentalApi';

export const useRentalOrdersManagement = () => {
  const [activeSection, setActiveSection] = useState('rental-orders');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const {
    rentals,
    isLoadingRentals,
    rentalsError,
    createRental,
    updateRental,
    deleteRental,
    approveRental,
    markAsDelivered,
    markAsReturned,
    markAsDamaged,
    refetchRentals
  } = useRentalApi();

  const safeRentals = rentals || [];
  
  const statistics = {
    totalRentals: safeRentals.length,
    activeRentals: safeRentals.filter(r => r.status === 'Rented').length,
    overdueRentals: safeRentals.filter(r => r.status === 'Overdue').length,
    totalFines: 0
  };

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
    handleLogout,
    
    // Data
    rentals: safeRentals,
    statistics,
    isLoadingRentals,
    rentalsError,
    
    // API functions
    createRental,
    updateRental,
    deleteRental,
    approveRental,
    markAsDelivered,
    markAsReturned,
    markAsDamaged,
    refetchRentals
  };
};
