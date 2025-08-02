import apiClient from './api';

export const salebooksService = {
  // Lấy tất cả sách bán
  getAllSaleBookss: async () => {
    const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/SaleBooks');
    return response.data;
  },

  // ✅ Sửa tên hàm đúng như bạn đang gọi
  getSaleBookById: async (id) => {
    const response = await apiClient.get(`https://chosachonline-datn.onrender.com/api/SaleBooks/${id}`);
    return response.data;
  },

  // Tạo sách mới
  createSaleBooks: async (salebooksData) => {
    console.log("mmmmmmm",salebooksData)
    const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/SaleBooks', salebooksData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("mmmmmmm",response.data)
    console.log("yyyyyy",response)
    return response.data;
  },

  // Cập nhật sách
  updateSaleBooks: async (id, salebooksData) => {
    const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/SaleBooks/${id}`, salebooksData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Xóa sách
  deleteSaleBooks: async (id) => {
    const response = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/SaleBooks/${id}`);
    return response.data;
  },

  // Ẩn / Hiện sách
  setVisibility: async (id, isHidden) => {
    try {
      console.log('📦 Gửi request PUT với id:', id);
      console.log('📤 Dữ liệu:', isHidden);
      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/SaleBooks/set-visibility/${id}/${isHidden}`);
      return response.data;
    } catch (error) {
      console.error('Error setting visibility:', error);
      throw error;
    }
  }
};