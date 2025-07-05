
import { useState } from 'react';
import { usePromotionApi } from './usePromotionApi';
import { toast } from 'sonner';

export const usePromotionsManagement = () => {
  const [activeSection, setActiveSection] = useState('promotions');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const {
    promotions,
    isLoadingPromotions,
    promotionsError,
    createPromotion,
    updatePromotion,
    deletePromotion,
    refetchPromotions
  } = usePromotionApi();

  const safePromotions = promotions || [];

  const statistics = {
    totalPromotions: safePromotions.length,
    activePromotions: safePromotions.filter(p => {
      const now = new Date();
      const start = new Date(p.StartDate);
      const end = new Date(p.EndDate);
      return now >= start && now <= end;
    }).length,
    expiredPromotions: safePromotions.filter(p => {
      const now = new Date();
      const end = new Date(p.EndDate);
      return now > end;
    }).length
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleCreatePromotion = async (promotionData) => {
    try {
      await createPromotion(promotionData);
      toast.success('🎉 Thành công!', {
        description: 'Khuyến mãi đã được thêm thành công',
      });
    } catch (error) {
      toast.error('❌ Lỗi!', {
        description: 'Không thể thêm khuyến mãi. Vui lòng thử lại.',
      });
      throw error;
    }
  };

  const handleUpdatePromotion = async (promotionId, promotionData) => {
    try {
      await updatePromotion({ id: promotionId, data: promotionData });
      toast.success('✅ Cập nhật thành công!', {
        description: 'Khuyến mãi đã được cập nhật thành công',
      });
    } catch (error) {
      toast.error('❌ Lỗi!', {
        description: 'Không thể cập nhật khuyến mãi. Vui lòng thử lại.',
      });
      throw error;
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      try {
        await deletePromotion(promotionId);
        toast.success('🗑️ Đã xóa!', {
          description: 'Khuyến mãi đã được xóa thành công',
        });
      } catch (error) {
        toast.error('❌ Lỗi!', {
          description: 'Không thể xóa khuyến mãi. Vui lòng thử lại.',
        });
      }
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    promotions: safePromotions,
    statistics,
    isLoadingPromotions,
    promotionsError,
    handleLogout,
    handleCreatePromotion,
    handleUpdatePromotion,
    handleDeletePromotion,
    refetchPromotions
  };
};
