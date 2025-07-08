import React, { useState, useEffect } from "react";
import { authorService } from "@/services/authorService";
import { categoryService } from "@/services/categoryService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddBookDialog = ({ onAddBook, promotions = [] }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Publisher: "",
    Translator: "",
    PackagingSize: "",
    PageCount: 0,
    Price: 0,
    Quantity: 0,
    IsHidden: false,
    AuthorIds: [],
    CategoryIds: [],
    PromotionIds: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          authorService.getAllAuthors(),
          categoryService.getAllCategories(),
        ]);
        setAuthorList(authorsRes);
        setCategoryList(categoriesRes);
      } catch (err) {
        console.error("❌ Lỗi khi load tác giả/thể loại:", err);
      }
    };
    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("Title", formData.Title);
      fd.append("Description", formData.Description || "");
      fd.append("Publisher", formData.Publisher || "");
      fd.append("Translator", formData.Translator || "");
      fd.append("Size", formData.PackagingSize || "");
      fd.append("Pages", String(parseInt(formData.PageCount || 0)));
      fd.append("Price", String(parseFloat(formData.Price || 0).toFixed(2)));
      fd.append("Quantity", String(parseInt(formData.Quantity || 0)));

      fd.append("IsHidden", formData.IsHidden ? "true" : "false");

      formData.AuthorIds.forEach((id) => fd.append("AuthorIds", id));
      formData.CategoryIds.forEach((id) => fd.append("CategoryIds", id));
      formData.PromotionIds?.forEach((id) => fd.append("PromotionIds", id));

      if (imageFile) {
        fd.append("ImageUrl", imageFile);
      }
      console.log("📦 FormData gửi đi:");
      for (let [key, value] of fd.entries()) {
        console.log(`${key}:`, value);
      }

      await onAddBook(fd);
      alert("✅ Thêm sách thành công!");
      setOpen(false);
    } catch (err) {
      console.error("❌ Lỗi khi thêm sách:", err);
      alert("❌ Thêm sách thất bại!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-success">
          <Plus size={16} className="me-1" />
          Thêm Sách Bán
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl max-h-[80vh] overflow-y-auto"
        aria-describedby="add-book-description"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Thêm Sách Bán</DialogTitle>
        </DialogHeader>
        <p id="add-book-description" className="text-muted px-3">
          Vui lòng nhập đầy đủ thông tin sách cần thêm vào hệ thống.
        </p>

        <form onSubmit={handleSubmit} className="row g-4 p-2">
          {/* Thông tin chính */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Tên sách *</label>
            <input
              type="text"
              className="form-control"
              value={formData.Title}
              onChange={(e) =>
                setFormData({ ...formData, Title: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Giá bán *</label>
            <input
              type="number"
              className="form-control"
              value={formData.Price}
              onChange={(e) =>
                setFormData({ ...formData, Price: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Số lượng *</label>
            <input
              type="number"
              className="form-control"
              value={formData.Quantity}
              onChange={(e) =>
                setFormData({ ...formData, Quantity: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Kích thước</label>
            <input
              type="text"
              className="form-control"
              value={formData.PackagingSize}
              onChange={(e) =>
                setFormData({ ...formData, PackagingSize: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Số trang</label>
            <input
              type="number"
              className="form-control"
              value={formData.PageCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  PageCount: parseInt(e.target.value),
                })
              }
            />
          </div>

          {/* Tác giả - Thể loại */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Tác giả *</label>
            <select
              multiple
              className="form-select"
              value={formData.AuthorIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  AuthorIds: [...e.target.selectedOptions].map((o) => o.value),
                })
              }
            >
              {authorList.map((a) => (
                <option key={a.AuthorId} value={String(a.AuthorId)}>
                  {a.Name}
                </option>
              ))}
            </select>
            <div className="form-text">
              Đã chọn:{" "}
              {formData.AuthorIds.map(
                (id) =>
                  authorList.find((a) => String(a.AuthorId) === String(id))
                    ?.Name
              )
                .filter(Boolean)
                .join(", ") || "Chưa chọn"}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Thể loại *</label>
            <select
              multiple
              className="form-select"
              value={formData.CategoryIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  CategoryIds: [...e.target.selectedOptions].map(
                    (o) => o.value
                  ),
                })
              }
            >
              {categoryList.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="form-text">
              Đã chọn:{" "}
              {formData.CategoryIds.map(
                (id) =>
                  categoryList.find((c) => String(c.id) === String(id))?.name
              )
                .filter(Boolean)
                .join(", ") || "Chưa chọn"}
            </div>
          </div>

          {/* Thông tin phụ */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Mô tả</label>
            <input
              type="text"
              className="form-control"
              value={formData.Description}
              onChange={(e) =>
                setFormData({ ...formData, Description: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Nhà xuất bản</label>
            <input
              type="text"
              className="form-control"
              value={formData.Publisher}
              onChange={(e) =>
                setFormData({ ...formData, Publisher: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Người dịch</label>
            <input
              type="text"
              className="form-control"
              value={formData.Translator}
              onChange={(e) =>
                setFormData({ ...formData, Translator: e.target.value })
              }
            />
          </div>

          {/* Hình ảnh + Trạng thái */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Hình ảnh</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Ẩn sách?</label>
            <select
              className="form-select"
              value={formData.IsHidden ? "1" : "0"}
              onChange={(e) =>
                setFormData({ ...formData, IsHidden: e.target.value === "1" })
              }
            >
              <option value="0">Hiện</option>
              <option value="1">Ẩn</option>
            </select>
          </div>

          {/* Khuyến mãi */}
          <div className="col-12">
            <label className="form-label fw-semibold">Khuyến mãi</label>
            <select
              multiple
              className="form-select"
              value={formData.PromotionIds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  PromotionIds: [...e.target.selectedOptions].map(
                    (o) => o.value
                  ),
                })
              }
            >
              {promotions
                .filter((p) => p?.PromotionId && p?.PromotionName)
                .map((p) => (
                  <option key={p.PromotionId} value={String(p.PromotionId)}>
                    {p.PromotionName} - {Math.round(p.DiscountPercentage)}%
                  </option>
                ))}
            </select>
            <div className="form-text">
              Đã chọn:{" "}
              {formData.PromotionIds.map(
                (id) =>
                  promotions.find((p) => String(p.PromotionId) === String(id))
                    ?.PromotionName
              )
                .filter(Boolean)
                .join(", ") || "Chưa chọn"}
            </div>
          </div>

          {/* Hành động */}
          <div className="col-12 d-flex justify-content-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Thêm sách</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
