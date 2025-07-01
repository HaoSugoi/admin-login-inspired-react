
import React from 'react';
import AdminTopbar from './AdminTopbar';
import RentalStatisticsSection from './sections/RentalStatisticsSection';
import RentalOrdersListSection from './sections/RentalOrdersListSection';
import OverdueSection from './sections/OverdueSection';
import { useRentBooksApi } from '../../hooks/useRentBooksApi';

const RentalManagementContent = (props) => {
  const {
    rentbookss,
    isLoadingRentBookss,
    rentbookssError,
    createRentBooks,
    updateRentBooks,
    deleteRentBooks,
    toggleVisibility,
  } = useRentBooksApi();

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
    console.log('Adding rental:', data);
    // createRentBooks(data); // Uncomment when API is ready
  };

  const handleUpdateRental = (id, data) => {
    console.log('Updating rental:', id, data);
    // updateRentBooks({ id, data }); // Uncomment when API is ready
  };

  const handleDeleteRental = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) {
      console.log('Deleting rental:', id);
      // deleteRentBooks(id); // Uncomment when API is ready
    }
  };

  const handleApproveRental = (id) => {
    console.log('Approving rental:', id);
    // Update status to 'Đã xác nhận'
  };

  const handleMarkDelivered = (id) => {
    console.log('Marking as delivered:', id);
    // Update status to 'Đã giao'
  };

  const handleMarkReturned = (id) => {
    console.log('Marking as returned:', id);
    // Update status to 'Đã trả'
  };
  
  // Statistics for mock data
  const statistics = {
    total: mockRentals.length,
    rented: mockRentals.filter(r => r.status === 'Đã giao').length,
    overdue: mockRentals.filter(r => r.status === 'Quá hạn').length,
    returned: mockRentals.filter(r => r.status === 'Đã trả').length,
  };

  if (isLoadingRentBookss) return <div>Đang tải dữ liệu thuê sách...</div>;
  if (rentbookssError) return <div>Lỗi khi tải dữ liệu: {rentbookssError.message}</div>;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Thuê Sách</h4>
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

export default RentalManagementContent;
