
import React from 'react';

const AuthorStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics?.totalAuthors || 0}</h3>
            <p className="mb-0">Tổng Tác Giả</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics?.authorsWithBooks || 0}</h3>
            <p className="mb-0">Có Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics?.emptyAuthors || 0}</h3>
            <p className="mb-0">Chưa Có Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">0</h3>
            <p className="mb-0">Hoạt Động</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorStatisticsSection;
