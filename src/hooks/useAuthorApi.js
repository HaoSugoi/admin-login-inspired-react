
// src/hooks/useAuthorApi.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authorService } from '../services/authorService';

export const useAuthorApi = () => {
  const queryClient = useQueryClient();

  // Query để lấy danh sách tác giả
  const {
    data: authors = [],
    isLoading: isLoadingAuthors,
    error: authorsError,
    refetch: refetchAuthors
  } = useQuery({
    queryKey: ['authors'],
    queryFn: authorService.getAllAuthors,
    staleTime: 5 * 60 * 1000,
  });

  // Tính toán thống kê
  const statistics = {
    totalAuthors: authors.length,
    authorsWithBooks: authors.filter(a => (a.BooksCount || 0) > 0).length,
    emptyAuthors: authors.filter(a => (a.BooksCount || 0) === 0).length
  };

  // Hàm lọc tác giả
  const filterAuthors = (searchTerm) => {
    if (!searchTerm) return authors;
    
    return authors.filter(author => 
      author.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (author.Description && 
       author.Description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Mutation để tạo tác giả mới - FIXED: Thêm error handling chi tiết
  const createAuthorMutation = useMutation({
    mutationFn: async (authorData) => {
      console.log("Mutation creating author with data:", authorData);
      
      // Validate dữ liệu trước khi gửi
      if (!authorData.Name || authorData.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }
      
      return await authorService.createAuthor(authorData);
    },
    onSuccess: (data) => {
      console.log("Create author mutation successful:", data);
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to create author - Full error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
    }
  });

  // Mutation để cập nhật tác giả - FIXED: Thêm error handling
  const updateAuthorMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      console.log("Mutation updating author:", { id, data });
      
      if (!id) {
        throw new Error('ID tác giả không hợp lệ');
      }
      
      if (!data.Name || data.Name.trim() === '') {
        throw new Error('Tên tác giả không được để trống');
      }
      
      return await authorService.updateAuthor(id, data);
    },
    onSuccess: (data) => {
      console.log("Update author mutation successful:", data);
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to update author:', error);
      console.error('Error response:', error.response?.data);
    }
  });

  // Mutation để xóa tác giả - FIXED: Thêm error handling
  const deleteAuthorMutation = useMutation({
    mutationFn: async (id) => {
      console.log("Mutation deleting author with id:", id);
      
      if (!id) {
        throw new Error('ID tác giả không hợp lệ');
      }
      
      return await authorService.deleteAuthor(id);
    },
    onSuccess: (data) => {
      console.log("Delete author mutation successful:", data);
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to delete author:', error);
      console.error('Error response:', error.response?.data);
    }
  });

  return {
    // Data
    authors,
    statistics,
    isLoadingAuthors,
    authorsError,
    
    // Functions - FIXED: Wrap mutation functions để return Promise
    refetchAuthors,
    createAuthor: (data) => createAuthorMutation.mutateAsync(data),
    updateAuthor: (params) => updateAuthorMutation.mutateAsync(params),
    deleteAuthor: (id) => deleteAuthorMutation.mutateAsync(id),
    filterAuthors,
    
    // Loading states
    isCreating: createAuthorMutation.isPending,
    isUpdating: updateAuthorMutation.isPending,
    isDeleting: deleteAuthorMutation.isPending,
  };
};
