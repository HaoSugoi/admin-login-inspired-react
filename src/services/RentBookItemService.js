  // services/rentBookItemService.js

import apiClient from './api';

export const rentBookItemService = {
  // Lấy danh sách tất cả RentBookItem
  getAll: async () => {
    try {
      const response = await apiClient.get('/RentBookItem');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching RentBookItems:', error);
      throw error;
    }
  },

  // Lấy chi tiết RentBookItem theo id
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/RentBookItem/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching RentBookItem with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo mới RentBookItem
  create: async (data) => {
    try {
      const response = await apiClient.post('/RentBookItem', data);
      console.log('❌ Error creating RentBookItem:', data);
      console.log('❌ creating RentBookItem:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating RentBookItem:', error);
      throw error;
    }
  },

  // Cập nhật RentBookItem theo id
  update: async (id, data) => {
    try {
      const response = await apiClient.put(`/RentBookItem/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating RentBookItem with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa RentBookItem theo id
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/RentBookItem/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error deleting RentBookItem with id ${id}:`, error);
      throw error;
    }
  },
  // Lấy RentBookItems theo RentBookId
getByRentBookId: async (rentBookId) => {
    try {
      const allItems = await apiClient.get('/RentBookItem');
      // Lọc theo RentBookId
      return allItems.data.filter(item => item.RentBookId === rentBookId);
    } catch (error) {
      console.error(`❌ Error fetching items for RentBookId ${rentBookId}:`, error);
      throw error;
    }
  },
  
};