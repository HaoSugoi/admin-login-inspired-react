// src/services/authorService.js
import apiClient from './api';

export const authorService = {
  getAllAuthors: async () => {
    try {
      const response = await apiClient.get('/Author');
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
      const response = await apiClient.post('/Author', payload);
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
    try {
      const payload = {
        Name: authorData.Name,
        Description: authorData.Description
      };
      const response = await apiClient.put(`/Author/${id}`, payload);
      return {
        AuthorId: response.data.AuthorId,
        Name: response.data.Name,
        Description: response.data.Description,
        // BooksCount: response.data.BooksCount || 0
      };
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  },

  deleteAuthor: async (id) => {
    try {
      await apiClient.delete(`/Author/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting author:', error);
      throw error;
    }
  }
};