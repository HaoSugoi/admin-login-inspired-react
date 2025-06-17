
import apiClient from './api';

// Service cho quản lý đơn thuê sách
export const rentalService = {
  // Lấy danh sách tất cả đơn thuê
  getAllRentals: async () => {
    try {
      const response = await apiClient.get('/RentBookItem');
      return response.data;
    } catch (error) {
      console.error('Error fetching rentals:', error);
      throw error;
    }
  },

  // Lấy đơn thuê theo ID
  getRentalById: async (id) => {
    try {
      const response = await apiClient.get(`/RentBookItem/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rental by id:', error);
      throw error;
    }
  },

  // Tạo đơn thuê mới
  createRental: async (rentalData) => {
    try {
      const response = await apiClient.post('/RentBookItem', rentalData);
      return response.data;
    } catch (error) {
      console.error('Error creating rental:', error);
      throw error;
    }
  },

  // Cập nhật đơn thuê
  updateRental: async (id, rentalData) => {
    try {
      const response = await apiClient.put(`/RentBookItem/${id}`, rentalData);
      return response.data;
    } catch (error) {
      console.error('Error updating rental:', error);
      throw error;
    }
  },

  // Xóa đơn thuê
  deleteRental: async (id) => {
    try {
      const response = await apiClient.delete(`/RentBookItem/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting rental:', error);
      throw error;
    }
  },

  // Xác nhận đơn thuê
  approveRental: async (id) => {
    try {
      const response = await apiClient.patch(`/RentBookItem/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving rental:', error);
      throw error;
    }
  },

  // Đánh dấu đã giao
  markAsDelivered: async (id) => {
    try {
      const response = await apiClient.patch(`/RentBookItem/${id}/delivered`);
      return response.data;
    } catch (error) {
      console.error('Error marking as delivered:', error);
      throw error;
    }
  },

  // Đánh dấu đã trả
  markAsReturned: async (id) => {
    try {
      const response = await apiClient.patch(`/RentBookItem/${id}/returned`);
      return response.data;
    } catch (error) {
      console.error('Error marking as returned:', error);
      throw error;
    }
  },

  // Đánh dấu sách bị hỏng/mất
  markAsDamaged: async (id, notes) => {
    try {
      const response = await apiClient.patch(`/RentBookItem/${id}/damaged`, { notes });
      return response.data;
    } catch (error) {
      console.error('Error marking as damaged:', error);
      throw error;
    }
  }
};
