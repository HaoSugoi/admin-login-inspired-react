
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Users, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const EmployeeActivitiesStatisticsSection = ({ statistics }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
  };

  const statsCards = [
    {
      title: 'Tổng Hoạt Động',
      value: formatNumber(statistics.totalActivities),
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Nhân Viên Hoạt Động',
      value: statistics.activeStaff,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Hoạt Động Hôm Nay',
      value: statistics.todayActivities,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Hoạt Động Tuần Này',
      value: statistics.thisWeekActivities,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Hoạt Động Tháng Này',
      value: statistics.thisMonthActivities,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Hoạt Động Gần Đây',
      value: statistics.recentActivities,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <>
      {statsCards.map((stat, index) => (
        <div key={index} className="col-md-4 col-lg-2 mb-4">
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

export default EmployeeActivitiesStatisticsSection;
