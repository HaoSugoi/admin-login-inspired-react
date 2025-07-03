import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'; // ✅ Import toast
import { userService } from '../services/customerService';

export const useCustomersManagement = () => {
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['UserManager'],
    queryFn: userService.getUsers,
  });

  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      toast.success('✅ Thêm khách hàng thành công');
      queryClient.invalidateQueries(['UserManager']);
    },
    onError: () => toast.error('❌ Thêm khách hàng thất bại'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ Id, data }) => userService.updateUser(Id, data),
    onSuccess: async () => {
      toast.success('✅ Cập nhật thành công');
      queryClient.invalidateQueries(['UserManager']);
    },
    onError: () => toast.error('❌ Cập nhật thất bại'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('✅ Xóa thành công');
      queryClient.invalidateQueries(['UserManager']);
    },
    onError: () => toast.error('❌ Xóa thất bại'),
  });

  return {
    customers,
    isLoading,
    createCustomer: createMutation.mutate,
    updateCustomer: updateMutation.mutateAsync,
    deleteCustomer: deleteMutation.mutate,
  };
};