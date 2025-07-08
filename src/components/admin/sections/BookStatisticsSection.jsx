import React from 'react';

const BookStatisticsSection = ({ books = [] }) => {
  const totalTitles = books.length;
  const totalQuantity = books.reduce(
    (sum, book) => sum + (Number(book.Quantity) || 0),
    0
  );
  const visibleBooks = books.filter(b => !b.IsHidden).length;
  const hiddenBooks = totalTitles - visibleBooks;

  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">
              {totalTitles.toLocaleString()}
            </h3>
            <p className="mb-0">Tổng Đầu Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">
              {totalQuantity.toLocaleString()}
            </h3>
            <p className="mb-0">Tổng Số Lượng</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">
              {visibleBooks.toLocaleString()}
            </h3>
            <p className="mb-0">Sách Hiển Thị</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">
              {hiddenBooks.toLocaleString()}
            </h3>
            <p className="mb-0">Sách Đã Ẩn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStatisticsSection;