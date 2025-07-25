import React from 'react';
import AdminTopbar from './AdminTopbar';
import CommentsListSection from './sections/CommentsListSection';
import CommentsStatisticsSection from './sections/CommentsStatisticsSection';

const CommentsManagementContent = (props) => {
  const {
    bookId,
    setBookId,
    commentId,
    setCommentId,
    fetchComments,
    handleAddComment,
    handleDeleteComment
  } = props;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row mb-3">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Bình Luận</h4>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Nhập BookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Tìm theo CommentId"
              value={commentId}
              onChange={(e) => setCommentId(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            {/* Optional space for future elements */}
          </div>
          <div className="col-md-3 mb-2">
            <button className="btn btn-success w-100" onClick={handleAddComment}>
              ➕ Thêm bình luận
            </button>
          </div>
        </div>

        {/* <div className="row mb-3">
          <CommentsStatisticsSection statistics={props.statistics} />
        </div> */}

        <div className="row mb-3">
          <CommentsListSection
            comments={props.comments}
            bookId={props.bookId}
            commentId={props.commentId}
            onDelete={handleDeleteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsManagementContent;