import React, { useState,useEffect  } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userService } from '../../../services/employeeService';

const EditEmployeeDialog = ({ open, onClose, employee, onUpdateEmployee }) => {
  const [formData, setFormData] = useState({
    FullName: employee.FullName || "", 
    PhoneNumber: employee.PhoneNumber || "",
    Address: employee.Address || "",
   
   
    DateOfBirth: employee.DateOfBirth ? employee.DateOfBirth.slice(0, 10) : "",
    ImageFile: null,
  });
 
  
  useEffect(() => {
    if (employee) {
      setFormData({
        FullName: employee.UserName || "",  // hoặc employee.FullName nếu backend dùng vậy
        PhoneNumber: employee.PhoneNumber || "",
        Address: employee.Address || "",
     
        DateOfBirth: employee.DateOfBirth
        ? new Date(employee.DateOfBirth).toISOString().slice(0, 10)
        : "",
      
       
      });
      console.log("Ngày sinh từ backend:", employee.DateOfBirth);

    }
  }, [employee]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, ImageFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCustomer = {
      FullName: formData.FullName,
      Address: formData.Address,
     
      PhoneNumber: formData.PhoneNumber,
      DateOfBirth: formData.DateOfBirth || "",
    
      ImageFile: formData.imageFile,
    };

    try {
      await userService.updateUser(employee.Id, updatedCustomer);
      onClose(); // đóng dialog sau khi cập nhật thành công
      onUpdateEmployee();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <Label htmlFor="FullName">Họ tên</Label>
            <Input
              id="FullName"
              name="FullName"
              value={formData.FullName}
              onChange={handleInputChange}
              className="form-control w-full"
            />
          </div>
          <div>
            <Label htmlFor="PhoneNumber">Số điện thoại</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="form-control w-full"
            />
          </div>

          <div>
            <Label htmlFor="Address">Địa chỉ</Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              className="form-control w-full"
            />
          </div>

          <div>
            <Label htmlFor="DateOfBirth">Ngày sinh</Label>
            <Input
              type="date"
              id="DateOfBirth"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleInputChange}
              className="form-control w-full"
            />
          </div>


       


          <div className="flex justify-end mt-4">
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
