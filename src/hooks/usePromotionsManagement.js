
import { useState } from 'react';

export const usePromotionsManagement = () => {
  const [activeSection, setActiveSection] = useState('promotions');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for promotions
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      code: "SALE20",
      name: "Giảm giá 20%",
      type: "percentage",
      value: 20,
      categoryId: null, // null = áp dụng cho tất cả
      categoryName: "Tất cả thể loại",
      startDate: "01/12/2024",
      endDate: "31/12/2024",
      usageLimit: 100,
      usageCount: 45,
      status: "active",
      description: "Khuyến mãi giảm giá 20% cho tất cả sách"
    },
    {
      id: 2,
      code: "NOVEL50",
      name: "Giảm 50k cho tiểu thuyết",
      type: "fixed",
      value: 50000,
      categoryId: 1,
      categoryName: "Tiểu thuyết",
      startDate: "15/12/2024",
      endDate: "15/01/2025",
      usageLimit: 50,
      usageCount: 12,
      status: "active",
      description: "Giảm 50.000đ cho sách thể loại tiểu thuyết"
    },
    {
      id: 3,
      code: "SCIENCE15",
      name: "Giảm 15% sách khoa học",
      type: "percentage",
      value: 15,
      categoryId: 2,
      categoryName: "Khoa học",
      startDate: "01/11/2024",
      endDate: "30/11/2024",
      usageLimit: 30,
      usageCount: 30,
      status: "expired",
      description: "Khuyến mãi 15% cho sách khoa học"
    }
  ]);

  // Mock data for categories
  const [categories] = useState([
    { id: 1, name: "Tiểu thuyết" },
    { id: 2, name: "Khoa học" },
    { id: 3, name: "Lịch sử" },
    { id: 4, name: "Thiếu nhi" }
  ]);

  const [statistics] = useState({
    totalPromotions: 15,
    activePromotions: 8,
    expiredPromotions: 5,
    totalUsage: 287
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Promotion management functions
  const handleAddPromotion = (newPromotion) => {
    const promotion = {
      ...newPromotion,
      id: Date.now(),
      usageCount: 0,
      status: 'active',
      categoryName: newPromotion.categoryId 
        ? categories.find(cat => cat.id === newPromotion.categoryId)?.name || 'Không xác định'
        : 'Tất cả thể loại'
    };
    setPromotions([...promotions, promotion]);
    console.log('Added promotion:', promotion);
  };

  const handleUpdatePromotion = (updatedPromotion) => {
    setPromotions(promotions.map(promotion => 
      promotion.id === updatedPromotion.id ? {
        ...updatedPromotion,
        categoryName: updatedPromotion.categoryId 
          ? categories.find(cat => cat.id === updatedPromotion.categoryId)?.name || 'Không xác định'
          : 'Tất cả thể loại'
      } : promotion
    ));
    console.log('Updated promotion:', updatedPromotion);
  };

  const handleDeletePromotion = (promotionId) => {
    setPromotions(promotions.filter(promotion => promotion.id !== promotionId));
    console.log('Deleted promotion with id:', promotionId);
  };

  const handleTogglePromotionStatus = (promotionId, newStatus) => {
    setPromotions(promotions.map(promotion => 
      promotion.id === promotionId ? { ...promotion, status: newStatus } : promotion
    ));
    console.log('Toggled promotion status:', promotionId, newStatus);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    promotions,
    categories,
    statistics,
    handleLogout,
    handleAddPromotion,
    handleUpdatePromotion,
    handleDeletePromotion,
    handleTogglePromotionStatus
  };
};
