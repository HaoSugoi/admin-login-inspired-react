
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { format } from 'date-fns';
import EmployeeBasicInfoForm from './employee-forms/EmployeeBasicInfoForm';
import EmployeeDateForm from './employee-forms/EmployeeDateForm';

const EditEmployeeDialog = ({ employee, open, onClose, onUpdateEmployee }) => {
  const [joinDate, setJoinDate] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    status: 'Hoạt động'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
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
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Cập Nhật Thông Tin Nhân Viên</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmployeeBasicInfoForm 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          
          <EmployeeDateForm 
            joinDate={joinDate}
            setJoinDate={setJoinDate}
          />

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

export default EditEmployeeDialog;
