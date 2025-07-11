import React, { useState } from "react";
import { Trash2, MessageSquare } from "lucide-react";

const CommentsListSection = ({ comments, bookId, commentId, onDelete }) => {
  const [selectedComment, setSelectedComment] = useState(null);

  const handleDeleteComment = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      onDelete(id);
    }
  };

  // ⚠️ Lọc theo điều kiện tìm kiếm
  const filteredComments = comments.filter((comment) => {
    const matchBookId = bookId ? comment.bookId?.toLowerCase().includes(bookId.toLowerCase()) : true;
    const matchCommentId = commentId ? comment.id?.toLowerCase().includes(commentId.toLowerCase()) : true;
    return matchBookId && matchCommentId;
  });

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            <MessageSquare className="text-primary" size={20} />
            Danh Sách Bình Luận
          </span>
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
              {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
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
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedComment(comment)}
                        >
                          Xem
</button>
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
      </div>

      {/* Modal xem chi tiết */}
      {selectedComment && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết bình luận</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedComment(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedComment.id}
                </p>
                <p>
                  <strong>Sách:</strong> {selectedComment.bookId}
                </p>
                <p>
                  <strong>Người dùng:</strong> {selectedComment.customerId}
                </p>
                <p>
                  <strong>Nội dung:</strong> {selectedComment.content}
                </p>
                <p>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(selectedComment.createdAt).toLocaleString("vi-VN")}
                </p>
                {selectedComment.reply && (
                  <>
                    <hr />
                    <p>
                      <strong>Phản hồi:</strong> {selectedComment.reply}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedComment(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsListSection;