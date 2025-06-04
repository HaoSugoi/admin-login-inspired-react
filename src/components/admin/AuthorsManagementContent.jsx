
import React from 'react';
import AdminTopbar from './AdminTopbar';
import AuthorsListSection from './sections/AuthorsListSection';
import AuthorBooksSection from './sections/AuthorBooksSection';
import AuthorStatisticsSection from './sections/AuthorStatisticsSection';

const AuthorsManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Tác Giả</h4>
          </div>
        </div>

        <div className="row">
          <AuthorStatisticsSection authors={props.authors} />
        </div>

        <div className="row">
          <AuthorsListSection 
            authors={props.authors}
            onAddAuthor={props.handleAddAuthor}
            onUpdateAuthor={props.handleUpdateAuthor}
            onDeleteAuthor={props.handleDeleteAuthor}
          />
          <AuthorBooksSection recentBooks={props.recentBooks} />
        </div>
      </div>
    </div>
  );
};

export default AuthorsManagementContent;
