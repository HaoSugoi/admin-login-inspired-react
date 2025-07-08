
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SlideBasicInfoForm from './slide-forms/SlideBasicInfoForm';
import SlideStatusForm from './slide-forms/SlideStatusForm';
import { Plus, Edit, Save, X, AlertCircle } from 'lucide-react';

const AddEditSlideDialog = ({ isOpen, onClose, onSubmit, slide = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    imageUrl: '',
    linkUrl: '',
    isActive: true
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (slide && isEdit) {
      setFormData({
        imageFile: null,
        imageUrl: slide.imageUrl || '',
        linkUrl: slide.linkUrl || '',
        isActive: slide.isActive !== undefined ? slide.isActive : true
      });
    } else {
      setFormData({
        imageFile: null,
        imageUrl: '',
        linkUrl: '',
        isActive: true
      });
    }
    setError('');
  }, [slide, isEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleStatusChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      isActive: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.imageFile && !formData.imageUrl) {
      setError('Vui lòng chọn hình ảnh cho slide');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi lưu slide');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            {isEdit ? (
              <>
                <Edit className="w-5 h-5 text-blue-500" />
                Chỉnh Sửa Slide
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-green-500" />
                Thêm Slide Mới
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <SlideBasicInfoForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />

          <SlideStatusForm
            formData={formData}
            handleStatusChange={handleStatusChange}
          />

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Hủy
            </Button>
            <Button
              type="submit"
          
            >
              <Save className="w-4 h-4" />
              {isEdit ? 'Cập Nhật' : 'Thêm Slide'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSlideDialog;
