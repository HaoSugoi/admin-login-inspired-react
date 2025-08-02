// components/dialogs/DetailRentBookItemListDialog.jsx
import React, { useEffect, useState } from 'react';
import { rentBookItemService } from '../../../services/RentBookItemService';
import AddEditRentBookItemDialog from './AddEditRentBookItemDialog'; // nhớ import dialog

const DetailRentBookItemListDialog = ({ rentBookId, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEditDialog, setShowAddEditDialog] = useState(null);

  const fetchItems = async () => {
    const res = await rentBookItemService.getByRentBookId(rentBookId);
    setItems(res);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bản sao này?")) {
      await rentBookItemService.delete(id);
      await fetchItems();
    }
  };

  useEffect(() => {
    if (rentBookId) {
      fetchItems().finally(() => setLoading(false));
    }
  }, [rentBookId]);

  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">📚 Danh sách Item sách thuê</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>⏳ Đang tải danh sách Item...</p>
            ) : (
              <>
                <button className="btn btn-success mb-3" onClick={() => setShowAddEditDialog({ mode: 'add' })}>
                  ➕ Thêm Item
                </button>

                {items.length === 0 ? (
                  <p>❌ Không có bản sao nào.</p>
                ) : (
                  <ul className="list-group">
                    {items.map((item, index) => (
                      <li key={item.RentBookItemId || index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          📖 Mã Item: {item.RentBookItemId?.substring(0, 6).toUpperCase() || 'N/A'} – Tình trạng: {item.Condition} – Mô tả: {item.StatusDescription} - {item.IsHidden ? '👁️' : '🚫'}

                        </div>  
                        <div>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setShowAddEditDialog({ mode: 'edit', item })}>✏️</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.RentBookItemId)}>🗑️</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ NÊN đặt dialog ở đây - trong return */}
{showAddEditDialog && (
        <AddEditRentBookItemDialog
          rentBookId={rentBookId}
          mode={showAddEditDialog.mode}
          item={showAddEditDialog.item}
          onClose={() => setShowAddEditDialog(null)}
          onSave={async (data, id) => {
            if (id) {
              await rentBookItemService.update(id, data);
            } else {
              await rentBookItemService.create(data);
            }
            await fetchItems();
          }}
        />
      )}
    </div>
  );
};

export default DetailRentBookItemListDialog;
