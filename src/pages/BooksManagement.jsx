
import React from 'react';
import { useBooksManagement } from '../hooks/useBooksManagement.jsx';
import AdminSidebar from '../components/admin/AdminSidebar';
import BooksManagementContent from '../components/admin/BooksManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksManagement = () => {
  const booksData = useBooksManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...booksData} />
        <BooksManagementContent {...booksData} />
      </div>
    </div>
  );
};

export default BooksManagement;
