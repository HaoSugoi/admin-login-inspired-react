
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
import { Textarea } from "../../ui/textarea";

const EditPromotionDialog = ({ promotion, categories, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'percentage',
    value: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    description: ''
  });

  useEffect(() => {
    if (promotion) {
      setFormData({
        code: promotion.code,
        name: promotion.name,
        type: promotion.type,
        value: promotion.value.toString(),
        categoryId: promotion.categoryId ? promotion.categoryId.toString() : '',
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        usageLimit: promotion.usageLimit.toString(),
        description: promotion.description || ''
      });
    }
  }, [promotion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPromotion = {
      ...promotion,
      ...formData,
      value: parseFloat(formData.value),
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      usageLimit: parseInt(formData.usageLimit)
    };
    onUpdate(updatedPromotion);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh Sửa Khuyến Mãi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="row">
            <div className="col-md-6">
              <Label htmlFor="code">Mã Khuyến Mãi</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                required
                placeholder="VD: SALE20"
              />
            </div>
            <div className="col-md-6">
              <Label htmlFor="name">Tên Khuyến Mãi</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="VD: Giảm giá 20%"
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <Label htmlFor="type">Loại Giảm Giá</Label>
              <select 
                id="type"
                className="form-control"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                required
              >
                <option value="percentage">Phần trăm (%)</option>
                <option value="fixed">Số tiền cố định (đ)</option>
              </select>
            </div>
            <div className="col-md-6">
              <Label htmlFor="value">
                Giá Trị {formData.type === 'percentage' ? '(%)' : '(đ)'}
              </Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                required
                placeholder={formData.type === 'percentage' ? "20" : "50000"}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="categoryId">Thể Loại Áp Dụng</Label>
            <select 
              id="categoryId"
              className="form-control"
              value={formData.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
            >
              <option value="">Tất cả thể loại</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <small className="text-muted">
              Để trống nếu muốn áp dụng cho tất cả thể loại sách
            </small>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Label htmlFor="startDate">Ngày Bắt Đầu</Label>
              <Input
                id="startDate"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="col-md-6">
              <Label htmlFor="endDate">Ngày Kết Thúc</Label>
              <Input
                id="endDate"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="usageLimit">Giới Hạn Sử Dụng</Label>
            <Input
              id="usageLimit"
              type="number"
              value={formData.usageLimit}
              onChange={(e) => handleChange('usageLimit', e.target.value)}
              required
              placeholder="100"
            />
          </div>

          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả chi tiết về khuyến mãi"
              rows={3}
            />
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
