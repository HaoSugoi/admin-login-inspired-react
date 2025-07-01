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
    
    // Validate input
    if (!formData.Name.trim()) {
      setError('Vui lòng nhập tên tác giả');
      return;
    }

    try {
      // Chuẩn bị dữ liệu gửi đi với đúng format
      const payload = {
        Name: formData.Name.trim(),
        Description: formData.Description.trim()
      };
      
      console.log("Payload gửi từ AddAuthorDialog:", payload);
      
      // Gọi hàm callback
      await onAddAuthor(payload);
      
      // Reset form và đóng dialog
      setFormData({ Name: '', Description: '' });
      setError('');
      setApiError('');
      setOpen(false);
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMessage = err.response?.data?.message || 
                          'Thêm tác giả thất bại. Vui lòng thử lại.';
      setApiError(errorMessage);
      console.error('Failed to add author:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error khi người dùng bắt đầu nhập
    if (name === 'Name' && value.trim()) {
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
          Thêm Tác Giả
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Tác Giả Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {apiError && (
            <div className="alert alert-danger p-2 mb-3 text-center">
              {apiError}
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
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              name="Description"
              rows="2"
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
