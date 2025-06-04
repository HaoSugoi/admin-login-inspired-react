
import React, { useState } from 'react';
import AddCategoryDialog from '../dialogs/AddCategoryDialog';
import { Edit, Trash2 } from 'lucide-react';

const CategoriesSection = ({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditStart = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const handleEditSave = (categoryId) => {
    onUpdateCategory(categoryId, { name: editName });
    setEditingCategory(null);
    setEditName('');
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
    setEditName('');
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      onDeleteCategory(categoryId);
    }
  };

  return (
    <div className="col-lg-4 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Thể Loại Sách</span>
          <AddCategoryDialog onAddCategory={onAddCategory} />
        </div>
        
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
              <div className="flex-grow-1">
                {editingCategory === category.id ? (
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditSave(category.id);
                        if (e.key === 'Escape') handleEditCancel();
                      }}
                      autoFocus
                    />
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => handleEditSave(category.id)}
                    >
                      ✓
                    </button>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={handleEditCancel}
                    >
                      ✗
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="category-name">{category.name}</div>
                    <span className="badge bg-success">{category.count}</span>
                  </div>
                )}
              </div>
              {editingCategory !== category.id && (
                <div className="d-flex gap-1">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEditStart(category)}
                    title="Sửa"
                  >
                    <Edit size={12} />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteCategory(category.id)}
                    title="Xóa"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
