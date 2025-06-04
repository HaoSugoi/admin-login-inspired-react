
import React from 'react';

const OverdueSection = ({ rentals }) => {
  const overdueRentals = rentals.filter(rental => rental.status === 'Quá hạn');

  return (
    <div className="col-lg-4 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Sách Quá Hạn</span>
          <a href="#" className="view-all-link">Xem Tất Cả ›</a>
        </div>
        
        <div className="overdue-list">
          {overdueRentals.map((rental) => (
            <div key={rental.id} className="overdue-item mb-3 p-3 border rounded">
              <div className="overdue-book fw-bold">{rental.bookTitle}</div>
              <div className="overdue-reader text-muted">{rental.readerName}</div>
              <div className="overdue-info d-flex justify-content-between">
                <small className="text-danger">Hạn: {rental.dueDate}</small>
                <small className="text-warning">Phạt: {rental.fine.toLocaleString('vi-VN')}đ</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverdueSection;
