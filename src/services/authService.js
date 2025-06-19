
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
      
      console.log('Full login response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data keys:', Object.keys(response.data || {}));
      
      // Kiểm tra status code và xử lý response
      if (response.status === 200) {
        const data = response.data;
        
        // Log để debug cấu trúc data
        console.log('Checking for token in response...');
        console.log('data.token:', data.token);
        console.log('data.accessToken:', data.accessToken);
        console.log('data.access_token:', data.access_token);
        console.log('data.Token:', data.Token);
        
        // Thử nhiều cách đặt tên token khác nhau
        const token = data.token || data.accessToken || data.access_token || data.Token;
        const refreshToken = data.refreshToken || data.refresh_token || data.RefreshToken;
        
        if (token) {
          return {
            isSuccess: true,
            token: token,
            refreshToken: refreshToken,
            message: data.message || 'Đăng nhập thành công',
            user: data.user || null
          };
        } else {
          // Log toàn bộ data để debug
          console.error('No token found in response. Full data:', JSON.stringify(data, null, 2));
          throw new Error(data.message || 'Đăng nhập thất bại - không nhận được token');
        }
      } else {
        // Các trường hợp status code khác 200
        throw new Error(response.data?.message || 'Đăng nhập thất bại');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        console.log('Error response status:', status);
        console.log('Error response data:', errorData);
        
        switch (status) {
          case 400:
            // Lỗi dữ liệu đầu vào không hợp lệ
            throw new Error(errorData?.message || 'Thông tin đăng nhập không hợp lệ');
          
          case 401:
            // Lỗi xác thực - sai email hoặc mật khẩu
            throw new Error(errorData?.message || 'Email hoặc mật khẩu không đúng');
          
          case 403:
            // Lỗi phân quyền
            throw new Error(errorData?.message || 'Tài khoản không có quyền truy cập');
          
          case 404:
            // Không tìm thấy endpoint
            throw new Error('Dịch vụ đăng nhập không khả dụng');
          
          case 429:
            // Quá nhiều request
            throw new Error('Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau');
          
          case 500:
          case 502:
          case 503:
            // Lỗi server
            throw new Error('Lỗi hệ thống. Vui lòng thử lại sau');
          
          default:
            // Các lỗi khác
            throw new Error(errorData?.message || `Lỗi đăng nhập (${status})`);
        }
      } else if (error.request) {
        // Lỗi network - không thể kết nối tới server
        throw new Error('Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng');
      } else {
        // Lỗi khác
        throw new Error(error.message || 'Đăng nhập thất bại');
      }
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
