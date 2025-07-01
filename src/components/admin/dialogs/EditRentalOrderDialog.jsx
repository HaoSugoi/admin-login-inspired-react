
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EditRentalOrderDialog = ({ isOpen, onClose, onSave, rental }) => {
  const [formData, setFormData] = useState({
    readerName: '',
    readerPhone: '',
    readerEmail: '',
    readerAddress: '',
    rentalDays: 7,
    deposit: 100000,
    status: 'Chờ xác nhận',
    notes: ''
  });

  useEffect(() => {
    if (rental) {
      setFormData({
        readerName: rental.readerName || '',
        readerPhone: rental.readerPhone || '',
        readerEmail: rental.readerEmail || '',
        readerAddress: rental.readerAddress || '',
        rentalDays: rental.rentalDays || 7,
        deposit: rental.deposit || 100000,
        status: rental.status || 'Chờ xác nhận',
        notes: rental.notes || ''
      });
    }
  }, [rental]);

  const handleSave = () => {
    onSave(rental.id, formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh Sửa Đơn Thuê</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="readerName">Tên Độc Giả</Label>
            <Input
              id="readerName"
              value={formData.readerName}
              onChange={(e) => setFormData({...formData, readerName: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="readerPhone">Số Điện Thoại</Label>
            <Input
              id="readerPhone"
              value={formData.readerPhone}
              onChange={(e) => setFormData({...formData, readerPhone: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="readerEmail">Email</Label>
            <Input
              id="readerEmail"
              type="email"
              value={formData.readerEmail}
              onChange={(e) => setFormData({...formData, readerEmail: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="readerAddress">Địa Chỉ</Label>
            <Textarea
              id="readerAddress"
              value={formData.readerAddress}
              onChange={(e) => setFormData({...formData, readerAddress: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="rentalDays">Số Ngày Thuê</Label>
            <Select value={formData.rentalDays.toString()} onValueChange={(value) => setFormData({...formData, rentalDays: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 ngày</SelectItem>
                <SelectItem value="14">14 ngày</SelectItem>
                <SelectItem value="21">21 ngày</SelectItem>
                <SelectItem value="30">30 ngày</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deposit">Tiền Cọc (VNĐ)</Label>
            <Input
              id="deposit"
              type="number"
              value={formData.deposit}
              onChange={(e) => setFormData({...formData, deposit: parseInt(e.target.value) || 0})}
            />
          </div>

          <div>
            <Label htmlFor="status">Trạng Thái</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                <SelectItem value="Đã xác nhận">Đã xác nhận</SelectItem>
                <SelectItem value="Đã giao">Đã giao</SelectItem>
                <SelectItem value="Đã trả">Đã trả</SelectItem>
                <SelectItem value="Quá hạn">Quá hạn</SelectItem>
                <SelectItem value="Đã hủy">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Ghi Chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Hủy</Button>
            <Button onClick={handleSave}>Cập Nhật</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRentalOrderDialog;
