
import React from 'react';
import AdminTopbar from './AdminTopbar';
import OverallStatsSection from './sections/OverallStatsSection';
import RevenueStatsSection from './sections/RevenueStatsSection';

const StatsManagementContent = (props) => {
  const { isLoading, error, handleRefreshStats } = props;

  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-success fw-bold">Báo Cáo Thống Kê</h4>
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
            </div>
          </div>
        </div>

        <div className="row">
          <OverallStatsSection 
            statistics={props.statistics} 
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div className="row">
          <RevenueStatsSection 
            statistics={props.statistics}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsManagementContent;
