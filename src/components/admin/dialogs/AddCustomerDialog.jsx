
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, User, Mail, Phone, MapPin, Calendar, Shield, AlertCircle, Save, X } from 'lucide-react';

const AddCustomerDialog = ({ onAddCustomer }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    DateOfBirth: '',
    Role: 'Customer'
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      UserName: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      DateOfBirth: '',
      Role: 'Customer'
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.UserName || !formData.Email) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      await onAddCustomer(formData);
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm khách hàng');
    }
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-green-600 hover:bg-green-700 text-white border-0"
        style={{ backgroundColor: '#16a34a', color: 'white' }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Thêm Khách Hàng
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <User className="w-5 h-5 text-green-500" />
              Thêm Khách Hàng Mới
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="userName" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-blue-500" />
                  Họ Tên *
                </Label>
                <Input
                  id="userName"
                  value={formData.UserName}
                  onChange={(e) => setFormData({...formData, UserName: e.target.value})}
                  placeholder="Nhập họ tên khách hàng"
                  className="mt-1 border-gray-300 bg-white text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 text-red-500" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.Email}
                    onChange={(e) => setFormData({...formData, Email: e.target.value})}
                    placeholder="Nhập email"
                    className="mt-1 border-gray-300 bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 text-green-500" />
                    Số Điện Thoại
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.PhoneNumber}
                    onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})}
                    placeholder="Nhập số điện thoại"
                    className="mt-1 border-gray-300 bg-white text-gray-900"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  Địa Chỉ
                </Label>
                <Input
                  id="address"
                  value={formData.Address}
                  onChange={(e) => setFormData({...formData, Address: e.target.value})}
                  placeholder="Nhập địa chỉ"
                  className="mt-1 border-gray-300 bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Ngày Sinh
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.DateOfBirth}
                    onChange={(e) => setFormData({...formData, DateOfBirth: e.target.value})}
                    className="mt-1 border-gray-300 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Vai Trò
                  </Label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value="Khách Hàng"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 text-white border-0"
                style={{ backgroundColor: '#16a34a', color: 'white' }}
              >
                <Save className="w-4 h-4" />
                Thêm Khách Hàng
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCustomerDialog;
