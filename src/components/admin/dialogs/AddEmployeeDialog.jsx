
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Plus } from 'lucide-react';
import EmployeeBasicInfoForm from './employee-forms/EmployeeBasicInfoForm';
import EmployeeDateForm from './employee-forms/EmployeeDateForm';

const AddEmployeeDialog = ({ onAddEmployee }) => {
  const [open, setOpen] = useState(false);
  const [joinDate, setJoinDate] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: '',
    status: 'Hoạt động'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...formData,
      id: Date.now(),
      joinDate: joinDate ? joinDate.toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
      roleId: 1,
      managerId: null
    };
    onAddEmployee(newEmployee);
    setFormData({
      name: '',
      email: '',
      phone: '',
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
      <DialogContent className="max-w-lg mx-auto min-h-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Nhân Viên Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmployeeBasicInfoForm 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          
          <EmployeeDateForm 
            joinDate={joinDate}
            setJoinDate={setJoinDate}
          />

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
