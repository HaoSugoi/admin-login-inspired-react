
import React, { useState } from "react";
import AddCommentDialog from "../dialogs/AddCommentDialog";
import EditCommentDialog from "../dialogs/EditCommentDialog";
import ReplyCommentDialog from "../dialogs/ReplyCommentDialog";
import { Edit, Trash2, Check, X, MessageSquare, Star } from "lucide-react";

const CommentsListSection = ({ comments, onAdd, onUpdate, onDelete, onApprove, onReject, onReply }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [replyingComment, setReplyingComment] = useState(null);

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleReplyComment = (comment) => {
    setReplyingComment(comment);
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      onDelete(id);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success">Đã duyệt</span>;
      case 'pending':
        return <span className="badge bg-warning">Chờ duyệt</span>;
      case 'rejected':
        return <span className="badge bg-danger">Từ chối</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? "text-warning" : "text-muted"}
        fill={index < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            <MessageSquare className="text-primary" size={20} />
            Danh Sách Bình Luận
          </span>
          <AddCommentDialog onAdd={onAdd} />
        </div>

        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Sách</th>
                <th>Khách Hàng</th>
                <th>Nội Dung</th>
                <th>Đánh Giá</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment) => (
                <tr key={comment.id}>
                  <td className="fw-bold text-primary">#{comment.id}</td>
                  <td>
                    <span className="fw-medium">{comment.bookTitle}</span>
                  </td>
                  <td>{comment.customerName}</td>
                  <td>
                    <div className="comment-content">
                      <p className="mb-1">{comment.content}</p>
                      {comment.reply && (
                        <div className="mt-2 p-2 bg-light rounded">
                          <small className="text-muted d-block">Phản hồi của admin:</small>
                          <span className="text-primary">{comment.reply}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      {renderStars(comment.rating)}
                      <span className="ms-1">({comment.rating})</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(comment.status)}</td>
                  <td className="text-muted">
                    {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditComment(comment)}
                        title="Sửa"
                      >
                        <Edit size={12} />
                      </button>
                      
                      {comment.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => onApprove(comment.id)}
                            title="Duyệt"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => onReject(comment.id)}
                            title="Từ chối"
                          >
                            <X size={12} />
                          </button>
                        </>
                      )}
                      
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleReplyComment(comment)}
                        title="Trả lời"
                      >
                        <MessageSquare size={12} />
                      </button>
                      
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="Xóa"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingComment && (
        <EditCommentDialog
          comment={editingComment}
          onUpdate={onUpdate}
          onClose={() => setEditingComment(null)}
        />
      )}

      {replyingComment && (
        <ReplyCommentDialog
          comment={replyingComment}
          onReply={onReply}
          onClose={() => setReplyingComment(null)}
        />
      )}
    </div>
  );
};

export default CommentsListSection;
