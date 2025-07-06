
import { useState } from 'react';
import { toast } from 'sonner';

export const useCommentsManagement = () => {
  const [activeSection, setActiveSection] = useState('comments');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for comments
  const [comments, setComments] = useState([
    {
      id: 1,
      bookTitle: "Tôi thấy hoa vàng trên cỏ xanh",
      customerName: "Nguyễn Văn A",
      content: "Cuốn sách rất hay, tôi đã đọc và cảm thấy rất cảm động.",
      rating: 5,
      status: "approved",
      createdAt: "2024-12-01",
      reply: null
    },
    {
      id: 2,
      bookTitle: "Số đỏ",
      customerName: "Trần Thị B",
      content: "Nội dung sách khá thú vị nhưng hơi khó hiểu ở một số chỗ.",
      rating: 4,
      status: "pending",
      createdAt: "2024-12-02",
      reply: null
    },
    {
      id: 3,
      bookTitle: "Dế mèn phiêu lưu ký",
      customerName: "Lê Văn C",
      content: "Sách dành cho trẻ em rất bổ ích, con tôi rất thích.",
      rating: 5,
      status: "approved",
      createdAt: "2024-12-03",
      reply: "Cám ơn bạn đã đánh giá! Chúng tôi rất vui khi biết con bạn thích cuốn sách này."
    }
  ]);

  const [statistics] = useState({
    totalComments: 45,
    approvedComments: 38,
    pendingComments: 7,
    averageRating: 4.2
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Comments management functions
  const handleAddComment = (newComment) => {
    const comment = {
      ...newComment,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      reply: null
    };
    setComments([comment, ...comments]);
    
    toast.success('💬 Thành công!', {
      description: 'Bình luận đã được thêm thành công',
    });
    
    console.log('Added comment:', comment);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments(comments.map(comment => 
      comment.id === updatedComment.id ? updatedComment : comment
    ));
    
    toast.success('✅ Cập nhật thành công!', {
      description: 'Bình luận đã được cập nhật thành công',
    });
    
    console.log('Updated comment:', updatedComment);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    
    toast.success('🗑️ Đã xóa!', {
      description: 'Bình luận đã được xóa thành công',
    });
    
    console.log('Deleted comment with id:', commentId);
  };

  const handleApproveComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: 'approved' } : comment
    ));
    
    toast.success('✅ Đã duyệt!', {
      description: 'Bình luận đã được duyệt thành công',
    });
    
    console.log('Approved comment:', commentId);
  };

  const handleRejectComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: 'rejected' } : comment
    ));
    
    toast.success('❌ Đã từ chối!', {
      description: 'Bình luận đã được từ chối',
    });
    
    console.log('Rejected comment:', commentId);
  };

  const handleReplyComment = (commentId, replyText) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, reply: replyText } : comment
    ));
    
    toast.success('💬 Đã trả lời!', {
      description: 'Đã trả lời bình luận thành công',
    });
    
    console.log('Replied to comment:', commentId, replyText);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    comments,
    statistics,
    handleLogout,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleApproveComment,
    handleRejectComment,
    handleReplyComment
  };
};
