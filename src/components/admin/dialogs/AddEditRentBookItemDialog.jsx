import React, { useState, useEffect } from 'react';

const AddEditRentBookItemDialog = ({ onClose, onSave, mode = 'add', item = {}, rentBookId }) => {
  const [formData, setFormData] = useState({
    Condition: item.Condition || '',
    StatusDescription: item.StatusDescription || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      RentBookId: rentBookId,
    };

    await onSave(payload, mode === 'edit' ? item.RentBookItemId : null);
    onClose();
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{mode === 'add' ? '➕ Thêm' : '✏️ Sửa'} bản sao</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tình trạng</label>
                <input className="form-control" value={formData.Condition} onChange={(e) => setFormData({ ...formData, Condition: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mô tả tình trạng</label>
                <textarea className="form-control" value={formData.StatusDescription} onChange={(e) => setFormData({ ...formData, StatusDescription: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Lưu</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditRentBookItemDialog;