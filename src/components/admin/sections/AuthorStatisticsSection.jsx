import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const AuthorStatisticsSection = ({ statistics }) => {
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-md-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Tổng số tác giả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalAuthors}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Thêm các thống kê khác nếu cần */}
        {/* <div className="col-md-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Tác giả có sách</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.authorsWithBooks}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-md-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Tác giả chưa có sách</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.emptyAuthors}</div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default AuthorStatisticsSection;