
import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';

const AdminTopbar = ({ toggleSidebar, handleLogout }) => {
  return (
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
  );
};

export default AdminTopbar;
