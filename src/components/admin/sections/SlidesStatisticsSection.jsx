
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Images, Eye, EyeOff } from 'lucide-react';

const SlidesStatisticsSection = ({ statistics }) => {
  const statsCards = [
    {
      title: 'Tổng Slide',
      value: statistics.totalSlides,
      icon: Images,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Slide Đang Hoạt Động',
      value: statistics.activeSlides,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Slide Không Hoạt Động',
      value: statistics.inactiveSlides,
      icon: EyeOff,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <>
      {statsCards.map((stat, index) => (
        <div key={index} className="col-md-4 mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="d-flex align-items-center">
                <div className={`p-2 rounded-circle ${stat.bgColor} me-3`}>
                  <stat.icon className={stat.color} size={20} />
                </div>
                <div>
                  <p className="text-muted mb-0 small">{stat.title}</p>
                  <h6 className="mb-0">{stat.value}</h6>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};

export default SlidesStatisticsSection;
