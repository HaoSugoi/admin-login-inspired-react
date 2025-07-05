
import React from 'react';
import AdminTopbar from './AdminTopbar';
import SlidesSection from './sections/SlidesSection';
import SlidesStatisticsSection from './sections/SlidesStatisticsSection';

const SlidesManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Slide</h4>
          </div>
        </div>

        <div className="row">
          <SlidesStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <SlidesSection 
            slides={props.slides}
            isLoading={props.isLoading}
            onAddSlide={() => props.setShowAddDialog(true)}
            onEditSlide={(slide) => {
              props.setSelectedSlide(slide);
              props.setShowEditDialog(true);
            }}
            onDeleteSlide={(slide) => {
              props.setSelectedSlide(slide);
              props.setShowDeleteDialog(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SlidesManagementContent;
