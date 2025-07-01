// src/hooks/useAuthorsManagement.js
import { useState } from 'react';
import { useAuthorApi } from './useAuthorApi';

export const useAuthorsManagement = () => {
  const [activeSection, setActiveSection] = useState('authors');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook cho tác giả - THÊM CÁC TRẠNG THÁI LOADING
  const {
    authors,
    statistics: authorStats,
    isLoadingAuthors,
    authorsError,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    refetchAuthors,
    filterAuthors, // LẤY HÀM LỌC TỪ useAuthorApi
    isCreating,
    isUpdating,
    isDeleting
  } = useAuthorApi();

  // Xử lý dữ liệu từ API
  const safeAuthors = authors || [];

  // LOẠI BỎ TÍNH TOÁN THỐNG KÊ TRÙNG LẶP
  // (Đã có trong useAuthorApi)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions để xử lý API calls
  const handleAddAuthor = (authorData) => {
    console.log("handleAddAuthor received:", authorData);
    createAuthor({
      Name: authorData.Name,
      Description: authorData.Description
    });
  };

  const handleUpdateAuthor = (authorId, authorData) => {
    console.log("handleUpdateAuthor received:", { authorId, authorData });
    updateAuthor({ 
      id: authorId, 
      data: {
        Name: authorData.Name,
        Description: authorData.Description
      }
    });
  };

  const handleDeleteAuthor = (authorId) => {
    console.log("handleDeleteAuthor received:", authorId);
    if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này? Tất cả sách của tác giả sẽ bị ảnh hưởng.')) {
      deleteAuthor(authorId);
    }
  };

  // SỬA LẠI RETURN - LOẠI BỎ TRÙNG LẶP
  return {
    // State for UI
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,

    // Data from API
    authors: safeAuthors,
    statistics: authorStats, // SỬ DỤNG THỐNG KÊ TỪ useAuthorApi
    isLoadingAuthors,
    authorsError,
    
    // Loading states
    isCreating,
    isUpdating,
    isDeleting,

    // API functions
    handleAddAuthor,
    handleUpdateAuthor,
    handleDeleteAuthor,
    refetchAuthors,
    
    // Utility functions
    filterAuthors: (searchTerm) => filterAuthors(searchTerm) // SỬ DỤNG HÀM TỪ useAuthorApi
  };
};
