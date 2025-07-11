import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { rentalService } from "@/services/rentalService";

const RENTAL_STATUSES = {
  0: 'Quá hạn',
  1: 'Đã xác nhận',
  2: 'Đã giao',
  3: 'Đã trả',
  4: 'Thất bại',
  5: 'Đã hủy',
  6: 'Chờ xác nhận'
};

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-blue-100 text-blue-800";
    case 2:
      return "bg-green-100 text-green-800";
    case 3:
      return "bg-purple-100 text-purple-800";
    case 4:
      return "bg-red-200 text-red-800";
    case 5:
      return "bg-gray-300 text-gray-700";
    case 6:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount || 0);

const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const ViewRentalOrderDialog = ({ isOpen, onClose, rental }) => {
  const [rentalDetails, setRentalDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rental?.OrderId) {
      setLoading(true);
      rentalService
        .getRentalDetailsById(rental.OrderId)
        .then((data) => {
          console.log("Rental details:", data); // 👈 Thêm dòng này
          setRentalDetails(data);
        })
        .catch(() => {
          setRentalDetails(null);
        })
        .finally(() => setLoading(false));
    }
  }, [rental]);

  const totalRentalFee = rentalDetails?.Items?.reduce(
    (sum, item) => sum + (item.RentalFee || 0),
    0
  );
  if (!rental) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            🧾 Chi Tiết Đơn Thuê #{rental.OrderId.slice(0, 8).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thông tin độc giả */}
          <section>
            <h3 className="text-lg font-semibold mb-3">👤 Thông Tin Độc Giả</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Họ tên</p>
                <p className="font-medium">{rental.UserName || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium">{rental.Phone || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{rental.Email || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <Badge className={getStatusColor(rental.Status)}>
                  {RENTAL_STATUSES[rental.Status]}
                </Badge>
              </div>
            </div>
          </section>

          <Separator />

          {/* Thông tin đơn thuê */}
          <section>
            <h3 className="text-lg font-semibold mb-3">
              📄 Thông Tin Đơn Thuê
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ngày thuê</p>
                <p className="font-medium">{formatDate(rental.StartDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày trả dự kiến</p>
                <p className="font-medium">{formatDate(rental.EndDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số ngày thuê</p>
                <p className="font-medium">{rental.RentalDays} ngày</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày trả thực tế</p>
                <p className="font-medium">
                  {formatDate(rental.ActualReturnDate)}
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Danh sách sách */}
          <section>
            <h3 className="text-lg font-semibold mb-3">📚 Danh Sách Sách</h3>
            {rentalDetails?.length > 0 ? (
  <div className="space-y-2">
    {rentalDetails.map((item, idx) => (
      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
        <div>
          <p className="font-medium">{item.BookTitle || 'Tên sách'}</p>
          <p className="text-sm text-gray-600">Mã sách: {item.Id || '--'}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(item.BookPrice)}</p>
          <p className="text-sm text-gray-600">{formatCurrency(item.RentalFee)} /ngày</p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">Không có sách nào trong đơn thuê này.</p>
)}

          </section>

          <Separator />

          {/* Tóm tắt thanh toán */}
          <section>
            <h3 className="text-lg font-semibold mb-3">
              💰 Tóm Tắt Thanh Toán
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Tiền thuê:</span>
                <span>{formatCurrency(rentalDetails?.[0]?.RentalFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tiền cọc:</span>
                <span>{formatCurrency(rental.TotalDeposit)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{formatCurrency(rental.ShippingFee)}</span>
              </div>
              {rental.ActualRefundAmount != null && (
                <div className="flex justify-between">
                  <span>Tiền hoàn lại:</span>
                  <span className="text-green-700">
                    {formatCurrency(rental.ActualRefundAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                <span>Tổng cộng:</span>
                <span className="text-primary">
                  {formatCurrency(
                    (rentalDetails?.[0]?.RentalFee || 0) +
                      (rental.TotalDeposit || 0) +
                      (rental.ShippingFee || 0)
                  )}
                </span>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRentalOrderDialog;
