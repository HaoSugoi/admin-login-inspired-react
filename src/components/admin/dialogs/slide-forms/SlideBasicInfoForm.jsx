
import React from 'react';
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Link, Image } from 'lucide-react';

const SlideBasicInfoForm = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image" className="flex items-center gap-2 text-sm font-medium">
          <Image className="w-4 h-4 text-blue-500" />
          Hình Ảnh Slide *
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1"
          required={!formData.imageUrl}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-32 h-20 object-cover rounded border"
            />
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="linkUrl" className="flex items-center gap-2 text-sm font-medium">
          <Link className="w-4 h-4 text-green-500" />
          Đường Dẫn (URL)
        </Label>
        <Input
          id="linkUrl"
          name="linkUrl"
          type="url"
          value={formData.linkUrl}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default SlideBasicInfoForm;
