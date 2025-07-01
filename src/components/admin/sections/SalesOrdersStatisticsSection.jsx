
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';

const SalesOrdersStatisticsSection = ({ statistics }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'Tổng Đơn Hàng',
      value: statistics.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Chờ Xử Lý',
      value: statistics.pendingOrders,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Đang Xử Lý',
      value: statistics.processingOrders,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Đã Hoàn Thành',
      value: statistics.completedOrders,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Đã Hủy',
      value: statistics.cancelledOrders,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Tổng Doanh Thu',
      value: formatCurrency(statistics.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
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

export default SalesOrdersStatisticsSection;
