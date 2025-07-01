
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Eye, Edit, Trash2 } from 'lucide-react';

const RewardsManagementSection = ({ rewards, onRedeem }) => {
  const [selectedReward, setSelectedReward] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoạt động': return 'bg-green-100 text-green-800';
      case 'Hết hàng': return 'bg-red-100 text-red-800';
      case 'Tạm dừng': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="col-12">
      <Card>
        <CardHeader className="d-flex flex-row align-items-center justify-content-between">
          <CardTitle>Quản Lý Phần Thưởng</CardTitle>
          <Button>
            <Gift className="me-2" size={16} />
            Thêm Phần Thưởng
          </Button>
        </CardHeader>
        <CardContent>
          <div className="row">
            {rewards.map((reward) => (
              <div key={reward.id} className="col-md-4 mb-3">
                <Card className="h-100">
                  <CardContent className="p-3">
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <div className="d-flex align-items-center">
                        <Gift className="text-purple-600 me-2" size={20} />
                        <h6 className="mb-0">{reward.name}</h6>
                      </div>
                      <Badge className={getStatusColor(reward.status)}>
                        {reward.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted small mb-2">{reward.description}</p>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <Star className="text-yellow-500 me-1" size={16} />
                        <span className="fw-bold">{reward.pointsRequired} điểm</span>
                      </div>
                      <span className="small text-muted">Còn: {reward.quantity}</span>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReward(reward)}
                        className="flex-1"
                      >
                        <Eye size={14} className="me-1" />
                        Xem
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRedeem(reward.id)}
                        disabled={reward.status === 'Hết hàng'}
                        className="flex-1"
                      >
                        <Gift size={14} className="me-1" />
                        Đổi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsManagementSection;
