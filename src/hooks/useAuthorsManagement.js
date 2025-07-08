
// src/hooks/useAuthorsManagement.js
import { useState } from 'react';
import { useAuthorApi } from './useAuthorApi';

export const useAuthorsManagement = () => {
  const [activeSection, setActiveSection] = useState('authors');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook cho tác giả
  const {
    authors,
    statistics: authorStats,
    isLoadingAuthors,
    authorsError,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    refetchAuthors,
    filterAuthors,
    isCreating,
    isUpdating,
    isDeleting
  } = useAuthorApi();

  // Xử lý dữ liệu từ API
  const safeAuthors = authors || [];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions để xử lý API calls - FIXED: Đảm bảo format dữ liệu đúng
  const handleAddAuthor = async (authorData) => {
    console.log("handleAddAuthor received:", authorData);
    
    // Đảm bảo dữ liệu được format đúng trước khi gửi
    const formattedData = {
      Name: authorData.Name?.trim() || '',
      Description: authorData.Description?.trim() || ''
    };
    
    console.log("Formatted data being sent:", formattedData);
    
    try {
      await createAuthor(formattedData);
      console.log("Author created successfully");
    } catch (error) {
      console.error("Error in handleAddAuthor:", error);
      throw error; // Ném lại lỗi để dialog có thể xử lý
    }
  };

  const handleUpdateAuthor = async (AuthorId, authorData) => {
    console.log("handleUpdateAuthor received:", { AuthorId, authorData });
    
    // Đảm bảo dữ liệu được format đúng
    const formattedData = {
      Name: authorData.Name?.trim() || '',
      Description: authorData.Description?.trim() || ''
    };
    
    console.log("Formatted update data:", formattedData);
    
    try {
      await updateAuthor({ 
        id: AuthorId, 
        data: formattedData
      });
      console.log("Author updated successfully");
    } catch (error) {
      console.error("Error in handleUpdateAuthor:", error);
      throw error;
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    console.log("handleDeleteAuthor received:", authorId);
    if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này? Tất cả sách của tác giả sẽ bị ảnh hưởng.')) {
      try {
        await deleteAuthor(authorId);
        console.log("Author deleted successfully");
      } catch (error) {
        console.error("Error in handleDeleteAuthor:", error);
        throw error;
      }
    }
  };

  return {
    // State for UI
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,

    // Data from API
    authors: safeAuthors,
    statistics: authorStats,
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
    filterAuthors: (searchTerm) => filterAuthors(searchTerm)
  };
};
