import apiClient  from './api';


export const userService = {
  // GET: Lấy danh sách tất cả người dùng (khách hàng)
  getUsers: async () => { 
    const res = await apiClient.get('/Staff');
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
  getAllUsers: async()  => {
    const res = await apiClient.get('/Staff');
    return res.data;
  },

 // PUT: Cập nhật người dùng theo ID
// PUT: Cập nhật nhân viên theo ID (KHÔNG xử lý hình ảnh)
updateUser: async (StaffId, data) => {
  const formData = new FormData();

  formData.append("FullName", data.FullName || "");
  formData.append("PhoneNumber", data.PhoneNumber || "");
  formData.append("Address", data.Address || "");
  formData.append("Password", data.Password || "string");
  formData.append("DateOfBirth", data.DateOfBirth || "");
  formData.append("Role", data.Role || "Staff");
  formData.append("Points", data.Points || 0);

  if (data.ImageFile) {
    formData.append("ImageFile", data.ImageFile);
  }

  const res = await apiClient.put(`/Staff/${StaffId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
},

  // DELETE: Xóa người dùng theo ID
  deleteUser: async (id) => {
    const res = await apiClient.delete(`/Staff/${id}`);
    return res.data;
  }
};