import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { discountcodeService } from '../services/DiscountCodeService';

export const useDiscountCodeApi = () => {
  const queryClient = useQueryClient();

  // Query để lấy danh sách Mã giảm giá
  const {
    data: discountcodes = [],
    isLoading: isLoadingDiscountCodes,
    error: discountcodesError,
    refetch: refetchDiscountCodes
  } = useQuery({
    queryKey: ['discountcodes'],
    queryFn: discountcodeService.getAllDiscountCodes,
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  // Mutation để tạo Mã giảm giá mới
  const createDiscountCodeMutation = useMutation({
    mutationFn: discountcodeService.createDiscountCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discountcodes'] });
      console.log('DiscountCode created successfully');
    },
    onError: (error) => {
      alert('Failed to create discountcode:', error);
    }
  });

  // Mutation để cập nhật Mã giảm giá
  const updateDiscountCodeMutation = useMutation({
    mutationFn: ({ id, data }) => discountcodeService.updateDiscountCode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discountcodes'] });
      console.log('DiscountCode updated successfully');
    },
    onError: (error) => {
    
      console.error('Failed to update discountcode:', error);
    }
  });

 
  // Mutation để xóa Mã giảm giá
  const deleteDiscountCodeMutation = useMutation({
    mutationFn: discountcodeService.deleteDiscountCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discountcodes'] });
      console.log('DiscountCode deleted successfully');
    },
    onError: (error) => {
      console.error('Failed to delete discountcode:', error);
    }
  });

  return {
    // Data
    discountcodes,
    isLoadingDiscountCodes,
    discountcodesError,

    // Functions
    refetchDiscountCodes,
    createDiscountCode: createDiscountCodeMutation.mutate,
    updateDiscountCode: updateDiscountCodeMutation.mutate,
    deleteDiscountCode: deleteDiscountCodeMutation.mutate,

    // Loading states
    isCreating: createDiscountCodeMutation.isPending,
    isUpdating: updateDiscountCodeMutation.isPending,
    isDeleting: deleteDiscountCodeMutation.isPending,
  };
};