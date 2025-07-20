import React, { useEffect, useState } from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService'; // điều chỉnh path nếu cần

const AdminTopbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        console.log("đâsdsadsa",data)
        setUserName(data.userName || data.UserName || 'Người dùng'); 
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        setUserName('Không xác định');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="top-navbar">
      <div className="row align-items-center">
        <div className="col-md-6">
          <button className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
            ☰
          </button>
          <h5 className="welcome-text">Xin chào, {userName}</h5>
         
        </div>

        <div className="col-md-6">
          <div className="profile-section justify-content-end">
            

          

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
