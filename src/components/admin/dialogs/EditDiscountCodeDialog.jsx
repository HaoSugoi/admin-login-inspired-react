
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit, Tag, Percent, Calendar, Gift, Users, FileText, AlertCircle, Save, X } from 'lucide-react';

const EditDiscountCodeDialog = ({ discountCode, open, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    DiscountCodeName: '',
    DiscountValue: '',
    StartDate: '',
    EndDate: '',
    AvailableQuantity: '',
    RequiredPoints: '',
    Description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (discountCode) {
      setFormData({
        DiscountCodeName: discountCode.DiscountCodeName || '',
        DiscountValue: discountCode.DiscountValue || '',
        StartDate: discountCode.StartDate ? discountCode.StartDate.split('T')[0] : '',
        EndDate: discountCode.EndDate ? discountCode.EndDate.split('T')[0] : '',
        AvailableQuantity: discountCode.AvailableQuantity || '',
        RequiredPoints: discountCode.RequiredPoints || '',
        Description: discountCode.Description || ''
      });
    }
  }, [discountCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.DiscountCodeName || !formData.DiscountValue || !formData.StartDate || !formData.EndDate) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      await onUpdate(discountCode.DiscountCodeId, { data: formData });
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật mã giảm giá');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Edit className="w-5 h-5 text-blue-500" />
            Chỉnh Sửa Mã Giảm Giá
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
              <Label htmlFor="discountCodeName" className="flex items-center gap-2 text-sm font-medium">
                <Tag className="w-4 h-4 text-blue-500" />
                Tên Mã Giảm Giá *
              </Label>
              <Input
                id="discountCodeName"
                value={formData.DiscountCodeName}
                onChange={(e) => setFormData({...formData, DiscountCodeName: e.target.value})}
                placeholder="Nhập tên mã giảm giá"
                className="mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountValue" className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="w-4 h-4 text-green-500" />
                  Giá Trị Giảm (%) *
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.DiscountValue}
                  onChange={(e) => setFormData({...formData, DiscountValue: e.target.value})}
                  placeholder="Nhập % giảm giá"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="availableQuantity" className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="w-4 h-4 text-orange-500" />
                  Số Lượng
                </Label>
                <Input
                  id="availableQuantity"
                  type="number"
                  min="0"
                  value={formData.AvailableQuantity}
                  onChange={(e) => setFormData({...formData, AvailableQuantity: e.target.value})}
                  placeholder="Số lượng có sẵn"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Ngày Bắt Đầu *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.StartDate}
                  onChange={(e) => setFormData({...formData, StartDate: e.target.value})}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-red-500" />
                  Ngày Kết Thúc *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.EndDate}
                  onChange={(e) => setFormData({...formData, EndDate: e.target.value})}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requiredPoints" className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-purple-500" />
                Điểm Yêu Cầu
              </Label>
              <Input
                id="requiredPoints"
                type="number"
                min="0"
                value={formData.RequiredPoints}
                onChange={(e) => setFormData({...formData, RequiredPoints: e.target.value})}
                placeholder="Điểm cần có để sử dụng mã"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                <FileText className="w-4 h-4 text-gray-500" />
                Mô Tả
              </Label>
              <Textarea
                id="description"
                value={formData.Description}
                onChange={(e) => setFormData({...formData, Description: e.target.value})}
                placeholder="Nhập mô tả mã giảm giá"
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
            >
              <X className="w-4 h-4" />
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              Cập Nhật
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDiscountCodeDialog;
