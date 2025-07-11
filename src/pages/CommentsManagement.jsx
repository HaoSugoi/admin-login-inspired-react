import React, { useState } from 'react';
import { useCommentsManagement } from '../hooks/useCommentsManagement';
import commentServiceAdmin from '../services/commentService';
import AdminSidebar from '../components/admin/AdminSidebar';
import CommentsManagementContent from '../components/admin/CommentsManagementContent';
import '../styles/AdminIndex.css';

const CommentsManagement = () => {
  const [bookId, setBookId] = useState('');
  const [commentId, setCommentId] = useState('');
  const { comments, loading, fetchComments } = useCommentsManagement();

  const handleAddComment = async () => {
    const bookId = prompt("Nhập BookId:", "");
    if (!bookId) return alert("❌ BookId không được bỏ trống");

    const content = prompt("Nhập nội dung bình luận:", "");
    if (!content) return alert("❌ Nội dung không được bỏ trống");

    const now = new Date().toISOString();

    const newComment = {
      CommentId: '',
      Content: content,
      CreatedDate: now,
      BookId: bookId,
      ParentCommentId: null,
      CreatedById: 'admin-id-123', // ID của admin
    };

    try {
      await commentServiceAdmin.addComment(newComment);
      await fetchComments();
      alert("✅ Thêm bình luận thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi thêm bình luận:", err.response?.data || err);
      alert("❌ Không thể thêm bình luận.");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await commentServiceAdmin.deleteComment(id);
      await fetchComments();
    } catch (err) {
      alert("❌ Không thể xóa bình luận");
    }
  };

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar />
        <CommentsManagementContent
          comments={comments}
          bookId={bookId}
          setBookId={setBookId}
          commentId={commentId}
          setCommentId={setCommentId}
          fetchComments={fetchComments}
          loading={loading}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default CommentsManagement;