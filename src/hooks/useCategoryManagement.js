// src/hooks/useCategoryManagement.js
import { useState } from 'react';
import { useCategoryApi } from './useCategoryApi';

export const useCategoryManagement = () => {
  const [activeSection, setActiveSection] = useState('category');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook cho danh mục
  const {
    categories,
    isLoadingCategories,
    categoriesError,
    createCategory,
    updateCategory,
    deleteCategory,
    refetchCategories
  } = useCategoryApi();

  // Xử lý dữ liệu từ API và tính toán thống kê
  const safeCategories = categories || [];

  const statistics = {
    totalCategories: safeCategories.length,
    categoriesWithBooks: safeCategories.filter(c => (c.booksCount || 0) > 0).length,
    emptyCategories: safeCategories.filter(c => (c.booksCount || 0) === 0).length
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions để xử lý API calls
  const handleCreateCategory = (categoryData) => {
    console.log('Creating category:', categoryData);
    createCategory(categoryData);
  };

  const handleUpdateCategory = (categoryId, categoryData) => {
    console.log('Updating category:', categoryId, categoryData);
    updateCategory({ id: categoryId, data: categoryData });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Tất cả sách trong danh mục sẽ bị ảnh hưởng.')) {
      console.log('Deleting category:', categoryId);
      deleteCategory(categoryId);
    }
  };

  // Hàm tìm kiếm và lọc danh mục
  const filterCategories = (searchTerm) => {
    if (!searchTerm) return safeCategories;
    
    return safeCategories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    categories: safeCategories,
    statistics,
    isLoadingCategories,
    categoriesError,
    handleLogout,
    // API functions
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    refetchCategories,
    // Utility functions
    filterCategories
  };
};