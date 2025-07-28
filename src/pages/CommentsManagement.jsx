
import React, { useState, useEffect } from 'react';
import { useCommentsManagement } from '../hooks/useCommentsManagement';
import commentServiceAdmin from '../services/commentService';
import { salebooksService } from '../services/SaleBooksService';
import { rentBookItemService } from '../services/rentBookItemService';
import AdminSidebar from '../components/admin/AdminSidebar';
import CommentsManagementContent from '../components/admin/CommentsManagementContent';
import '../styles/AdminIndex.css';

const CommentsManagement = () => {
  const [bookId, setBookId] = useState('');
  const [commentId, setCommentId] = useState('');
  const [books, setBooks] = useState([]);

  const { comments, loading, fetchComments } = useCommentsManagement();

  // ✅ Lấy tất cả sách bán và thuê
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [saleBooks, rentBooks] = await Promise.all([
          salebooksService.getAllSaleBookss(),
          rentBookItemService.getAll(),
        ]);

        const combined = [
          ...saleBooks.map((b) => ({
            id: b.SaleBookId,
            title: b.Title,
            type: 'Sách bán',
          })),
          ...rentBooks.map((b) => ({
            id: b.RentBookId,
            title: b.Title,
            type: 'Sách thuê',
          })),
        ];

        setBooks(combined);
      } catch (err) {
        console.error("❌ Lỗi khi lấy danh sách sách:", err);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Thêm bình luận bằng cách tìm sách theo từ khóa và ưu tiên hiển thị
  const handleAddComment = async () => {
    if (!books.length) {
      alert("⚠️ Chưa tải được danh sách sách.");
      return;
    }

    const keyword = prompt("🔍 Nhập từ khóa để tìm sách (có thể để trống):") || "";

    const sortedBooks = [...books].sort((a, b) => {
      const aMatch = (a.title || "").toLowerCase().includes(keyword.toLowerCase());
      const bMatch = (b.title || "").toLowerCase().includes(keyword.toLowerCase());
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

    const bookList = sortedBooks
      .map((b, i) => `${i + 1}. [${b.type}] ${b.title}`)
      .join("\n");

    const indexStr = prompt(
      `📚 Danh sách sách (khớp từ khóa sẽ ở trên):\n${bookList}\n\n➡️ Nhập số thứ tự để chọn:`,
      "1"
    );
    const index = parseInt(indexStr);

    if (isNaN(index) || index < 1 || index > sortedBooks.length) {
      alert("❌ Số không hợp lệ.");
      return;
    }

    const selectedBook = sortedBooks[index - 1];

    const content = prompt("📝 Nhập nội dung bình luận:");
    if (!content) return alert("❌ Nội dung không được bỏ trống.");

    const now = new Date().toISOString();

    const newComment = {
      CommentId: '',
      Content: content,
CreatedDate: now,
      BookId: selectedBook.id,
      ParentCommentId: null,
      CreatedById: 'admin-id-123',
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

  // ✅ Xóa bình luận
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