
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
import { Textarea } from "../../ui/textarea";

const AddAuthorDialog = ({ onAddAuthor, isCreating }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Description: ''
  });
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApiError('');
    
    // Validate input
    if (!formData.Name.trim()) {
      setError('Vui lòng nhập tên tác giả');
      return;
    }

    try {
      console.log("🔄 AddAuthorDialog submitting:", formData);
      
      // Gọi hàm callback và đợi kết quả
      await onAddAuthor({
        Name: formData.Name.trim(),
        Description: formData.Description.trim()
      });
      
      console.log("✅ Author added successfully from dialog");
      
      // Reset form và đóng dialog chỉ khi thành công
      setFormData({ Name: '', Description: '' });
      setError('');
      setApiError('');
      setOpen(false);
      
    } catch (err) {
      console.error('❌ Failed to add author in dialog:', err);
      
      // Hiển thị lỗi từ API
      const errorMessage = err.message || 'Thêm tác giả thất bại. Vui lòng thử lại.';
      setApiError(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error khi người dùng bắt đầu nhập
    if (name === 'Name' && value.trim()) {
      setError('');
      setApiError('');
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setOpen(false);
      setError('');
      setApiError('');
      setFormData({ Name: '', Description: '' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
          Thêm Tác Giả
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Tác Giả Mới</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {(error || apiError) && (
            <div className="alert alert-danger p-2 mb-3 text-center">
              {error || apiError}
            </div>
          )}
          
          <div>
            <Label htmlFor="name">
              Tên Tác Giả <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Nhập tên tác giả"
              className="mt-1"
              disabled={isCreating}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              name="Description"
              rows="3"
              value={formData.Description}
              onChange={handleInputChange}
              placeholder="Mô tả về tác giả (tùy chọn)"
              className="mt-1"
              disabled={isCreating}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isCreating}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={isCreating || !formData.Name.trim()}
            >
              {isCreating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Đang thêm...
                </>
              ) : (
                'Thêm Tác Giả'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuthorDialog;
