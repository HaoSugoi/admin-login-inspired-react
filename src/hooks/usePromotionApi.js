import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promotionService } from '../services/promotionService';

export const usePromotionApi = () => {
  const queryClient = useQueryClient();

  const {
    data: promotions = [],
    isLoading: isLoadingPromotions,
    error: promotionsError,
    refetch: refetchPromotions
  } = useQuery({
    queryKey: ['promotions'],
    queryFn: promotionService.getAllPromotions,
    staleTime: 5 * 60 * 1000,
  });

  const createPromotionMutation = useMutation({
    mutationFn: promotionService.createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error) => {
      console.error('Create error:', error);
    }
  });

  const updatePromotionMutation = useMutation({
    mutationFn: ({ id, data }) => promotionService.updatePromotion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error) => {
      console.error('Update error:', error);
    }
  });

  const deletePromotionMutation = useMutation({
    mutationFn: promotionService.deletePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error) => {
      console.error('Delete error:', error);
    }
  });

  return {
    promotions,
    isLoadingPromotions,
    promotionsError,
    refetchPromotions,
    createPromotion: createPromotionMutation.mutate,
    updatePromotion: updatePromotionMutation.mutate,
    deletePromotion: deletePromotionMutation.mutate,
    isCreating: createPromotionMutation.isPending,
    isUpdating: updatePromotionMutation.isPending,
    isDeleting: deletePromotionMutation.isPending,
  };
};