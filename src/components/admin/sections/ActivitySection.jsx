
import React from 'react';

const ActivitySection = ({ activities }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="section-card">
        <div className="section-title">
          <span>Hoạt động gần đây</span>
          <a href="#" className="view-all-link">View All ›</a>
        </div>
        
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-user">{activity.user}</div>
              <div className="activity-action">{activity.action}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
