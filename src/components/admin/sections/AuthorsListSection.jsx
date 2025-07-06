
import React, { useState } from "react";
import AddAuthorDialog from "../dialogs/AddAuthorDialog";
import { Edit, Trash2, User } from "lucide-react";

const AuthorsListSection = ({
  authors,
  statistics,
  isLoadingAuthors,
  onAddAuthor,
  onUpdateAuthor,
  onDeleteAuthor,
  isCreating,
  isUpdating,
  isDeleting,
}) => {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm lọc tác giả
  const filterAuthors = (authors, term) => {
    if (!term) return authors;
    return authors.filter(author => 
      author.Name?.toLowerCase().includes(term.toLowerCase()) || 
      (author.Description && author.Description.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // Áp dụng bộ lọc
  const filteredAuthors = filterAuthors(authors, searchTerm);
  const safeAuthors = filteredAuthors || [];

  const handleEditStart = (author) => {
    setEditingAuthor(author.AuthorId);
    setEditData({
      Name: author.Name,
      Description: author.Description,
    });
  };

  const handleEditSave = (authorId) => {
    onUpdateAuthor(authorId, {
      Name: editData.Name,
      Description: editData.Description,
    });
    setEditingAuthor(null);
    setEditData({});
  };

  const handleEditCancel = () => {
    setEditingAuthor(null);
    setEditData({});
  };

  const handleDeleteAuthor = (authorId) => {
    onDeleteAuthor(authorId);
  };

  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  return (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-0">Danh Sách Tác Giả</h5>
          <div className="d-flex gap-2 mt-2">
            <span className="badge bg-primary">
              Tổng: {statistics?.totalAuthors || 0}
            </span>
            <span className="badge bg-success">
              Có sách: {statistics?.authorsWithBooks || 0}
            </span>
            <span className="badge bg-warning">
              Chưa có sách: {statistics?.emptyAuthors || 0}
            </span>
          </div>
        </div>

        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm tác giả..."
            className="form-control"
            style={{ maxWidth: '250px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddAuthorDialog
            onAddAuthor={onAddAuthor}
            isCreating={isCreating}
          />
        </div>
      </div>

      {isLoadingAuthors ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : safeAuthors.length === 0 ? (
        <div className="text-center py-5">
          <User size={48} className="text-muted mb-3" />
          <p className="text-muted">
            {searchTerm 
              ? "Không tìm thấy tác giả phù hợp" 
              : "Chưa có tác giả nào"}
          </p>
        </div>
      ) : (
        <div className="row">
          {safeAuthors.map((author) => (
            <div key={author.AuthorId} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="text-center mb-3">
                    <div
                      className="avatar-placeholder rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center bg-success text-white"
                      style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "24px",
                        fontWeight: "bold"
                      }}
                    >
                      {author.Name?.charAt(0) || "A"}
                    </div>
                  </div>

                  {editingAuthor === author.AuthorId ? (
                    <div className="edit-form">
                      <div className="mb-2">
                        <label className="form-label small">Tên tác giả:</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editData.Name || ""}
                          onChange={(e) =>
                            handleInputChange("Name", e.target.value)
                          }
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small">Mô tả:</label>
                        <textarea
                          className="form-control form-control-sm"
                          rows="2"
                          value={editData.Description || ""}
                          onChange={(e) =>
                            handleInputChange("Description", e.target.value)
                          }
                          disabled={isUpdating}
                        />
                      </div>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleEditSave(author.AuthorId)}
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                            ></span>
                          ) : null}
                          Lưu
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={handleEditCancel}
                          disabled={isUpdating}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h6 className="card-title text-center mb-2">{author.Name}</h6>
                      <p className="card-text text-muted text-center small mb-3">
                        {author.Description || "Chưa có mô tả"}
                      </p>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditStart(author)}
                          disabled={isUpdating || isDeleting}
                        >
                          <Edit size={14} className="me-1" />
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteAuthor(author.AuthorId)}
                          disabled={isUpdating || isDeleting}
                        >
                          {isDeleting ? (
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                            ></span>
                          ) : (
                            <Trash2 size={14} className="me-1" />
                          )}
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
      )}
    </div>
  );
};

export default AuthorsListSection;
