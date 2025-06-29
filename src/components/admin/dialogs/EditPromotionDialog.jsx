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

const EditPromotionDialog = ({ promotion, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.PromotionName || '',
        value: promotion.DiscountPercentage?.toString() || '',
        startDate: promotion.StartDate?.split('T')[0] || '',
        endDate: promotion.EndDate?.split('T')[0] || ''
      });
    }
  }, [promotion]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPromotion = {
      PromotionName: formData.name,
      DiscountPercentage: parseFloat(formData.value),
      StartDate: new Date(formData.startDate).toISOString(),
      EndDate: new Date(formData.endDate).toISOString()
    };
    onUpdate(promotion.PromotionId, updatedPromotion);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh Sửa Khuyến Mãi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tên Khuyến Mãi</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="VD: Giảm giá 20%"
            />
          </div>

          <div>
            <Label htmlFor="value">Giảm Giá (%)</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value)}
              required
              placeholder="VD: 20"
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <Label htmlFor="startDate">Ngày Bắt Đầu</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
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
<div className="flex justify-end space-x-2">
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

export default EditPromotionDialog;
