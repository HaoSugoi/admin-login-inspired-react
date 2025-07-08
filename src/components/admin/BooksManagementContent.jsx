import React, { useEffect, useState } from 'react';
import AdminTopbar from './AdminTopbar';
import BooksListSection from './sections/BooksListSection';
import BookStatisticsSection from './sections/BookStatisticsSection';
import { useSaleBooksApi } from '../../hooks/useSaleBooksApi';
import { promotionService } from '@/services/promotionService';
import { authorService } from '@/services/authorService';
import { categoryService } from '@/services/categoryService';

const BooksManagementContent = (props) => {
  const {
    salebookss: books = [],
    isLoadingSaleBookss: isLoading,
    salebookssError: error,
    createSaleBooks,
    updateSaleBooks,
    deleteSaleBooks,
    toggleVisibility,
  } = useSaleBooksApi();

  const [promotionList, setPromotionList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Fetch toàn bộ dữ liệu cần thiết
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promotions, authors, categories] = await Promise.all([
          promotionService.getAllPromotions(),
          authorService.getAllAuthors(),
          categoryService.getAllCategories(),
        ]);

        setPromotionList(promotions);
        setAuthorList(authors);
        setCategoryList(categories);
      } catch (err) {
        console.error('❌ Lỗi khi load dữ liệu:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddBook = (data) => createSaleBooks(data) ;
  
  const handleUpdateBook = (id, data) => updateSaleBooks({ id, data });
  const handleDeleteBook = (id) => deleteSaleBooks(id);
  const handleToggleBookVisibility = (id, isHidden) =>
    toggleVisibility({ id, isHidden: isHidden ? 0 : 1 });

  if (isLoading) return <div>Đang tải sách bán...</div>;
  if (error) return <div>Lỗi khi tải sách bán: {error.message}</div>;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Sách Bán</h4>
          </div>
        </div>

        <div className="row">
          <BookStatisticsSection books={books} />
        </div>

        <div className="row">
          <BooksListSection
            books={books}
            authors={authorList} // ✅ Truyền danh sách tác giả
            categories={categoryList} // ✅ Truyền danh sách thể loại
            promotions={promotionList} // ✅ Truyền danh sách khuyến mãi
            onAddBook={handleAddBook}
            onUpdateBook={handleUpdateBook}
            onDeleteBook={handleDeleteBook}
            onToggleBookVisibility={handleToggleBookVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default BooksManagementContent;