import React from 'react';
import AdminTopbar from './AdminTopbar';
import RentalListSection from './sections/RentalListSection';
import RentalStatisticsSection from './sections/RentalStatisticsSection';
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

  // Handler: Thêm, sửa, xóa, thay đổi trạng thái thuê
  const handleAdd = (data) => createRentBooks(data);
  const handleUpdate = (id, data) => updateRentBooks({ id, data });
  const handleDelete = (id) => deleteRentBooks(id);
  const handleMarkReturned = (id) => updateRentBooks({ id, data: { status: 'Returned' } });
  const handleToggleVisibility = (id, isHidden) => {
    toggleVisibility({id, isHidden: isHidden ? 0 : 1 });
  };
  
  
  // Thống kê nhanh
  const statistics = {
    total: rentbookss.length,
    rented: rentbookss.filter(r => r.status === 'Rented').length,
    overdue: rentbookss.filter(r => r.status === 'Overdue').length,
    returned: rentbookss.filter(r => r.status === 'Returned').length,
  };

  if (isLoadingRentBookss) return <div>Đang tải sách thuê...</div>;
  if (rentbookssError) return <div>Lỗi khi tải sách thuê: {rentbookssError.message}</div>;

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
          <RentalStatisticsSection statistics={statistics} />
        </div>

        <div className="row">
          <RentalListSection
            rentals={rentbookss}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onMarkReturned={handleMarkReturned}
            onToggleVisibility={handleToggleVisibility}
          />
          <OverdueSection rentals={rentbookss} />
        </div>
      </div>
    </div>
  );
};

export default RentalManagementContent;