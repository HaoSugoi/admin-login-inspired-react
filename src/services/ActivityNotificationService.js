// src/services/activityNotificationService.js
import apiClient from './api';
import jwt_decode from 'jwt-decode';

// 🔧 Hàm tách StaffId từ token (có thể tách ra utils nếu dùng nhiều)
const getStaffIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Không tìm thấy token!");

    const decoded = jwt_decode(token);
    return decoded?.nameid || decoded?.staffId || decoded?.StaffId;
};

// ✅ Hàm xử lý định dạng dùng chung
const formatNotification = (n) => ({
    NotificationId: n.notificationId,
    Description: n.description,
    CreatedDate: n.createdDate
        ? new Date(n.createdDate).toLocaleString('vi-VN')
        : "Không rõ thời gian",
    StaffId: n.staffId,
    StaffName: n.staffName || "Unknown"
});

const ActivityNotificationService = {
    // GET: Lấy tất cả thông báo (admin)
    getAllNotifications: async () => {
        const res = await apiClient.get('/ActivityNotification');
        return res.data.map(formatNotification);
    },

    // GET: Lấy thông báo theo StaffId
    getNotificationsByStaffId: async (staffId) => {
        const res = await apiClient.get(`/ActivityNotification/staff/${staffId}`);
        return res.data.map(formatNotification);
    },

    // GET: Lấy thông báo của nhân viên hiện tại
    getMyNotifications: async () => {
        const staffId = getStaffIdFromToken();
        const res = await apiClient.get(`/ActivityNotification/staff/${staffId}`);
        return res.data.map(formatNotification);
    }
};

export default ActivityNotificationService;