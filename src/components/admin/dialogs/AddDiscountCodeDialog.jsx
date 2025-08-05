
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Tag, Percent, Calendar, Gift, Users, FileText, AlertCircle, Save, X } from 'lucide-react';
import { discountcodeService } from '../../../services/DiscountCodeService';
const AddDiscountCodeDialog = ({ onAddDiscountCode }) => {
  const [open, setOpen] = useState(false);
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

  const resetForm = () => {
    setFormData({
      DiscountCodeName: '',
      DiscountValue: '',
      StartDate: '',
      EndDate: '',
      AvailableQuantity: '',
      RequiredPoints: '',
      Description: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('đây là data của mã giảm giá',formData);
      await discountcodeService.createDiscountCode(formData); // 👈 Gọi trực tiếp service
      alert('Thêm mã giảm giá thành công!');
      window.location.reload();
      setOpen(false);// đóng dialog
    } catch (error) {
      alert('Thêm mã giảm giá thất bại: ' + error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700 text-white border-0" style={{ backgroundColor: '#16a34a', color: 'white' }}>
        <Plus className="w-4 h-4 mr-2" />
        Thêm Mã Giảm Giá
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Gift className="w-5 h-5 text-green-500" />
              Thêm Mã Giảm Giá Mới
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
                Thêm Mã Giảm Giá
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDiscountCodeDialog;
