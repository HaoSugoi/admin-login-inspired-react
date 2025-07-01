
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, Gift, TrendingUp, Award, CreditCard } from 'lucide-react';

const PointsStatisticsSection = ({ statistics }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
  };

  const statsCards = [
    {
      title: 'Tổng Điểm Đã Phát Hành',
      value: formatNumber(statistics.totalPointsIssued),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Tổng Điểm Đã Đổi',
      value: formatNumber(statistics.totalPointsRedeemed),
      icon: Gift,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Điểm Còn Lại',
      value: formatNumber(statistics.totalPointsRemaining),
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Khách Hàng Có Điểm',
      value: statistics.activeCustomers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Giao Dịch Hôm Nay',
      value: statistics.todayTransactions,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tổng Giao Dịch',
      value: statistics.totalTransactions,
      icon: CreditCard,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
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

export default PointsStatisticsSection;
