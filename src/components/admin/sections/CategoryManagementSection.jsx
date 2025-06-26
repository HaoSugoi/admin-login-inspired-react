import React, { useState } from 'react';
import AddCategoryDialog from '../dialogs/AddCategoryDialog';
// import EditCategoryDialog from '../dialogs/EditCategoryDialog'; // Tạo component này tương tự Add

const CategoryManagementSection = ({ categories, onAddCategory, onUpdate, onDelete }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Quản Lý Danh Mục</h5>
          <AddCategoryDialog onAddCategory={onAddCategory} />
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Tên Danh Mục</th>
                <th>Mô Tả</th>
                <th>Số Sách</th>
                <th className="text-end">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="fw-medium">{category.name}</td>
                  <td className="text-muted">{category.description || '—'}</td>
                  <td>
                    <span className="badge bg-primary">{category.booksCount || 0}</span>
                  </td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setEditingCategory(category)}
                    >
                      Sửa
                    </button>
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

      {/* Dialog chỉnh sửa */}
      {/* {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdate={onUpdate}
        />
      )} */}
    </div>
  );
};

export default CategoryManagementSection;