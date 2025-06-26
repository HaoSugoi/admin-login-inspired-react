
import React from 'react';
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";

const BookBasicInfoForm = ({ formData, handleInputChange, categories }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="title">Tên Sách *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="author">Tác Giả *</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Thể Loại *</Label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="form-select w-full"
          required
        >
          <option value="">Chọn thể loại</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="publisher">Nhà Xuất Bản *</Label>
        <Input
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
};

export default BookBasicInfoForm;
