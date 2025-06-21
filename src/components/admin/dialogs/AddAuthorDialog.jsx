
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

const AddAuthorDialog = ({ onAddAuthor }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    birthYear: '',
    nationality: '',
    avatar: '/placeholder.svg'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAuthor = {
      ...formData,
      id: Date.now(),
      birthYear: parseInt(formData.birthYear),
      booksCount: 0
    };
    onAddAuthor(newAuthor);
    setFormData({
      name: '',
      biography: '',
      birthYear: '',
      nationality: '',
      avatar: '/placeholder.svg'
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
          Thêm Tác Giả
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg min-h-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm Tác Giả Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6"> {/* space-y-6 để đồng bộ */}
          <div>
            <Label htmlFor="name">Tên Tác Giả</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Nhập tên tác giả"
            />
          </div>
          <div>
            <Label htmlFor="biography">Tiểu Sử</Label>
            <Input
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              placeholder="Mô tả về tác giả"
            />
          </div>
          <div>
            <Label htmlFor="birthYear">Năm Sinh</Label>
            <Input
              id="birthYear"
              name="birthYear"
              type="number"
              value={formData.birthYear}
              onChange={handleInputChange}
              placeholder="Năm sinh"
            />
          </div>
          <div>
            <Label htmlFor="nationality">Quốc Tịch</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              placeholder="Quốc tịch"
            />


          </div>

          
          <div className="flex justify-end space-x-2 pt-6"> {/* pt-6 giống Employee */}
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Thêm Tác Giả</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuthorDialog;
