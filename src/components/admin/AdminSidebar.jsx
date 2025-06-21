
import React from 'react';
import { ChevronLeft, ChevronRight, Home, Book, Users, ShoppingCart, Truck, FileText, Settings, BarChart3, Users2, Shield, Gift, Percent, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeSection, setActiveSection, sidebarCollapsed, toggleSidebar, handleLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Trang Chủ', path: '/admin' },
    { id: 'books', icon: Book, label: 'Quản Lý Sách', path: '/admin/books' },
    { id: 'authors', icon: Users2, label: 'Quản Lý Tác Giả', path: '/admin/authors' },
    { id: 'customers', icon: Users, label: 'Quản Lý Khách Hàng', path: '/admin/customers' },
    { id: 'employees', icon: Users, label: 'Quản Lý Nhân Viên', path: '/admin/employees' },
    { id: 'orders', icon: ShoppingCart, label: 'Quản Lý Đơn Hàng', path: '/admin/orders' },
    { id: 'rentals', icon: FileText, label: 'Quản Lý Thuê Sách', path: '/admin/rentals' },
    { id: 'promotions', icon: Gift, label: 'Quản Lý Khuyến Mãi', path: '/admin/promotions' },
    { id: 'discount-codes', icon: Percent, label: 'Quản Lý Mã Giảm Giá', path: '/admin/discount-codes' },
    { id: 'shipping', icon: Truck, label: 'Quản Lý Vận Chuyển', path: '/admin/shipping' },
    { id: 'users', icon: Users, label: 'Quản Lý Người Dùng', path: '/admin/users' },
    { id: 'roles', icon: Shield, label: 'Quản Lý Quyền', path: '/admin/roles' },
    { id: 'reports', icon: BarChart3, label: 'Báo Cáo', path: '/admin/reports' },
    { id: 'stats', icon: BarChart3, label: 'Thống Kê', path: '/admin/stats' },
    { id: 'settings', icon: Settings, label: 'Cài Đặt', path: '/admin/settings' }
  ];

  const handleMenuClick = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  return (
    <div className={`col-md-3 col-lg-2 sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h5 className="sidebar-title">BookStore Admin</h5>
        <button 
          className="btn btn-sm btn-outline-light toggle-btn"
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <ul className="nav nav-pills flex-column">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <Icon size={16} className="me-2" />
                {!sidebarCollapsed && item.label}
              </button>
            </li>
          );
        })}
        
        <li className="nav-item mt-auto">
          <button className="nav-link text-danger" onClick={handleLogout}>
            <LogOut size={16} className="me-2" />
            {!sidebarCollapsed && 'Đăng Xuất'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
