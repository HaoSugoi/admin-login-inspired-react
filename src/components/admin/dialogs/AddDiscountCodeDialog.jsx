
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';

const AddDiscountCodeDialog = ({ onAddDiscountCode }) => {
  const [open, setOpen] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCode = {
      ...formData,
      value: parseFloat(formData.value),
      usageLimit: parseInt(formData.usageLimit),
      startDate: startDate ? format(startDate, 'dd/MM/yyyy') : '',
      endDate: endDate ? format(endDate, 'dd/MM/yyyy') : '',
      userId: null
    };
    
    onAddDiscountCode(newCode);
    
    // Reset form
    setFormData({
      code: '',
      name: '',
      type: 'percentage',
      value: '',
      usageLimit: 1,
      userSpecific: true,
      description: ''
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-success">
          <Plus size={16} className="me-1" />
          Thêm Mã Giảm Giá
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Tạo Mã Giảm Giá Mới</DialogTitle>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Tạo Mã</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDiscountCodeDialog;
