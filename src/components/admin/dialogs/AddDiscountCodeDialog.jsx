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
    name: '',
    description: '',
    value: '',
    usageLimit: 1,
    requiredPoints: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCode = {
      DiscountCodeName: formData.name,
      Description: formData.description,
      DiscountValue: parseFloat(formData.value) / 100, // % sang số thực
      AvailableQuantity: parseInt(formData.usageLimit),
      RequiredPoints: parseInt(formData.requiredPoints),
      StartDate: startDate?.toISOString(),
      EndDate: endDate?.toISOString()
    };

    onAddDiscountCode(newCode); // gọi mutation từ props

    // Reset form
    setFormData({
      name: '',
      description: '',
      value: '',
      usageLimit: 1,
      requiredPoints: 0,
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setOpen(false);
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
            <Label htmlFor="name">Tên Mã Giảm Giá *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="VD: GIAM50"
            />
          </div>

          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control w-full"
              placeholder="Nội dung mô tả cho mã giảm giá"
            />
          </div>
<div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Giá Trị Giảm (%) *</Label>
              <Input
                id="value"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="VD: 20"
                required
              />
            </div>
            <div>
              <Label htmlFor="usageLimit">Số Lượng *</Label>
              <Input
                id="usageLimit"
                name="usageLimit"
                type="number"
                min="1"
                value={formData.usageLimit}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="requiredPoints">Điểm Cần Đổi *</Label>
            <Input
              id="requiredPoints"
              name="requiredPoints"
              type="number"
              min="0"
              value={formData.requiredPoints}
              onChange={handleInputChange}
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
                  />
                </PopoverContent>
              </Popover>
            </div>
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
