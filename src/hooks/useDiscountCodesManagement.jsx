
import { useState } from 'react';
import { toast } from 'sonner';

export const useDiscountCodesManagement = () => {
  const [activeSection, setActiveSection] = useState('discount-codes');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for discount codes
  const [discountCodes, setDiscountCodes] = useState([
    {
      id: 1,
      code: "WELCOME10",
      name: "Mã chào mừng thành viên mới",
      type: "percentage",
      value: 10,
      usageLimit: 1,
      usageCount: 0,
      userSpecific: true,
      userId: null,
      startDate: "01/12/2024",
      endDate: "31/12/2024",
      status: "active",
      description: "Mã giảm 10% cho khách hàng mới"
    },
    {
      id: 2,
      code: "LOYAL50",
      name: "Mã ưu đãi khách hàng thân thiết",
      type: "fixed",
      value: 50000,
      usageLimit: 1,
      usageCount: 0,
      userSpecific: true,
      userId: 12,
      startDate: "15/12/2024",
      endDate: "15/01/2025",
      status: "active",
      description: "Giảm 50k cho khách hàng VIP"
    }
  ]);

  const [statistics] = useState({
    totalCodes: 25,
    activeCodes: 18,
    usedCodes: 12,
    totalSavings: 1250000
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Discount codes management functions
  const handleAddDiscountCode = (newCode) => {
    const discountCode = {
      ...newCode,
      id: Date.now(),
      usageCount: 0,
      status: 'active'
    };
    setDiscountCodes([...discountCodes, discountCode]);
    
    toast.success('🎉 Thành công!', {
      description: 'Mã giảm giá đã được thêm thành công',
    });
    
    console.log('Added discount code:', discountCode);
  };

  const handleUpdateDiscountCode = (updatedCode) => {
    setDiscountCodes(discountCodes.map(code => 
      code.id === updatedCode.id ? updatedCode : code
    ));
    
    toast.success('✅ Cập nhật thành công!', {
      description: 'Mã giảm giá đã được cập nhật thành công',
    });
    
    console.log('Updated discount code:', updatedCode);
  };

  const handleDeleteDiscountCode = (codeId) => {
    setDiscountCodes(discountCodes.filter(code => code.id !== codeId));
    
    toast.success('🗑️ Đã xóa!', {
      description: 'Mã giảm giá đã được xóa thành công',
    });
    
    console.log('Deleted discount code with id:', codeId);
  };

  const handleToggleCodeStatus = (codeId, newStatus) => {
    setDiscountCodes(discountCodes.map(code => 
      code.id === codeId ? { ...code, status: newStatus } : code
    ));
    
    const statusText = newStatus === 'active' ? 'kích hoạt' : 'tạm dừng';
    toast.success(`🔄 Đã ${statusText}!`, {
      description: `Mã giảm giá đã được ${statusText} thành công`,
    });
    
    console.log('Toggled code status:', codeId, newStatus);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    discountCodes,
    statistics,
    handleLogout,
    handleAddDiscountCode,
    handleUpdateDiscountCode,
    handleDeleteDiscountCode,
    handleToggleCodeStatus
  };
};
