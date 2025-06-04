
import React, { useState } from 'react';
import AddAuthorDialog from '../dialogs/AddAuthorDialog';
import { Edit, Trash2 } from 'lucide-react';

const AuthorsListSection = ({ authors, onAddAuthor, onUpdateAuthor, onDeleteAuthor }) => {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditStart = (author) => {
    setEditingAuthor(author.id);
    setEditData({
      name: author.name,
      biography: author.biography,
      nationality: author.nationality
    });
  };

  const handleEditSave = (authorId) => {
    onUpdateAuthor(authorId, editData);
    setEditingAuthor(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditingAuthor(null);
    setEditData({});
  };

  const handleDeleteAuthor = (authorId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này?')) {
      onDeleteAuthor(authorId);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    });
  };

  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Tác Giả</span>
          <AddAuthorDialog onAddAuthor={onAddAuthor} />
        </div>
        
        <div className="authors-grid">
          {authors.map((author) => (
            <div key={author.id} className="author-card mb-4 p-3 border rounded">
              <div className="row">
                <div className="col-md-3 text-center">
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="author-avatar rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-9">
                  {editingAuthor === author.id ? (
                    <div className="edit-form">
                      <div className="mb-2">
                        <label className="form-label">Tên tác giả:</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Tiểu sử:</label>
                        <textarea
                          className="form-control form-control-sm"
                          rows="2"
                          value={editData.biography}
                          onChange={(e) => handleInputChange('biography', e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Quốc tịch:</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => handleEditSave(author.id)}
                        >
                          Lưu
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={handleEditCancel}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="author-name">{author.name}</h5>
                      <p className="author-bio text-muted">{author.biography}</p>
                      <div className="author-info">
                        <small className="text-muted">
                          Năm sinh: {author.birthYear} | Quốc tịch: {author.nationality}
                        </small>
                        <br />
                        <span className="badge bg-success">{author.booksCount} tác phẩm</span>
                      </div>
                      <div className="author-actions mt-2">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditStart(author)}
                        >
                          <Edit size={14} className="me-1" />
                          Sửa
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteAuthor(author.id)}
                        >
                          <Trash2 size={14} className="me-1" />
                          Xóa
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsListSection;
