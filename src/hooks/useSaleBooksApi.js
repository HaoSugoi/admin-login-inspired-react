import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salebooksService } from '../services/SaleBooksService';

export const useSaleBooksApi = () => {
  const queryClient = useQueryClient();

  const {
    data: salebookss = [],
    isLoading: isLoadingSaleBookss,
    error: salebookssError,
    refetch: refetchSaleBookss
  } = useQuery({
    queryKey: ['salebookss'],
    queryFn: salebooksService.getAllSaleBookss,
    staleTime: 5 * 60 * 1000,
  });

  const createSaleBooksMutation = useMutation({
    mutationFn: salebooksService.createSaleBooks,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['salebookss'] }),
  });

  const updateSaleBooksMutation = useMutation({
    mutationFn: ({ id, data }) => salebooksService.updateSaleBooks(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['salebookss'] }),
  });

  const deleteSaleBooksMutation = useMutation({
    mutationFn: salebooksService.deleteSaleBooks,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['salebookss'] }),
  });

  const toggleVisibilityMutation = useMutation({
  mutationFn: ({ id, isHidden }) => salebooksService.setVisibility(id, isHidden),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['salebookss'] });
  },
  onError: (err) => {
    console.error('Lỗi khi đổi trạng thái ẩn/hiện:', err);
  }
});


  return {
    salebookss,
    isLoadingSaleBookss,
    salebookssError,
    refetchSaleBookss,
    createSaleBooks: createSaleBooksMutation.mutate,
    updateSaleBooks: updateSaleBooksMutation.mutate,
    deleteSaleBooks: deleteSaleBooksMutation.mutate,
    toggleVisibility: toggleVisibilityMutation.mutate, // ✅ thêm vào
    isCreating: createSaleBooksMutation.isPending,
    isUpdating: updateSaleBooksMutation.isPending,
    isDeleting: deleteSaleBooksMutation.isPending,
  };
};