
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';

const EditBookDialog = ({ book, open, onClose, onUpdateBook, categories }) => {
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
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Cập Nhật Thông Tin Sách</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tên Sách</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Tác Giả</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Thể Loại</Label>
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
              <Label htmlFor="publisher">Nhà Xuất Bản</Label>
              <Input
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Năm Xuất Bản</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !publishDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {publishDate ? format(publishDate, "yyyy") : <span>Chọn năm xuất bản</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={setPublishDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

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
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
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
            <Label>Loại Sách</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sale-edit"
                  checked={formData.type.sale}
                  onCheckedChange={(checked) => handleTypeChange('sale', checked)}
                />
                <Label htmlFor="sale-edit">Bán</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rent-edit"
                  checked={formData.type.rent}
                  onCheckedChange={(checked) => handleTypeChange('rent', checked)}
                />
                <Label htmlFor="rent-edit">Thuê</Label>
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
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
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
