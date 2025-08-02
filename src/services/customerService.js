import apiClient  from './api';

export const userService = {
  // GET: Lấy danh sách tất cả người dùng (khách hàng)
  getUsers: async () => {
    const res = await apiClient.get('https://chosachonline-datn.onrender.com/api/UserManager');
    return res.data.map(user => ({
      Id: user.Id,
      UserName: user.UserName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber ?? '(Chưa có)',
      Address: user.Address,
      Points: user.Points ?? '0',
      Role: user.Role,
      joinDate: new Date(user.DateOfBirth).toLocaleDateString('vi-VN'),
      ImageUser: user.ImageUser ?? '/placeholder.svg',
    }));
  },

  // POST: Tạo người dùng mới
  createUser: async (data) => {
    const res = await apiClient.post('https://chosachonline-datn.onrender.com/api/UserManager', data);
    return res.data;
  },

  // PUT: Cập nhật người dùng theo ID
 updateUser: async (id, data) => {
  const formData = new FormData();

  formData.append("Address", data.Address || "");
  formData.append("Role", data.Role);
  formData.append("PhoneNumber", data.PhoneNumber || "");
  formData.append("DateOfBirth", data.DateOfBirth || "");
  formData.append("Points", data.Points ?? 0);
  if (data.ImageFile) {
    formData.append("ImageFile", data.ImageFile);
  }
console.log("cập nhât mmmmmmmmm",formData)
console.log("cập nhât tttttttttttt",data)
  const res = await apiClient.put(`https://chosachonline-datn.onrender.com/api/UserManager/${id}`, formData, {
    
    headers: {
      'Content-Type': 'multipart/form-data', // ✅ Bắt buộc để ASP.NET Core nhận được FormFile
    },
  });
  console.log("Cập nhật xong, phản hồi từ server:", res.data);
  return res.data;
},


  // DELETE: Xóa người dùng theo ID
  deleteUser: async (id) => {
    const res = await apiClient.delete(`https://chosachonline-datn.onrender.com/api/UserManager/${id}`);
    return res.data;
  }
};