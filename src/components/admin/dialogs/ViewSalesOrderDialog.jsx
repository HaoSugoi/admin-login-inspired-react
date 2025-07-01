
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ViewSalesOrderDialog = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xử lý': return 'bg-yellow-100 text-yellow-800';
      case 'Đang xử lý': return 'bg-blue-100 text-blue-800';
      case 'Đã giao': return 'bg-green-100 text-green-800';
      case 'Đã hủy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi Tiết Đơn Hàng #{order.orderNumber}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Thông tin khách hàng */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông Tin Khách Hàng</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên khách hàng</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Thông tin đơn hàng */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông Tin Đơn Hàng</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ngày đặt</p>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Địa chỉ giao hàng */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Địa Chỉ Giao Hàng</h3>
            <p>{order.shippingAddress}</p>
          </div>

          <Separator />

          {/* Danh sách sách */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Danh Sách Sách</h3>
            <div className="space-y-2">
              {order.books?.map((book, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">Số lượng: {book.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(book.subtotal)}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(book.price)}/cuốn</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tổng tiền */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span>Tạm tính:</span>
              <span>{formatCurrency((order.totalAmount || 0) - (order.shippingFee || 0) + (order.discount || 0))}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Giảm giá:</span>
              <span>-{formatCurrency(order.discount || 0)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Phí vận chuyển:</span>
              <span>{formatCurrency(order.shippingFee || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-green-600">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>

          {order.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Ghi Chú</h3>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose}>Đóng</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSalesOrderDialog;
