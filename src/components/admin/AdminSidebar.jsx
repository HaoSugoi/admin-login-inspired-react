
import React from 'react';
import { Bell, Search, LogOut, Book, ShoppingCart, Users, FileText, BarChart3, Settings, Home, User, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarCollapsed, 
  handleLogout 
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Trang Chủ', path: '/admin' },
    { id: 'users', icon: Users, label: 'Quản Lý Người Dùng', path: '/admin/users' },
    { id: 'books', icon: Book, label: 'Quản Lý Sách', path: '/admin/books' },
    { id: 'rental', icon: FileText, label: 'Quản Lý Sách Thuê', path: '/admin/rental' },
    { id: 'authors', icon: User, label: 'Quản Lý Tác Giả', path: '/admin/authors' },
    { id: 'orders', icon: ShoppingCart, label: 'Quản Lý Đơn Hàng', path: '/admin/orders' },
    { id: 'promotions', icon: Percent, label: 'Quản Lý Khuyến Mãi', path: '/admin/promotions' },
    { id: 'shipping', icon: FileText, label: 'Quản Lý Vận chuyển', path: '/admin/shipping' },
    { id: 'reports', icon: BarChart3, label: 'Quản Lý Danh Mục', path: '/admin/reports' },
    { id: 'stats', icon: FileText, label: 'Báo Cáo Thống Kê', path: '/admin/stats' },
    { id: 'roles', icon: Settings, label: 'ROLE', path: '/admin/roles' }
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  return (
    <div className={`col-md-3 col-lg-2 sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          <div className="sidebar-logo">
            <Book size={20} color="white" />
          </div>
          Có & Lá
        </a>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="nav-item">
            <button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          </div>
        ))}
        
        <div className="nav-item mt-4">
          <button className="nav-link" onClick={handleLogout}>
            <LogOut size={18} />
            Đăng Xuất
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
