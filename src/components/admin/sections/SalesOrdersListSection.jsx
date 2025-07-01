
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Package } from 'lucide-react';
import AddSalesOrderDialog from '../dialogs/AddSalesOrderDialog';
import EditSalesOrderDialog from '../dialogs/EditSalesOrderDialog';
import ViewSalesOrderDialog from '../dialogs/ViewSalesOrderDialog';

const SalesOrdersListSection = ({ orders, onAdd, onUpdate, onDelete, onUpdateStatus }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xử lý': return 'bg-yellow-100 text-yellow-800';
      case 'Đang xử lý': return 'bg-blue-100 text-blue-800';
      case 'Đã giao': return 'bg-green-100 text-green-800';
      case 'Đã hủy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowViewDialog(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditDialog(true);
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
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Ngày Đặt</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.orderNumber}</td>
                      <td>
                        <div>
                          <div className="fw-medium">{order.customerName}</div>
                          <small className="text-muted">{order.customerPhone}</small>
                        </div>
                      </td>
                      <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                      <td className="fw-bold text-success">{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(order)}
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(order)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(order.id)}
                            className="text-danger"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
