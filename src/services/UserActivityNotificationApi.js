// src/hooks/userActivityNotificationApi.js
import apiClient from '../services/api';
import { jwtDecode } from 'jwt-decode';

const formatNotification = (n) => ({
    notificationId: n.notificationId,
    description: n.description,
    createdDate: n.createdDate
        ? new Date(n.createdDate).toLocaleString("vi-VN")
        : "Không rõ thời gian",
    staffId: n.staffId,
    staffName: n.staffName || "Unknown",
});

const UserActivityNotificationApi = {
    getMyNotifications: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ Token không tồn tại trong localStorage!");
            throw new Error("Token không tồn tại");
        }

        let staffId;
        try {
            const decoded = jwtDecode(token);
            console.log("🧩 JWT decoded:", decoded);

            staffId =
                decoded?.nameid || decoded?.StaffId || decoded?.staffId || decoded?.UserId;

            if (!staffId) {
                throw new Error("Không tìm thấy staffId trong token");
            }
            console.log("✅ StaffId:", staffId);
        } catch (error) {
            console.error("❌ Lỗi decode token:", error);
            throw error;
        }

        try {
            const res = await apiClient.get(`/ActivityNotification/staff/${staffId}`);
            console.log("📥 Dữ liệu hoạt động:", res.data);
            return res.data.map(formatNotification);
        } catch (error) {
            console.error("❌ Lỗi khi gọi API:", error);
            throw error;
        }
    },
};

export default UserActivityNotificationApi;