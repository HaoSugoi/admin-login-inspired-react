import React, { useState } from "react";
import AddCategoryDialog from "../dialogs/AddCategoryDialog";
import EditCategoryDialog from '../dialogs/EditCategoryDialog';
import { useCategoryManagement } from "../../../hooks/useCategoryManagement";

const CategoryManagementSection = () => {
  const {
    categories,
    statistics,
    isLoadingCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    filterCategories,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCategoryManagement();

  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc danh mục dựa trên search term
  const filteredCategories = filterCategories(searchTerm);
  
  // Tạo biến an toàn để tránh lỗi khi dữ liệu chưa có
  const safeCategories = filteredCategories || [];

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5>Quản Lý Thể Loại</h5>
            <div className="d-flex gap-2 mt-2">
              <span className="badge bg-primary">
                Tổng: {statistics.totalCategories}
              </span>
              <span className="badge bg-success">
                Có sách: {statistics.categoriesWithBooks}
              </span>
              <span className="badge bg-warning">
                Trống: {statistics.emptyCategories}
              </span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm thể loại..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddCategoryDialog
              onAddCategory={handleCreateCategory}
              isCreating={isCreating}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Tên Thể Loại</th>
                <th>Mô Tả</th>
                <th>Số Sách</th>
                <th className="text-end">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingCategories ? (
                <tr key="loading-row">
                  <td colSpan="4" className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : safeCategories.length === 0 ? (
                <tr key="no-results-row">
                  <td colSpan="4" className="text-center text-muted">
                    Không tìm thấy danh mục nào
                  </td>
                </tr>
              ) : (
                safeCategories.map((category) => (
                  <tr key={`category-${category.id}`}>
                    <td className="fw-medium">{category.name}</td>
                    <td className="text-muted">
                      {category.description || "—"}
                    </td>
                    <td>
                      <span className="badge bg-primary">
                        {category.booksCount || 0}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setEditingCategory(category)}
                        disabled={isUpdating}
                      >
                        {isUpdating && editingCategory?.id === category.id ? (
                          <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                          ></span>
                        ) : null}
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                          ></span>
                        ) : null}
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog chỉnh sửa */}
     {editingCategory && (
  <EditCategoryDialog
    category={editingCategory}
    onClose={() => setEditingCategory(null)}
    onUpdate={(updatedCategory) => 
      handleUpdateCategory(updatedCategory.id, updatedCategory)
    }
    isUpdating={isUpdating}
  />
)}
    </div>
  );
};

export default CategoryManagementSection;