import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { useEffect } from "react";

const EditAuthorDialog = ({ 
  author, 
  open, 
  onClose, 
  onUpdateAuthor,
  isUpdating 
}) => {
  const [formData, setFormData] = React.useState({
    Name: '',
    Description: ''
  });
  const [error, setError] = React.useState('');

  // Cập nhật form data khi author thay đổi
  useEffect(() => {
  if (!author?.AuthorId) {
    console.error('Invalid author prop:', author);
    return;
  }
  setFormData({
    Name: author.Name || '',
    Description: author.Description || ''
  });
}, [author]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!author?.AuthorId) {
    setError('Không tìm thấy ID tác giả');
    console.error('Missing author ID when submitting:', author);
    return;
  }

  if (!formData.Name?.trim()) {
    setError('Vui lòng nhập tên tác giả');
    return;
  }

  try {
    console.log('Submitting author update:', {
      authorId: author.AuthorId.trim(),
      data: {
        Name: formData.Name.trim(),
        Description: formData.Description.trim()
      }
    });
    
    await onUpdateAuthor(
      author.AuthorId.trim(),
      {
        Name: formData.Name.trim(),
        Description: formData.Description.trim()
      }
    );
    onClose();
  } catch (err) {
    console.error('Update error details:', {
      error: err,
      response: err.response?.data
    });
    setError(err.response?.data?.message || 'Cập nhật thất bại');
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    if (name === 'Name' && value.trim()) setError('');
  };

  if (!author) {
    console.error('Prop author không được cung cấp');
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Chỉnh Sửa Tác Giả</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="text-red-500 text-center text-sm mb-3">{error}</div>
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
              disabled={isUpdating}
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
              placeholder="Mô tả về tác giả"
              className="mt-1"
              disabled={isUpdating}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isUpdating}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={isUpdating || !formData.Name.trim()}
            >
              {isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAuthorDialog;