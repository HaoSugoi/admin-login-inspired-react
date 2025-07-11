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
import apiClient from "@/services/api"; // hoặc đường dẫn đúng

const ORDER_STATUSES = [
  { value: 0, label: "Chờ xử lý" },
  { value: 1, label: "Đã xác nhận" },
  { value: 2, label: "Đang giao" },
  { value: 3, label: "Đã giao" },
  { value: 4, label: "Đã hủy" },
  { value: 5, label: "Thất bại" },
  { value: 6, label: "Quá hạn" },
];

const getStatusLabel = (value) =>
  ORDER_STATUSES.find((s) => s.value === value)?.label || `Trạng thái ${value}`;

const ViewSalesOrderDialog = ({ isOpen, onClose, order }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    const id = order?.id || order?.OrderId; // ✅ nằm bên trong useEffect

    if (!id || !isOpen) return;

    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const response = await apiClient.get(`/admin/saleorders/${id}/details`);
        setOrderDetails(response.data);
        setErrorDetails(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorDetails("Lỗi khi tải chi tiết đơn hàng");
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [order, isOpen]);

  if (!order) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-indigo-100 text-indigo-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-red-100 text-red-800";
      case 5:
        return "bg-red-200 text-red-900";
      case 6:
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90%] p-6 rounded-2xl my-8">
        <DialogHeader>
          <DialogTitle>
            🧾 Chi Tiết Đơn Hàng #
            {order.orderNumber || order.id || order.OrderId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thông tin khách hàng */}
          <section>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
              👤 Thông Tin Khách Hàng
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Tên khách hàng</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted">Số điện thoại</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              {/* <div>
                <p className="text-muted">Email</p>
                <p className="font-medium">{order.customerEmail || '-'}</p>
              </div> */}
              <div>
                <p className="text-muted">Trạng thái</p>
                <Badge
                  className={`${getStatusColor(
                    order.status
                  )} font-medium px-3 py-1`}
                >
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
            </div>
          </section>

          <Separator />

          {/* Thông tin đơn hàng */}
          <section>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
              🛒 Thông Tin Đơn Hàng
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Ngày đặt</p>
                <p className="font-medium">
                  {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="text-muted">Phương thức thanh toán</p>
                <p className="font-medium">
                  {order.paymentMethod || "Tiền mặt"}
                </p>
              </div>
            </div>
          </section>
          <Separator />

          {/* Địa chỉ giao hàng */}
          <section>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
              🏠 Địa Chỉ Giao Hàng
            </h3>
            <p className="text-sm text-gray-800">
              {order.shippingAddress || order.address}
            </p>
          </section>

          <Separator />

          {/* Danh sách sản phẩm */}
          <section>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
              📚 Danh Sách Sách
            </h3>

            {loadingDetails ? (
              <p>Đang tải chi tiết đơn hàng...</p>
            ) : errorDetails ? (
              <p className="text-red-500">{errorDetails}</p>
            ) : (
              <div className="space-y-3">
                {orderDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-gray-200 rounded p-3 bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{item.ProductName}</p>
                      <p className="text-sm text-muted">
                        Số lượng: {item.Quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatCurrency(item.UnitPrice)}
                      </p>
                      <p className="text-sm text-muted">
                        {formatCurrency(item.UnitPrice)} / cuốn
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Tổng cộng */}
          <section>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3">
              💰 Tóm Tắt Thanh Toán
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Tiền sách:</span>
                <span>
                  {formatCurrency(
                    orderDetails.reduce(
                      (total, item) => total + item.UnitPrice * item.Quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá:</span>
                <span className="text-red-600">
                  -{formatCurrency(order.discountAmount || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{formatCurrency(order.shippingFee || 0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
                <span>Tổng cộng:</span>
                <span className="text-green-600">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </section>

          {/* Ghi chú */}
          {order.notes && (
            <>
              <Separator />
              <section>
                <h3 className="text-lg font-semibold text-muted-foreground mb-3">
                  📝 Ghi Chú
                </h3>
                <p className="text-gray-800">{order.notes}</p>
              </section>
            </>
          )}

          {/* Footer */}
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

export default ViewSalesOrderDialog;
