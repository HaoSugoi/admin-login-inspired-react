// import { useState } from 'react';

// import { useCategoryManagement } from '../../../hooks/useCategoryManagement';

// const CategoryListSection = (categories) => {
//   const { 
//     statistics,
//     isLoadingCategories,
//     filterCategories,
//     handleDeleteCategory,
//     isDeleting
//   } = useCategoryManagement();

//   const [searchTerm, setSearchTerm] = useState('');
//   const filteredCategories = filterCategories(searchTerm);
//   const safeCategories = categories || [];

//   return (
//     <div className="col-12 mb-4">
//       <div className="section-card">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <div>
//             <h5>Quản Lý Danh Mục</h5>
//             <div className="d-flex gap-2 mt-2">
//               <span className="badge bg-primary">Tổng: {statistics.totalCategories}</span>
//               <span className="badge bg-success">Có sách: {statistics.categoriesWithBooks}</span>
//               <span className="badge bg-warning">Trống: {statistics.emptyCategories}</span>
//             </div>
//           </div>
          
//           <div className="d-flex gap-2">
//             <input
//               type="text"
//               placeholder="Tìm kiếm danh mục..."
//               className="form-control"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
        
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Tên Danh Mục</th>
//                 <th>Mô Tả</th>
//                 <th>Số Sách</th>
//                 <th className="text-end">Thao Tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {safeCategories.map((category, index) => (
//                 <tr key={`category-${category.id}`}>
//                   <td className="fw-medium">{category.name}</td>
//                   <td className="text-muted">
//                     {category.description || "—"}
//                   </td>
//                   <td>
//                     <span className="badge bg-primary">
//                       {category.booksCount || 0}
//                     </span>
//                   </td>
//                   <td className="text-end">
//                     <button
//                       className="btn btn-sm btn-outline-primary me-2"
//                       onClick={() => console.log('Edit category', category.id)}
//                     >
//                       Sửa
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={() => handleDeleteCategory(category.id)}
//                       disabled={isDeleting}
//                     >
//                       {isDeleting ? (
//                         <span
//                           className="spinner-border spinner-border-sm me-1"
//                           role="status"
//                         ></span>
//                       ) : null}
//                       Xóa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
              
//               {safeCategories.length === 0 && (
//                 <tr key="no-results">
//                   <td colSpan="4" className="text-center text-muted">
//                     {isLoadingCategories ? (
//                       <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                     ) : (
//                       "Không tìm thấy danh mục nào"
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryListSection;