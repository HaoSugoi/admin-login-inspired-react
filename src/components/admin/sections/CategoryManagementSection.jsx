
import React, { useState } from 'react';
import AddCategoryDialog from '../dialogs/AddCategoryDialog';
import { Edit, Trash2, FolderOpen, Book } from 'lucide-react';

const CategoryManagementSection = ({ categories = [], onAddCategory, onUpdateCategory, onDeleteCategory, isCreating }) => {
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleDeleteClick = (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      onDeleteCategory(categoryId);
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            <FolderOpen className="text-primary" size={20} />
            Quản Lý Danh Mục
          </span>
          <AddCategoryDialog onAddCategory={onAddCategory} isCreating={isCreating} />
        </div>

        <div className="table-responsive mt-3">
          <table className="table order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Danh Mục</th>
                <th>Mô Tả</th>
                <th>Số Sách</th>
                <th>Ngày Tạo</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    Chưa có danh mục nào. Hãy thêm danh mục đầu tiên!
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="fw-bold text-primary">#{category.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Book size={16} className="text-success" />
                        <span className="fw-medium">{category.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted">
                        {category.description || 'Không có mô tả'}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {category.booksCount || 0} cuốn
                      </span>
                    </td>
                    <td className="text-muted">
                      {category.createdAt 
                        ? new Date(category.createdAt).toLocaleDateString('vi-VN')
                        : 'N/A'
                      }
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm text-white border-0"
                          onClick={() => handleEditClick(category)}
                          title="Chỉnh sửa danh mục"
                          style={{ backgroundColor: '#3b82f6' }}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm text-white border-0"
                          onClick={() => handleDeleteClick(category.id)}
                          title="Xóa danh mục"
                          style={{ backgroundColor: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementSection;
