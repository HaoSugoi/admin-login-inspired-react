
import React from 'react';

const ConditionStatisticsSection = ({ conditionStats }) => {
  return (
    <div className="col-12 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Thống Kê Tình Trạng Sách</span>
        </div>
        
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-success">{conditionStats.excellent}</h4>
              <p className="mb-0">Tình Trạng Tốt (≥90%)</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-warning">{conditionStats.good}</h4>
              <p className="mb-0">Tình Trạng Khá (70-89%)</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-info">{conditionStats.average}</h4>
              <p className="mb-0">Tình Trạng Trung Bình (50-69%)</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="text-center p-3 border rounded">
              <h4 className="text-danger">{conditionStats.poor}</h4>
              <p className="mb-0">Tình Trạng Kém (&lt;50%)</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h6>Biểu Đồ Phân Bố Tình Trạng</h6>
          <div className="d-flex align-items-end" style={{height: '200px', gap: '20px'}}>
            <div className="text-center">
              <div 
                className="bg-success" 
                style={{
                  width: '60px',
                  height: `${(conditionStats.excellent / conditionStats.total) * 180}px`,
                  minHeight: '10px'
                }}
              ></div>
              <small>Tốt</small>
            </div>
            <div className="text-center">
              <div 
                className="bg-warning" 
                style={{
                  width: '60px',
                  height: `${(conditionStats.good / conditionStats.total) * 180}px`,
                  minHeight: '10px'
                }}
              ></div>
              <small>Khá</small>
            </div>
            <div className="text-center">
              <div 
                className="bg-info" 
                style={{
                  width: '60px',
                  height: `${(conditionStats.average / conditionStats.total) * 180}px`,
                  minHeight: '10px'
                }}
              ></div>
              <small>Trung Bình</small>
            </div>
            <div className="text-center">
              <div 
                className="bg-danger" 
                style={{
                  width: '60px',
                  height: `${(conditionStats.poor / conditionStats.total) * 180}px`,
                  minHeight: '10px'
                }}
              ></div>
              <small>Kém</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionStatisticsSection;
