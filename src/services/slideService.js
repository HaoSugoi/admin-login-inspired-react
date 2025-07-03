
import apiClient from './api';

export const slideService = {
  // Lấy danh sách tất cả slides
  getAllSlides: async () => {
    try {
      const response = await apiClient.get('/Slides');
      return response.data;
    } catch (error) {
      console.error('Error fetching slides:', error);
      throw error;
    }
  },

  // Lấy slide theo ID
  getSlideById: async (id) => {
    try {
      const response = await apiClient.get(`/Slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slide:', error);
      throw error;
    }
  },

  // Tạo slide mới
  createSlide: async (slideData) => {
    try {
      const formData = new FormData();
      if (slideData.imageFile) {
        formData.append('ImageFile', slideData.imageFile);
      }
      if (slideData.linkUrl) {
        formData.append('LinkUrl', slideData.linkUrl);
      }

      const response = await apiClient.post('/Slides', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating slide:', error);
      throw error;
    }
  },

  // Cập nhật slide
  updateSlide: async (id, slideData) => {
    try {
      const formData = new FormData();
      if (slideData.imageFile) {
        formData.append('ImageFile', slideData.imageFile);
      }
      if (slideData.linkUrl) {
        formData.append('LinkUrl', slideData.linkUrl);
      }

      const response = await apiClient.put(`/Slides/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating slide:', error);
      throw error;
    }
  },

  // Xóa slide
  deleteSlide: async (id) => {
    try {
      const response = await apiClient.delete(`/Slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting slide:', error);
      throw error;
    }
  }
};
