
import React from 'react';

const CategoryStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-primary">{statistics.totalCategories}</h3>
            <p className="mb-0">Tổng Danh Mục</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-success">{statistics.booksInCategories}</h3>
            <p className="mb-0">Tổng Sách</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-warning">{statistics.mostPopularCategory}</h3>
            <p className="mb-0">Phổ Biến Nhất</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="section-card text-center">
            <h3 className="text-info">{statistics.newCategoriesThisMonth}</h3>
            <p className="mb-0">Mới Tháng Này</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStatisticsSection;
