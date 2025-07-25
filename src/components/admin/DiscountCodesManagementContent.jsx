import React, { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import DiscountCodesListSection from './sections/DiscountCodesListSection';
import DiscountCodesStatisticsSection from './sections/DiscountCodesStatisticsSection';
import { useDiscountCodeApi } from '../../hooks/useDiscountCodeApi';

const DiscountCodesManagementContent = () => {
  const {
    discountcodes,
    isLoadingDiscountCodes,
    createDiscountCode,
    updateDiscountCode,
    deleteDiscountCode
  } = useDiscountCodeApi();

  const [statistics, setStatistics] = useState({}); // Thống kê tạm thời rỗng
  
  // Tạo mã giảm giá mới
  const handleAddDiscountCode = (newData) => {
    createDiscountCode(newData);
  };

// Cập nhật mã giảm giá
const handleUpdateDiscountCode = ({ id, data }) => {
  console.log('🧪 Test dữ liệu truyền vào handleUpdateDiscountCode:', { id, data });

  updateDiscountCode({ id, data }); // Gọi mutation
};

  // Xóa mã giảm giá
  const handleDeleteDiscountCode = (DiscountCodeId) => {
    deleteDiscountCode(DiscountCodeId);
  };

  // Toggle trạng thái (giả định có status nếu backend hỗ trợ)
  const handleToggleCodeStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateDiscountCode({ id, data: { status: newStatus } });
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Mã Giảm Giá</h4>
          </div>
        </div>

        {/* <div className="row">
          <DiscountCodesStatisticsSection statistics={statistics} />
        </div> */}

        <div className="row">
          {isLoadingDiscountCodes ? (
            <div className="col-12 text-center">
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <DiscountCodesListSection
              discountCodes={discountcodes}
              onAdd={handleAddDiscountCode}
              onUpdateDiscountCode={handleUpdateDiscountCode}
              onDelete={handleDeleteDiscountCode}
              onToggleStatus={handleToggleCodeStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountCodesManagementContent;