
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Link, X } from 'lucide-react';

const AddEditSlideDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  slide = null, 
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    linkUrl: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && slide) {
      setFormData({
        imageFile: null,
        linkUrl: slide.linkUrl || ''
      });
      setPreviewImage(slide.imageUrl || null);
    } else {
      setFormData({
        imageFile: null,
        linkUrl: ''
      });
      setPreviewImage(null);
    }
  }, [isEdit, slide, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      // Tạo preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageFile && !isEdit) {
      alert('Vui lòng chọn hình ảnh');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting slide:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ imageFile: null, linkUrl: '' });
    setPreviewImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Chỉnh Sửa Slide' : 'Thêm Slide Mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload hình ảnh */}
          <div className="space-y-2">
            <Label htmlFor="imageFile" className="text-sm font-medium">
              Hình Ảnh Slide *
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData(prev => ({ ...prev, imageFile: null }));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Label htmlFor="imageFile" className="cursor-pointer">
                      <span className="text-primary hover:text-primary/80">
                        Nhấp để chọn hình ảnh
                      </span>
                    </Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF lên đến 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Link URL */}
          <div className="space-y-2">
            <Label htmlFor="linkUrl" className="text-sm font-medium">
              <Link className="inline w-4 h-4 mr-1" />
              Đường Dẫn Liên Kết
            </Label>
            <Input
              id="linkUrl"
              type="url"
              placeholder="https://example.com"
              value={formData.linkUrl}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                linkUrl: e.target.value 
              }))}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Đường dẫn sẽ được mở khi người dùng nhấp vào slide
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : (isEdit ? 'Cập Nhật' : 'Thêm Slide')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSlideDialog;
