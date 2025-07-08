
// src/services/authorService.js
import apiClient from './api';

export const authorService = {
  getAllAuthors: async () => {
    try {
      console.log("🔄 Fetching all authors...");
      const response = await apiClient.get('/Author');
      console.log("✅ Authors fetched successfully:", response.data);
      
      return response.data.map(author => ({
        AuthorId: author.AuthorId,
        Name: author.Name,
        Description: author.Description,
        BooksCount: author.BooksCount || 0
      }));
    } catch (error) {
      console.error('❌ Error fetching authors:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  createAuthor: async (authorData) => {
    try {
      console.log("🔄 Creating author with data:", authorData);
      
      // Validate input data
      if (!authorData.Name || authorData.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }

      const payload = {
        Name: authorData.Name.trim(),
        Description: (authorData.Description || '').trim()
      };
      
      console.log("📤 Payload being sent:", JSON.stringify(payload, null, 2));
      
      const response = await apiClient.post('/Author', payload);
      
      console.log("✅ Author created successfully:", response.data);
      
      return {
        AuthorId: response.data.AuthorId,
        Name: response.data.Name,
        Description: response.data.Description,
        BooksCount: 0
      };
    } catch (error) {
      console.error('❌ Error creating author:', error);
      console.error('Full error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
      
      // Ném lại lỗi với thông tin chi tiết hơn
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 400) {
        throw new Error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
      } else if (error.response?.status === 500) {
        throw new Error('Lỗi server. Vui lòng thử lại sau.');
      } else {
        throw new Error(error.message || 'Không thể tạo tác giả. Vui lòng thử lại.');
      }
    }
  },

  updateAuthor: async (id, authorData) => {
    try {
      console.log('🔄 Updating author:', { id, authorData });
      
      if (!id) {
        throw new Error('ID tác giả không hợp lệ');
      }
      
      if (!authorData.Name || authorData.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }

      const payload = {
        Name: authorData.Name.trim(),
        Description: (authorData.Description || '').trim()
      };
      
      console.log('📤 Update payload:', JSON.stringify(payload, null, 2));
      console.log('🔗 Request URL:', `/Author/${id}`);
      
      const response = await apiClient.put(`/Author/${id}`, payload);
      
      console.log('✅ Author updated successfully:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Update failed:', {
        id,
        authorData,
        url: error.config?.url,
        data: error.config?.data,
        status: error.response?.status,
        response: error.response?.data,
        message: error.message
      });
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 404) {
        throw new Error('Không tìm thấy tác giả để cập nhật.');
      } else if (error.response?.status === 400) {
        throw new Error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
      } else {
        throw new Error(error.message || 'Không thể cập nhật tác giả. Vui lòng thử lại.');
      }
    }
  },

  deleteAuthor: async (id) => {
    try {
      console.log('🔄 Deleting author with id:', id);
      
      if (!id) {
        throw new Error('ID tác giả không hợp lệ');
      }
      
      await apiClient.delete(`/Author/${id}`);
      
      console.log('✅ Author deleted successfully');
      
      return id;
    } catch (error) {
      console.error('❌ Delete failed:', {
        id,
        status: error.response?.status,
        response: error.response?.data,
        message: error.message
      });
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 404) {
        throw new Error('Không tìm thấy tác giả để xóa.');
      } else if (error.response?.status === 400) {
        throw new Error('Không thể xóa tác giả này vì có sách liên quan.');
      } else {
        throw new Error(error.message || 'Không thể xóa tác giả. Vui lòng thử lại.');
      }
    }
  }
};
