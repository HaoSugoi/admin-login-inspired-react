
import React, { useState } from 'react';

const RentalOrdersSection = ({ 
  rentalOrders, 
  onAdd, 
  onUpdate, 
  onDelete, 
  onApprove, 
  onMarkDelivered, 
  onMarkReturned, 
  onMarkDamaged 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [damagedNotes, setDamagedNotes] = useState('');
  const [showDamagedModal, setShowDamagedModal] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xác nhận': return 'text-warning';
      case 'Đã xác nhận': return 'text-info';
      case 'Đã giao': return 'text-primary';
      case 'Đã trả': return 'text-success';
      case 'Sách bị hỏng/mất': return 'text-danger';
      default: return 'text-muted';
    }
  };

  const handleMarkDamaged = (rentalId) => {
    onMarkDamaged(rentalId, damagedNotes);
    setShowDamagedModal(null);
    setDamagedNotes('');
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Quản Lý Đơn Thuê Sách</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Đơn Thuê
          </button>
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã Thuê</th>
                <th>Đọc Giả</th>
                <th>Ngày Yêu Cầu</th>
                <th>Ngày Giao</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {rentalOrders.map((rental) => (
                <tr key={rental.id}>
                  <td>#{rental.id.toString().padStart(3, '0')}</td>
                  <td>
                    <div>{rental.readerName}</div>
                    <small className="text-muted">{rental.readerId}</small>
                  </td>
                  <td>{rental.requestDate}</td>
                  <td>{rental.deliveryDate || '-'}</td>
                  <td>
                    <span className={getStatusColor(rental.status)}>
                      {rental.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      {rental.status === 'Chờ xác nhận' && (
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => onApprove(rental.id)}
                        >
                          Xác nhận
                        </button>
                      )}
                      {rental.status === 'Đã xác nhận' && (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => onMarkDelivered(rental.id)}
                        >
                          Đã giao
                        </button>
                      )}
                      {rental.status === 'Đã giao' && (
                        <>
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => onMarkReturned(rental.id)}
                          >
                            Đã trả
                          </button>
                          <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => setShowDamagedModal(rental.id)}
                          >
                            Hỏng/Mất
                          </button>
                        </>
                      )}
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => console.log('Edit rental', rental.id)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(rental.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal ghi nhận sách hỏng/mất */}
      {showDamagedModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ghi Nhận Sách Hỏng/Mất</h5>
                <button 
                  className="btn-close"
                  onClick={() => setShowDamagedModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={damagedNotes}
                    onChange={(e) => setDamagedNotes(e.target.value)}
                    placeholder="Mô tả tình trạng sách..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowDamagedModal(null)}
                >
                  Hủy
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleMarkDamaged(showDamagedModal)}
                >
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalOrdersSection;
