import React, { useState } from "react";
import AddAuthorDialog from "../dialogs/AddAuthorDialog";
import EditAuthorDialog from "../dialogs/EditAuthorDialog";
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
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filterAuthors = (authors, term) => {
    if (!term) return authors;
    return authors.filter(author => 
      author.Name?.toLowerCase().includes(term.toLowerCase()) || 
      (author.Description && author.Description.toLowerCase().includes(term.toLowerCase()))
    );
  };

  const filteredAuthors = filterAuthors(authors, searchTerm);
  const safeAuthors = filteredAuthors || [];

 const handleEditAuthor = async (author) => {
  // Thêm await và kiểm tra kỹ
  if (!author?.AuthorId) {
    console.error('Invalid author data:', author);
    return;
  }

  await setEditingAuthor({
    AuthorId: author.AuthorId,
    Name: author.Name,
    Description: author.Description || ''
  });
  
  setShowEditDialog(true);
};

  const handleDeleteAuthor = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này?")) {
      onDeleteAuthor(id);
    }
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

                  <h6 className="card-title text-center mb-2">{author.Name}</h6>
                  <p className="card-text text-muted text-center small mb-3">
                    {author.Description || "Chưa có mô tả"}
                  </p>
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditAuthor(author)}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingAuthor && (
  // Đảm bảo truyền đúng hàm callback
<EditAuthorDialog
  author={editingAuthor}
  open={showEditDialog}
  onClose={() => setShowEditDialog(false)}
  onUpdateAuthor={async (authorId, data) => {
    try {
      await onUpdateAuthor(authorId, data); // Truyền riêng ID và data
    } catch (error) {
      console.error('Error updating author:', error);
    }
  }}
  isUpdating={isUpdating}
/>
)}
    </div>
  );
};

export default AuthorsListSection;