import React, { useEffect, useState } from 'react';
import { salebooksService } from '../../../services/SaleBooksService';
import { categoryService } from '../../../services/categoryService';
import { authorService } from '../../../services/authorService';
import { promotionService } from '../../../services/promotionService';

const DetailSaleBookDialog = ({ book, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, catRes, authRes, promoRes] = await Promise.all([
          salebooksService.getSaleBookById(book?.SaleBookId),
          categoryService.getAllCategories(),
          authorService.getAllAuthors(),
          promotionService.getAllPromotions(),
        ]);
        setDetail(bookRes);
        setCategories(catRes);
        setAuthors(authRes);
        setPromotions(promoRes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (book?.SaleBookId) fetchData();
  }, [book]);

  const getAuthorNames = () => {
    if (!detail?.AuthorIds) return '';
    return detail.AuthorIds
      .map((id) => authors.find((a) => a.AuthorId === id)?.Name)
      .filter(Boolean)
      .join(', ');
  };

  const getCategoryNames = () => {
    if (!detail?.CategoryIds) return '';
    return detail.CategoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getPromotionNames = () => {
    if (!detail?.PromotionIds) return '';
    return detail.PromotionIds
      .map((id) => promotions.find((p) => p.PromotionId === id)?.PromotionName)
      .filter(Boolean)
      .join(', ');
  };


  if (!book?.SaleBookId) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">📕 Chi Tiết Sách Bán</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading && <div className="text-center text-secondary">⏳ Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">❌ Lỗi: {error.message}</div>}

            {detail && (
              <div className="row">
                <div className="col-md-7">
                  <ul className="list-group list-group-flush mb-3 text-sm">
                    <li className="list-group-item"><strong>📌 Tiêu đề:</strong> {detail.Title || 'Không rõ'}</li>
                    <li className="list-group-item"><strong>📝 Mô tả:</strong> {detail.Description || 'Không có'}</li>
                    <li className="list-group-item"><strong>🏢 Nhà xuất bản:</strong> {detail.Publisher || 'Không rõ'}</li>
                    <li className="list-group-item"><strong>🌐 Dịch giả:</strong> {detail.Translator || 'Không có'}</li>
                    <li className="list-group-item"><strong>📐 Kích thước:</strong> {detail.PackagingSize || 'Không rõ'}</li>
                    <li className="list-group-item"><strong>📄 Số trang:</strong> {detail.PageCount || 'Không rõ'}</li>
                    <li className="list-group-item"><strong>💰 Giá gốc:</strong> <span className="text-primary fw-bold">{(detail.Price ?? 0).toLocaleString()} đ</span></li>
                    <li className="list-group-item"><strong>🔥 Giá KM:</strong> <span className="text-danger fw-bold">{(detail.FinalPrice ?? 0).toLocaleString()} đ</span></li>
                    <li className="list-group-item"><strong>📦 Số lượng:</strong> {detail.Quantity}</li>
                    <li className="list-group-item"><strong>👁️ Trạng thái:</strong> {detail.IsHidden ? '🔒 Đã ẩn' : '👁️ Hiển thị'}</li>
                    <li className="list-group-item"><strong>👨‍💼 Tác giả:</strong> {getAuthorNames() || 'Không có'}</li>
                    <li className="list-group-item"><strong>📂 Thể loại:</strong> {getCategoryNames() || 'Không có'}</li>
                    <li className="list-group-item"><strong>🏷️ Khuyến mãi:</strong> {getPromotionNames() || 'Không có'}</li>
                  </ul>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img
                    src={detail.ImageUrl ? `https://chosachonline-datn.onrender.com${detail.ImageUrl}` : '/no-book.png'}
                    alt="Ảnh sách"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: 260 }}
                    onError={(e) => {
                      if (!e.target.dataset.error) {
                        e.target.src = '/no-book.png';
                        e.target.dataset.error = 'true'; // tránh lặp
                      }
                    }}
                  />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSaleBookDialog;