
import React from 'react';
import AdminTopbar from './AdminTopbar';
import OverallStatsSection from './sections/OverallStatsSection';
import RevenueStatsSection from './sections/RevenueStatsSection';

const StatsManagementContent = (props) => {
  const { 
    isLoading, 
    error, 
    handleRefreshStats, 
    rawStats, 
    isSettingDate,
    handleSetSaleDate,
    handleSetRentDate 
  } = props;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-success fw-bold">Báo Cáo Thống Kê (API Mới)</h4>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleRefreshStats}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Đang tải...
                    </>
                  ) : (
                    <>🔄 Làm mới</>
                  )}
                </button>
                {isSettingDate && (
                  <span className="badge bg-warning">
                    Đang cập nhật ngày...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="row">
          <div className="col-12 mb-3">
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <div>
                <strong>📡 API Status:</strong> Đang sử dụng API mới từ backend
              </div>
              <div>
                <span className={`badge ${error ? 'bg-danger' : isLoading ? 'bg-warning' : 'bg-success'}`}>
                  {error ? 'Lỗi' : isLoading ? 'Đang tải' : 'Hoạt động'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <OverallStatsSection 
            statistics={props.statistics} 
            isLoading={isLoading}
            error={error}
            rawStats={rawStats}
          />
        </div>

        <div className="row">
          <RevenueStatsSection 
            statistics={props.statistics}
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
