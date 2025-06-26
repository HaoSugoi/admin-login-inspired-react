
import React from 'react';
import AdminTopbar from './AdminTopbar';
import CategoryManagementSection from './sections/CategoryManagementSection';
import CategoryStatisticsSection from './sections/CategoryStatisticsSection';

const ReportsManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Danh Mục</h4>
          </div>
        </div>

        <div className="row">
          <CategoryStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <CategoryManagementSection 
            categories={props.categories}
            onAddCategory={props.addCategory}
            onUpdate={props.updateCategory}
            onDelete={props.deleteCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsManagementContent;
