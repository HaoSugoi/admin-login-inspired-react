
import React from 'react';
import AdminTopbar from './AdminTopbar';
import CommentsListSection from './sections/CommentsListSection';
import CommentsStatisticsSection from './sections/CommentsStatisticsSection';

const CommentsManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Bình Luận</h4>
          </div>
        </div>

        <div className="row">
          <CommentsStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <CommentsListSection 
            comments={props.comments}
            onAdd={props.handleAddComment}
            onUpdate={props.handleUpdateComment}
            onDelete={props.handleDeleteComment}
            onApprove={props.handleApproveComment}
            onReject={props.handleRejectComment}
            onReply={props.handleReplyComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsManagementContent;
