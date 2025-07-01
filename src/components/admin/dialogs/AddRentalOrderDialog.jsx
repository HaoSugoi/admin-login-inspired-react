
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddRentalOrderDialog = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    readerName: '',
    readerPhone: '',
    readerEmail: '',
    readerAddress: '',
    rentalDays: 7,
    deposit: 100000,
    notes: ''
  });

  const handleSave = () => {
    const rentalDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + formData.rentalDays);

    const rentalData = {
      ...formData,
      rentalNumber: `TH${Date.now().toString().slice(-6)}`,
      rentalDate: rentalDate.toISOString().split('T')[0],
      expectedReturnDate: returnDate.toISOString().split('T')[0],
      status: 'Chờ xác nhận',
      totalAmount: formData.deposit
    };
    
    onSave(rentalData);
    setFormData({
      readerName: '',
      readerPhone: '',
      readerEmail: '',
      readerAddress: '',
      rentalDays: 7,
      deposit: 100000,
      notes: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo Đơn Thuê Sách Mới</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="readerName">Tên Độc Giả</Label>
            <Input
              id="readerName"
              value={formData.readerName}
              onChange={(e) => setFormData({...formData, readerName: e.target.value})}
              placeholder="Nhập tên độc giả"
            />
          </div>

          <div>
            <Label htmlFor="readerPhone">Số Điện Thoại</Label>
            <Input
              id="readerPhone"
              value={formData.readerPhone}
              onChange={(e) => setFormData({...formData, readerPhone: e.target.value})}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <Label htmlFor="readerEmail">Email</Label>
            <Input
              id="readerEmail"
              type="email"
              value={formData.readerEmail}
              onChange={(e) => setFormData({...formData, readerEmail: e.target.value})}
              placeholder="Nhập email"
            />
          </div>

          <div>
            <Label htmlFor="readerAddress">Địa Chỉ</Label>
            <Textarea
              id="readerAddress"
              value={formData.readerAddress}
              onChange={(e) => setFormData({...formData, readerAddress: e.target.value})}
              placeholder="Nhập địa chỉ"
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
              placeholder="Nhập số tiền cọc"
            />
          </div>

          <div>
            <Label htmlFor="notes">Ghi Chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Ghi chú đặc biệt"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Hủy</Button>
            <Button onClick={handleSave}>Tạo Đơn Thuê</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRentalOrderDialog;
