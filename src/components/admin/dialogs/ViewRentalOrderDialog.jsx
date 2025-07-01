
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ViewRentalOrderDialog = ({ isOpen, onClose, rental }) => {
  if (!rental) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xác nhận': return 'bg-yellow-100 text-yellow-800';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800';
      case 'Đã giao': return 'bg-green-100 text-green-800';
      case 'Đã trả': return 'bg-purple-100 text-purple-800';
      case 'Quá hạn': return 'bg-red-100 text-red-800';
      case 'Đã hủy': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi Tiết Đơn Thuê #{rental.rentalNumber}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Thông tin độc giả */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông Tin Độc Giả</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên độc giả</p>
                <p className="font-medium">{rental.readerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium">{rental.readerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{rental.readerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <Badge className={getStatusColor(rental.status)}>
                  {rental.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Thông tin đơn thuê */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông Tin Đơn Thuê</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ngày thuê</p>
                <p className="font-medium">{new Date(rental.rentalDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày trả dự kiến</p>
                <p className="font-medium">{new Date(rental.expectedReturnDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số ngày thuê</p>
                <p className="font-medium">{rental.rentalDays} ngày</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiền cọc</p>
                <p className="font-medium text-green-600">{formatCurrency(rental.deposit)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Địa chỉ */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Địa Chỉ</h3>
            <p>{rental.readerAddress}</p>
          </div>

          <Separator />

          {/* Danh sách sách thuê */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Danh Sách Sách Thuê</h3>
            <div className="space-y-2">
              {rental.books?.map((book, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">Mã sách: {book.bookCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(book.rentalPrice)}</p>
                    <p className="text-sm text-gray-600">Giá thuê/ngày</p>
                  </div>
                </div>
              )) ?? (
                <p className="text-gray-500 text-center py-4">Chưa có sách nào được chọn</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Tổng tiền */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span>Tổng tiền thuê:</span>
              <span>{formatCurrency(rental.totalRentalFee || 0)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tiền cọc:</span>
              <span>{formatCurrency(rental.deposit || 0)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-green-600">{formatCurrency(rental.totalAmount || rental.deposit || 0)}</span>
            </div>
          </div>

          {rental.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Ghi Chú</h3>
                <p className="text-gray-700">{rental.notes}</p>
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

export default ViewRentalOrderDialog;
