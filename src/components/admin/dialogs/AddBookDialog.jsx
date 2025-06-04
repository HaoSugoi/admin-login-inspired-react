
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus } from 'lucide-react';

const AddBookDialog = ({ onAddBook, categories }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    publishYear: '',
    quantity: '',
    price: '',
    rentPrice: '',
    type: 'sale' // sale or rent
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...formData,
      id: Date.now(),
      quantity: parseInt(formData.quantity),
      available: parseInt(formData.quantity),
      publishYear: parseInt(formData.publishYear),
      price: parseFloat(formData.price),
      rentPrice: parseFloat(formData.rentPrice),
      status: 'available'
    };
    onAddBook(newBook);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publisher: '',
      publishYear: '',
      quantity: '',
      price: '',
      rentPrice: '',
      type: 'sale'
    });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm Sách Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Thể Loại</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
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
          <div>
            <Label htmlFor="publishYear">Năm Xuất Bản</Label>
            <Input
              id="publishYear"
              name="publishYear"
              type="number"
              value={formData.publishYear}
              onChange={handleInputChange}
              required
            />
          </div>
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
            <Label htmlFor="type">Loại</Label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="sale">Bán</option>
              <option value="rent">Thuê</option>
              <option value="both">Cả hai</option>
            </select>
          </div>
          {(formData.type === 'sale' || formData.type === 'both') && (
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
          {(formData.type === 'rent' || formData.type === 'both') && (
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
          <div className="flex justify-end space-x-2">
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
