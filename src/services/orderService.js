import apiClient from './api';

export const orderService = {
  // Lấy danh sách tất cả đơn hàng
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/admin/saleorders');
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  },

  // Lấy chi tiết đơn hàng theo ID
  getOrderDetailsById: async (orderId) => {
    try {
      const response = await apiClient.get(`/admin/saleorders/${orderId}/details`);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy chi tiết đơn hàng:', error);
      throw error;
    }
  },

  // Lấy đơn hàng theo ID
  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/Orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy đơn hàng theo ID:', error);
      throw error;
    }
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/Orders', orderData);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  },

  // Cập nhật đơn hàng
  updateOrder: async (id, orderData) => {
    try {
      const response = await apiClient.put(`/Orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật đơn hàng:', error);
      throw error;
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (id) => {
    try {
      const response = await apiClient.delete(`/Orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi xóa đơn hàng:', error);
      throw error;
    }
  },

  // ✅ Cập nhật trạng thái đơn hàng (truyền status là số nguyên trong body)
  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiClient.put(
        `/admin/saleorders/${id}/status`,
        status,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  },
};
