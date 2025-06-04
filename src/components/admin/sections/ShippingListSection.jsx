
import React from 'react';

const ShippingListSection = ({ shipments, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xử lý': return 'text-warning';
      case 'Đang giao': return 'text-primary';
      case 'Đã giao': return 'text-success';
      case 'Hủy': return 'text-danger';
      default: return 'text-muted';
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Danh Sách Đơn Vận Chuyển</span>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Địa Chỉ</th>
                <th>Ngày Giao</th>
                <th>Dự Kiến Nhận</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>#{shipment.orderId}</td>
                  <td>{shipment.customerName}</td>
                  <td>{shipment.address}</td>
                  <td>{shipment.shippingDate}</td>
                  <td>{shipment.estimatedDelivery}</td>
                  <td>
                    <span className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={shipment.status}
                      onChange={(e) => onUpdateStatus(shipment.id, e.target.value)}
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Hủy">Hủy</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingListSection;
