import React, { useState } from "react";
import AddAuthorDialog from "../dialogs/AddAuthorDialog";
import { Edit, Trash2 } from "lucide-react";

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
  
  // Tạo biến an toàn để tránh lỗi khi dữ liệu chưa có
  const safeAuthors = filteredAuthors || [];

  const handleEditStart = (author) => {
    setEditingAuthor(author.AuthorId);
    setEditData({
      Name: author.Name,
      Description: author.Description,
    });
  };

  const handleEditSave = (authorId) => {
    console.log("Saving author with ID:", authorId, "Data:", editData);
    // Sửa lại cách gọi onUpdateAuthor để match với interface trong useAuthorsManagement
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
    console.log("Deleting author with ID:", authorId);
      onDeleteAuthor(authorId);
  };

  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  return (
    <div className="col-lg-8 mb-4">
      <div className="section-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5>Danh Sách Tác Giả</h5>
            <div className="d-flex gap-2 mt-2">
              <span className="badge bg-primary">
                Tổng: {statistics?.totalAuthors || 0}
              </span>
              {/* Có thể thêm các thống kê khác nếu có dữ liệu */}
              {/* <span className="badge bg-success">
                Có sách: {statistics?.authorsWithBooks || 0}
              </span> */}
            </div>
          </div>

          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm tác giả..."
              className="form-control"
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
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : safeAuthors.length === 0 ? (
          <div className="text-center py-5 text-muted">
            {searchTerm 
              ? "Không tìm thấy tác giả phù hợp" 
              : "Chưa có tác giả nào"}
          </div>
        ) : (
          <div className="authors-grid">
            {safeAuthors.map((author) => (
              <div
                key={author.AuthorId}
                className="author-card mb-4 p-3 border rounded"
              >
                <div className="row">
                  <div className="col-md-3 text-center">
                    <div
                      className="avatar-placeholder rounded-circle mb-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#e9ecef",
                        fontSize: "24px",
                      }}
                    >
                      {author.Name?.charAt(0) || "A"}
                    </div>
                  </div>
                  <div className="col-md-9">
                    {editingAuthor === author.AuthorId ? (
                      <div className="edit-form">
                        <div className="mb-2">
                          <label className="form-label">Tên tác giả:</label>
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
                        <div className="mb-2">
                          <label className="form-label">Mô tả:</label>
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
                        <div className="d-flex gap-2">
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
                        <h5 className="author-name">{author.Name}</h5>
                        <p className="author-bio text-muted">
                          {author.Description || "Chưa có mô tả"}
                        </p>
                        <div className="author-actions mt-2">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
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
    </div>
  );
};

export default AuthorsListSection;
