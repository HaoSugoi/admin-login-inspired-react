
import React from 'react';

const RentalListSection = ({ rentals }) => {
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
                <th>Đọc Giả</th>
                <th>Ngày Thuê</th>
                <th>Hạn Trả</th>
                <th>Trạng Thái</th>
                <th>Phạt</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.id}>
                  <td>#{rental.id.toString().padStart(3, '0')}</td>
                  <td>{rental.bookTitle}</td>
                  <td>{rental.readerName}</td>
                  <td>{rental.rentDate}</td>
                  <td>{rental.dueDate}</td>
                  <td>
                    <span className={
                      rental.status === 'Đang thuê' ? 'text-primary' : 
                      rental.status === 'Quá hạn' ? 'text-danger' : 'text-success'
                    }>
                      {rental.status}
                    </span>
                  </td>
                  <td>{rental.fine.toLocaleString('vi-VN')}đ</td>
                  <td>
                    {rental.status !== 'Đã trả' && (
                      <button className="btn btn-sm btn-outline-success">Trả Sách</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalListSection;
