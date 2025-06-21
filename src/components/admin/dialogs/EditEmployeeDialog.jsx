
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

const EditEmployeeDialog = ({ employee, open, onClose, onUpdateEmployee }) => {
  const [joinDate, setJoinDate] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: '',
    status: 'Hoạt động'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || '',
        salary: employee.salary || '',
        status: employee.status || 'Hoạt động'
      });
      
      if (employee.joinDate) {
        const [day, month, year] = employee.joinDate.split('/');
        setJoinDate(new Date(year, month - 1, day));
      }
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...employee,
      ...formData,
      joinDate: joinDate ? format(joinDate, 'dd/MM/yyyy') : employee.joinDate
    };
    onUpdateEmployee(updatedEmployee);
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto min-h-[600px]"> {/* Tăng chiều cao 40% */}
        <DialogHeader>
          <DialogTitle className="text-center">Cập Nhật Thông Tin Nhân Viên</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Họ và Tên *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Số Điện Thoại *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Phòng Ban</Label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="">Chọn phòng ban</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Bán hàng">Bán hàng</option>
                <option value="Kho">Kho</option>
                <option value="Kế toán">Kế toán</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Ngày Vào Làm</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !joinDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {joinDate ? format(joinDate, "dd/MM/yyyy") : <span>Chọn ngày vào làm</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={joinDate}
                  onSelect={setJoinDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="salary">Lương</Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="VNĐ"
            />
          </div>
          <div>
            <Label htmlFor="status">Trạng Thái</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select w-full"
            >
              <option value="Hoạt động">Hoạt động</option>
              <option value="Tạm nghỉ">Tạm nghỉ</option>
              <option value="Nghỉ việc">Nghỉ việc</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-6">
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

export default EditEmployeeDialog;
