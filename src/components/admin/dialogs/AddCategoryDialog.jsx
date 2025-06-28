import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus } from 'lucide-react';

const AddCategoryDialog = ({ onAddCategory, isCreating }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      // Gọi hàm callback từ prop với dữ liệu đã chuẩn hóa
      await onAddCategory({
        name: formData.name.trim(),
        description: formData.description.trim()
      });
      
      // Reset form sau khi thành công
      setFormData({ name: '', description: '' });
      setError('');
      setApiError('');
      setOpen(false);
    } catch (err) {
      // Xử lý lỗi từ API
      setApiError('Thêm danh mục thất bại. Vui lòng thử lại.');
      console.error('Failed to add category:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'name' && value.trim()) {
      setError('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="btn btn-success"
          disabled={isCreating}
        >
          {isCreating ? (
            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          ) : (
            <Plus size={16} className="me-1" />
          )}
          Thêm Danh Mục
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Danh Mục Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {apiError && (
            <div className="alert alert-danger">{apiError}</div>
          )}
          
          <div>
            <Label htmlFor="name">
              Tên Danh Mục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục"
              className="mt-1"
              disabled={isCreating}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả danh mục (tùy chọn)"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-opacity-50"
              disabled={isCreating}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setOpen(false);
                setError('');
                setApiError('');
              }}
              disabled={isCreating}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Đang thêm...
                </>
              ) : (
                'Thêm Danh Mục'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;