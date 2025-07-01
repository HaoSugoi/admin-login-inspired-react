
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pointsService } from '../services/pointsService';

export const usePointsApi = () => {
  const queryClient = useQueryClient();

  const {
    data: pointTransactions = [],
    isLoading: isLoadingPoints,
    error: pointsError,
    refetch: refetchPoints
  } = useQuery({
    queryKey: ['pointTransactions'],
    queryFn: pointsService.getAllPointTransactions,
    staleTime: 5 * 60 * 1000,
  });

  const createPointTransactionMutation = useMutation({
    mutationFn: pointsService.createPointTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pointTransactions'] });
    },
    onError: (error) => {
      console.error('Create point transaction error:', error);
    }
  });

  const updatePointTransactionMutation = useMutation({
    mutationFn: ({ id, data }) => pointsService.updatePointTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pointTransactions'] });
    },
    onError: (error) => {
      console.error('Update point transaction error:', error);
    }
  });

  const deletePointTransactionMutation = useMutation({
    mutationFn: pointsService.deletePointTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pointTransactions'] });
    },
    onError: (error) => {
      console.error('Delete point transaction error:', error);
    }
  });

  const redeemPointsMutation = useMutation({
    mutationFn: ({ customerId, redeemData }) => pointsService.redeemPoints(customerId, redeemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pointTransactions'] });
    },
    onError: (error) => {
      console.error('Redeem points error:', error);
    }
  });

  // Tính toán thống kê
  const statistics = {
    totalTransactions: pointTransactions.length,
    totalPointsEarned: pointTransactions
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + (t.points || 0), 0),
    totalPointsRedeemed: pointTransactions
      .filter(t => t.type === 'redeem')
      .reduce((sum, t) => sum + (t.points || 0), 0),
    activeCustomers: [...new Set(pointTransactions.map(t => t.customerId))].length
  };

  return {
    pointTransactions,
    statistics,
    isLoadingPoints,
    pointsError,
    refetchPoints,
    createPointTransaction: createPointTransactionMutation.mutate,
    updatePointTransaction: updatePointTransactionMutation.mutate,
    deletePointTransaction: deletePointTransactionMutation.mutate,
    redeemPoints: redeemPointsMutation.mutate,
    isCreating: createPointTransactionMutation.isPending,
    isUpdating: updatePointTransactionMutation.isPending,
    isDeleting: deletePointTransactionMutation.isPending,
    isRedeeming: redeemPointsMutation.isPending
  };
};
