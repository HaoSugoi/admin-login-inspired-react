import apiClient from './api';

export const slideService = {
  // Lấy tất cả slide
  getAllSlides: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Slide');
      return response.data;
    } catch (error) {
      console.error('Error fetching slides:', error);
      throw error;
    }
  },

  // Lấy slide theo ID
  getSlideById: async (id) => {
    try {
      const response = await apiClient.get(`https://chosachonline-datn.onrender.com/api/Slide/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slide by id:', error);
      throw error;
    }
  },

  // Tạo slide mới (multipart/form-data)
  createSlide: async (slideData) => {
    try {
      const formData = new FormData();
      formData.append('ImageFile', slideData.imageFile);  // slideData.imageFile: File
      formData.append('LinkUrl', slideData.linkUrl);      // slideData.linkUrl: string

      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Slide', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating slide:', error);
      throw error;
    }
  },

  // Cập nhật slide (multipart/form-data)
  updateSlide: async (id, slideData) => {
    try {
      const formData = new FormData();
      if (slideData.imageFile) {
        formData.append('ImageFile', slideData.imageFile);
      }
      formData.append('LinkUrl', slideData.linkUrl);

      const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/Slide/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
      const response = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/Slide/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting slide:', error);
      throw error;
    }
  }
};