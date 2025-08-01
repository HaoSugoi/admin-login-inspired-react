
import apiClient from './api';

export const userSlideService = {
  // Lấy danh sách slides cho user
  getActiveSlides: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Slides');
      return response.data;
    } catch (error) {
      console.error('Error fetching slides for user:', error);
      return { isSuccess: false, data: [] };
    }
  }
};
