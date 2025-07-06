
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, MessageSquare, Book, User, Star, AlertCircle, Save, X } from 'lucide-react';

const AddCommentDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookTitle: '',
    customerName: '',
    content: '',
    rating: 5
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      bookTitle: '',
      customerName: '',
      content: '',
      rating: 5
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.bookTitle.trim() || !formData.customerName.trim() || !formData.content.trim()) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      await onAdd(formData);
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm bình luận');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
        <Plus className="w-4 h-4 mr-2" />
        Thêm Bình Luận
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Thêm Bình Luận Mới
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="bookTitle" className="flex items-center gap-2 text-sm font-medium">
                  <Book className="w-4 h-4 text-blue-500" />
                  Tên Sách *
                </Label>
                <Input
                  id="bookTitle"
                  value={formData.bookTitle}
                  onChange={(e) => setFormData({...formData, bookTitle: e.target.value})}
                  placeholder="Nhập tên sách"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerName" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-purple-500" />
                  Tên Khách Hàng *
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  placeholder="Nhập tên khách hàng"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating" className="flex items-center gap-2 text-sm font-medium">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Đánh Giá *
                </Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn đánh giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Sao</SelectItem>
                    <SelectItem value="2">2 Sao</SelectItem>
                    <SelectItem value="3">3 Sao</SelectItem>
                    <SelectItem value="4">4 Sao</SelectItem>
                    <SelectItem value="5">5 Sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content" className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  Nội Dung Bình Luận *
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Nhập nội dung bình luận"
                  className="mt-1"
                  rows={4}
                  required
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
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                Thêm Bình Luận
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCommentDialog;
