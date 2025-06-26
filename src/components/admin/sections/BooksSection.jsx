
import React from 'react';

const BooksSection = ({ books }) => {
  return (
    <>
      {/* Books Management */}
      <div className="col-lg-6 mb-6">
        <div className="section-card">
          <div className="section-title">
            <span>Quản Lý Sách</span>
            <a href="#" className="view-all-link">Xem All ›</a>
          </div>
          
          <div className="book-grid">
            {books.map((book) => (
              <div key={book.id} className="book-item">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <span className="text-muted">Truyện</span>
            <div className="d-flex justify-content-center mt-2">
              <span className="me-3">●</span>
              <span className="me-3">●</span>
              <span>●</span>
            </div>
            <a href="#" className="view-all-link">Sau ›</a>
          </div>
        </div>
      </div>

      {/* Rental Books */}
      <div className="col-lg-6 mb-6">
        <div className="section-card">
          <div className="section-title">
            <span>Quản Lý Sách Thuê</span>
            <a href="#" className="view-all-link">Sau ›</a>
          </div>
          
          <div className="book-grid">
            {books.map((book) => (
              <div key={`rental-${book.id}`} className="book-item">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <span className="text-muted">Truyện</span>
            <div className="d-flex justify-content-center mt-2">
              <span className="me-3">●</span>
              <span className="me-3">●</span>
              <span>●</span>
            </div>
            <a href="#" className="view-all-link">Sau ›</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksSection;
