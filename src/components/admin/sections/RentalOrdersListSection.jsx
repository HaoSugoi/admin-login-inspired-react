
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, BookOpen, CheckCircle, Package, XCircle } from 'lucide-react';
import AddRentalOrderDialog from '../dialogs/AddRentalOrderDialog';
import EditRentalOrderDialog from '../dialogs/EditRentalOrderDialog';
import ViewRentalOrderDialog from '../dialogs/ViewRentalOrderDialog';

const RentalOrdersListSection = ({ 
  rentals, 
  onAdd, 
  onUpdate, 
  onDelete, 
  onApprove, 
  onMarkDelivered, 
  onMarkReturned 
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleView = (rental) => {
    setSelectedRental(rental);
    setShowViewDialog(true);
  };

  const handleEdit = (rental) => {
    setSelectedRental(rental);
    setShowEditDialog(true);
  };

  return (
    <>
      <div className="col-12">
        <Card>
          <CardHeader className="d-flex flex-row align-items-center justify-content-between">
            <CardTitle>Danh Sách Đơn Thuê Sách</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <BookOpen className="me-2" size={16} />
              Tạo Đơn Thuê
            </Button>
          </CardHeader>
          <CardContent>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Mã Thuê</th>
                    <th>Độc Giả</th>
                    <th>Ngày Thuê</th>
                    <th>Ngày Trả DK</th>
                    <th>Tiền Cọc</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((rental) => (
                    <tr key={rental.id}>
                      <td className="fw-bold">{rental.rentalNumber}</td>
                      <td>
                        <div>
                          <div className="fw-medium">{rental.readerName}</div>
                          <small className="text-muted">{rental.readerPhone}</small>
                        </div>
                      </td>
                      <td>{new Date(rental.rentalDate).toLocaleDateString('vi-VN')}</td>
                      <td>{new Date(rental.expectedReturnDate).toLocaleDateString('vi-VN')}</td>
                      <td className="fw-bold text-success">{formatCurrency(rental.deposit)}</td>
                      <td>
                        <Badge className={getStatusColor(rental.status)}>
                          {rental.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(rental)}
                          >
                            <Eye size={14} />
                          </Button>
                          
                          {rental.status === 'Chờ xác nhận' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onApprove(rental.id)}
                              className="text-success"
                            >
                              <CheckCircle size={14} />
                            </Button>
                          )}
                          
                          {rental.status === 'Đã xác nhận' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onMarkDelivered(rental.id)}
                              className="text-primary"
                            >
                              <Package size={14} />
                            </Button>
                          )}
                          
                          {rental.status === 'Đã giao' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onMarkReturned(rental.id)}
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
                            onClick={() => onDelete(rental.id)}
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
      <AddRentalOrderDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={onAdd}
      />

      <EditRentalOrderDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSave={onUpdate}
        rental={selectedRental}
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
