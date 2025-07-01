
import { useState } from 'react';
import { usePointsApi } from './usePointsApi';

export const usePointsManagement = () => {
  const [activeSection, setActiveSection] = useState('points');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sử dụng API hook (hiện tại dùng mock data)
  const {
    pointTransactions,
    statistics,
    isLoadingPoints,
    pointsError,
    createPointTransaction,
    updatePointTransaction,
    deletePointTransaction,
    redeemPoints,
    refetchPoints
  } = usePointsApi();

  // Mock data cho giao dịch điểm
  const [mockPointTransactions] = useState([
    {
      id: 1,
      customerId: "KH001",
      customerName: "Nguyễn Văn A",
      type: "earn", // earn, redeem, expire
      points: 150,
      description: "Mua sách - Đơn hàng DH001",
      referenceId: "DH001",
      referenceType: "order",
      createdDate: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      customerId: "KH002",
      customerName: "Trần Thị B",
      type: "earn",
      points: 100,
      description: "Mua sách - Đơn hàng DH002",
      referenceId: "DH002",
      referenceType: "order",
      createdDate: "2024-01-16",
      status: "completed"
    },
    {
      id: 3,
      customerId: "KH001",
      customerName: "Nguyễn Văn A",
      type: "redeem",
      points: -50,
      description: "Đổi voucher giảm giá 10%",
      referenceId: "VC001",
      referenceType: "voucher",
      createdDate: "2024-01-17",
      status: "completed"
    },
    {
      id: 4,
      customerId: "KH003",
      customerName: "Lê Văn C",
      type: "earn",
      points: 75,
      description: "Thuê sách - Đơn thuê RT001",
      referenceId: "RT001",
      referenceType: "rental",
      createdDate: "2024-01-18",
      status: "completed"
    }
  ]);

  // Mock data cho các phần thưởng có thể đổi
  const [mockRewards] = useState([
    {
      id: 1,
      name: "Voucher giảm giá 5%",
      description: "Áp dụng cho đơn hàng từ 200.000đ",
      pointsRequired: 100,
      type: "voucher",
      value: "5%",
      isActive: true,
      stock: 50
    },
    {
      id: 2,
      name: "Voucher giảm giá 10%",
      description: "Áp dụng cho đơn hàng từ 500.000đ",
      pointsRequired: 200,
      type: "voucher",
      value: "10%",
      isActive: true,
      stock: 30
    },
    {
      id: 3,
      name: "Miễn phí giao hàng",
      description: "Miễn phí giao hàng cho đơn hàng tiếp theo",
      pointsRequired: 150,
      type: "shipping",
      value: "free_shipping",
      isActive: true,
      stock: 20
    },
    {
      id: 4,
      name: "Sách tặng - Truyện cổ tích",
      description: "Tặng 1 cuốn sách truyện cổ tích",
      pointsRequired: 300,
      type: "gift",
      value: "book_gift",
      isActive: true,
      stock: 10
    }
  ]);

  const mockStatistics = {
    totalTransactions: mockPointTransactions.length,
    totalPointsEarned: mockPointTransactions
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + t.points, 0),
    totalPointsRedeemed: Math.abs(mockPointTransactions
      .filter(t => t.type === 'redeem')
      .reduce((sum, t) => sum + t.points, 0)),
    activeCustomers: [...new Set(mockPointTransactions.map(t => t.customerId))].length,
    totalRewards: mockRewards.length,
    activeRewards: mockRewards.filter(r => r.isActive).length
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Wrapper functions
  const handleCreatePointTransaction = (transactionData) => {
    console.log('Creating point transaction:', transactionData);
    // createPointTransaction(transactionData); // Uncomment when API is ready
  };

  const handleUpdatePointTransaction = (transactionId, transactionData) => {
    console.log('Updating point transaction:', transactionId, transactionData);
    // updatePointTransaction({ id: transactionId, data: transactionData }); // Uncomment when API is ready
  };

  const handleDeletePointTransaction = (transactionId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
      console.log('Deleting point transaction:', transactionId);
      // deletePointTransaction(transactionId); // Uncomment when API is ready
    }
  };

  const handleRedeemPoints = (customerId, redeemData) => {
    console.log('Redeeming points:', customerId, redeemData);
    // redeemPoints({ customerId, redeemData }); // Uncomment when API is ready
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    handleLogout,
    
    // Sử dụng mock data khi API chưa sẵn sàng
    pointTransactions: mockPointTransactions,
    rewards: mockRewards,
    statistics: mockStatistics,
    isLoadingPoints: false,
    pointsError: null,
    
    // API functions
    handleCreatePointTransaction,
    handleUpdatePointTransaction,
    handleDeletePointTransaction,
    handleRedeemPoints,
    refetchPoints
  };
};
