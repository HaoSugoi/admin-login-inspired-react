
import { useState, useEffect } from 'react';
import { slideService } from '../services/slideService';
import { toast } from 'sonner';

export const useSlideManagement = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('slides');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Thống kê slides
  const [statistics, setStatistics] = useState({
    totalSlides: 0,
    activeSlides: 0,
    inactiveSlides: 0
  });

  // Tải danh sách slides
  const loadSlides = async () => {
    setIsLoading(true);
    try {
      const data = await slideService.getAllSlides();
      if (data.isSuccess) {
        setSlides(data.data || []);
        updateStatistics(data.data || []);
      } else {
        toast.error('Lỗi khi tải danh sách slide');
      }
    } catch (error) {
      console.error('Error loading slides:', error);
      toast.error('Lỗi khi tải danh sách slide');
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật thống kê
  const updateStatistics = (slideList) => {
    const total = slideList.length;
    const active = slideList.filter(slide => slide.isActive).length;
    
    setStatistics({
      totalSlides: total,
      activeSlides: active,
      inactiveSlides: total - active
    });
  };

  // Thêm slide mới
  const handleAddSlide = async (slideData) => {
    try {
      const response = await slideService.createSlide(slideData);
      if (response.isSuccess) {
        toast.success('Thêm slide thành công');
        loadSlides();
        setShowAddDialog(false);
      } else {
        toast.error(response.message || 'Lỗi khi thêm slide');
      }
    } catch (error) {
      console.error('Error adding slide:', error);
      toast.error('Lỗi khi thêm slide');
    }
  };

  // Sửa slide
  const handleEditSlide = async (slideData) => {
    try {
      const response = await slideService.updateSlide(selectedSlide.id, slideData);
      if (response.isSuccess) {
        toast.success('Cập nhật slide thành công');
        loadSlides();
        setShowEditDialog(false);
        setSelectedSlide(null);
      } else {
        toast.error(response.message || 'Lỗi khi cập nhật slide');
      }
    } catch (error) {
      console.error('Error updating slide:', error);
      toast.error('Lỗi khi cập nhật slide');
    }
  };

  // Xóa slide
  const handleDeleteSlide = async () => {
    try {
      const response = await slideService.deleteSlide(selectedSlide.id);
      if (response.isSuccess) {
        toast.success('Xóa slide thành công');
        loadSlides();
        setShowDeleteDialog(false);
        setSelectedSlide(null);
      } else {
        toast.error(response.message || 'Lỗi khi xóa slide');
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('Lỗi khi xóa slide');
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Xử lý logout
  const handleLogout = () => {
    // Logic logout
    toast.success('Đăng xuất thành công');
  };

  // Load slides khi component mount
  useEffect(() => {
    loadSlides();
  }, []);

  return {
    slides,
    isLoading,
    statistics,
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    selectedSlide,
    setSelectedSlide,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    handleAddSlide,
    handleEditSlide,
    handleDeleteSlide,
    handleLogout,
    loadSlides
  };
};
