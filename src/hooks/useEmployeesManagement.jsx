import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/employeeService';
// import { toast } from 'react-toastify';

export const useEmployeesManagement = () => {
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading } = useQuery({
  queryKey: ['employees'], // thống nhất key
  queryFn: userService.getUsers,
});


  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      toast.success('Thêm khách hàng thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: () => toast.error('Thêm khách hàng thất bại'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: () => {
      toast.success('Cập nhật thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: () => toast.error('Cập nhật thất bại'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('Xóa thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: () => toast.error('Xóa thất bại'),
  });

  return {
  employees,
  isLoading,
  createEmployee: createMutation.mutate,
  updateEmployee: updateMutation.mutate,
  deleteEmployee: deleteMutation.mutate,
};

};