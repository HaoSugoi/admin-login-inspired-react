
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

const AddEmployeeDialog = ({ onAddEmployee }) => {
  const [open, setOpen] = useState(false);
  const [joinDate, setJoinDate] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    status: 'Hoạt động'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...formData,
      id: Date.now(),
      joinDate: joinDate ? format(joinDate, 'dd/MM/yyyy') : new Date().toLocaleDateString('vi-VN'),
      roleId: 1,
      managerId: null
    };
    onAddEmployee(newEmployee);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      status: 'Hoạt động'
    });
    setJoinDate(undefined);
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
          Thêm Nhân Viên
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Nhân Viên Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="position">Chức Vụ *</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Thêm Nhân Viên</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
