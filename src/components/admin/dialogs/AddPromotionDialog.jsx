
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Tag, Percent, Calendar, FileText, AlertCircle, Save, X } from 'lucide-react';
import {promotionService} from '../../../services/promotionService'
const AddPromotionDialog = ({ categories, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    PromotionName: '',
    DiscountPercentage: '',
    StartDate: '',
    EndDate: '',
    Description: ''
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      PromotionName: '',
      DiscountPercentage: '',
      StartDate: '',
      EndDate: '',
      Description: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.PromotionName || !formData.DiscountPercentage || !formData.StartDate || !formData.EndDate) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      await promotionService.createPromotion(formData); 
      alert('Thêm mã khuyến mãi thành công!');
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm khuyến mãi');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700" style={{ backgroundColor: '#16a34a', color: 'white' }}>
        <Plus className="w-4 h-4 mr-2" />
        Thêm Khuyến Mãi
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Tag className="w-5 h-5 text-green-500" />
              Thêm Khuyến Mãi Mới
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
                <Label htmlFor="promotionName" className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="w-4 h-4 text-blue-500" />
                  Tên Khuyến Mãi *
                </Label>
                <Input
                  id="promotionName"
                  value={formData.PromotionName}
                  onChange={(e) => setFormData({...formData, PromotionName: e.target.value})}
                  placeholder="Nhập tên khuyến mãi"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="discountPercentage" className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="w-4 h-4 text-green-500" />
                  Phần Trăm Giảm Giá *
                </Label>
                <Input
                  id="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.DiscountPercentage}
                  onChange={(e) => setFormData({...formData, DiscountPercentage: e.target.value})}
                  placeholder="Nhập % giảm giá"
                  className="mt-1"
                  required
                />
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
                <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Mô Tả
                </Label>
                <Textarea
                  id="description"
                  value={formData.Description}
                  onChange={(e) => setFormData({...formData, Description: e.target.value})}
                  placeholder="Nhập mô tả khuyến mãi"
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
                
              >
                <Save className="w-4 h-4" />
                Thêm Khuyến Mãi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPromotionDialog;
 