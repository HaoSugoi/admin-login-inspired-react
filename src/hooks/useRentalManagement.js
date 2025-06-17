
import { useState } from 'react';
import { useRentalApi } from './useRentalApi';

export const useRentalManagement = () => {
  const [activeSection, setActiveSection] = useState('rental');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook
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

  // Tính toán thống kê từ data API
  const statistics = {
    totalRentals: rentals.length,
    activeRentals: rentals.filter(r => r.status === 'Đang thuê' || r.status === 'Đã giao').length,
    overdueRentals: rentals.filter(r => r.status === 'Quá hạn').length,
    totalFines: rentals.reduce((sum, r) => sum + (r.fine || 0), 0)
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions để xử lý API calls
  const handleApproveRental = (rentalId) => {
    approveRental(rentalId);
  };

  const handleMarkDelivered = (rentalId) => {
    markAsDelivered(rentalId);
  };

  const handleMarkReturned = (rentalId) => {
    markAsReturned(rentalId);
  };

  const handleMarkDamaged = (rentalId, notes) => {
    markAsDamaged({ id: rentalId, notes });
  };

  const handleCreateRental = (rentalData) => {
    createRental(rentalData);
  };

  const handleUpdateRental = (rentalId, rentalData) => {
    updateRental({ id: rentalId, data: rentalData });
  };

  const handleDeleteRental = (rentalId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) {
      deleteRental(rentalId);
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    rentals: rentals || [],
    statistics,
    isLoadingRentals,
    rentalsError,
    handleLogout,
    // API functions
    handleApproveRental,
    handleMarkDelivered,
    handleMarkReturned,
    handleMarkDamaged,
    handleCreateRental,
    handleUpdateRental,
    handleDeleteRental,
    refetchRentals
  };
};
