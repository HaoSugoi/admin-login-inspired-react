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
import apiClient from '../../../services/api';

const RentalOrdersListSection = ({
  rentals = [],
  onAdd,
  onUpdate,
  onDelete,
  onApprove,
  onMarkDelivered,
  onReload,
  onMarkReturned,
  onCompleted
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const RENTAL_STATUSES = {
    0: 'Chờ xác nhân',
    1: 'Đã xác nhận',
    2: 'Đang giao',
    3: 'Hoàn thành',
    4: 'Đang thuê',
    5: 'Quá hạn',
    6: 'Đã hủy'
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
  const UpdateStatus = async (rental, status) => {
    try {
      const response = await apiClient.put(`/admin/rentorders/${rental.OrderId}/status`, status);

      onReload(); // Gọi reload
      return response.data;
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };
  const AutoOverdue = async () => {
    try {
      const response = await apiClient.put(`/admin/rentorders/auto-overdue`);
      const { totalUpdated } = response.data;

      if (totalUpdated > 0) {
        alert(`Đã cập nhật ${totalUpdated} đơn hàng quá hạn`);
      } else {
        alert("Không có đơn hàng nào quá hạn");
      }

      onReload();
      return totalUpdated;
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      <div className="col-12">
        <Card>
          <CardHeader className="d-flex flex-row align-items-center justify-content-between">
            <CardTitle>📚 Danh Sách Đơn Thuê Sách</CardTitle>
            <Button onClick={AutoOverdue}>
              Xét Quá Hạn
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
                    <th>Phương thức</th>
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
                        <td>{rental.Payment === "VNPAY" ? "Chuyển khoản" : "Tiền mặt"}</td>

                        <td>
                          <select
                            value={rental.Status}
                            onChange={(e) => UpdateStatus(rental, parseInt(e.target.value))}
                            className="form-select py-1 px-2 rounded text-sm"
                            disabled={rental.Status === 5} // 🔒 Vô hiệu hóa nếu quá hạn
                          >
                            {rental.Status === 3 ? (
                              <option value="3">{RENTAL_STATUSES[3]}</option>
                            ) : (
                              Object.entries(RENTAL_STATUSES).map(([key, label]) => {
                                const keyInt = parseInt(key);
                                const isDisabled =
                                  keyInt === 3 || // Không cho chọn Hoàn thành
                                  keyInt === 5 || // Không cho chọn Quá hạn
                                  keyInt < rental.Status; // Không cho quay về trạng thái trước

                                return (
                                  <option key={key} value={key} disabled={isDisabled}>
                                    {label}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </td>





                        <td>
                          <div className="d-flex gap-1 justify-content-center flex-wrap">
                            <Button variant="outline" size="sm" onClick={() => handleView(rental)}>
                              <Eye size={14} />
                            </Button>

                        
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={rental.Status !== 4 && rental.Status !== 5}
                              onClick={() => handleEdit(rental)}
                            >
                              <Edit size={14} />
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
