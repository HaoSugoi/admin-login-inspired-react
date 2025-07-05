
import React from 'react';
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";
import { Eye, EyeOff } from 'lucide-react';

const SlideStatusForm = ({ formData, handleStatusChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        {formData.isActive ? (
          <Eye className="w-5 h-5 text-green-500" />
        ) : (
          <EyeOff className="w-5 h-5 text-gray-400" />
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={handleStatusChange}
          />
          <Label htmlFor="isActive" className="font-medium">
            Hiển thị slide này
          </Label>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Slide chỉ hiển thị trên trang chủ khi được kích hoạt
      </p>
    </div>
  );
};

export default SlideStatusForm;
