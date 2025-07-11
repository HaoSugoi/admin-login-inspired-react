import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Edit, Trash2, Package } from 'lucide-react';
import AddSalesOrderDialog from '../dialogs/AddSalesOrderDialog';
import EditSalesOrderDialog from '../dialogs/EditSalesOrderDialog';
import ViewSalesOrderDialog from '../dialogs/ViewSalesOrderDialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import apiClient from '@/services/api';
import { toast } from 'react-toastify';

const ORDER_STATUSES = [
  { value: 0, label: 'Chờ xử lý' },
  { value: 1, label: 'Đã xác nhận' },
  { value: 2, label: 'Đang giao' },
  { value: 3, label: 'Đã giao' },
  { value: 4, label: 'Đã hủy' },
  { value: 5, label: 'Thất bại' },
  { value: 6, label: 'Quá hạn' },
];

const getStatusLabel = (value) =>
  ORDER_STATUSES.find((s) => s.value === value)?.label || value;

const getStatusColor = (status) => {
  switch (status) {
    case 0: return 'bg-yellow-100 text-yellow-800';
    case 1: return 'bg-blue-100 text-blue-800';
    case 2: return 'bg-indigo-100 text-indigo-800';
    case 3: return 'bg-green-100 text-green-800';
    case 4: return 'bg-red-100 text-red-800';
    case 5: return 'bg-red-200 text-red-900';
    case 6: return 'bg-gray-300 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const SalesOrdersListSection = ({ orders, onAdd, onUpdate, onDelete, onUpdateStatus }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowViewDialog(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditDialog(true);
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await apiClient.put(`/admin/saleorders/${id}/status`, newStatus, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success('✅ Trạng thái đã được cập nhật');
      onUpdateStatus?.(id, newStatus); // gọi callback để refetch
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('❌ Không thể cập nhật trạng thái');
    }
  };

  return (
    <>
      <div className="col-12">
        <Card>
          <CardHeader className="d-flex flex-row align-items-center justify-content-between">
            <CardTitle>Danh Sách Đơn Hàng Bán</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <Package className="me-2" size={16} />
              Tạo Đơn Hàng
            </Button>
          </CardHeader>
          <CardContent>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Ngày Đặt</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th className="text-end">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        Không có đơn hàng nào.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-bold">{order.orderNumber}</td>
                        <td>
                          <div>
                            <div className="fw-medium">
                              {order.customerName || 'Chưa rõ'}
                            </div>
                            <small className="text-muted">
                              {order.customerPhone || '---'}
                            </small>
                          </div>
                        </td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td className="fw-bold text-success">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={`${getStatusColor(order.status)} px-3 py-1 rounded text-sm`}>
                                {getStatusLabel(order.status)}
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start">
                              {ORDER_STATUSES.map((s) => (
                                <DropdownMenuItem
                                  key={s.value}
                                  onClick={() => handleChangeStatus(order.id, s.value)}
                                >
                                  {s.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(order)}
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(order)}
                              title="Chỉnh sửa đơn"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(order.id)}
                              className="text-danger"
                              title="Xóa đơn"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddSalesOrderDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={onAdd}
      />

      <EditSalesOrderDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={onUpdate}
        order={selectedOrder}
      />

      <ViewSalesOrderDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default SalesOrdersListSection;
