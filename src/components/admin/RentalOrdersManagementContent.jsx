
import React from 'react';
import AdminTopbar from './AdminTopbar';
import RentalStatisticsSection from './sections/RentalStatisticsSection';
import RentalOrdersListSection from './sections/RentalOrdersListSection';
import OverdueSection from './sections/OverdueSection';

const RentalOrdersManagementContent = (props) => {
  // Mock data cho đơn thuê sách
  const mockRentals = [
    {
      id: 1,
      rentalNumber: 'TH001',
      readerName: 'Nguyễn Văn A',
      readerPhone: '0901234567',
      readerEmail: 'nguyenvana@email.com',
      readerAddress: '123 Đường ABC, Quận 1, TP.HCM',
      rentalDate: '2024-01-15',
      expectedReturnDate: '2024-01-22',
      rentalDays: 7,
      deposit: 150000,
      status: 'Đã giao',
      totalAmount: 150000,
      books: [
        { bookCode: 'B001', title: 'Những Ngày Thơ Bé', rentalPrice: 5000 }
      ]
    },
    {
      id: 2,
      rentalNumber: 'TH002',
      readerName: 'Trần Thị B',
      readerPhone: '0907654321',
      readerEmail: 'tranthib@email.com',
      readerAddress: '456 Đường DEF, Quận 3, TP.HCM',
      rentalDate: '2024-01-16',
      expectedReturnDate: '2024-01-30',
      rentalDays: 14,
      deposit: 200000,
      status: 'Chờ xác nhận',
      totalAmount: 200000
    }
  ];
  
  // Handler functions for rental orders
  const handleAddRental = (data) => {
    console.log('Adding rental order:', data);
  };

  const handleUpdateRental = (id, data) => {
    console.log('Updating rental order:', id, data);
  };

  const handleDeleteRental = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) {
      console.log('Deleting rental order:', id);
    }
  };

  const handleApproveRental = (id) => {
    console.log('Approving rental order:', id);
  };

  const handleMarkDelivered = (id) => {
    console.log('Marking as delivered:', id);
  };

  const handleMarkReturned = (id) => {
    console.log('Marking as returned:', id);
  };
  
  // Statistics for mock data
  const statistics = {
    total: mockRentals.length,
    rented: mockRentals.filter(r => r.status === 'Đã giao').length,
    overdue: mockRentals.filter(r => r.status === 'Quá hạn').length,
    returned: mockRentals.filter(r => r.status === 'Đã trả').length,
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Đơn Hàng Thuê</h4>
          </div>
        </div>

        <div className="row">
          <RentalStatisticsSection statistics={statistics} />
        </div>

        <div className="row">
          <RentalOrdersListSection
            rentals={mockRentals}
            onAdd={handleAddRental}
            onUpdate={handleUpdateRental}
            onDelete={handleDeleteRental}
            onApprove={handleApproveRental}
            onMarkDelivered={handleMarkDelivered}
            onMarkReturned={handleMarkReturned}
          />
          <OverdueSection rentals={mockRentals} />
        </div>
      </div>
    </div>
  );
};

export default RentalOrdersManagementContent;
