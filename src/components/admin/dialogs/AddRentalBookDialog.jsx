import React, { useState, useEffect } from 'react';
import { authorService } from '@/services/authorService';
import { categoryService } from '@/services/categoryService';

const AddRentalBookDialog = ({ onClose, onAdd }) => {
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
  });
  const [imageFile, setImageFile] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const filteredAuthors = authors.filter(
    (a) =>
      formData.AuthorIds.includes(a.AuthorId) ||
      a.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
const filteredCategories = categories.filter(
  (c) =>
    formData.CategoryIds.includes(c.id) || // giữ lại những cái đã chọn
    c.name.toLowerCase().includes(categorySearch.toLowerCase()) // lọc theo tên
);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorRes, categoryRes] = await Promise.all([
          authorService.getAllAuthors(),
          categoryService.getAllCategories(),
        ]);
        setAuthors(authorRes);
        setCategories(categoryRes);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tác giả/thể loại:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = formData;


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

      await onAdd(fd);
      alert('✅ Thêm sách thuê thành công!');
      onClose();
    } catch (err) {
      console.error('❌ Lỗi khi thêm sách thuê:', err);
      alert('❌ Thêm thất bại.');
    }
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 shadow-sm border-0">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title">➕ Thêm sách thuê</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body row g-4 px-4 py-3">
              {/* Dòng 1 */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Tên sách *</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={formData.Title}
                  onChange={(e) =>
                    setFormData({ ...formData, Title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Giá *</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  value={formData.Price}
                  onChange={(e) =>
                    setFormData({ ...formData, Price: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              {/* Dòng 2 */}


              <div className="col-md-6">
                <label className="form-label fw-semibold">Kích thước</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={formData.PackagingSize}
                  onChange={(e) =>
                    setFormData({ ...formData, PackagingSize: e.target.value })
                  }
                />
              </div>

              {/* Dòng 3 */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Số trang</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  value={formData.PageCount}
                  onChange={(e) =>
                    setFormData({ ...formData, PageCount: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Tác giả *(Ctrl để chọn nhiều)
                </label>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="🔍 Tìm tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                  multiple
                  className="form-select shadow-sm"
                  value={formData.AuthorIds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      AuthorIds: [...e.target.selectedOptions].map((o) => o.value),
                    }))
                  }
                >
                  {filteredAuthors.map((a) => (
                    <option key={a.AuthorId} value={a.AuthorId}>
                      {a.Name}
                    </option>
                  ))}
                </select>

                <div className="form-text">
                  Đã chọn:{" "}
                  {formData.AuthorIds
                    .map((id) => authors.find((a) => a.AuthorId === id)?.Name)
                    .filter(Boolean)
                    .join(", ") || "Chưa chọn"}
                </div>
              </div>


              {/* Dòng 4 */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Thể loại *(Ctrl để chọn nhiều)</label>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="🔍 Tìm thể loại..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />

                <select
                  multiple
                  className="form-select shadow-sm"
                  value={formData.CategoryIds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      CategoryIds: [...e.target.selectedOptions].map((o) => o.value),
                    }))
                  }
                >
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="form-text">
                  Đã chọn:{' '}
                  {formData.CategoryIds
                    .map((id) => categories.find((c) => c.id === id)?.name)
                    .filter(Boolean)
                    .join(', ') || 'Chưa chọn'}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Mô tả</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={formData.Description}
                  onChange={(e) =>
                    setFormData({ ...formData, Description: e.target.value })
                  }
                  required
                />
              </div>
              {/* Dòng 5 */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nhà xuất bản</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={formData.Publisher}
                  onChange={(e) =>
                    setFormData({ ...formData, Publisher: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Người dịch</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={formData.Translator}
                  onChange={(e) =>
                    setFormData({ ...formData, Translator: e.target.value })
                  }
                />
              </div>

              {/* Dòng 6 */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Hình ảnh</label>
                <input
                  type="file"
                  className="form-control shadow-sm"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Ẩn sách?</label>
                <select
                  className="form-select shadow-sm"
                  value={formData.IsHidden ? '1' : '0'}
                  onChange={(e) =>
                    setFormData({ ...formData, IsHidden: e.target.value === '1' })
                  }
                >
                  <option value="0">Hiện</option>
                  <option value="1">Ẩn</option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-0 px-4 pb-4">
              <button type="submit" className="btn btn-success px-4">
                ✅ Thêm sách
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default AddRentalBookDialog;