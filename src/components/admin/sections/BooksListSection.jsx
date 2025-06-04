
import React from 'react';

const BooksListSection = ({ books }) => {
  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Sách</span>
          <a href="#" className="view-all-link">Thêm Sách Mới ›</a>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã Sách</th>
                <th>Tên Sách</th>
                <th>Tác Giả</th>
                <th>Thể Loại</th>
                <th>Số Lượng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>#{book.id.toString().padStart(3, '0')}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.available}/{book.quantity}</td>
                  <td>
                    <span className={book.status === 'available' ? 'text-success' : 'status-pending'}>
                      {book.status === 'available' ? 'Có sẵn' : 'Hết sách'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Sửa</button>
                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
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

export default BooksListSection;
