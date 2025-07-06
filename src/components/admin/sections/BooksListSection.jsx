
import React, { useState } from 'react';
import AddBookDialog from '../dialogs/AddBookDialog';
import EditBookDialog from '../dialogs/EditBookDialog';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

const BooksListSection = ({ books, categories, onAddBook, onUpdateBook, onDeleteBook, onToggleBookVisibility, promotions = [] }) => {
  const [editingBook, setEditingBook] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowEditDialog(true);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      onDeleteBook(bookId);
    }
  };

  const handleToggleVisibility = (book) => {
    const newStatus = book.status === 'available' ? 'hidden' : 'available';
    onToggleBookVisibility(book.id, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'hidden': return 'text-warning';
      case 'out_of_stock': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'hidden': return 'Đã ẩn';
      case 'out_of_stock': return 'Hết hàng';
      default: return 'Không xác định';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'sale': return 'Bán';
      case 'rent': return 'Thuê';
      case 'both': return 'Bán & Thuê';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-0">Danh Sách Sách</h5>
          <div className="d-flex gap-2 mt-2">
            <span className="badge bg-primary">
              Tổng: {books.length} đầu sách
            </span>
            <span className="badge bg-success">
              Có sẵn: {books.filter(b => b.status === 'available').length}
            </span>
            <span className="badge bg-warning">
              Đã ẩn: {books.filter(b => b.status === 'hidden').length}
            </span>
          </div>
        </div>

        <AddBookDialog 
          onAddBook={onAddBook} 
          categories={categories} 
          promotions={promotions} 
        />
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Tiêu Đề</th>
              <th>Tác Giả</th>
              <th>Thể Loại</th>
              <th>Năm XB</th>
              <th>Số Lượng</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">{book.title}</span>
                  </div>
                </td>
                <td>{book.author}</td>
                <td>
                  <span className="badge bg-info text-dark">{book.category}</span>
                </td>
                <td>{book.publishYear}</td>
                <td>
                  <span className="badge bg-secondary">
                    {book.available}/{book.quantity}
                  </span>
                </td>
                <td>
                  <span className={`badge ${book.type === 'both' ? 'bg-primary' : book.type === 'rent' ? 'bg-warning' : 'bg-success'}`}>
                    {getTypeText(book.type)}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    {book.type !== 'rent' && <small>Bán: {book.price?.toLocaleString()}đ</small>}
                    {book.type !== 'sale' && <small>Thuê: {book.rentPrice?.toLocaleString()}đ/ngày</small>}
                  </div>
                </td>
                <td>
                  <span className={getStatusColor(book.status)}>
                    {getStatusText(book.status)}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditBook(book)}
                      title="Sửa"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleToggleVisibility(book)}
                      title={book.status === 'available' ? 'Ẩn sách' : 'Hiển thị sách'}
                    >
                      {book.status === 'available' ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteBook(book.id)}
                      title="Xóa"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBook && (
        <EditBookDialog
          book={editingBook}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingBook(null);
          }}
          onUpdateBook={onUpdateBook}
          categories={categories}
          promotions={promotions}
        />
      )}
    </div>
  );
};

export default BooksListSection;
