import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { tokenUtils, cookieUtils } from '../utils/cookieUtils';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Kiểm tra trạng thái đăng nhập khi khởi tạo
  useEffect(() => {
    const checkAuthStatus = () => {
      const accessToken = tokenUtils.getAccessToken();
      const hasRefreshToken = cookieUtils.hasRefreshToken();
      
      if (accessToken && !tokenUtils.isTokenExpired(accessToken)) {
        setIsAuthenticated(true);
        const userInfo = tokenUtils.getTokenPayload(accessToken);
        setUser(userInfo);
      } else if (hasRefreshToken) {
        // Nếu có refresh token, thử làm mới access token
        handleRefreshToken();
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Mutation cho đăng nhập
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        // Lưu access token vào localStorage
        tokenUtils.setAccessToken(data.token);
        
        // Nếu API trả về refreshToken, lưu vào cookie
        if (data.refreshToken) {
          // Lưu refresh token vào cookie với thời hạn 7 ngày
          document.cookie = `refreshToken=${data.refreshToken}; max-age=${7 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
        }
        
        setIsAuthenticated(true);
        
        const userInfo = tokenUtils.getTokenPayload(data.token);
        setUser(userInfo);
        
        console.log('Đăng nhập thành công:', data.message);
      } else {
        console.error('Đăng nhập thất bại:', data.message);
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      console.error('Lỗi đăng nhập:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  });

  // Mutation cho làm mới token
  const refreshTokenMutation = useMutation({
    mutationFn: ({ accessToken, refreshToken }) => 
      authService.refreshToken(accessToken, refreshToken),
    onSuccess: (data) => {
      if (data.isSuccess) {
        // Lưu access token mới
        tokenUtils.setAccessToken(data.token);
        
        // Nếu có refresh token mới, cập nhật cookie
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}; max-age=${7 * 24 * 60 * 60}; path=/; secure; samesite=strict`;
        }
        
        setIsAuthenticated(true);
        
        const userInfo = tokenUtils.getTokenPayload(data.token);
        setUser(userInfo);
        
        console.log('Làm mới token thành công');
      } else {
        handleLogout();
      }
    },
    onError: (error) => {
      console.error('Lỗi làm mới token:', error);
      handleLogout();
    }
  });

  // Mutation cho đăng xuất
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      handleLogout();
    },
    onError: (error) => {
      console.error('Lỗi đăng xuất:', error);
      // Vẫn đăng xuất local dù API lỗi
      handleLogout();
    }
  });

  // Xử lý đăng nhập - trả về Promise để component có thể chờ kết quả
  const login = (credentials) => {
    return new Promise((resolve, reject) => {
      loginMutation.mutate(credentials, {
        onSuccess: (data) => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  };

  // Xử lý làm mới token
  const handleRefreshToken = () => {
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = cookieUtils.getCookie('refreshToken');
    
    if (refreshToken) {
      refreshTokenMutation.mutate({ accessToken, refreshToken });
    } else {
      handleLogout();
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    tokenUtils.removeAccessToken();
    cookieUtils.deleteCookie('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
    queryClient.clear(); // Xóa tất cả cache
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    
    // Actions
    login,
    logout,
    refreshToken: handleRefreshToken,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
    
    // Errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshTokenMutation.error
  };
};
