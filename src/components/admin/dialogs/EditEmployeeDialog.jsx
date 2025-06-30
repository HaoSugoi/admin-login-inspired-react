import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const EditEmployeeDialog = ({ employee, open, onClose, onUpdateEmployee }) => {
  const [formData, setFormData] = useState({
    Address: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Role: "",
    imageFile: null,
  });

  useEffect(() => {
  if (employee) {
    setFormData({
      Address: employee.Address || "",
      PhoneNumber: employee.PhoneNumber || "",
      DateOfBirth: employee.DateOfBirth
        ? new Date(employee.DateOfBirth)
        : "",
      Role: employee.Role || "", // <-- Role này phải là "Customer", "Staff", "Admin"
      imageFile: null,
    });
  }
}, [employee]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedemployees = {

      Address: formData.Address,
      Role: formData.Role,
      PhoneNumber: formData.PhoneNumber,
      DateOfBirth: new Date(formData.DateOfBirth).toISOString(), // yyyy-MM-dd
      Points: 0,
      ImageFile: formData.imageFile, // File từ input type="file"
    };

    onUpdateEmployee({ StaffId: employee.StaffId, data: updatedemployees });

    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto min-h-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Cập Nhật Thông Tin Khách Hàng
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="Email">Email *</Label>
            <Input
              id="Email"
              name="Email"
              type="email"
              value={employee.Email}
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="PhoneNumber">Số Điện Thoại *</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              type="tel"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="DateOfBirth">Ngày Sinh</Label>
            <Input
              id="DateOfBirth"
              name="DateOfBirth"
              type="date"
              value={formData.DateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="Address">Địa Chỉ</Label>
            <textarea
              id="Address"
              name="Address"
              rows="3"
              value={formData.Address}
              onChange={handleInputChange}
              className="form-control w-full"
            />
          </div>

          <div>
            <Label htmlFor="Role">Vai trò</Label>
            <select
              id="Role"
              name="Role"
              value={formData.Role}
              onChange={handleInputChange}
              className="form-select w-full"
            >
              <option value="Customer">Customer</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <Label htmlFor="avatar">Ảnh đại diện</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
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
