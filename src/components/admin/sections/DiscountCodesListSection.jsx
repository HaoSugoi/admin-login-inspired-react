
import React, { useState } from 'react';
import AddDiscountCodeDialog from '../dialogs/AddDiscountCodeDialog';
import EditDiscountCodeDialog from '../dialogs/EditDiscountCodeDialog';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const DiscountCodesListSection = ({ discountCodes, onAdd, onUpdate, onDelete, onToggleStatus }) => {
  const [editingCode, setEditingCode] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditCode = (code) => {
    setEditingCode(code);
    setShowEditDialog(true);
  };

  const handleDeleteCode = (codeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
      onDelete(codeId);
    }
  };

  const handleToggleStatus = (code) => {
    const newStatus = code.status === 'active' ? 'inactive' : 'active';
    onToggleStatus(code.id, newStatus);
  };

  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-content-between align-items-center">
          <span>Danh Sách Mã Giảm Giá</span>
          <AddDiscountCodeDialog onAddDiscountCode={onAdd} />
        </div>
        
        <div className="table-responsive">
          <table className="table order-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên Mã</th>
                <th>Loại</th>
                <th>Giá Trị</th>
                <th>Sử Dụng</th>
                <th>Trạng Thái</th>
                <th>Hạn Sử Dụng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {discountCodes.map((code) => (
                <tr key={code.id}>
                  <td><code className="bg-light px-2 py-1 rounded">{code.code}</code></td>
                  <td>{code.name}</td>
                  <td>
                    <span className={code.type === 'percentage' ? 'text-info' : 'text-warning'}>
                      {code.type === 'percentage' ? 'Phần trăm' : 'Số tiền'}
                    </span>
                  </td>
                  <td>
                    {code.type === 'percentage' ? `${code.value}%` : `${code.value.toLocaleString()}đ`}
                  </td>
                  <td>{code.usageCount}/{code.usageLimit}</td>
                  <td>
                    <span className={code.status === 'active' ? 'text-success' : 'text-danger'}>
                      {code.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td>{code.endDate}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditCode(code)}
                        title="Sửa"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleToggleStatus(code)}
                        title={code.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                      >
                        {code.status === 'active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCode(code.id)}
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingCode && (
        <EditDiscountCodeDialog
          discountCode={editingCode}
          open={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingCode(null);
          }}
          onUpdateDiscountCode={onUpdate}
        />
      )}
    </div>
  );
};

export default DiscountCodesListSection;
