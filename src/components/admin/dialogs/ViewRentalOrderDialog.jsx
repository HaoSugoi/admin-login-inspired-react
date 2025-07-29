import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { rentalService } from "@/services/rentalService";

const RENTAL_STATUSES = {
  0: "Chờ xác nhận",
  1: "Đã xác nhận",
  2: "Đang giao",
  3: "Hoàn thành",
  4: "Đang thuê",
  5: "Quá hạn",
  6: "Đã hủy",
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
          console.log("Rental details:", data);
          setRentalDetails(data);
        })
        .catch(() => {
          setRentalDetails(null);
        })
        .finally(() => setLoading(false));
    }
  }, [rental]);

  if (!rental) return null;

  const totalRentalFee = rentalDetails?.reduce(
    (sum, item) => sum + (item.RentalFee || 0),
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ width: "420px", maxHeight: "90vh", overflowY: "auto" }}>

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
                <p className="text-sm text-gray-600">Địa chỉ</p>
                <p className="font-medium">{rental.Address || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <span className={`px-2 py-1 text-sm rounded inline-block`}>
                  {RENTAL_STATUSES[rental.Status]}
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Thông tin đơn thuê */}
          <section>
            <h3 className="text-lg font-semibold mb-3">📄 Thông Tin Đơn Thuê</h3>
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Danh Sách Sách</h3>
            {rentalDetails?.length > 0 ? (
              <div className="max-h-[240px] overflow-y-auto space-y-4 bg-white p-4 rounded-lg border border-gray-200 shadow-md">
                {rentalDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 transition duration-200"
                  >
                    {/* Trái */}
                    <div className="w-2/3 space-y-1 text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 text-base">
                        {item.BookTitle?.length > 40
                          ? item.BookTitle.slice(0, 40) + "..."
                          : item.BookTitle || "Tên sách"}
                      </p>
                   
                      <p><span className="font-medium">💡 Ban đầu:</span> {item.Condition || "--"}</p>
                      <p
                            className="cursor-pointer text-blue-600"
                            onClick={() => alert(item.StatusDescription || "Không có mô tả")}
                          >
                            <span className="font-medium text-gray-700">📝 Mô tả:</span>{" "}
                            {item.StatusDescription
                              ? item.StatusDescription.length > 15
                                ? item.StatusDescription.slice(0, 15) + "..."
                                : item.StatusDescription
                              : "--"}
                          </p>
                    </div>

                    {/* Phải */}
                    <div className="w-1/3 text-right space-y-1 text-sm">
                      <p className="text-blue-700 font-semibold text-base">
                        {formatCurrency(item.BookPrice)}
                      </p>
                      {rental.Status === 3 && (
                        <>
                          <p><span className="font-medium">🔄 Sau trả:</span> {item.ReturnCondition || "--"}</p>
                          <p
                            className="cursor-pointer  text-blue-600"
                            onClick={() => alert(item.ConditionDescription || "Không có mô tả")}
                          >
                            <span className="font-medium text-gray-700">📄 Mô tả trả:</span>{" "}
                            {item.ConditionDescription
                              ? item.ConditionDescription.length > 15
                                ? item.ConditionDescription.slice(0, 15) + "..."
                                : item.ConditionDescription
                              : "--"}
                          </p>

                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Không có sách nào trong đơn thuê này.</p>
            )}
          </section>




          <Separator />

          {/* Tóm tắt thanh toán */}
          <section>
            <h3 className="text-lg font-semibold mb-3">💰 Tóm Tắt Thanh Toán</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Tiền thuê:</span>
                <span>{formatCurrency(totalRentalFee)}</span>
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
              {rental.ActualRefundAmount != null && (
                <div className="flex justify-between">
                  <span>Tiền khấu trừ:</span>
                  <span className="text-green-700">
                    {formatCurrency(rental.TotalDeposit - rental.ActualRefundAmount)}
                  </span>
                </div>

              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                <span>Tổng cộng:</span>
                <span className="text-primary">
                  {formatCurrency(
                    (totalRentalFee || 0) +
                    (rental.TotalDeposit || 0) +
                    (rental.ShippingFee || 0) -
                    (rental.ActualRefundAmount || 0)
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
