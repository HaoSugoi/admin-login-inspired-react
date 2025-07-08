import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FolderEdit, Save, X, AlertCircle } from 'lucide-react';

const EditCategoryDialog = ({ 
  category, 
  onClose, 
  onUpdate, 
  isUpdating 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Điền dữ liệu category vào form khi mở dialog
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || ''
      });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      await onUpdate({
        id: category.id,
        ...formData
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật danh mục');
    }
  };

  if (!category) return null;

  return (
    <Dialog open={!!category} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <FolderEdit className="w-5 h-5 text-blue-500" />
            Chỉnh Sửa Danh Mục
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="editCategoryName" className="flex items-center gap-2 text-sm font-medium">
                Tên Danh Mục *
              </Label>
              <Input
                id="editCategoryName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập tên danh mục"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="editCategoryDescription" className="flex items-center gap-2 text-sm font-medium">
                Mô Tả
              </Label>
              <Textarea
                id="editCategoryDescription"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Nhập mô tả cho danh mục"
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
              disabled={isUpdating}
            >
              <X className="w-4 h-4" />
              Hủy
            </Button>
            <Button
              type="submit"
              
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isUpdating ? 'Đang cập nhật...' : 'Lưu Thay Đổi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;