
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, User, Mail, Phone, MapPin, Calendar, Shield, Image, AlertCircle, Save, X } from 'lucide-react';

const AddEmployeeDialog = ({ onAddEmployee }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    DateOfBirth: '',
    Role: 'Employee',
    ImageUser: null
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      UserName: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      DateOfBirth: '',
      Role: 'Employee',
      ImageUser: null
    });
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({...formData, ImageUser: file});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.UserName || !formData.Email) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      await onAddEmployee(formData);
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm nhân viên');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
        <Plus className="w-4 h-4 mr-2" />
        Thêm Nhân Viên
      </Button>

      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5 text-green-500" />
              Thêm Nhân Viên Mới
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="imageUser" className="flex items-center gap-2 text-sm font-medium">
                  <Image className="w-4 h-4 text-blue-500" />
                  Ảnh Đại Diện
                </Label>
                <Input
                  id="imageUser"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="userName" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-blue-500" />
                  Họ Tên *
                </Label>
                <Input
                  id="userName"
                  value={formData.UserName}
                  onChange={(e) => setFormData({...formData, UserName: e.target.value})}
                  placeholder="Nhập họ tên nhân viên"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="w-4 h-4 text-red-500" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.Email}
                    onChange={(e) => setFormData({...formData, Email: e.target.value})}
                    placeholder="Nhập email"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-4 h-4 text-green-500" />
                    Số Điện Thoại
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.PhoneNumber}
                    onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})}
                    placeholder="Nhập số điện thoại"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  Địa Chỉ
                </Label>
                <Input
                  id="address"
                  value={formData.Address}
                  onChange={(e) => setFormData({...formData, Address: e.target.value})}
                  placeholder="Nhập địa chỉ"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Ngày Sinh
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.DateOfBirth}
                    onChange={(e) => setFormData({...formData, DateOfBirth: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Vai Trò
                  </Label>
                  <select
                    id="role"
                    value={formData.Role}
                    onChange={(e) => setFormData({...formData, Role: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Employee">Nhân Viên</option>
                    <option value="Manager">Quản Lý</option>
                    <option value="Admin">Quản Trị Viên</option>
                  </select>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                Thêm Nhân Viên
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEmployeeDialog;
