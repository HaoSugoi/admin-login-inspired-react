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

  const handleAddSlide = async (formData) => {
    try {
      setIsLoading(true);
      const slideData = new FormData();
      
      if (formData.imageFile) {
        slideData.append('ImageFile', formData.imageFile);
      }
      if (formData.linkUrl) {
        slideData.append('LinkUrl', formData.linkUrl);
      }
      slideData.append('IsActive', formData.isActive);

      await slideService.createSlide(slideData);
      
      // Show success message with icon
      toast({
        title: "✅ Thành công!",
        description: "Slide đã được thêm thành công",
        variant: "default",
      });
      
      await loadSlides();
      setShowAddDialog(false);
    } catch (error) {
      console.error('Error adding slide:', error);
      toast({
        title: "❌ Lỗi!",
        description: "Không thể thêm slide. Vui lòng thử lại.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSlide = async (formData) => {
    if (!selectedSlide) return;
    
    try {
      setIsLoading(true);
      const slideData = new FormData();
      
      if (formData.imageFile) {
        slideData.append('ImageFile', formData.imageFile);
      }
      if (formData.linkUrl) {
        slideData.append('LinkUrl', formData.linkUrl);
      }
      slideData.append('IsActive', formData.isActive);

      await slideService.updateSlide(selectedSlide.id, slideData);
      
      // Show success message with icon
      toast({
        title: "✅ Cập nhật thành công!",
        description: "Slide đã được cập nhật thành công",
        variant: "default",
      });
      
      await loadSlides();
      setShowEditDialog(false);
      setSelectedSlide(null);
    } catch (error) {
      console.error('Error updating slide:', error);
      toast({
        title: "❌ Lỗi!",
        description: "Không thể cập nhật slide. Vui lòng thử lại.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSlide = async () => {
    if (!selectedSlide) return;
    
    try {
      setIsLoading(true);
      await slideService.deleteSlide(selectedSlide.id);
      
      // Show success message with icon  
      toast({
        title: "🗑️ Đã xóa!",
        description: "Slide đã được xóa thành công",
        variant: "default",
      });
      
      await loadSlides();
      setShowDeleteDialog(false);
      setSelectedSlide(null);
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "❌ Lỗi!",
        description: "Không thể xóa slide. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
