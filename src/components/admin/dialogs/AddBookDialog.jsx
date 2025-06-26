
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
import BookBasicInfoForm from './book-forms/BookBasicInfoForm';
import BookTypeAndPriceForm from './book-forms/BookTypeAndPriceForm';
import BookDatePickerForm from './book-forms/BookDatePickerForm';

const AddBookDialog = ({ onAddBook, categories, promotions = [] }) => {
  const [open, setOpen] = useState(false);
  const [publishDate, setPublishDate] = useState();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publisher: '',
    publishYear: '',
    quantity: '',
    price: '',
    rentPrice: '',
    description: '',
    appliedPromotion: '',
    type: {
      sale: false,
      rent: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let type = 'sale';
    if (formData.type.sale && formData.type.rent) {
      type = 'both';
    } else if (formData.type.rent) {
      type = 'rent';
    }

    const newBook = {
      ...formData,
      id: Date.now(),
      isbn: `978-${Date.now().toString().slice(-10)}`,
      quantity: parseInt(formData.quantity),
      available: parseInt(formData.quantity),
      publishYear: publishDate ? publishDate.getFullYear() : new Date().getFullYear(),
      price: parseFloat(formData.price) || 0,
      rentPrice: parseFloat(formData.rentPrice) || 0,
      type: type,
      status: 'available'
    };
    
    onAddBook(newBook);
    
    setFormData({
      title: '',
      author: '',
      category: '',
      publisher: '',
      publishYear: '',
      quantity: '',
      price: '',
      rentPrice: '',
      description: '',
      appliedPromotion: '',
      type: { sale: false, rent: false }
    });
    setPublishDate(undefined);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (typeKey, checked) => {
    setFormData({
      ...formData,
      type: {
        ...formData.type,
        [typeKey]: checked
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-success">
          <Plus size={16} className="me-1" />
          Thêm Sách Mới
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Sách Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <BookBasicInfoForm 
            formData={formData}
            handleInputChange={handleInputChange}
            categories={categories}
          />

          <BookDatePickerForm 
            publishDate={publishDate}
            setPublishDate={setPublishDate}
          />

          <div>
            <Label htmlFor="description">Mô Tả Sách</Label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control w-full"
              placeholder="Nhập mô tả về nội dung sách..."
            />
          </div>

          <div>
            <Label htmlFor="quantity">Số Lượng *</Label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              className="form-control w-full"
              required
            />
          </div>

          <div>
            <Label htmlFor="appliedPromotion">Áp Dụng Khuyến Mãi</Label>
            <select
              id="appliedPromotion"
              name="appliedPromotion"
              value={formData.appliedPromotion}
              onChange={handleInputChange}
              className="form-select w-full"
            >
              <option value="">Không áp dụng khuyến mãi</option>
              {promotions.map((promotion) => (
                <option key={promotion.id} value={promotion.id}>
                  {promotion.name} - {promotion.type === 'percentage' ? `${promotion.value}%` : `${promotion.value.toLocaleString()}đ`}
                </option>
              ))}
            </select>
          </div>

          <BookTypeAndPriceForm 
            formData={formData}
            handleTypeChange={handleTypeChange}
            handleInputChange={handleInputChange}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Thêm Sách</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
