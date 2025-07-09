
import React from 'react';
import { ChevronLeft, ChevronRight, Home, Book, Users, ShoppingCart, Truck, FileText, Settings, BarChart3, Users2, Shield, Gift, Percent, LogOut, Star, CreditCard, BookOpen, ClipboardList, Activity, Images, BoxIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeSection, setActiveSection, sidebarCollapsed, toggleSidebar, handleLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Trang Chủ', path: '/admin' },
    { id: 'customers', icon: Users, label: 'Quản Lý Khách Hàng', path: '/admin/customers' },
    { id: 'employees', icon: Users, label: 'Quản Lý Nhân Viên', path: '/admin/employees' },
    { id: 'books', icon: Book, label: 'Quản Lý Sách', path: '/admin/books' },
    { id: 'rent-books', icon: BookOpen, label: 'Quản Lý Sách Thuê', path: '/admin/rent-books' },
    { id: 'rental-orders', icon: ClipboardList, label: 'Quản Lý Đơn Thuê', path: '/admin/rental-orders' },
    { id: 'sales-orders', icon: ShoppingCart, label: 'Quản Lý Bán Hàng', path: '/admin/sales-orders' },
    { id: 'reports', icon: BarChart3, label: 'Quản Lý Danh Mục', path: '/admin/reports' },
    { id: 'authors', icon: Users2, label: 'Quản Lý Tác Giả', path: '/admin/authors' },
    { id: 'employee-activities', icon: Activity, label: 'Hoạt Động Nhân Viên', path: '/admin/employee-activities' },
    { id: 'slides', icon: Images, label: 'Quản Lý Slide', path: '/admin/slides' },
    { id: 'promotions', icon: Gift, label: 'Quản Lý Khuyến Mãi', path: '/admin/promotions' },
    { id: 'discount-codes', icon: Percent, label: 'Quản Lý Mã Giảm Giá', path: '/admin/discount-codes' },
    { id: 'stats', icon: BarChart3, label: 'Thống Kê', path: '/admin/stats' },
    { id: 'comments', icon: BoxIcon, label: 'Bình luận', path: '/admin/comments'}
  ];

  const handleMenuClick = (item) => {
  if (typeof setActiveSection === "function") {
    setActiveSection(item.id); // ✅ Chỉ gọi nếu là hàm
  }
  navigate(item.path);
};

  return (
    <div className={`col-md-3 col-lg-2 sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h5 className="sidebar-title">BookStore Admin</h5>
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
