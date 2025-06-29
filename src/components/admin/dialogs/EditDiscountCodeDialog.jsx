import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const EditDiscountCodeDialog = ({ discountCode, open, onClose, onUpdate }) => 
  {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    quantity: '',
    requiredPoints: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (discountCode) {
      setFormData({
        name: discountCode.DiscountCodeName || '',
        value: (discountCode.DiscountValue * 100).toString() || '',
        quantity: discountCode.AvailableQuantity?.toString() || '',
        requiredPoints: discountCode.RequiredPoints?.toString() || '',
        startDate: discountCode.StartDate?.split('T')[0] || '',
        endDate: discountCode.EndDate?.split('T')[0] || ''
      });
    }
  }, [discountCode]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCode = {
      DiscountCodeName: formData.name,
      DiscountValue: parseFloat(formData.value) ,
      AvailableQuantity: parseInt(formData.quantity),
      RequiredPoints: parseInt(formData.requiredPoints),
      StartDate: new Date(formData.startDate).toISOString(),
      EndDate: new Date(formData.endDate).toISOString()
    };
    console.log("📦 DiscountCode trong Dialog:", discountCode);

    onUpdate(discountCode?.DiscountCodeId, updatedCode);
  

    onClose();
  };
  

  if (!discountCode) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cập Nhật Mã Giảm Giá</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tên Mã Giảm Giá</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="VD: GIAM20"
            />
          </div>

          <div>
            <Label htmlFor="value">Giá Trị Giảm (%)</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value)}
              required
              placeholder="VD: 20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Số lượng còn lại</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
required
              />
            </div>
            <div>
              <Label htmlFor="requiredPoints">Điểm cần</Label>
              <Input
                id="requiredPoints"
                type="number"
                value={formData.requiredPoints}
                onChange={(e) => handleChange('requiredPoints', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Ngày Bắt Đầu</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">Ngày Kết Thúc</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Cập Nhật</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDiscountCodeDialog;