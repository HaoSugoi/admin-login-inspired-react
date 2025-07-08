import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const EditBookDialog = ({
  book,
  open,
  onClose,
  onUpdateBook,
  authors = [],
  categories = [],
  promotions = [],
}) => {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Publisher: '',
    Translator: '',
    PackagingSize: '',
    PageCount: 0,
    Price: 0,
    Quantity: 0,
    IsHidden: false,
    AuthorIds: [],
    CategoryIds: [],
    PromotionIds: [],
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
  if (book) {
    const initialData = {
      Title: book.Title || '',
      Description: book.Description || '',
      Publisher: book.Publisher || '',
      Translator: book.Translator || '',
      PackagingSize: book.PackagingSize || '',
      PageCount: book.PageCount || 0,
      Price: book.Price || 0,
      Quantity: book.Quantity || 0,
      IsHidden: book.IsHidden || false,
      AuthorIds: book.AuthorIds || [],
      CategoryIds: book.CategoryIds || [],
      PromotionIds: book.PromotionIds || [],
    };
    console.log('✅ AuthorIds:', initialData.AuthorIds);
    console.log('✅ All authors:', authors);
    setFormData(initialData);
  }
}, [book, authors]);


  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('Title', formData.Title);
      fd.append('Description', formData.Description || '');
      fd.append('Publisher', formData.Publisher || '');
      fd.append('Translator', formData.Translator || '');
      fd.append('Size', formData.PackagingSize || '');
      fd.append('Pages', formData.PageCount.toString());
      fd.append('Price', formData.Price);
      fd.append('Quantity', formData.Quantity.toString());
      fd.append('IsHidden', formData.IsHidden ? 'true' : 'false');

      formData.AuthorIds.forEach((id) => fd.append('AuthorIds[]', id));
      formData.CategoryIds.forEach((id) => fd.append('CategoryIds[]', id));
      formData.PromotionIds.forEach((id) => fd.append('PromotionIds[]', id));

      if (imageFile) {
        fd.append('ImageFile', imageFile);
      }

      await onUpdateBook(book.SaleBookId, fd);
      alert('✅ Cập nhật sách thành công!');
      onClose();
    } catch (err) {
      console.error('❌ Lỗi cập nhật sách:', err);
      alert('❌ Cập nhật sách thất bại!');
    }
  };

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
<DialogTitle className="text-center">📘 Cập Nhật Sách Bán</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="row g-4 p-2">
          {/* Tên, giá, số lượng */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Tên sách *</label>
            <input type="text" name="Title" className="form-control" value={formData.Title}
              onChange={handleInputChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Giá *</label>
            <input type="number" name="Price" className="form-control" value={formData.Price}
              onChange={handleInputChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Số lượng *</label>
            <input type="number" name="Quantity" className="form-control" value={formData.Quantity}
              onChange={handleInputChange} required />
          </div>

          {/* Kích thước, số trang */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Kích thước</label>
            <input type="text" name="PackagingSize" className="form-control" value={formData.PackagingSize}
              onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Số trang</label>
            <input type="number" name="PageCount" className="form-control" value={formData.PageCount}
              onChange={handleInputChange} />
          </div>

          {/* Mô tả, NXB, dịch */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Mô tả</label>
            <textarea name="Description" rows="2" className="form-control" value={formData.Description}
              onChange={handleInputChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Nhà xuất bản</label>
            <input type="text" name="Publisher" className="form-control" value={formData.Publisher}
              onChange={handleInputChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Người dịch</label>
            <input type="text" name="Translator" className="form-control" value={formData.Translator}
              onChange={handleInputChange} />
          </div>

          {/* Tác giả */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Tác giả *</label>
            <select multiple className="form-select" value={formData.AuthorIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  AuthorIds: Array.from(e.target.selectedOptions, o => o.value),
                })
              }>
              {authors.map((a) => (
<option key={a.AuthorId} value={a.AuthorId}>{a.Name}</option>
              ))}
            </select>
            <div className="form-text">
              Đã chọn: {formData.AuthorIds
                .map(id => authors.find(a => a.AuthorId === id)?.Name)
                .filter(Boolean)
                .join(', ') || 'Chưa chọn'}
            </div>
          </div>

          {/* Thể loại */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Thể loại *</label>
            <select multiple className="form-select" value={formData.CategoryIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  CategoryIds: Array.from(e.target.selectedOptions, o => o.value),
                })
              }>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="form-text">
              Đã chọn: {formData.CategoryIds
                .map(id => categories.find(c => c.id === id)?.name)
                .filter(Boolean)
                .join(', ') || 'Chưa chọn'}
            </div>
          </div>

          {/* Khuyến mãi */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Khuyến mãi</label>
            <select multiple className="form-select" value={formData.PromotionIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  PromotionIds: Array.from(e.target.selectedOptions, o => o.value),
                })
              }>
              {promotions.map((p) => (
                <option key={p.PromotionId} value={p.PromotionId}>
                  {p.PromotionName} - {Math.round(p.DiscountPercentage)}%
                </option>
              ))}
            </select>
          </div>

          {/* Ảnh và trạng thái */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Ảnh mới (nếu thay)</label>
            <input type="file" className="form-control" accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Ẩn sách?</label>
            <select className="form-select" value={formData.IsHidden ? '1' : '0'}
              onChange={(e) =>
                setFormData({ ...formData, IsHidden: e.target.value === '1' })
              }>
              <option value="0">Hiển thị</option>
              <option value="1">Ẩn</option>
            </select>
          </div>

          <div className="col-12 d-flex justify-content-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        </form>
      </DialogContent>
</Dialog>
  );
};

export default EditBookDialog;