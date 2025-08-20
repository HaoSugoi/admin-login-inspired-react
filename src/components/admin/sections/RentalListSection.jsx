import { useState } from 'react';
import DetailRentalBookDialog from '../dialogs/DetailRentalBookDialog';
import DetailRentBookItemListDialog from '../dialogs/DetailRentBookItemListDialog';
import AddRentalBookDialog from '../dialogs/AddRentalBookDialog';
import { Eye, EyeOff, Trash2, FileText, Info, Plus } from 'lucide-react'; // icon optional nếu dùng

const RentalListSection = ({ rentals = [], onAdd, onUpdate, onDelete, onMarkReturned, onToggleVisibility }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRentBookId, setSelectedRentBookId] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRentals = rentals.filter((item) =>
    item.Title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRentals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="col-12">
        <div className="card shadow-sm p-4 mb-4 bg-white rounded">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold mb-0">📚 Danh Sách Sách Thuê</h4>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên sách..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi tìm
                }}
                
                style={{ width: '250px' }}
              />
              <button
                className="btn btn-success d-flex align-items-center gap-1"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus size={16} /> Thêm Sách Thuê
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-success">
                <tr>
                  <th>Mã</th>
                  <th>Tên Sách</th>
                  <th>Giá</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.RentBookId || index}>

                    <td>
                      <span className="badge bg-primary">
                        {item.RentBookId?.substring(0, 6).toUpperCase() || 'N/A'}
                      </span>
                    </td>
                    <td>{item.Title || 'N/A'}</td>
                    <td className="text-nowrap">{item.Price?.toLocaleString()}đ</td>
                    <td>
                      <img
                        src={
                          item.ImageUrl
                        }
                        alt="Ảnh đại diện"
                        className="rounded"
                        style={{ width: 80, height: 100, objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.Quantity}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${item.IsHidden ? 'btn-outline-secondary' : 'btn-outline-warning'}`}
                        onClick={() => onToggleVisibility(item.RentBookId, item.IsHidden)}
                        title={item.IsHidden ? 'Hiện sách' : 'Ẩn sách'}
                      >
                        {item.IsHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDelete(item.RentBookId)}
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>

                        {item.status !== "Returned" && (
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => {
                              setSelectedId(item.RentBookId);
                              setShowDetail(true);
                            }}
                            title="Chi tiết"
                          >
                            <Info size={16} />
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedRentBookId(item.RentBookId)}
                          title="Xem bản sao"
                        >
                          <FileText size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRentals.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      Không có dữ liệu sách thuê.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Trước</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Tiếp</button>
            </li>
          </ul>
        </nav>
      )}

      {showDetail && (
        <DetailRentalBookDialog
          rentBookId={selectedId}
          onClose={() => setShowDetail(false)}
          onUpdated={() => refetchRentBooks()}
        />
      )}
      {selectedRentBookId && (
        <DetailRentBookItemListDialog
          rentBookId={selectedRentBookId}
          onClose={() => setSelectedRentBookId(null)}
        />
      )}
      {showAddDialog && (
        <AddRentalBookDialog
          onClose={() => setShowAddDialog(false)}
          onAdd={onAdd}
        />
      )}
    </>
  );
};

export default RentalListSection;