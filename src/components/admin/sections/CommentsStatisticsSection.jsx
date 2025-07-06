
import React from 'react';
import { MessageSquare, CheckCircle, Clock, Star } from 'lucide-react';

const CommentsStatisticsSection = ({ statistics }) => {
  const stats = [
    {
      title: 'Tổng Bình Luận',
      value: statistics?.totalComments || 0,
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-light'
    },
    {
      title: 'Đã Duyệt',
      value: statistics?.approvedComments || 0,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-light'
    },
    {
      title: 'Chờ Duyệt',
      value: statistics?.pendingComments || 0,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-light'
    },
    {
      title: 'Đánh Giá TB',
      value: statistics?.averageRating?.toFixed(1) || '0.0',
      icon: Star,
      color: 'text-info',
      bgColor: 'bg-light'
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <stat.icon className={`stat-icon ${stat.color}`} size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsStatisticsSection;
