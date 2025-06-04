
import { useState } from 'react';

export const useReportsManagement = () => {
  const [activeSection, setActiveSection] = useState('reports');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [categories, setCategories] = useState([
    { id: 1, name: "Văn học", description: "Sách văn học trong và ngoài nước", booksCount: 45 },
    { id: 2, name: "Khoa học", description: "Sách khoa học và công nghệ", booksCount: 32 },
    { id: 3, name: "Thiếu nhi", description: "Sách dành cho trẻ em", booksCount: 28 }
  ]);

  const [statistics] = useState({
    totalCategories: 12,
    booksInCategories: 234,
    mostPopularCategory: "Văn học",
    newCategoriesThisMonth: 2
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      id: categories.length + 1,
      ...categoryData,
      booksCount: 0
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (categoryId, updatedData) => {
    setCategories(categories.map(category => 
      category.id === categoryId ? { ...category, ...updatedData } : category
    ));
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    categories,
    statistics,
    addCategory,
    updateCategory,
    deleteCategory,
    handleLogout
  };
};
