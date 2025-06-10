
import React from 'react';
import AdminTopbar from './AdminTopbar';
import RentalListSection from './sections/RentalListSection';
import RentalStatisticsSection from './sections/RentalStatisticsSection';
import OverdueSection from './sections/OverdueSection';
import BookConditionSection from './sections/BookConditionSection';
import ConditionStatisticsSection from './sections/ConditionStatisticsSection';

const RentalManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Sách Thuê</h4>
          </div>
        </div>

        <div className="row">
          <RentalStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <RentalListSection rentals={props.rentals} />
          <OverdueSection rentals={props.rentals} />
        </div>

        <div className="row">
          <ConditionStatisticsSection conditionStats={props.conditionStats} />
        </div>

        <div className="row">
          <BookConditionSection 
            bookConditions={props.bookConditions}
            onAddCondition={props.addBookCondition}
            onUpdateCondition={props.updateBookCondition}
            onDeleteCondition={props.deleteBookCondition}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalManagementContent;
