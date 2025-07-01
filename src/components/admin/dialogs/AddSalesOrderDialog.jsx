
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddSalesOrderDialog = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    paymentMethod: 'Tiền mặt',
    notes: '',
    books: []
  });

  const handleSave = () => {
    const orderData = {
      ...formData,
      orderNumber: `DH${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Chờ xử lý',
      totalAmount: 0,
      shippingFee: 50000
    };
    onSave(orderData);
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      paymentMethod: 'Tiền mặt',
      notes: '',
      books: []
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo Đơn Hàng Bán Mới</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Tên Khách Hàng</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              placeholder="Nhập tên khách hàng"
            />
          </div>

          <div>
            <Label htmlFor="customerPhone">Số Điện Thoại</Label>
            <Input
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
              placeholder="Nhập email"
            />
          </div>

          <div>
            <Label htmlFor="customerAddress">Địa Chỉ Giao Hàng</Label>
            <Textarea
              id="customerAddress"
              value={formData.customerAddress}
              onChange={(e) => setFormData({...formData, customerAddress: e.target.value})}
              placeholder="Nhập địa chỉ giao hàng"
            />
          </div>

          <div>
            <Label htmlFor="paymentMethod">Phương Thức Thanh Toán</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                <SelectItem value="COD">COD</SelectItem>
              </SelectContent>
            </Select>
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
            <Button onClick={handleSave}>Tạo Đơn Hàng</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSalesOrderDialog;
