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

  // Tính toán thống kê - THÊM emptyAuthors
  const statistics = {
    totalAuthors: authors.length,
    authorsWithBooks: authors.filter(a => (a.BooksCount || 0) > 0).length,
    emptyAuthors: authors.filter(a => (a.BooksCount || 0) === 0).length // THÊM DÒNG NÀY
  };

  // Hàm lọc tác giả - SỬA LỖI CHÍNH TẢ
  const filterAuthors = (searchTerm) => {
    if (!searchTerm) return authors;
    
    return authors.filter(author => 
      author.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || // THÊM ? ĐỂ TRÁNH LỖI
      (author.Description && 
       author.Description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Mutation để tạo tác giả mới - SỬA LỖI CHÍNH TẢ
  const createAuthorMutation = useMutation({
    mutationFn: authorService.createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to create author:', error.response?.data || error.message); // SỬA errorresponse -> error.response
    }
  });

  // Mutation để cập nhật tác giả
  const updateAuthorMutation = useMutation({
    mutationFn: ({ id, data }) => authorService.updateAuthor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to update author:', error);
    }
  });

  // Mutation để xóa tác giả
  const deleteAuthorMutation = useMutation({
    mutationFn: authorService.deleteAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
    onError: (error) => {
      console.error('Failed to delete author:', error);
    }
  });

  return {
    // Data
    authors,
    statistics,
    isLoadingAuthors,
    authorsError,
    
    // Functions
    refetchAuthors,
    createAuthor: createAuthorMutation.mutate,
    updateAuthor: updateAuthorMutation.mutate,
    deleteAuthor: deleteAuthorMutation.mutate,
    filterAuthors, // THÊM HÀM LỌC VÀO RETURN
    
    // Loading states
    isCreating: createAuthorMutation.isPending,
    isUpdating: updateAuthorMutation.isPending,
    isDeleting: deleteAuthorMutation.isPending,
  };
};