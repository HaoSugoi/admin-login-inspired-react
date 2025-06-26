
import React from 'react';
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Checkbox } from "../../../ui/checkbox";

const BookTypeAndPriceForm = ({ formData, handleTypeChange, handleInputChange }) => {
  return (
    <>
      <div>
        <Label>Loại Sách *</Label>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sale"
              checked={formData.type.sale}
              onCheckedChange={(checked) => handleTypeChange('sale', checked)}
            />
            <Label htmlFor="sale">Bán</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rent"
              checked={formData.type.rent}
              onCheckedChange={(checked) => handleTypeChange('rent', checked)}
            />
            <Label htmlFor="rent">Thuê</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {formData.type.sale && (
          <div>
            <Label htmlFor="price">Giá Bán</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        )}
        {formData.type.rent && (
          <div>
            <Label htmlFor="rentPrice">Giá Thuê/Ngày</Label>
            <Input
              id="rentPrice"
              name="rentPrice"
              type="number"
              value={formData.rentPrice}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BookTypeAndPriceForm;
