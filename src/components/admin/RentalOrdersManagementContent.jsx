import React, { useEffect, useState } from 'react';
import AdminTopbar from './AdminTopbar';
import RentalStatisticsSection from './sections/RentalStatisticsSection';
import RentalOrdersListSection from './sections/RentalOrdersListSection';
import OverdueSection from './sections/OverdueSection';
import { rentalService } from '@/services/rentalService';
import { toast } from 'react-toastify';

const RentalOrdersManagementContent = (props) => {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRentals = async () => {
    try {
      setIsLoading(true);
      const data = await rentalService.getAllRentals();
      setRentals(data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách đơn thuê');
    } finally {
      setIsLoading(false);
    }
  };
  const handleReloadWithToast = () => {
    toast.success("Cập nhật trạng thái thành công");
    fetchRentals();
  };
  
  useEffect(() => {
    fetchRentals();
  }, []);

  const handleAddRental = async (data) => {
    try {
      // TODO: Implement createRental when available
      toast.success('Tạo đơn thuê thành công');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể tạo đơn thuê');
    }
  };
// const handleCompleteRental = async (orderId, actualReturnDate, updatedConditions) => {
//   try {
//     await rentalService.completeRental(orderId, {
//       actualReturnDate,
//       updatedConditions
//     });
//     toast.success('Hoàn tất đơn thuê thành công');
//     fetchRentals();
//   } catch (error) {
//     toast.error('Không thể hoàn tất đơn thuê');
//     console.error('API Error:', error);
//   }
// };

  const handleUpdateRental = async (id, data) => {
    try {
      await rentalService.updateRental(id, data);
      toast.success('Cập nhật đơn thuê thành công');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể cập nhật đơn thuê');
    }
  };

  const handleDeleteRental = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này?')) return;
    try {
      await rentalService.deleteRental(id);
      toast.success('Xóa đơn thuê thành công');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể xóa đơn thuê');
    }
  };

  const handleApproveRental = async (id) => {
    try {
      await rentalService.updateRentalStatus(id, 1); // 1 = Đã xác nhận
      toast.success('Đơn thuê đã được xác nhận');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể xác nhận đơn thuê');
    }
  };

  const handleMarkDelivered = async (id) => {
    try {
      await rentalService.updateRentalStatus(id, 2); // 2 = Đã giao
      toast.success('Đã đánh dấu đơn là đã giao');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể đánh dấu là đã giao');
    }
  };

  const handleMarkReturned = async (id) => {
    try {
      await rentalService.updateRentalStatus(id, 3); // 3 = Đã trả
      toast.success('Đã đánh dấu đơn là đã trả');
      fetchRentals();
    } catch (error) {
      toast.error('Không thể đánh dấu là đã trả');
    }
  };

  const statistics = {
    total: rentals.length,
    rented: rentals.filter((r) => r.status === 2).length, // Đã giao
    overdue: rentals.filter((r) => r.status === 6).length, // Quá hạn
    returned: rentals.filter((r) => r.status === 3).length, // Đã trả
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Đơn Hàng Thuê</h4>
          </div>
        </div>

        <div className="row">
          <RentalStatisticsSection statistics={statistics} />
        </div>

        <div className="row">
         <RentalOrdersListSection
  rentals={rentals}
  onAdd={handleAddRental}
  onUpdate={handleUpdateRental}
  onDelete={handleDeleteRental}
  onApprove={handleApproveRental}
  onMarkDelivered={handleMarkDelivered}
  onReload={handleReloadWithToast}
  onMarkReturned={handleMarkReturned}
  // onComplete={handleUpdateRental} // 💡 thêm dòng này
  onCompleted={fetchRentals}
  isLoading={isLoading}
/>



          <OverdueSection rentals={rentals} />
        </div>
      </div>
    </div>
  );
};

export default RentalOrdersManagementContent;
