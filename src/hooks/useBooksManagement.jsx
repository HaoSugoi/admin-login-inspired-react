
import { useState } from 'react';

export const useBooksManagement = () => {
  const [activeSection, setActiveSection] = useState('books');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for books management
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Những Ngày Thơ Bé",
      author: "Nguyễn Nhật Ánh",
      isbn: "978-604-2-12345-1",
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      publishYear: 2020,
      quantity: 50,
      available: 35,
      status: "available",
      type: "both",
      price: 150000,
      rentPrice: 5000,
      appliedPromotion: ''
    },
    {
      id: 2,
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh", 
      isbn: "978-604-2-12345-2",
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      publishYear: 2018,
      quantity: 30,
      available: 20,
      status: "available",
      type: "both",
      price: 120000,
      rentPrice: 4000,
      appliedPromotion: ''
    }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Tiểu thuyết", count: 45 },
    { id: 2, name: "Khoa học", count: 30 },
    { id: 3, name: "Lịch sử", count: 25 },
    { id: 4, name: "Thiếu nhi", count: 40 }
  ]);

  // Mock promotions data
  const [promotions] = useState([
    {
      id: 1,
      code: "SALE20",
      name: "Giảm giá 20%",
      type: "percentage",
      value: 20,
      status: "active"
    },
    {
      id: 2,
      code: "NOVEL50",
      name: "Giảm 50k cho tiểu thuyết",
      type: "fixed",
      value: 50000,
      status: "active"
    }
  ]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Book management functions
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    console.log('Added book:', newBook);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
    console.log('Updated book:', updatedBook);
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    console.log('Deleted book with id:', bookId);
  };

  const handleToggleBookVisibility = (bookId, newStatus) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, status: newStatus } : book
    ));
    console.log('Toggled book visibility:', bookId, newStatus);
  };

  // Category management functions
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    console.log('Added category:', newCategory);
  };

  const handleUpdateCategory = (categoryId, updatedData) => {
    setCategories(categories.map(category => 
      category.id === categoryId ? { ...category, ...updatedData } : category
    ));
    console.log('Updated category:', categoryId, updatedData);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    console.log('Deleted category with id:', categoryId);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    books,
    categories,
    promotions,
    handleLogout,
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    handleToggleBookVisibility,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory
  };
};
