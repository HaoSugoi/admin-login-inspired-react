
import React, { useState } from 'react';

const CategoryManagementSection = ({ categories, onAdd, onUpdate, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Quản Lý Danh Mục</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Danh Mục
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên Danh Mục</th>
                <th>Mô Tả</th>
                <th>Số Sách</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td><span className="badge bg-info">{category.booksCount}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(category.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementSection;
