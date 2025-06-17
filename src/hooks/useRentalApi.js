
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rentalService } from '../services/rentalService';

export const useRentalApi = () => {
  const queryClient = useQueryClient();

  // Query để lấy danh sách đơn thuê
  const {
    data: rentals = [],
    isLoading: isLoadingRentals,
    error: rentalsError,
    refetch: refetchRentals
  } = useQuery({
    queryKey: ['rentals'],
    queryFn: rentalService.getAllRentals,
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  // Mutation để tạo đơn thuê mới
  const createRentalMutation = useMutation({
    mutationFn: rentalService.createRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental created successfully');
    },
    onError: (error) => {
      console.error('Failed to create rental:', error);
    }
  });

  // Mutation để cập nhật đơn thuê
  const updateRentalMutation = useMutation({
    mutationFn: ({ id, data }) => rentalService.updateRental(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental updated successfully');
    },
    onError: (error) => {
      console.error('Failed to update rental:', error);
    }
  });

  // Mutation để xóa đơn thuê
  const deleteRentalMutation = useMutation({
    mutationFn: rentalService.deleteRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental deleted successfully');
    },
    onError: (error) => {
      console.error('Failed to delete rental:', error);
    }
  });

  // Mutation để xác nhận đơn thuê
  const approveRentalMutation = useMutation({
    mutationFn: rentalService.approveRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental approved successfully');
    },
    onError: (error) => {
      console.error('Failed to approve rental:', error);
    }
  });

  // Mutation để đánh dấu đã giao
  const markDeliveredMutation = useMutation({
    mutationFn: rentalService.markAsDelivered,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental marked as delivered');
    },
    onError: (error) => {
      console.error('Failed to mark as delivered:', error);
    }
  });

  // Mutation để đánh dấu đã trả
  const markReturnedMutation = useMutation({
    mutationFn: rentalService.markAsReturned,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental marked as returned');
    },
    onError: (error) => {
      console.error('Failed to mark as returned:', error);
    }
  });

  // Mutation để đánh dấu sách bị hỏng/mất
  const markDamagedMutation = useMutation({
    mutationFn: ({ id, notes }) => rentalService.markAsDamaged(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] });
      console.log('Rental marked as damaged');
    },
    onError: (error) => {
      console.error('Failed to mark as damaged:', error);
    }
  });

  return {
    // Data
    rentals,
    isLoadingRentals,
    rentalsError,
    
    // Functions
    refetchRentals,
    createRental: createRentalMutation.mutate,
    updateRental: updateRentalMutation.mutate,
    deleteRental: deleteRentalMutation.mutate,
    approveRental: approveRentalMutation.mutate,
    markAsDelivered: markDeliveredMutation.mutate,
    markAsReturned: markReturnedMutation.mutate,
    markAsDamaged: markDamagedMutation.mutate,
    
    // Loading states
    isCreating: createRentalMutation.isPending,
    isUpdating: updateRentalMutation.isPending,
    isDeleting: deleteRentalMutation.isPending,
    isApproving: approveRentalMutation.isPending,
    isMarkingDelivered: markDeliveredMutation.isPending,
    isMarkingReturned: markReturnedMutation.isPending,
    isMarkingDamaged: markDamagedMutation.isPending,
  };
};
