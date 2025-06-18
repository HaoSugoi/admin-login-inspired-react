
import apiClient from './api';

// Types cho authentication
export const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/Auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || { message: 'Đăng nhập thất bại' };
    }
  },

  // Làm mới token
  refreshToken: async (accessToken, refreshToken) => {
    try {
      const response = await apiClient.post('/Auth/refresh-token', {
        accessToken: accessToken,
        refreshToken: refreshToken
      });
      
      console.log('Refresh token response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error.response?.data || { message: 'Làm mới token thất bại' };
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      const response = await apiClient.post('/Auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error.response?.data || { message: 'Đăng xuất thất bại' };
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/Auth/current-user');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error.response?.data || { message: 'Lấy thông tin người dùng thất bại' };
    }
  }
};
