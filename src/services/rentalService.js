import apiClient from './api'; // Đảm bảo `apiClient` là một instance từ axios.create()

export const rentalService = {
  // Lấy danh sách tất cả đơn thuê
  getAllRentals: async () => {
    const res = await apiClient.get('/admin/rentorders');
    return res.data;
  },

  // Lọc đơn thuê theo trạng thái
  getRentalsByStatus: async (status) => {
    const res = await apiClient.get(`/admin/rentorders/status/${status}`);
    return res.data;
  },

  // Lấy thông tin đơn thuê theo ID
  getRentalById: async (orderId) => {
    const res = await apiClient.get(`/admin/rentorders/${orderId}`);
    return res.data;
  },

  // Lấy chi tiết sách trong đơn thuê
  getRentalDetailsById: async (orderId) => {
    const res = await apiClient.get(`/admin/rentorders/${orderId}/details`);
    return res.data;
  },

  // Cập nhật trạng thái đơn thuê
  updateRentalStatus: async (orderId, newStatus) => {
    const res = await apiClient.put(
      `/admin/rentorders/${orderId}/status`,
      { status: newStatus }, // Cần bọc `status` thành object nếu API yêu cầu
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  },

  // ✅ HOÀN TẤT ĐƠN THUÊ (gửi thời gian trả và tình trạng sách)
// rentalService.js
EditRentalOrderDialog : async (orderId, payload) => {
  const res = await apiClient.put(
    `/admin/rentorders/${orderId}/complete`,
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return res.data;
},


  // Tự động đánh dấu đơn thuê quá hạn
  autoMarkOverdue: async () => {
    const res = await apiClient.put('/admin/rentorders/auto-overdue');
    return res.data;
  },
};

export default rentalService;
