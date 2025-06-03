
import React from 'react';
import { Bell, Search, LogOut, Book, ShoppingCart, Users, FileText, BarChart3, Settings, Home } from 'lucide-react';

const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarCollapsed, 
  handleLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Trang Chủ' },
    { id: 'users', icon: Users, label: 'Quản Lý Người Dùng' },
    { id: 'books', icon: Book, label: 'Quản Lý Sách' },
    { id: 'rental', icon: FileText, label: 'Quản Lý Sách Thuê' },
    { id: 'orders', icon: ShoppingCart, label: 'Quản Lý Đơn Hàng' },
    { id: 'shipping', icon: FileText, label: 'Quản Lý Vận chuyển' },
    { id: 'reports', icon: BarChart3, label: 'Quản Lý Danh Mục' },
    { id: 'stats', icon: FileText, label: 'Báo Cáo Thống Kê' },
    { id: 'roles', icon: Settings, label: 'ROLE' }
  ];

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
              onClick={() => setActiveSection(item.id)}
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
