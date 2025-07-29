
import React from 'react';
import AdminTopbar from './AdminTopbar';
import CategoryStatisticsSection from './sections/CategoryStatisticsSection';
import CategoryManagementSection from './sections/CategoryManagementSection';
import { useCategoryManagement } from '../../hooks/useCategoryManagement';

const CategoryManagementContent = (props) => {
  const { statistics, handleAddCategory } = useCategoryManagement();

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Thể Loại</h4>
          </div>
        </div>

        {/* <div className="row">
          <CategoryStatisticsSection statistics={statistics} />
        </div> */}

        <div className="row">
          <CategoryManagementSection
            onAddCategory={handleAddCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementContent;
