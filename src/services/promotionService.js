import apiClient from './api';

// Service cho quản lý khuyến mãi
export const promotionService = {
  // Lấy danh sách tất cả khuyến mãi
  getAllPromotions: async () => {
    try {
      const response = await apiClient.get('/Promotion');
      return response.data;
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  },

  // Lấy khuyến mãi theo ID
  getPromotionById: async (id) => {
    try {
      const response = await apiClient.get(`/Promotion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotion by id:', error);
      throw error;
    }
  },

  // Tạo khuyến mãi mới
  createPromotion: async (promotionData) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Promotion', promotionData);
      return response.data;
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw error;
    }
  },


// Update khuyến mãi
updatePromotion: async (id, promotionData) => {
    try {
      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/Promotion/${id}`, promotionData);
      return response.data;
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw error;  
    }
  },
  

  // Xóa khuyến mãi
  deletePromotion: async (id) => {
    try {
      const response = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/Promotion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw error;
    }
  },
};