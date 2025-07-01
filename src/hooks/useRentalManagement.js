
import { useState } from 'react';
import { useRentalApi } from './useRentalApi';

export const useRentalManagement = () => {
  const [activeSection, setActiveSection] = useState('rentals');
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
    // approveRental(rentalId); // Uncomment when API is ready
  };

  const handleMarkDelivered = (rentalId) => {
    console.log('Marking as delivered:', rentalId);
    // markAsDelivered(rentalId); // Uncomment when API is ready
  };

  const handleMarkReturned = (rentalId) => {
    console.log('Marking as returned:', rentalId);
    // markAsReturned(rentalId); // Uncomment when API is ready
  };

  const handleMarkDamaged = (rentalId, notes) => {
    console.log('Marking as damaged:', rentalId, notes);
    // markAsDamaged({ id: rentalId, notes }); // Uncomment when API is ready
  };

  const handleCreateRental = (rentalData) => {
    console.log('Creating rental:', rentalData);
    // createRental(rentalData); // Uncomment when API is ready
  };

  const handleUpdateRental = (rentalId, rentalData) => {
    console.log('Updating rental:', rentalId, rentalData);
    // updateRental({ id: rentalId, data: rentalData }); // Uncomment when API is ready
  };

  const handleDeleteRental = (rentalId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) {
      console.log('Deleting rental:', rentalId);
      // deleteRental(rentalId); // Uncomment when API is ready
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
