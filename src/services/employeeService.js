import apiClient  from './api';

export const userService = {
  // GET: Lấy danh sách tất cả người dùng (khách hàng)
  getUsers: async () => {
    const res = await apiClient.get('/Staff/users');
    return res.data.map(users => ({
      Id: users.Id,
      UserName: users.UserName,
      Email: users.Email,
      PhoneNumber: users.PhoneNumber ?? '(Chưa có)',
      Address: users.Address,
      Role: users.Role,
      points: users.Points,
      DateOfBirth: new Date(users.DateOfBirth).toLocaleDateString('vi-VN'),
      ImageUser: users.ImageUser ?? '/placeholder.svg',
    }));
  },

  // POST: Tạo người dùng mới
  createUser: async (data) => {
    const res = await apiClient.post('/Staff/users', data);
    return res.data;
  },

 // PUT: Cập nhật người dùng theo ID
// PUT: Cập nhật nhân viên theo ID (KHÔNG xử lý hình ảnh)
updateUser: async (StaffId, data) => {
  const payload = {
    Address: data.Address || "",
    Role: data.Role,
    PhoneNumber: data.PhoneNumber || "",
    DateOfBirth: data.DateOfBirth || "",
    Points: data.Points ?? 0,
  };

  const res = await apiClient.put(`/Staff/${StaffId}`, payload);
  console.log("Cập nhật xong, phản hồi từ server:", res.data);
  return res.data;
},


  // DELETE: Xóa người dùng theo ID
  deleteUser: async (id) => {
    const res = await apiClient.delete(`/Staff/${id}`);
    return res.data;
  }
};