import React, { useEffect, useState } from 'react';
import { rentbooksService } from '@/services/RentBooksService';
import { categoryService } from '@/services/categoryService';
import { authorService } from '@/services/authorService';

const DetailRentalBookDialog = ({ rentBookId, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rentbookRes, categoryRes, authorRes] = await Promise.all([
          rentbooksService.getRentbooksById(rentBookId),
          categoryService.getAllCategories(),
          authorService.getAllAuthors(),
        ]);

        setDetail(rentbookRes);
        setFormData(rentbookRes);
        setCategories(categoryRes);
        setAuthors(authorRes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (rentBookId) fetchData();
  }, [rentBookId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = editing ? formData : detail;

      if (imageFile) {
        const fd = new FormData();

        fd.append('Title', payload.Title);
        fd.append('Description', payload.Description);
        fd.append('Publisher', payload.Publisher);
        fd.append('Translator', payload.Translator);
        fd.append('Size', payload.PackagingSize);
        fd.append('Pages', payload.PageCount);
        fd.append('Price', payload.Price);
        fd.append('Quantity', payload.Quantity);
        fd.append('IsHidden', payload.IsHidden ? 'true' : 'false');

        payload.AuthorIds?.forEach((id) => fd.append('AuthorIds', id));
        payload.CategoryIds?.forEach((id) => fd.append('CategoryIds', id));

        fd.append('ImageFile', imageFile);

        await rentbooksService.updateRentbooks(rentBookId, fd);
      } else {
        const fd = new FormData();

        fd.append('Title', payload.Title);
        fd.append('Description', payload.Description);
        fd.append('Publisher', payload.Publisher);
        fd.append('Translator', payload.Translator);
        fd.append('Size', payload.PackagingSize);
        fd.append('Pages', payload.PageCount);
        fd.append('Price', payload.Price);
        fd.append('Quantity', payload.Quantity);
        fd.append('IsHidden', payload.IsHidden ? 'true' : 'false');

        payload.AuthorIds?.forEach((id) => fd.append('AuthorIds', id));
        payload.CategoryIds?.forEach((id) => fd.append('CategoryIds', id));
await rentbooksService.updateRentbooks(rentBookId,  fd);
      }

      alert('✅ Cập nhật sách thuê thành công!');
      onClose();
    
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật sách thuê:', err);
      if (err.response?.data?.errors) {
        const errs = err.response.data.errors;
        const messages = Object.keys(errs).map(
          (key) => `${key}: ${errs[key].join(', ')}`
        );
        alert('❌ Lỗi xác thực:\n' + messages.join('\n'));
      } else {
        alert('❌ Cập nhật thất bại.');
      }
    }
  };

  const getCategoryNames = () => {
    if (!detail?.CategoryIds) return '';
    return detail.CategoryIds.map((id) => categories.find((c) => c.id === id)?.name).filter(Boolean).join(', ');
  };

  const getAuthorNames = () => {
    if (!detail?.AuthorIds) return '';
    return detail.AuthorIds.map((id) => authors.find((a) => a.AuthorId === id)?.Name).filter(Boolean).join(', ');
  };

  if (!rentBookId) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">📘 Chi Tiết Sách Thuê</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading && <div className="text-center text-secondary">⏳ Đang tải...</div>}
            {error && <div className="alert alert-danger">❌ Lỗi: {error.message}</div>}

            {detail && !editing && (
              <div className="row">
                <div className="col-md-7">
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item"><strong>Tiêu đề:</strong> {detail.Title}</li>
                    <li className="list-group-item"><strong>Mô tả:</strong> {detail.Description}</li>
                    <li className="list-group-item"><strong>Nhà xuất bản:</strong> {detail.Publisher}</li>
                    <li className="list-group-item"><strong>Dịch giả:</strong> {detail.Translator}</li>
                    <li className="list-group-item"><strong>Kích thước:</strong> {detail.PackagingSize}</li>
                    <li className="list-group-item"><strong>Số trang:</strong> {detail.PageCount}</li>
                    <li className="list-group-item"><strong>Giá:</strong> {detail.Price?.toLocaleString()} đ</li>
                    <li className="list-group-item"><strong>Số lượng:</strong> {detail.Quantity}</li>
                    <li className="list-group-item"><strong>Ẩn/Hiện:</strong> {detail.IsHidden ? '🔒 Đang ẩn' : '👁️ Hiển thị'}</li>
                    <li className="list-group-item"><strong>📚 Tác giả:</strong> {getAuthorNames()}</li>
<li className="list-group-item"><strong>📂 Thể loại:</strong> {getCategoryNames()}</li>
                  </ul>
                  <button className="btn btn-warning" onClick={() => setEditing(true)}>✏️ Sửa</button>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img src={detail.ImageUrl} alt="Ảnh sách" className="img-fluid rounded shadow" style={{ maxHeight: 300 }} />
                </div>
              </div>
            )}

            {detail && editing && (
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Tiêu đề</label>
                  <input type="text" className="form-control" value={formData.Title || ''} onChange={(e) => handleChange('Title', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Giá</label>
                  <input type="number" className="form-control" value={formData.Price || 0} onChange={(e) => handleChange('Price', parseFloat(e.target.value))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Dịch giả</label>
                  <input type="text" className="form-control" value={formData.Translator || ''} onChange={(e) => handleChange('Translator', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nhà xuất bản</label>
                  <input type="text" className="form-control" value={formData.Publisher || ''} onChange={(e) => handleChange('Publisher', e.target.value)} />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Mô tả</label>
                  <textarea className="form-control" value={formData.Description || ''} onChange={(e) => handleChange('Description', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Thể loại</label>
                  <select multiple className="form-select" value={formData.CategoryIds || []} onChange={(e) => handleChange('CategoryIds', Array.from(e.target.selectedOptions, o => o.value))}>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tác giả</label>
                  <select multiple className="form-select" value={formData.AuthorIds || []} onChange={(e) => handleChange('AuthorIds', Array.from(e.target.selectedOptions, o => o.value))}>
{authors.map((auth) => (
                      <option key={auth.AuthorId} value={auth.AuthorId}>{auth.Name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Hình ảnh</label>
                  <input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <div className="col-12 text-end mt-3">
                  <button type="submit" className="btn btn-success">💾 Lưu</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>❌ Hủy</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRentalBookDialog;