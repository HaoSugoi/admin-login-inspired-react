
import React from 'react';

const CategoriesSection = ({ categories }) => {
  return (
    <div className="col-lg-4 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Thể Loại Sách</span>
          <a href="#" className="view-all-link">Quản Lý ›</a>
        </div>
        
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="category-name">{category.name}</div>
              </div>
              <div>
                <span className="badge bg-success">{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
