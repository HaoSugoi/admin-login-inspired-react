
import React from 'react';

const BookStatisticsSection = ({ books }) => {
  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
  const rentedBooks = totalBooks - availableBooks;

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{books.length}</h3>
            <p className="mb-0">Tổng Đầu Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{totalBooks}</h3>
            <p className="mb-0">Tổng Số Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{availableBooks}</h3>
            <p className="mb-0">Sách Có Sẵn</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{rentedBooks}</h3>
            <p className="mb-0">Sách Đang Thuê</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStatisticsSection;
