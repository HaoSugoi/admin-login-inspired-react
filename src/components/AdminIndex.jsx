
import React from 'react';
import { Bell, Search, LogOut, Book, ShoppingCart, Users, FileText, BarChart3, Settings, Home } from 'lucide-react';
import { useAdminIndex } from '../hooks/useAdminIndex';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminIndex = () => {
  const {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    books,
    orders,
    activities,
    chartData,
    handleLogout
  } = useAdminIndex();

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

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 main-content">
          {/* Top Navigation */}
          <div className="top-navbar">
            <div className="row align-items-center">
              <div className="col-md-6">
                <button className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
                  ☰
                </button>
                <h5 className="welcome-text">Hello Tanzir</h5>
                <p className="date-text">May 10, 2023</p>
              </div>
              
              <div className="col-md-6">
                <div className="profile-section justify-content-end">
                  <div className="search-container">
                    <input 
                      type="text" 
                      className="form-control search-input" 
                      placeholder="Tìm kiếm..."
                    />
                    <Search className="search-icon" size={16} />
                  </div>
                  
                  <button className="notification-btn">
                    <Bell size={20} />
                  </button>
                  
                  <span className="text-muted">Tìm kiếm</span>
                  
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} className="me-1" />
                    Đăng Xuất
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="content-section">
            <div className="row">
              {/* Books Management */}
              <div className="col-lg-4 mb-4">
                <div className="section-card">
                  <div className="section-title">
                    <span>Quản Lý Sách</span>
                    <a href="#" className="view-all-link">Xem All ›</a>
                  </div>
                  
                  <div className="book-grid">
                    {books.map((book) => (
                      <div key={book.id} className="book-item">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="book-image"
                        />
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-3">
                    <span className="text-muted">Truyện</span>
                    <div className="d-flex justify-content-center mt-2">
                      <span className="me-3">●</span>
                      <span className="me-3">●</span>
                      <span>●</span>
                    </div>
                    <a href="#" className="view-all-link">Sau ›</a>
                  </div>
                </div>
              </div>

              {/* Rental Books */}
              <div className="col-lg-4 mb-4">
                <div className="section-card">
                  <div className="section-title">
                    <span>Quản Lý Sách Thuê</span>
                    <a href="#" className="view-all-link">Sau ›</a>
                  </div>
                  
                  <div className="book-grid">
                    {books.map((book) => (
                      <div key={`rental-${book.id}`} className="book-item">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="book-image"
                        />
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-3">
                    <span className="text-muted">Truyện</span>
                    <div className="d-flex justify-content-center mt-2">
                      <span className="me-3">●</span>
                      <span className="me-3">●</span>
                      <span>●</span>
                    </div>
                    <a href="#" className="view-all-link">Sau ›</a>
                  </div>
                </div>
              </div>

              {/* Orders Management */}
              <div className="col-lg-4 mb-4">
                <div className="section-card">
                  <div className="section-title">
                    <span>Quản Lý Đơn Hàng</span>
                    <a href="#" className="view-all-link">Tất cả ›</a>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="order-table">
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <div className="fw-bold">{order.id}</div>
                              <div className="text-muted small">{order.date}</div>
                            </td>
                            <td>
                              <span className="status-pending">{order.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Activity Feed */}
              <div className="col-lg-6 mb-4">
                <div className="section-card">
                  <div className="section-title">
                    <span>Hoạt động gần đây</span>
                    <a href="#" className="view-all-link">View All ›</a>
                  </div>
                  
                  <div className="activity-list">
                    {activities.map((activity) => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-user">{activity.user}</div>
                        <div className="activity-action">{activity.action}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="col-lg-6 mb-4">
                <div className="section-card">
                  <div className="section-title">
                    <span>Báo Cáo Doanh Thu</span>
                    <select className="form-select form-select-sm w-auto">
                      <option>Theo Tháng</option>
                      <option>Theo Quý</option>
                      <option>Theo Năm</option>
                    </select>
                  </div>
                  
                  <div className="chart-container">
                    <div className="text-end mb-3">
                      <span className="text-muted small">50 Đánh Giá</span>
                    </div>
                    
                    <div className="chart-bars">
                      {chartData.map((item, index) => (
                        <div key={index} className="chart-bar" style={{
                          height: `${(item.value / maxValue) * 150}px`,
                          flex: 1
                        }}>
                          <div className="chart-value">${item.value}k</div>
                          <div className="chart-label">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
