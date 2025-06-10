
import React, { useState } from 'react';

const BookConditionSection = ({ bookConditions, onAddCondition, onUpdateCondition, onDeleteCondition }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCondition, setEditingCondition] = useState(null);
  const [conditionForm, setConditionForm] = useState({
    bookTitle: '',
    conditionType: '',
    conditionPercentage: 100,
    quantity: 0,
    description: ''
  });

  const conditionTypes = [
    'Mới 100%',
    'Như mới 95%',
    'Rất tốt 90%',
    'Tốt 80%',
    'Khá tốt 70%',
    'Trung bình 60%',
    'Cũ 50%',
    'Hỏng nhẹ 30%',
    'Hỏng nặng 10%'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCondition) {
      onUpdateCondition(editingCondition.id, conditionForm);
      setEditingCondition(null);
    } else {
      onAddCondition(conditionForm);
    }
    setConditionForm({
      bookTitle: '',
      conditionType: '',
      conditionPercentage: 100,
      quantity: 0,
      description: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (condition) => {
    setEditingCondition(condition);
    setConditionForm({
      bookTitle: condition.bookTitle,
      conditionType: condition.conditionType,
      conditionPercentage: condition.conditionPercentage,
      quantity: condition.quantity,
      description: condition.description
    });
    setShowAddForm(true);
  };

  const getConditionColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    if (percentage >= 50) return 'text-info';
    return 'text-danger';
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Quản Lý Tình Trạng Sách Thuê</span>
          <button 
            className="btn btn-success btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            Thêm Tình Trạng
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4 p-3 border rounded bg-light">
            <h6>{editingCondition ? 'Sửa' : 'Thêm'} Tình Trạng Sách</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tên Sách</label>
                  <input
                    type="text"
                    className="form-control"
                    value={conditionForm.bookTitle}
                    onChange={(e) => setConditionForm({...conditionForm, bookTitle: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Loại Tình Trạng</label>
                  <select
                    className="form-select"
                    value={conditionForm.conditionType}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      const percentage = parseInt(selectedType.match(/\d+/)[0]);
                      setConditionForm({
                        ...conditionForm, 
                        conditionType: selectedType,
                        conditionPercentage: percentage
                      });
                    }}
                    required
                  >
                    <option value="">Chọn tình trạng</option>
                    {conditionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phần Trăm Tình Trạng (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="100"
                    value={conditionForm.conditionPercentage}
                    onChange={(e) => setConditionForm({...conditionForm, conditionPercentage: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Số Lượng</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={conditionForm.quantity}
                    onChange={(e) => setConditionForm({...conditionForm, quantity: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Mô Tả</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={conditionForm.description}
                    onChange={(e) => setConditionForm({...conditionForm, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success btn-sm">
                  {editingCondition ? 'Cập Nhật' : 'Thêm'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCondition(null);
                    setConditionForm({
                      bookTitle: '',
                      conditionType: '',
                      conditionPercentage: 100,
                      quantity: 0,
                      description: ''
                    });
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Tên Sách</th>
                <th>Tình Trạng</th>
                <th>Phần Trăm</th>
                <th>Số Lượng</th>
                <th>Mô Tả</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {bookConditions.map((condition) => (
                <tr key={condition.id}>
                  <td>{condition.bookTitle}</td>
                  <td>
                    <span className={getConditionColor(condition.conditionPercentage)}>
                      {condition.conditionType}
                    </span>
                  </td>
                  <td>
                    <span className={getConditionColor(condition.conditionPercentage)}>
                      {condition.conditionPercentage}%
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-primary">{condition.quantity}</span>
                  </td>
                  <td>{condition.description || '-'}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(condition)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDeleteCondition(condition.id)}
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
    </div>
  );
};

export default BookConditionSection;
