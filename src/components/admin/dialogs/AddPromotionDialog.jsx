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

// ✅ Chuyển từ dd/mm/yyyy → ISO string
const parseDateToISOString = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}T00:00:00`).toISOString();
};

const AddPromotionDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      value: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newPromotion = {
      PromotionName: formData.name,
      DiscountPercentage: parseFloat(formData.value),
      StartDate: new Date(formData.startDate).toISOString(),
      EndDate: new Date(formData.endDate).toISOString()
    };
  
    onAdd(newPromotion);
    resetForm();
    setOpen(false);
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="btn btn-success">
          <Plus size={16} className="me-1" />
          Thêm Khuyến Mãi
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm Khuyến Mãi Mới</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tên Khuyến Mãi</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="VD: Giảm 20%"
            />
          </div>

          <div>
            <Label htmlFor="value">Giảm Giá (%)</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value)}
              required
              placeholder="VD: 20"
            />
          </div>

          <Input
  id="startDate"
  type="date"
  value={formData.startDate}
  onChange={(e) => handleChange('startDate', e.target.value)}
  required
/>

<Input
  id="endDate"
  type="date"
  value={formData.endDate}
  onChange={(e) => handleChange('endDate', e.target.value)}
  required
/>


          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
<Button type="submit">Thêm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromotionDialog;