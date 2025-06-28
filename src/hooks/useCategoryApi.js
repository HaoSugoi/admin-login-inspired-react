import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

export const useCategoryApi = () => {
  const queryClient = useQueryClient();

  // Query để lấy danh sách danh mục
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  // Tính toán thống kê
  const statistics = {
    totalCategories: categories.length,
    categoriesWithBooks: categories.filter(c => (c.booksCount || 0) > 0).length,
    emptyCategories: categories.filter(c => (c.booksCount || 0) === 0).length
  };

  // Hàm lọc danh mục
  const filterCategories = (searchTerm) => {
    if (!searchTerm) return categories;
    
    return categories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && 
       category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Mutation để tạo danh mục mới
  const createCategoryMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category created successfully');
    },
    onError: (error) => {
      console.error('Failed to create category:', error);
    }
  });

  // Mutation để cập nhật danh mục
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category updated successfully');
    },
    onError: (error) => {
      console.error('Failed to update category:', error);
    }
  });

  // Mutation để xóa danh mục
  const deleteCategoryMutation = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category deleted successfully');
    },
    onError: (error) => {
      console.error('Failed to delete category:', error);
    }
  });

  return {
    // Data
    categories,
    statistics,
    isLoadingCategories,
    categoriesError,
    
    // Functions
    refetchCategories,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    
    // Loading states
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
};