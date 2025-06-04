
import React from 'react';
import AdminTopbar from './AdminTopbar';
import BooksListSection from './sections/BooksListSection';
import CategoriesSection from './sections/CategoriesSection';
import BookStatisticsSection from './sections/BookStatisticsSection';

const BooksManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Sách</h4>
          </div>
        </div>

        <div className="row">
          <BookStatisticsSection books={props.books} />
        </div>

        <div className="row">
          <BooksListSection 
            books={props.books} 
            categories={props.categories}
            onAddBook={props.handleAddBook}
            onUpdateBook={props.handleUpdateBook}
            onDeleteBook={props.handleDeleteBook}
            onToggleBookVisibility={props.handleToggleBookVisibility}
          />
          <CategoriesSection 
            categories={props.categories}
            onAddCategory={props.handleAddCategory}
            onUpdateCategory={props.handleUpdateCategory}
            onDeleteCategory={props.handleDeleteCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksManagementContent;
