import apiClient from './api';

// Service cho quản lý khuyến mãi
export const rentbooksService = {
  // Lấy danh sách tất cả khuyến mãi
  getAllRentbookss: async () => {
    try {
      const response = await apiClient.get('/RentBooks');
      return response.data;
    } catch (error) {
      console.error('Error fetching RentBooks:', error);
      throw error;
    }
  },

  // Lấy khuyến mãi theo ID
  getRentbooksById: async (id) => {
    try {
      const response = await apiClient.get(`/RentBooks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching RentBooks by id:', error);
      throw error;
    }
  },

  // Tạo khuyến mãi mới
  createRentbooks: async (rentbooksData) => {
    try {
      const response = await apiClient.post('/RentBooks', rentbooksData,  {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating RentBooks:', error);
      throw error;
    }
  },

  updateRentbooks: async (id, data) => {
    try {
      // Nếu là FormData thì gửi như vậy
      if (data instanceof FormData) {
        console.log('📦 Gửi FormData: ', data);
  
        const response = await apiClient.put(`/RentBooks/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
  
        return response.data;
      }
  
      // Nếu là object JSON bình thường
      const response = await apiClient.put(`/RentBooks/${id}`, data);
      return response.data;
  
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật RentBooks:', error.response?.data || error);
      throw error;
    }
  },
  
  
  
  
  // Xóa khuyến mãi
  deleteRentbooks: async (id) => {
    try {

      const response = await apiClient.delete(`/RentBooks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting rentbooks:', error);
      throw error;
    }
  },
 
  setVisibility: async (id, isHidden) => {
    try {
        console.log('📦 Gửi request PUT với id:', id);
        console.log('📤 Dữ liệu:', isHidden);
      const response = await apiClient.put(`/RentBooks/set-visibility/${id}/${isHidden}`);
      return response.data;
    } catch (error) {
      console.error('Error setting visibility:', error);
      throw error;
    }
  }
  
  
};