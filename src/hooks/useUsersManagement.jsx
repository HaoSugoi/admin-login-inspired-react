
import { useState } from 'react';

export const useUsersManagement = () => {
  const [activeSection, setActiveSection] = useState('UserManager');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for users
  const [users, setUsers] = useState([
  ]);

  const [statistics] = useState({
    totalUsers: 245,
    activeUsers: 198,
    newUsersThisMonth: 23,
    adminUsers: 5
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const addUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      joinDate: new Date().toLocaleDateString('vi-VN'),
      status: "Hoạt động"
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (userId, updatedData) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    users,
    statistics,
    addUser,
    updateUser,
    deleteUser,
    handleLogout
  };
};
