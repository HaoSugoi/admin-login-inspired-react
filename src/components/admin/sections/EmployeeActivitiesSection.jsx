
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, RefreshCw, Filter } from 'lucide-react';

const EmployeeActivitiesSection = ({ activities, searchStaffId, onSearchChange, onSearch, isLoading }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour12: false })
    };
  };

  const getActivityTypeColor = (description) => {
    if (description.includes('đăng nhập')) return 'bg-blue-100 text-blue-800';
    if (description.includes('đăng xuất')) return 'bg-gray-100 text-gray-800';
    if (description.includes('tạo') || description.includes('Tạo')) return 'bg-green-100 text-green-800';
    if (description.includes('cập nhật') || description.includes('Cập nhật')) return 'bg-yellow-100 text-yellow-800';
    if (description.includes('xóa') || description.includes('Xóa')) return 'bg-red-100 text-red-800';
    if (description.includes('thanh toán')) return 'bg-emerald-100 text-emerald-800';
    return 'bg-gray-100 text-gray-800';
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
                placeholder="Nhập ID nhân viên hoặc tên để tìm kiếm..."
                value={searchStaffId}
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
                  <th>Mô tả hoạt động</th>
                  <th>ID Thông báo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => {
                  const { date, time } = formatDateTime(activity.createdDate);
                  
                  return (
                    <tr key={activity.notificationId}>
                      <td>
                        <div>
                          <div className="fw-medium">{date}</div>
                          <small className="text-muted">{time}</small>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="fw-medium">{activity.staff?.name || 'N/A'}</div>
                          <small className="text-muted">
                            ID: {activity.staffId}
                          </small>
                          {activity.staff?.email && (
                            <div>
                              <small className="text-muted">{activity.staff.email}</small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <Badge className={`${getActivityTypeColor(activity.description)} mb-1 align-self-start`}>
                            Hoạt động
                          </Badge>
                          <div className="text-truncate" style={{ maxWidth: '300px' }}>
                            {activity.description}
                          </div>
                        </div>
                      </td>
                      <td>
                        <code className="small">{activity.notificationId}</code>
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log('View details:', activity.notificationId)}
                        >
                          <Eye size={14} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
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
