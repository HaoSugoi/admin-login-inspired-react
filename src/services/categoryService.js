// src/services/categoryService.js
import apiClient from './api';

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Category');
      // Ánh xạ dữ liệu từ API sang cấu trúc ứng dụng
      return response.data.map(category => ({
        id: category.CategoryId,
        name: category.CategoryName,
        description: category.Description,
        // booksCount: category.BooksCount || 0 // Thêm trường này nếu API có
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      // Ánh xạ ngược lại khi gửi dữ liệu lên server
      const payload = {
        CategoryName: categoryData.name,
        Description: categoryData.description
      };
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Category', payload);
      
      // Xử lý dữ liệu trả về
      return {
        id: response.data.CategoryId,
        name: response.data.CategoryName,
        description: response.data.Description,
        booksCount: 0 // Mới tạo nên chưa có sách
      };
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const payload = {
        CategoryName: categoryData.name,
        Description: categoryData.description
      };
      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/Category/${id}`, payload);
      return {
        id: response.data.CategoryId,
        name: response.data.CategoryName,
        description: response.data.Description,
        booksCount: response.data.BooksCount || 0
      };
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await apiClient.delete(`https://chosachonline-datn.onrender.com/api/Category/${id}`);
      return id; // Trả về id của danh mục đã xóa
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};