import apiClient from './api';

const commentServiceAdmin = {
  addComment: async (commentData) => {
  try {
    const response = await apiClient.post("/Comment", commentData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm bình luận:", error);
    throw error;
  }
},

  // ✅ Gọi tất cả bình luận (không lọc cha hay con gì cả)
  getAllComments: async () => {
    try {
      const res = await apiClient.get('/Comment/all');
      const rawComments = res.data;

      // Chuẩn hóa dữ liệu
      const comments = rawComments.map(comment => ({
        id: comment.CommentId,
        content: comment.Content,
        createdAt: comment.CreatedDate,
        bookId: comment.BookId,
        parentCommentId: comment.ParentCommentId,
        customerId: comment.CreatedById
      }));

      return comments;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả bình luận:", error);
      throw error;
    }
  },

  // ✅ Lấy bình luận theo BookId
  getCommentsByBookId: async (bookId) => {
    try {
      const res = await apiClient.get(`/Comment/book/${bookId}`);
      return res.data.map(comment => ({
        id: comment.CommentId,
        content: comment.Content,
        createdAt: comment.CreatedDate,
        bookId: comment.BookId,
        parentCommentId: comment.ParentCommentId,
        customerId: comment.CreatedById
      }));
    } catch (error) {
      console.error("Lỗi khi lấy comment theo bookId:", error);
      throw error;
    }
  },

  // ✅ Lấy chi tiết comment theo commentId
  getCommentById: async (commentId) => {
    try {
      const res = await apiClient.get(`/Comment/${commentId}`);
      const comment = res.data;
      return {
        id: comment.CommentId,
        content: comment.Content,
        createdAt: comment.CreatedDate,
        bookId: comment.BookId,
        parentCommentId: comment.ParentCommentId,
        customerId: comment.CreatedById
      };
    } catch (error) {
      console.error("Lỗi khi lấy comment theo id:", error);
      throw error;
    }
  },

  // ✅ Xóa bình luận theo id
  deleteComment: async (id) => {
    try {
      await apiClient.delete(`/Comment/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      throw error;
    }
  },
};

export default commentServiceAdmin;