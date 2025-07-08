
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
      if (!authorData || !authorData.Name || authorData.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }

      // Tạo payload đúng format
      const payload = {
        Name: authorData.Name.trim(),
        Description: authorData.Description ? authorData.Description.trim() : ""
      };
      
      console.log("📤 CREATE payload:", JSON.stringify(payload, null, 2));
      console.log("🔗 CREATE URL:", '/Author');
      
      // Gửi request với headers rõ ràng
      const response = await apiClient.post('/Author', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("✅ Author created - Response:", response.data);
      console.log("✅ Response status:", response.status);
      
      return {
        AuthorId: response.data.AuthorId,
        Name: response.data.Name,
        Description: response.data.Description,
        BooksCount: 0
      };
    } catch (error) {
      console.error('❌ CREATE Error:', error);
      console.error('❌ CREATE Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        sentData: error.config?.data,
        headers: error.config?.headers
      });
      
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
      console.log('🔄 Updating author with params:', { id, authorData });
      
      if (!id) {
        throw new Error('ID tác giả không hợp lệ');
      }
      
      if (!authorData || !authorData.Name || authorData.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }

      // Tạo payload đúng format 
      const payload = {
        Name: authorData.Name.trim(),
        Description: authorData.Description ? authorData.Description.trim() : ""
      };
      
      console.log('📤 UPDATE payload:', JSON.stringify(payload, null, 2));
      console.log('🔗 UPDATE URL:', `/Author/${id}`);
      
      // Gửi request với headers rõ ràng
      const response = await apiClient.put(`/Author/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('✅ Author updated - Response:', response.data);
      console.log('✅ Response status:', response.status);
      
      return response.data;
    } catch (error) {
      console.error('❌ UPDATE Error:', error);
      console.error('❌ UPDATE Error details:', {
        id,
        authorData,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        sentData: error.config?.data,
        headers: error.config?.headers
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
      
      console.log('🔗 DELETE URL:', `/Author/${id}`);
      
      const response = await apiClient.delete(`/Author/${id}`);
      
      console.log('✅ Author deleted - Response:', response);
      console.log('✅ Response status:', response.status);
      
      return id;
    } catch (error) {
      console.error('❌ DELETE Error:', error);
      console.error('❌ DELETE Error details:', {
        id,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        message: error.message,
        url: error.config?.url
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
