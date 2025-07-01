
import React from 'react';
import AdminTopbar from './AdminTopbar';
import RentalListSection from './sections/RentalListSection';
import { useRentBooksApi } from '../../hooks/useRentBooksApi';

const RentBooksManagementContent = (props) => {
  const {
    rentbookss,
    isLoadingRentBookss,
    rentbookssError,
    createRentBooks,
    updateRentBooks,
    deleteRentBooks,
    toggleVisibility,
  } = useRentBooksApi();

  // Handler functions for rental books
  const handleAddRental = (data) => {
    console.log('Adding rental book:', data);
    createRentBooks(data);
  };

  const handleUpdateRental = (id, data) => {
    console.log('Updating rental book:', id, data);
    updateRentBooks({ id, data });
  };

  const handleDeleteRental = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách thuê này?')) {
      console.log('Deleting rental book:', id);
      deleteRentBooks(id);
    }
  };

  const handleToggleVisibility = (id, isHidden) => {
    console.log('Toggling visibility:', id, isHidden);
    toggleVisibility({ id, isHidden: !isHidden });
  };

  if (isLoadingRentBookss) return <div>Đang tải dữ liệu sách thuê...</div>;
  if (rentbookssError) return <div>Lỗi khi tải dữ liệu: {rentbookssError.message}</div>;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Sách Thuê</h4>
          </div>
        </div>

        <div className="row">
          <RentalListSection
            rentals={rentbookss}
            onAdd={handleAddRental}
            onUpdate={handleUpdateRental}
            onDelete={handleDeleteRental}
            onToggleVisibility={handleToggleVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default RentBooksManagementContent;
