import React, { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import OverallStatsSection from './sections/OverallStatsSection';
import RevenueStatsSection from './sections/RevenueStatsSection';
import apiClient from '../../services/api';

const StatsManagementContent = ({
  isLoading,
  error,
  handleRefreshStats,
  rawStats,
  isSettingDate,
  handleSetSaleDate,
  handleSetRentDate,
  statistics
}) => {
  const [exporting, setExporting] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Chuyển ngày về ISO theo múi giờ VN
// Không dùng toISOString nữa, mà định dạng thủ công để giữ nguyên giờ Việt Nam
const toLocalISOString = (dateStr, isEnd = false) => {
  const d = new Date(dateStr);
  if (isEnd) {
    d.setHours(23, 59, 59, 999); // cuối ngày
  } else {
    d.setHours(0, 0, 0, 0); // đầu ngày
  }

  // Trả về chuỗi có định dạng "yyyy-MM-ddTHH:mm:ss"
  const pad = (n) => (n < 10 ? '0' + n : n);
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds())
  );
};


  // Lấy tên file từ header content-disposition
  const getFilenameFromDisposition = (disposition) => {
    if (!disposition) return null;
    const match = disposition.match(/filename\*?=(?:UTF-8'')?(.+)/);
    return match ? decodeURIComponent(match[1].replace(/['"]/g, "")) : null;
  };

  // Xử lý xuất báo cáo
  const handleExport = async (type) => {
    if (!fromDate || !toDate) {
      alert("❗ Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
      return;
    }

    const endpoint = type === 'sale' ? '/Report/sale/export' : '/Report/rent/export';
    const defaultFileName = type === 'sale' ? 'BaoCaoBan.xlsx' : 'BaoCaoThue.xlsx';

    try {
      setExporting(true);
      const payload = {
        FromDate: toLocalISOString(fromDate, false),
        ToDate: toLocalISOString(toDate, true),
      };

      const response = await apiClient.post(endpoint, payload, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const filename = getFilenameFromDisposition(response.headers['content-disposition']) || defaultFileName;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert(`❌ Xuất báo cáo ${type === 'sale' ? 'bán' : 'thuê'} thất bại!`);
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar
        isLoading={isLoading}
        error={error}
        statistics={statistics}
        rawStats={rawStats}
      />

      <div className="content-section">
        {/* Bộ lọc và xuất báo cáo */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex flex-column gap-3">
              <h4 className="text-success fw-bold">📊 Báo Cáo Thống Kê</h4>

              <div className="d-flex flex-wrap gap-2 align-items-end">
                <div>
                  <label className="form-label mb-0">Từ ngày:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label mb-0">Đến ngày:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleExport("sale")}
                  disabled={exporting}
                >
                  📥 Xuất báo cáo bán
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => handleExport("rent")}
                  disabled={exporting}
                >
                  📥 Xuất báo cáo thuê
                </button>

                <button
                  className="btn btn-outline-success"
                  onClick={handleRefreshStats}
                  disabled={isSettingDate}
                >
                  🔄 Làm mới dữ liệu
                </button>

                {isSettingDate && (
                  <span className="badge bg-warning text-dark">
                    Đang cập nhật ngày...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tổng quan thống kê */}
        <div className="row">
          <OverallStatsSection
            statistics={statistics}
            isLoading={isLoading}
            error={error}
            rawStats={rawStats}
          />
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="row">
          <RevenueStatsSection
            statistics={statistics}
            isLoading={isLoading}
            error={error}
            rawStats={rawStats}
            onSetSaleDate={handleSetSaleDate}
            onSetRentDate={handleSetRentDate}
            isSettingDate={isSettingDate}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsManagementContent;
