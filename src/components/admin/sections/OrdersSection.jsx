import React, { useEffect, useState } from 'react';
import { orderService } from '../../../services/orderService';
import { toast } from 'react-toastify';

const getStatusLabel = (status) => {
  const STATUS_LABELS = {
    0: 'Chờ xử lý',
    1: 'Đã xác nhận',
    2: 'Đang giao',
    3: 'Hoàn thành',
    6: 'Đã hủy',
  };
  return STATUS_LABELS[status] || 'Không rõ';
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 0: return 'badge bg-secondary';
    case 1: return 'badge bg-primary';
    case 2: return 'badge bg-info';
    case 3: return 'badge bg-success';
    case 6: return 'badge bg-danger';
    default: return 'badge bg-light text-dark';
  }
};

const formatCurrency = (value) => {
  return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || '0đ';
};

const formatDate = (dateString) => {
  if (!dateString) return '---';
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();

      const transformed = data.map((o) => ({
        id: o.OrderId,
        customerName: o.Username || 'Không rõ',
        orderDate: o.OrderDate,
        totalAmount: o.TotalAmount || 0,
        status: o.Status,
      }));

      // Sắp xếp theo ngày mới nhất và lấy 5 đơn gần nhất
      const sorted = transformed
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);

      setOrders(sorted);
    } catch (err) {
      toast.error('❌ Không thể tải đơn hàng gần đây');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRecentAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">🕒 Đơn Hàng Gần Đây</h5>
          <a href="/admin/sales-orders" className="text-primary small">
            Xem tất cả ›
          </a>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {orders.length === 0 ? (
                <li className="list-group-item text-muted">Không có đơn hàng nào</li>
              ) : (
                orders.map((order) => (
                  <li
                    key={order.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{order.customerName}</strong>
                      <div className="text-muted small">{formatDate(order.orderDate)}</div>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold">{formatCurrency(order.totalAmount)}</span>
                      <div>
                        <span className={getStatusBadgeClass(order.status)}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="text-end text-muted small">
              Tổng tiền 5 đơn gần nhất:{' '}
              <span className="fw-bold text-success">
                {formatCurrency(totalRecentAmount)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;
