
import { useState } from 'react';

export const useAuthorsManagement = () => {
  const [activeSection, setActiveSection] = useState('authors');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mock data for authors management
  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: "Nguyễn Nhật Ánh",
      biography: "Nhà văn nổi tiếng với các tác phẩm thiếu nhi và tuổi teen",
      birthYear: 1955,
      nationality: "Việt Nam",
      booksCount: 15,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Tô Hoài",
      biography: "Nhà văn với tác phẩm nổi tiếng 'Dế Mèn phiêu lưu ký'",
      birthYear: 1920,
      nationality: "Việt Nam",
      booksCount: 8,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Nguyễn Du",
      biography: "Đại thi hào dân tộc với tác phẩm 'Truyện Kiều'",
      birthYear: 1766,
      nationality: "Việt Nam",
      booksCount: 5,
      avatar: "/placeholder.svg"
    }
  ]);

  const [recentBooks] = useState([
    { id: 1, title: "Những Ngày Thơ Bé", author: "Nguyễn Nhật Ánh", addedDate: "15/12/2024" },
    { id: 2, title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", author: "Nguyễn Nhật Ánh", addedDate: "10/12/2024" },
    { id: 3, title: "Dế Mèn phiêu lưu ký", author: "Tô Hoài", addedDate: "05/12/2024" }
  ]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Author management functions
  const handleAddAuthor = (newAuthor) => {
    setAuthors([...authors, newAuthor]);
    console.log('Added author:', newAuthor);
  };

  const handleUpdateAuthor = (authorId, updatedData) => {
    setAuthors(authors.map(author => 
      author.id === authorId ? { ...author, ...updatedData } : author
    ));
    console.log('Updated author:', authorId, updatedData);
  };

  const handleDeleteAuthor = (authorId) => {
    setAuthors(authors.filter(author => author.id !== authorId));
    console.log('Deleted author with id:', authorId);
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    authors,
    recentBooks,
    handleLogout,
    handleAddAuthor,
    handleUpdateAuthor,
    handleDeleteAuthor
  };
};
