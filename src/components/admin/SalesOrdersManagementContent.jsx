import React, { useEffect, useState } from 'react';
import AdminTopbar from './AdminTopbar';
import SalesOrdersListSection from './sections/SalesOrdersListSection';
import SalesOrdersStatisticsSection from './sections/SalesOrdersStatisticsSection';
import { orderService } from '../../services/orderService';
import { toast } from 'react-toastify';

const SalesOrdersManagementContent = (props) => {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getAllOrders();

      const transformedOrders = data.map((o) => ({
        id: o.OrderId,
        orderNumber: o.OrderId.slice(0, 8).toUpperCase(),
        customerName: o.Username || 'Chưa rõ',
        customerPhone: o.Phone || '---',
        shippingAddress: o.Address,
        orderDate: o.OrderDate.split('T')[0],
        totalAmount: o.TotalAmount,
        shippingFee: o.HasShippingFee ? o.ShippingFee : 0,
        status: o.Status,
        discountAmount: o.DiscountAmount,
        books: [], // nếu có chi tiết đơn hàng thì map thêm
      }));

      setOrders(transformedOrders);

      const stats = {
        totalOrders: transformedOrders.length,
        pendingOrders: transformedOrders.filter((o) => o.status === 0).length,
        processingOrders: transformedOrders.filter((o) => o.status === 1 || o.status === 2).length,
        completedOrders: transformedOrders.filter((o) => o.status === 3).length,
        cancelledOrders: transformedOrders.filter((o) => o.status === 4 || o.status === 5).length,
        totalRevenue: transformedOrders
          .filter((o) => o.status === 3)
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
      };

      setStatistics(stats);
      setError(null);
    } catch (err) {
      setError('Lỗi khi tải dữ liệu đơn hàng');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (data) => {
    try {
      await orderService.createOrder(data);
      toast.success('✅ Tạo đơn hàng thành công');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error('❌ Không thể tạo đơn hàng');
    }
  };

  const handleUpdateOrder = async (id, data) => {
    try {
      await orderService.updateOrder(id, data);
      toast.success('✅ Cập nhật đơn hàng thành công');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error('❌ Không thể cập nhật đơn hàng');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      try {
        await orderService.deleteOrder(id);
        toast.success('🗑️ Đã xóa đơn hàng');
        fetchOrders();
      } catch (err) {
        console.error(err);
        toast.error('❌ Không thể xóa đơn hàng');
      }
    }
  };

  const handleUpdateOrderStatus = async (id, newStatus) => {
    try {
      await orderService.updateOrderStatus(id, newStatus);
      toast.success('✅ Cập nhật trạng thái thành công');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error('❌ Không thể cập nhật trạng thái');
    }
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Bán Hàng</h4>
          </div>
        </div>

        {isLoading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <div className="row">
              <SalesOrdersStatisticsSection statistics={statistics} />
            </div>
            <div className="row">
              <SalesOrdersListSection
                orders={orders}
                onAdd={handleCreateOrder}
                onUpdate={handleUpdateOrder}
                onDelete={handleDeleteOrder}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesOrdersManagementContent;
