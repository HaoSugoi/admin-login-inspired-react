
import React from 'react';

const RentalListSection = ({ rentals }) => {
  // Xử lý trường hợp rentals là undefined hoặc null
  const safeRentals = rentals || [];

  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Thuê Sách</span>
          <a href="#" className="view-all-link">Tạo Phiếu Thuê ›</a>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã Thuê</th>
                <th>Tên Sách</th>
                <th>Tình Trạng</th>
                <th>Trạng Thái</th>
                <th>Ẩn</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {safeRentals.map((rental, index) => (
                <tr key={rental.RentBookItemId || index}>
                  <td>#{rental.RentBookItemId ? rental.RentBookItemId.substring(0, 8) : 'N/A'}</td>
                  <td>{rental.RentBookTitle || 'N/A'}</td>
                  <td>{rental.Condition || 'N/A'}</td>
                  <td>
                    <span className={
                      rental.status === 'Rented' ? 'text-primary' : 
                      rental.status === 'Overdue' ? 'text-danger' : 
                      rental.status === 'Returned' ? 'text-success' : 'text-secondary'
                    }>
                      {rental.status === 'Rented' ? 'Đang thuê' : 
                       rental.status === 'Overdue' ? 'Quá hạn' : 
                       rental.status === 'Returned' ? 'Đã trả' : rental.status || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className={rental.IsHidden ? 'text-warning' : 'text-success'}>
                      {rental.IsHidden ? 'Ẩn' : 'Hiển thị'}
                    </span>
                  </td>
                  <td>
                    {rental.status !== 'Returned' && (
                      <button className="btn btn-sm btn-outline-success">Trả Sách</button>
                    )}
                  </td>
                </tr>
              ))}
              {safeRentals.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalListSection;
