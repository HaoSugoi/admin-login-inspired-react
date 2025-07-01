
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';

export const useOrderApi = () => {
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
    refetch: refetchOrders
  } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getAllOrders,
    staleTime: 5 * 60 * 1000,
  });

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Create order error:', error);
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }) => orderService.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Update order error:', error);
    }
  });

  const deleteOrderMutation = useMutation({
    mutationFn: orderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Delete order error:', error);
    }
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }) => orderService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Update order status error:', error);
    }
  });

  // Tính toán thống kê
  const statistics = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Chờ xử lý').length,
    processingOrders: orders.filter(o => o.status === 'Đang xử lý').length,
    completedOrders: orders.filter(o => o.status === 'Đã giao').length,
    cancelledOrders: orders.filter(o => o.status === 'Đã hủy').length,
    totalRevenue: orders
      .filter(o => o.status === 'Đã giao')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)
  };

  return {
    orders,
    statistics,
    isLoadingOrders,
    ordersError,
    refetchOrders,
    createOrder: createOrderMutation.mutate,
    updateOrder: updateOrderMutation.mutate,
    deleteOrder: deleteOrderMutation.mutate,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    isCreating: createOrderMutation.isPending,
    isUpdating: updateOrderMutation.isPending,
    isDeleting: deleteOrderMutation.isPending
  };
};
