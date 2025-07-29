
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, FolderPlus, Tag, FileText, AlertCircle, Save, X } from 'lucide-react';

const AddCategoryDialog = ({ onAddCategory, isCreating }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      await onAddCategory(formData);
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm danh mục');
    }
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-green-600 hover:bg-green-700 text-white border-0"
        style={{ backgroundColor: '#16a34a', color: 'white' }}
        disabled={isCreating}
      >
        <Plus className="w-4 h-4 mr-2" />
        Thêm Thể Loại
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <FolderPlus className="w-5 h-5 text-green-500" />
              Thêm Thể Loại Mới
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
                <Label htmlFor="categoryName" className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="w-4 h-4 text-blue-500" />
                  Tên Thể Loại *
                </Label>
                <Input
                  id="categoryName"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nhập tên danh mục"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoryDescription" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Mô Tả
                </Label>
                <Textarea
                  id="categoryDescription"
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
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
              <Button
                type="submit"
                
                disabled={isCreating}
              >
                {isCreating ? (
                  <div />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isCreating ? 'Đang thêm...' : 'Thêm Danh Mục'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategoryDialog;
