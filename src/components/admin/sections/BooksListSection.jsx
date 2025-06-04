
import React, { useState } from 'react';
import AddBookDialog from '../dialogs/AddBookDialog';
import EditBookDialog from '../dialogs/EditBookDialog';
import { Edit, Trash2, EyeOff } from 'lucide-react';

const BooksListSection = ({ books, categories, onAddBook, onUpdateBook, onDeleteBook, onToggleBookVisibility }) => {
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
    const newStatus = book.status === 'hidden' ? 'available' : 'hidden';
    onToggleBookVisibility(book.id, newStatus);
  };

  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Sách</span>
          <AddBookDialog onAddBook={onAddBook} categories={categories} />
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
                    <span className={
                      book.status === 'available' ? 'text-success' : 
                      book.status === 'hidden' ? 'text-warning' : 'text-danger'
                    }>
                      {book.status === 'available' ? 'Có sẵn' : 
                       book.status === 'hidden' ? 'Đã ẩn' : 'Hết sách'}
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
                        title={book.status === 'hidden' ? 'Hiện sách' : 'Ẩn sách'}
                      >
                        <EyeOff size={14} />
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
        />
      )}
    </div>
  );
};

export default BooksListSection;
