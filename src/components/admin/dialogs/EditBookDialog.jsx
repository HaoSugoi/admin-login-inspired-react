
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import BookBasicInfoForm from './book-forms/BookBasicInfoForm';
import BookTypeAndPriceForm from './book-forms/BookTypeAndPriceForm';
import BookDatePickerForm from './book-forms/BookDatePickerForm';

const EditBookDialog = ({ book, open, onClose, onUpdateBook, categories, promotions = [] }) => {
  const [publishDate, setPublishDate] = useState();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publisher: '',
    quantity: '',
    price: '',
    rentPrice: '',
    description: '',
    appliedPromotion: '',
    type: {
      sale: false,
      rent: false
    },
    status: 'available'
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        category: book.category || '',
        publisher: book.publisher || '',
        quantity: book.quantity || '',
        price: book.price || '',
        rentPrice: book.rentPrice || '',
        description: book.description || '',
        appliedPromotion: book.appliedPromotion || '',
        type: {
          sale: book.type === 'sale' || book.type === 'both',
          rent: book.type === 'rent' || book.type === 'both'
        },
        status: book.status || 'available'
      });
      
      if (book.publishYear) {
        setPublishDate(new Date(book.publishYear, 0, 1));
      }
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let type = 'sale';
    if (formData.type.sale && formData.type.rent) {
      type = 'both';
    } else if (formData.type.rent) {
      type = 'rent';
    }

    const updatedBook = {
      ...book,
      ...formData,
      quantity: parseInt(formData.quantity),
      publishYear: publishDate ? publishDate.getFullYear() : book.publishYear,
      price: parseFloat(formData.price) || 0,
      rentPrice: parseFloat(formData.rentPrice) || 0,
      type: type
    };
    onUpdateBook(updatedBook);
    onClose();
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

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto min-h-[700px]">
        <DialogHeader>
          <DialogTitle className="text-center">Cập Nhật Thông Tin Sách</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
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
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control w-full"
              placeholder="Nhập mô tả về nội dung sách..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Số Lượng</Label>
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
              <Label htmlFor="status">Trạng Thái</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="available">Có sẵn</option>
                <option value="hidden">Ẩn không bán/thuê</option>
                <option value="out_of_stock">Hết hàng</option>
              </select>
            </div>
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

export default EditBookDialog;
