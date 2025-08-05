import React, { useState } from 'react';
import AddBookDialog from '../dialogs/AddBookDialog';
import EditBookDialog from '../dialogs/EditBookDialog';
import DetailSaleBookDialog from '../dialogs/DetailSaleBookDialog';
import { Edit, Trash2, Eye, EyeOff, Info } from 'lucide-react';

const BooksListSection = ({
  books = [],
  authors = [],
  categories = [],
  promotions = [],
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onToggleBookVisibility,
}) => {
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const filteredBooks = books.filter((book) =>
    book.Title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Tính index đầu và cuối của sách trong trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);


  const getStatusBadge = (isHidden) =>
    isHidden ? (
      <span className="badge bg-warning">Hiển thị</span>
    ) : (
      <span className="badge bg-success">Đã ẩn</span>
    );

  return (
    <div className="col-12">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Sách Bán</span>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              placeholder="Tìm theo tên sách..."
              className="form-control"
              style={{ width: '250px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddBookDialog
              onAddBook={onAddBook}
              categories={categories}
              promotions={promotions}
              authors={authors}
            />
          </div>
        </div>


        <div className="table-responsive">
          <table className="table order-table align-middle">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tiêu Đề</th>
                <th>Giá Gốc</th>
                <th>Giá KM</th>
                <th>Khuyến Mãi</th>
                <th>Số Lượng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book.SaleBookId}>
                    <td>
                      <img
                        src={
                          book.ImageUrl
                            ? `https://chosachonline-datn.onrender.com${book.ImageUrl}`
                            : '/images/no-book.png'
                        }
                        alt={book.Title}
                        style={{
                          width: '60px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                        }}
                      />

                    </td>
                    <td><strong>{book.Title ?? 'Không rõ'}</strong></td>
                    <td><span className="text-primary">{(book.Price ?? 0)} đ</span></td>
                    <td><span className="text-danger">{(book.FinalPrice ?? 0)} đ</span></td>
                    <td><span className="badge bg-info">{book.PromotionName ?? 'Không có'}</span></td>
                    <td>{book.Quantity ?? 0}</td>
                    <td>{getStatusBadge(book.IsHidden)}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => setViewingBook(book)}
                          title="Xem chi tiết"
                        >
                          <Info size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setEditingBook(book)}
                          title="Sửa"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() =>
                            onToggleBookVisibility(book.SaleBookId, book.IsHidden)
                          }
                          title={book.IsHidden ? 'Hiển thị sách' : 'Ẩn sách'}
                        >
                          {book.IsHidden ? (
                            <Eye size={14} color="gold" />
                          ) : (
                            <EyeOff size={14} color="green" />
                          )}
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            window.confirm('Bạn có chắc chắn muốn xóa sách này?') &&
                            onDeleteBook(book.SaleBookId)
                          }
                          title="Xóa"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Chưa có sách nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                Trang trước
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Trang sau
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sửa sách */}
      {editingBook && (
        <EditBookDialog
          book={editingBook}
          open={true}
          onClose={() => setEditingBook(null)}
          onUpdateBook={onUpdateBook}
          categories={categories}
          promotions={promotions}
          authors={authors}
        />
      )}

      {/* Xem chi tiết sách */}
      {viewingBook && (
        <DetailSaleBookDialog
          book={viewingBook}
          open={true}
          onClose={() => setViewingBook(null)}
        />
      )}
    </div>
  );
};

export default BooksListSection;