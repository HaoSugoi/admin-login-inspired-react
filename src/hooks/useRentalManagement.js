
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

  // Xử lý dữ liệu từ API và tính toán thống kê
  const safeRentals = rentals || [];
  
  const statistics = {
    totalRentals: safeRentals.length,
    activeRentals: safeRentals.filter(r => r.status === 'Rented').length,
    overdueRentals: safeRentals.filter(r => r.status === 'Overdue').length,
    totalFines: 0 // API chưa có thông tin phạt, tạm thời để 0
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions để xử lý API calls
  const handleApproveRental = (rentalId) => {
    console.log('Approving rental:', rentalId);
    approveRental(rentalId);
  };

  const handleMarkDelivered = (rentalId) => {
    console.log('Marking as delivered:', rentalId);
    markAsDelivered(rentalId);
  };

  const handleMarkReturned = (rentalId) => {
    console.log('Marking as returned:', rentalId);
    markAsReturned(rentalId);
  };

  const handleMarkDamaged = (rentalId, notes) => {
    console.log('Marking as damaged:', rentalId, notes);
    markAsDamaged({ id: rentalId, notes });
  };

  const handleCreateRental = (rentalData) => {
    console.log('Creating rental:', rentalData);
    createRental(rentalData);
  };

  const handleUpdateRental = (rentalId, rentalData) => {
    console.log('Updating rental:', rentalId, rentalData);
    updateRental({ id: rentalId, data: rentalData });
  };

  const handleDeleteRental = (rentalId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) {
      console.log('Deleting rental:', rentalId);
      deleteRental(rentalId);
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    rentals: safeRentals,
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
