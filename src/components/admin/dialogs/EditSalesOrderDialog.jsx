
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EditSalesOrderDialog = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingAddress: '',
    paymentMethod: 'Tiền mặt',
    status: 'Chờ xử lý',
    notes: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || '',
        customerPhone: order.customerPhone || '',
        customerEmail: order.customerEmail || '',
        shippingAddress: order.shippingAddress || '',
        paymentMethod: order.paymentMethod || 'Tiền mặt',
        status: order.status || 'Chờ xử lý',
        notes: order.notes || ''
      });
    }
  }, [order]);

  const handleSave = () => {
    onSave(order.id, formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh Sửa Đơn Hàng</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Tên Khách Hàng</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="customerPhone">Số Điện Thoại</Label>
            <Input
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="shippingAddress">Địa Chỉ Giao Hàng</Label>
            <Textarea
              id="shippingAddress"
              value={formData.shippingAddress}
              onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
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
            <Label htmlFor="status">Trạng Thái</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                <SelectItem value="Đã giao">Đã giao</SelectItem>
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

export default EditSalesOrderDialog;
