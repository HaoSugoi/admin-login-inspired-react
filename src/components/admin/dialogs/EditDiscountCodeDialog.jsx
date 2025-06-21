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
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';

const EditDiscountCodeDialog = ({ discountCode, open, onClose, onUpdateDiscountCode }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'percentage',
    value: '',
    usageLimit: 1,
    userSpecific: true,
    description: ''
  });

  useEffect(() => {
    if (discountCode) {
      setFormData({
        code: discountCode.code || '',
        name: discountCode.name || '',
        type: discountCode.type || 'percentage',
        value: discountCode.value || '',
        usageLimit: discountCode.usageLimit || 1,
        userSpecific: discountCode.userSpecific || true,
        description: discountCode.description || ''
      });
      
      if (discountCode.startDate) {
        const [day, month, year] = discountCode.startDate.split('/');
        setStartDate(new Date(year, month - 1, day));
      }
      
      if (discountCode.endDate) {
        const [day, month, year] = discountCode.endDate.split('/');
        setEndDate(new Date(year, month - 1, day));
      }
    }
  }, [discountCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedCode = {
      ...discountCode,
      ...formData,
      value: parseFloat(formData.value),
      usageLimit: parseInt(formData.usageLimit),
      startDate: startDate ? format(startDate, 'dd/MM/yyyy') : discountCode.startDate,
      endDate: endDate ? format(endDate, 'dd/MM/yyyy') : discountCode.endDate
    };
    
    onUpdateDiscountCode(updatedCode);
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!discountCode) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Cập Nhật Mã Giảm Giá</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          
          <div>
            <Label htmlFor="code">Mã Giảm Giá *</Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="VD: WELCOME10"
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Tên Mã *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="VD: Mã chào mừng thành viên mới"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Loại Giảm Giá</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="percentage">Phần trăm (%)</option>
                <option value="fixed">Số tiền cố định</option>
              </select>
            </div>
            <div>
              <Label htmlFor="value">Giá Trị *</Label>
              <Input
                id="value"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleInputChange}
                placeholder={formData.type === 'percentage' ? '10' : '50000'}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="usageLimit">Số Lần Sử Dụng *</Label>
            <Input
              id="usageLimit"
              name="usageLimit"
              type="number"
              value={formData.usageLimit}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ngày Bắt Đầu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Ngày Kết Thúc</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control w-full"
              placeholder="Mô tả về mã giảm giá..."
            />
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
