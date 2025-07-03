
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, RefreshCw, Filter } from 'lucide-react';

const EmployeeActivitiesSection = ({ activities, searchEmployeeId, onSearchChange, onSearch, isLoading }) => {
  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'Đăng nhập': return 'bg-blue-100 text-blue-800';
      case 'Đăng xuất': return 'bg-gray-100 text-gray-800';
      case 'Tạo đơn hàng': return 'bg-green-100 text-green-800';
      case 'Cập nhật đơn hàng': return 'bg-yellow-100 text-yellow-800';
      case 'Xóa đơn hàng': return 'bg-red-100 text-red-800';
      case 'Thêm sách': return 'bg-purple-100 text-purple-800';
      case 'Cập nhật sách': return 'bg-orange-100 text-orange-800';
      case 'Xử lý thanh toán': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Thành công': return 'bg-green-100 text-green-800';
      case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
      case 'Thất bại': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="col-12">
      <Card>
        <CardHeader>
          <CardTitle className="d-flex justify-content-between align-items-center">
            <span>Hoạt Động Nhân Viên</span>
            <div className="d-flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="me-2" size={16} />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="me-2" size={16} />
                Làm mới
              </Button>
            </div>
          </CardTitle>
          
          {/* Search Section */}
          <div className="d-flex gap-2 mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập ID nhân viên để tìm kiếm..."
                value={searchEmployeeId}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Button 
                className="btn btn-outline-secondary"
                onClick={onSearch}
                disabled={isLoading}
              >
                <Search size={16} className="me-2" />
                {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Nhân viên</th>
                  <th>Hoạt động</th>
                  <th>Chi tiết</th>
                  <th>Trạng thái</th>
                  <th>IP Address</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <div>
                        <div className="fw-medium">{activity.date}</div>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">{activity.employeeName}</div>
                        <small className="text-muted">ID: {activity.employeeId}</small>
                      </div>
                    </td>
                    <td>
                      <Badge className={getActivityTypeColor(activity.activityType)}>
                        {activity.activityType}
                      </Badge>
                    </td>
                    <td>
                      <div className="text-truncate" style={{ maxWidth: '200px' }}>
                        {activity.description}
                      </div>
                    </td>
                    <td>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </td>
                    <td>
                      <code className="small">{activity.ipAddress}</code>
                    </td>
                    <td>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('View details:', activity.id)}
                      >
                        <Eye size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {activities.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">Không có hoạt động nào được tìm thấy</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeActivitiesSection;
