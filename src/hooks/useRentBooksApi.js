import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rentbooksService } from '../services/RentBooksService';

export const useRentBooksApi = () => {
  const queryClient = useQueryClient();

  const {
    data: rentbookss = [],
    isLoading: isLoadingRentBookss,
    error: rentbookssError,
    refetch: refetchRentBookss
  } = useQuery({
    queryKey: ['rentbooks'],
    queryFn: rentbooksService.getAllRentbookss,
    staleTime: 5 * 60 * 1000,
  });

  const createRentBooksMutation = useMutation({
    mutationFn: rentbooksService.createRentbooks,
    onSuccess: () =>queryClient.invalidateQueries({ queryKey: ['rentbooks'] })
  });

  const updateRentBooksMutation = useMutation({
    mutationFn: ({ id, data }) => rentbooksService.updateRentbooks(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentbooks'] });
    },
    onError: (error) => {
      console.error('Update error:', error);
    }
  });

  const deleteRentBooksMutation = useMutation({
    mutationFn: rentbooksService.deleteRentbooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentbooks'] });
    },
    onError: (error) => {
      console.error('Delete error:', error);
    }
  });
  const toggleVisibilityMutation = useMutation({
    
    mutationFn: ({ id, isHidden }) => rentbooksService.setVisibility(id, isHidden),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentbooks'] });
    },
    onError: (err) => {
      console.error('Lỗi khi đổi trạng thái ẩn/hiện:', err);
    }
  });
  
  
  return {
    rentbookss,
    isLoadingRentBookss,
    rentbookssError,
    refetchRentBookss,
    createRentBooks: createRentBooksMutation.mutate,
    updateRentBooks: updateRentBooksMutation.mutate,
    deleteRentBooks: deleteRentBooksMutation.mutate,
    isCreating: createRentBooksMutation.isPending,
    isUpdating: updateRentBooksMutation.isPending,
    isDeleting: deleteRentBooksMutation.isPending,
    toggleVisibility: toggleVisibilityMutation.mutate,
isTogglingVisibility: toggleVisibilityMutation.isPending,

  };
};