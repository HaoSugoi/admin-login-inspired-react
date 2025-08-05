import apiClient from './api';

// Service cho quản lý mã giảm giá
export const discountcodeService = {
  // Lấy danh sách tất cả mã giảm giá
  getAllDiscountCodes: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/DiscountCode');
      return response.data;
    } catch (error) {
      console.error('Error fetching discountcodes:', error);
      throw error;
    }
  },

  // Lấy mã giảm giá theo ID
  getDiscountCodeById: async (id) => {
    try {
      const response = await apiClient.get(`https://chosachonline-datn.onrender.com/api/DiscountCode/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching discountcode by id:', error);
      throw error;
    }
  },

  // Tạo mã giảm giá mới
  createDiscountCode: async (discountcodeData) => {
    const payload = {
      DiscountCodeName: discountcodeData.DiscountCodeName,
      Description: discountcodeData.Description || "",
      StartDate: new Date(discountcodeData.StartDate).toISOString(),     // 👈 ISO string
      EndDate: new Date(discountcodeData.EndDate).toISOString(),         // 👈 ISO string
      AvailableQuantity: parseInt(discountcodeData.AvailableQuantity),   // 👈 int
      RequiredPoints: parseInt(discountcodeData.RequiredPoints),         // 👈 int
      DiscountValue: parseFloat(discountcodeData.DiscountValue)          // 👈 double
    };
    
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/DiscountCode', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating discountcode:', error);
      throw error;
    }
  },


// Update mã giảm giá
updateDiscountCode: async (id, data) => {

    try {
      console.log('📦 Gửi request PUT với id:', id);
      console.log('📤 Dữ liệu:', data);
      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/DiscountCode/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating discountcode:', error);
      throw error;
    }
  },
  

  // Xóa mã giảm giá
  deleteDiscountCode: async (id) => {
    try {
      const response = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/DiscountCode/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting discountcode:', error);
      throw error;
    }
  },
};