import React, { useState } from "react";
import { Trash2, MessageSquare, Search } from "lucide-react";

const CommentsListSection = ({ comments, bookId, commentId, onDelete }) => {
  const [searchBookTitle, setSearchBookTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const handleDeleteComment = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      onDelete(id);
    }
  };

  // Lọc bình luận
  const filteredComments = comments.filter((comment) => {
    const matchBookId = bookId
      ? comment.bookId?.toLowerCase().includes(bookId.toLowerCase())
      : true;
    const matchCommentId = commentId
      ? comment.id?.toLowerCase().includes(commentId.toLowerCase())
      : true;
    const matchBookTitle = searchBookTitle
      ? comment.bookTitle?.toLowerCase().includes(searchBookTitle.toLowerCase())
      : true;

    return matchBookId && matchCommentId && matchBookTitle;
  });

  // Tính số lượng trang
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  // Lấy dữ liệu theo trang
  const startIdx = (currentPage - 1) * commentsPerPage;
  const paginatedComments = filteredComments.slice(startIdx, startIdx + commentsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            <MessageSquare className="text-primary" size={20} />
            Danh Sách Bình Luận
          </span>
        </div>

        {/* 🔍 Tìm kiếm theo tên sách */}
        <div className="mb-3 d-flex align-items-center gap-2">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sách..."
            value={searchBookTitle}
            onChange={(e) => {
              setSearchBookTitle(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
            style={{ maxWidth: 300 }}
          />
        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Sách</th>
                <th>Khách Hàng</th>
                <th>Nội Dung</th>
                <th>Ngày Tạo</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComments.length > 0 ? (
                paginatedComments.map((comment) => (
                  <tr key={comment.id}>
                    <td className="fw-bold text-primary">
                      #{comment.id?.substring(0, 6)}...
                    </td>
                    <td>{comment.bookTitle}</td>
                    <td>{comment.customerName}</td>

                    <td>
                      <div className="comment-content">
                        <p className="mb-1">{comment.content}</p>
                        {comment.reply && (
                          <div className="mt-2 p-2 bg-light rounded">
                            <small className="text-muted d-block">
                              Phản hồi của admin:
                            </small>
                            <span className="text-primary">{comment.reply}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-muted">
                      {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Không có bình luận nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📄 Phân trang */}
        {totalPages > 1 && (
          <div className="mt-3 d-flex justify-content-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trang trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Trang sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsListSection;
