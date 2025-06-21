
import React from 'react';
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";

const EmployeeBasicInfoForm = ({ formData, handleInputChange }) => {
  return (
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
  );
};

export default EmployeeBasicInfoForm;
