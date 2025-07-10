import React, { useEffect, useState } from 'react';
import { orderService } from '@/services/orderService';
import { toast } from 'react-toastify';

const getStatusLabel = (status) => {
  const STATUS_LABELS = [
    'Chờ xử lý',
    'Đã xác nhận',
    'Đang giao',
    'Đã giao',
    'Đã hủy',
    'Thất bại',
    'Quá hạn',
  ];
  return STATUS_LABELS[status] || 'Không rõ';
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 0: return 'badge bg-secondary';
    case 1: return 'badge bg-primary';
    case 2: return 'badge bg-info';
    case 3: return 'badge bg-success';
    case 4:
    case 5: return 'badge bg-danger';
    case 6: return 'badge bg-warning';
    default: return 'badge bg-light text-dark';
  }
};

const formatCurrency = (value) => {
  return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0đ';
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();

      const transformed = data.map((o) => ({
        id: o.OrderId,
        customerName: o.UserName || 'Không rõ',
        orderDate: o.OrderDate?.split('T')[0],
        totalAmount: o.TotalAmount || 0,
        status: o.Status,
      }));

      setOrders(transformed);
    } catch (err) {
      toast.error('❌ Không thể tải đơn hàng');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Đơn Hàng Gần Đây</h5>
          <h5>Tong tien</h5>
          <a href="/admin/sales-orders" className="text-primary">Xem tất cả ›</a>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <ul className="list-group list-group-flush">
            {orders.length === 0 ? (
              <li className="list-group-item text-muted">Không có đơn hàng nào</li>
            ) : (
              orders.slice(0, 5).map((order) => (
                <li
                  key={order.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{order.customerName}</strong>
                    <div className="text-muted small">{order.orderDate}</div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold">{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <span className={getStatusBadgeClass(order.status)}>
                    {getStatusLabel(order.status)}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;
