// src/services/authorService.js
import apiClient from './api';

export const authorService = {
  getAllAuthors: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Author');
      return response.data.map(author => ({
        AuthorId: author.AuthorId,
        Name: author.Name,
        Description: author.Description,
        // Thêm các trường bổ sung nếu API có
        // BooksCount: author.BooksCount || 0
      }));
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  },

  createAuthor: async (authorData) => {
    try {
      const payload = {
        Name: authorData.Name,
        Description: authorData.Description
      };
      console.log("Payload gửi đi:", JSON.stringify(payload));
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Author', payload);
      return {
        id: response.data.AuthorId,
        name: response.data.Name,
        description: response.data.Description,
        // BooksCount: 0
      };
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  },

  updateAuthor: async (id, authorData) => {
  console.log('Service received:', { id, authorData }); // Thêm dòng này
  
  try {
    const payload = {
      Name: authorData.Name,
      Description: authorData.Description
    };
    console.log('Making PUT request to:', `https://chosachonline-datn.onrender.com/api/Author/${id}`, 'with:', payload);
    
    const response = await apiClient.put(`https://chosachonline-datn.onrender.com/api/Author/${id}`, payload);
    console.log('Update successful:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Update failed:', {
      url: error.config?.url,
      data: error.config?.data,
      response: error.response?.data
    });
    throw error;
  }
},

  deleteAuthor: async (id) => {
    try {
      await apiClient.delete(`https://chosachonline-datn.onrender.com/api/Author/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting author:', error);
      throw error;
    }
  }
};