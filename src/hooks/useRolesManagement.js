
import { useState } from 'react';

export const useRolesManagement = () => {
  const [activeSection, setActiveSection] = useState('roles');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Quản trị viên",
      description: "Có quyền truy cập toàn bộ hệ thống",
      permissions: ["read", "write", "delete", "admin"],
      userCount: 3
    },
    {
      id: 2,
      name: "Nhân viên",
      description: "Có quyền quản lý sách và đơn hàng",
      permissions: ["read", "write"],
      userCount: 8
    },
    {
      id: 3,
      name: "Khách hàng",
      description: "Có quyền mua và thuê sách",
      permissions: ["read"],
      userCount: 234
    }
  ]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const addRole = (roleData) => {
    const newRole = {
      id: roles.length + 1,
      ...roleData,
      userCount: 0
    };
    setRoles([...roles, newRole]);
  };

  const updateRole = (roleId, updatedData) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, ...updatedData } : role
    ));
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    roles,
    addRole,
    updateRole,
    deleteRole,
    handleLogout
  };
};
