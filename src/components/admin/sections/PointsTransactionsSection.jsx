
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus, Minus } from 'lucide-react';

const PointsTransactionsSection = ({ pointTransactions, onAdd, onUpdate, onDelete }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'Tích điểm': return 'bg-green-100 text-green-800';
      case 'Đổi điểm': return 'bg-red-100 text-red-800';
      case 'Điều chỉnh': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Tích điểm': return <Plus size={16} className="text-green-600" />;
      case 'Đổi điểm': return <Minus size={16} className="text-red-600" />;
      default: return <Edit size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="col-12">
      <Card>
        <CardHeader className="d-flex flex-row align-items-center justify-content-between">
          <CardTitle>Lịch Sử Giao Dịch Điểm</CardTitle>
          <Button onClick={() => onAdd()}>
            <Plus className="me-2" size={16} />
            Thêm Giao Dịch
          </Button>
        </CardHeader>
        <CardContent>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Mã GD</th>
                  <th>Khách Hàng</th>
                  <th>Loại GD</th>
                  <th>Điểm</th>
                  <th>Ngày GD</th>
                  <th>Ghi Chú</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {pointTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="fw-bold">{transaction.transactionCode}</td>
                    <td>
                      <div>
                        <div className="fw-medium">{transaction.customerName}</div>
                        <small className="text-muted">{transaction.customerPhone}</small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {getTransactionIcon(transaction.type)}
                        <Badge className={`ms-2 ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </Badge>
                      </div>
                    </td>
                    <td className={`fw-bold ${transaction.type === 'Tích điểm' ? 'text-success' : 'text-danger'}`}>
                      {transaction.type === 'Tích điểm' ? '+' : '-'}{transaction.points}
                    </td>
                    <td>{new Date(transaction.transactionDate).toLocaleDateString('vi-VN')}</td>
                    <td>{transaction.notes || '-'}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdate(transaction.id, transaction)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(transaction.id)}
                          className="text-danger"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsTransactionsSection;
