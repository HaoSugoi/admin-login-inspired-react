
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

const EditCustomerDialog = ({ customer, open, onClose, onUpdateCustomer }) => {
  const [formData, setFormData] = useState({
  
    Address: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Role: "Customer",
    Points: 0,
    imageFile: null,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
     
        Address: customer.Address || "",
        PhoneNumber: customer.PhoneNumber || "",
        DateOfBirth: customer.DateOfBirth
          ? new Date(customer.DateOfBirth).toISOString().split("T")[0]
          : "",
        Role: customer.Role || "Customer",
        Points: customer.Points || 0,
        imageFile: null,
      });
    }
  }, [customer]);

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

    const updatedCustomer = {
     
      Address: formData.Address,
      Role: formData.Role,
      PhoneNumber: formData.PhoneNumber,
      DateOfBirth: formData.DateOfBirth ? new Date(formData.DateOfBirth).toISOString() : "",
      Points: parseInt(formData.Points) || 0,
      ImageFile: formData.imageFile,
    };

    onUpdateCustomer({ Id: customer.Id, data: updatedCustomer });
    onClose();
  };

  if (!customer) return null;

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
              value={customer.Email}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div>
            <Label htmlFor="UserName">Họ Tên *</Label>
            <Input
              id="UserName"
              name="UserName"
              value={customer.UserName}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div>
            <Label htmlFor="PhoneNumber">Số Điện Thoại</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              type="number"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
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
            <label htmlFor="Role">Role</label>
            <select
              id="Role"
              name="Role"
              value={formData.Role}
              onChange={handleInputChange}
              className="form-control w-full"
            >
              <option value="">-- Chọn vai trò --</option>
              <option value="Staff">Staff</option>
              <option value="Customer">Customer</option>
            </select>
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
            <Label htmlFor="Points">Điểm</Label>
            <Input
              id="Points"
              name="Points"
              type="number"
              value={formData.Points}
              onChange={handleInputChange}
              min="0"
            />
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

export default EditCustomerDialog;
