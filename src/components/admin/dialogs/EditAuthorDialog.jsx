
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
  const [apiError, setApiError] = React.useState('');

  // Cập nhật form data khi author thay đổi
  useEffect(() => {
    if (!author?.AuthorId) {
      console.error('Invalid author prop:', author);
      return;
    }
    
    console.log('Setting form data for author:', author);
    setFormData({
      Name: author.Name || '',
      Description: author.Description || ''
    });
    setError('');
    setApiError('');
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApiError('');
    
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
      console.log('🔄 EditAuthorDialog submitting update:', {
        authorId: author.AuthorId,
        formData: {
          Name: formData.Name.trim(),
          Description: formData.Description.trim()
        }
      });
      
      await onUpdateAuthor(
        author.AuthorId,
        {
          Name: formData.Name.trim(),
          Description: formData.Description.trim()
        }
      );
      
      console.log('✅ Update successful in dialog');
      onClose();
    } catch (err) {
      console.error('❌ Update error in dialog:', err);
      const errorMessage = err.message || 'Cập nhật thất bại. Vui lòng thử lại.';
      setApiError(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear errors when user starts typing
    if (name === 'Name' && value.trim()) {
      setError('');
      setApiError('');
    }
  };

  const handleClose = () => {
    if (!isUpdating) {
      onClose();
      setError('');
      setApiError('');
    }
  };

  if (!author) {
    console.error('Prop author không được cung cấp');
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Chỉnh Sửa Tác Giả</DialogTitle>
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
              disabled={isUpdating}
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
              placeholder="Mô tả về tác giả"
              className="mt-1"
              disabled={isUpdating}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isUpdating}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={isUpdating || !formData.Name.trim()}
            >
              {isUpdating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Đang lưu...
                </>
              ) : (
                'Lưu Thay Đổi'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAuthorDialog;
