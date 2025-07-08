
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

  // Wrapper functions để xử lý API calls với logging chi tiết
  const handleAddAuthor = async (authorData) => {
    console.log("🔄 handleAddAuthor received:", authorData);
    
    // Validate dữ liệu đầu vào
    if (!authorData || !authorData.Name || !authorData.Name.trim()) {
      console.error("❌ Invalid author data:", authorData);
      throw new Error('Tên tác giả không được để trống');
    }
    
    // Format dữ liệu đúng theo yêu cầu API
    const formattedData = {
      Name: authorData.Name.trim(),
      Description: authorData.Description ? authorData.Description.trim() : ""
    };
    
    console.log("📤 Formatted create data:", formattedData);
    
    try {
      const result = await createAuthor(formattedData);
      console.log("✅ Author created successfully:", result);
      return result;
    } catch (error) {
      console.error("❌ Error in handleAddAuthor:", error);
      throw error;
    }
  };

  const handleUpdateAuthor = async (AuthorId, authorData) => {
    console.log("🔄 handleUpdateAuthor received:", { AuthorId, authorData });
    
    // Validate dữ liệu
    if (!AuthorId) {
      console.error("❌ Missing AuthorId");
      throw new Error('ID tác giả không hợp lệ');
    }
    
    if (!authorData || !authorData.Name || !authorData.Name.trim()) {
      console.error("❌ Invalid author data:", authorData);
      throw new Error('Tên tác giả không được để trống');
    }
    
    // Format dữ liệu đúng theo yêu cầu API
    const formattedData = {
      Name: authorData.Name.trim(),
      Description: authorData.Description ? authorData.Description.trim() : ""
    };
    
    console.log("📤 Formatted update data:", { id: AuthorId, data: formattedData });
    
    try {
      const result = await updateAuthor({ 
        id: AuthorId, 
        data: formattedData
      });
      console.log("✅ Author updated successfully:", result);
      return result;
    } catch (error) {
      console.error("❌ Error in handleUpdateAuthor:", error);
      console.error("❌ Error details:", {
        AuthorId,
        authorData,
        formattedData,
        errorMessage: error.message,
        errorResponse: error.response?.data
      });
      throw error;
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    console.log("🔄 handleDeleteAuthor received:", authorId);
    
    if (!authorId) {
      console.error("❌ Missing authorId");
      throw new Error('ID tác giả không hợp lệ');
    }
    
    if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này? Tất cả sách của tác giả sẽ bị ảnh hưởng.')) {
      try {
        const result = await deleteAuthor(authorId);
        console.log("✅ Author deleted successfully:", result);
        return result;
      } catch (error) {
        console.error("❌ Error in handleDeleteAuthor:", error);
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
