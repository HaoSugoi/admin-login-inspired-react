import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, BookOpen, CheckCircle, Package } from 'lucide-react';
import AddRentalOrderDialog from '../dialogs/AddRentalOrderDialog';
import EditRentalOrderDialog from '../dialogs/EditRentalOrderDialog';
import ViewRentalOrderDialog from '../dialogs/ViewRentalOrderDialog';
import { rentalService } from '@/services/rentalService';
import { toast } from 'react-toastify';

const RentalOrdersListSection = ({ 
  rentals = [], 
  onAdd, 
  onUpdate, 
  onDelete, 
  onApprove, 
  onMarkDelivered, 
  onMarkReturned,
  onCompleted
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const RENTAL_STATUSES = {
    0: 'Quá hạn',
    1: 'Đã xác nhận',
    2: 'Đã giao',
    3: 'Đã trả',
    4: 'Thất bại',
    5: 'Đã hủy',
    6: 'Chờ xác nhận'
  };

  const getStatusLabel = (value) => RENTAL_STATUSES[value] || 'Không xác định';

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-yellow-100 text-yellow-800';
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-indigo-100 text-indigo-800';
      case 3: return 'bg-green-100 text-green-800';
      case 4: return 'bg-red-200 text-red-900';
      case 5: return 'bg-gray-200 text-gray-800';
      case 6: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount || 0);

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleView = async (rental) => {
    try {
      const details = await rentalService.getRentalDetailsById(rental.OrderId);
      const rentalWithDetails = { ...rental, Items: details };
      setSelectedRental(rentalWithDetails);
      setShowViewDialog(true);
    } catch {
      toast.error("Không thể tải chi tiết đơn thuê");
    }
  };

  const handleEdit = async (rental) => {
    try {
      const items = await rentalService.getRentalDetailsById(rental.OrderId);
      setSelectedRental({ ...rental, Items: items });
      setShowEditDialog(true);
    } catch {
      toast.error("Không thể tải chi tiết đơn thuê");
    }
  };

  return (
    <>
      <div className="col-12">
        <Card>
          <CardHeader className="d-flex flex-row align-items-center justify-content-between">
            <CardTitle>📚 Danh Sách Đơn Thuê Sách</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <BookOpen className="me-2" size={16} />
              Tạo Đơn Thuê
            </Button>
          </CardHeader>
          <CardContent>
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th>Mã Thuê</th>
                    <th>Khách hàng</th>
                    <th>Ngày Thuê</th>
                    <th>Ngày Trả DK</th>
                    <th>Tiền Cọc</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        Không có đơn thuê nào.
                      </td>
                    </tr>
                  ) : (
                    rentals.map((rental) => (
                      <tr key={rental.OrderId}>
                        <td className="fw-bold">{rental.OrderId.slice(0, 8).toUpperCase()}</td>
                        <td>
                          <div>
                            <div className="fw-medium">{rental.UserName || '---'}</div>
                            <small className="text-muted">{rental.Phone || '---'}</small>
                          </div>
                        </td>
                        <td>{formatDate(rental.StartDate)}</td>
                        <td>{formatDate(rental.EndDate)}</td>
                        <td className="fw-bold text-success">{formatCurrency(rental.TotalDeposit)}</td>
                        <td>
                          <Badge className={`${getStatusColor(rental.Status)} px-3 py-1 rounded`}>
                            {getStatusLabel(rental.Status)}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center flex-wrap">
                            <Button variant="outline" size="sm" onClick={() => handleView(rental)}>
                              <Eye size={14} />
                            </Button>

                            {rental.Status === 6 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onApprove(rental.OrderId)}
                                className="text-success"
                              >
                                <CheckCircle size={14} />
                              </Button>
                            )}

                            {rental.Status === 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onMarkDelivered(rental.OrderId)}
                                className="text-primary"
                              >
                                <Package size={14} />
                              </Button>
                            )}

                            {rental.Status === 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onMarkReturned(rental.OrderId)}
                                className="text-purple-600"
                              >
                                <BookOpen size={14} />
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(rental)}
                            >
                              <Edit size={14} />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(rental.OrderId)}
                              className="text-danger"
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
      <AddRentalOrderDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={onAdd}
      />

      <EditRentalOrderDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        rental={selectedRental}
        rentalDetails={selectedRental?.Items || []}
        onCompleted={onCompleted}
      />

      <ViewRentalOrderDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        rental={selectedRental}
      />
    </>
  );
};

export default RentalOrdersListSection;
