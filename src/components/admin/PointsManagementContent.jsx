
import React from 'react';
import AdminTopbar from './AdminTopbar';
import PointsTransactionsSection from './sections/PointsTransactionsSection';
import PointsStatisticsSection from './sections/PointsStatisticsSection';
import RewardsManagementSection from './sections/RewardsManagementSection';

const PointsManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Điểm Thưởng</h4>
          </div>
        </div>

        <div className="row">
          <PointsStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <PointsTransactionsSection 
            pointTransactions={props.pointTransactions}
            onAdd={props.handleCreatePointTransaction}
            onUpdate={props.handleUpdatePointTransaction}
            onDelete={props.handleDeletePointTransaction}
          />
        </div>

        <div className="row">
          <RewardsManagementSection 
            rewards={props.rewards}
            onRedeem={props.handleRedeemPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsManagementContent;
