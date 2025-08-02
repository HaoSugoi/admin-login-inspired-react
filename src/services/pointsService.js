
import apiClient from './api';

export const pointsService = {
  // Lấy danh sách tất cả giao dịch điểm
  getAllPointTransactions: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/PointTransactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching point transactions:', error);
      throw error;
    }
  },

  // Lấy giao dịch điểm theo ID
  getPointTransactionById: async (id) => {
    try {
      const response = await apiClient.get(`https://chosachonline-datn.onrender.com/api/PointTransactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching point transaction by id:', error);
      throw error;
    }
  },

  // Tạo giao dịch điểm mới
  createPointTransaction: async (transactionData) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/PointTransactions', transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating point transaction:', error);
      throw error;
    }
  },

  // Cập nhật giao dịch điểm
  updatePointTransaction: async (id, transactionData) => {
    try {
      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/PointTransactions/${id}`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error updating point transaction:', error);
      throw error;
    }
  },

  // Xóa giao dịch điểm
  deletePointTransaction: async (id) => {
    try {
      const response = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/PointTransactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting point transaction:', error);
      throw error;
    }
  },

  // Lấy điểm của khách hàng
  getCustomerPoints: async (customerId) => {
    try {
      const response = await apiClient.get(`https://chosachonline-datn.onrender.com/api/Customers/${customerId}/points`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer points:', error);
      throw error;
    }
  },

  // Đổi điểm lấy quà
  redeemPoints: async (customerId, redeemData) => {
    try {
      const response = await apiClient.post(`https://chosachonline-datn.onrender.com/api/Customers/${customerId}/redeem-points`, redeemData);
      return response.data;
    } catch (error) {
      console.error('Error redeeming points:', error);
      throw error;
    }
  }
};
