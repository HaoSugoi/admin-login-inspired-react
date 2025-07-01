
import { useState } from 'react';
import { useRentBooksApi } from './useRentBooksApi';

export const useRentBooksManagement = () => {
  const [activeSection, setActiveSection] = useState('rent-books');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const {
    rentbookss,
    isLoadingRentBookss,
    rentbookssError,
    createRentBooks,
    updateRentBooks,
    deleteRentBooks,
    toggleVisibility,
    refetchRentBookss
  } = useRentBooksApi();

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
    rentbookss: rentbookss || [],
    isLoadingRentBookss,
    rentbookssError,
    
    // API functions
    createRentBooks,
    updateRentBooks,
    deleteRentBooks,
    toggleVisibility,
    refetchRentBookss
  };
};
