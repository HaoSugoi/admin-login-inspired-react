
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userService } from '../services/employeeService';

export const useEmployeesManagement = () => {
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: userService.getUsers,
  });

  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      toast.success('Thêm nhân viên thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: (error) => {
      console.error('Create employee error:', error);
      toast.error('Thêm nhân viên thất bại');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ StaffId, data }) => userService.updateUser(StaffId, data),
    onSuccess: () => {
      toast.success('Cập nhật nhân viên thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: (error) => {
      console.error('Update employee error:', error);
      toast.error('Cập nhật nhân viên thất bại');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('Xóa nhân viên thành công');
      queryClient.invalidateQueries(['employees']);
    },
    onError: (error) => {
      console.error('Delete employee error:', error);
      toast.error('Xóa nhân viên thất bại');
    },
  });

  // Statistics calculation
  const statistics = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.Role !== 'Customer').length,
    adminCount: employees.filter(emp => emp.Role === 'Admin').length,
    staffCount: employees.filter(emp => emp.Role === 'Staff').length,
  };

  return {
    employees,
    isLoading,
    statistics,
    createEmployee: createMutation.mutate,
    updateEmployee: updateMutation.mutate,
    deleteEmployee: deleteMutation.mutate,
  };
};
