
import React from 'react';
import AdminTopbar from './AdminTopbar';
import AuthorsListSection from './sections/AuthorsListSection';
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
          <AuthorStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <div className="col-12">
            <AuthorsListSection 
              authors={props.authors}
              statistics={props.statistics}
              isLoadingAuthors={props.isLoadingAuthors}
              onAddAuthor={props.handleAddAuthor}
              onUpdateAuthor={props.handleUpdateAuthor}
              onDeleteAuthor={props.handleDeleteAuthor}
              isCreating={props.isCreating}
              isUpdating={props.isUpdating}
              isDeleting={props.isDeleting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsManagementContent;
