// src/hooks/useEmployeeActivitiesManagement.js
import { useEffect, useState } from "react";
import apiClient from "../services/api";
import { jwtDecode } from "jwt-decode";

export const useEmployeeActivitiesManagement = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchStaffId, setSearchStaffId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ✅ Patch: nếu token không có nhưng accessToken có thì copy sang
    if (!localStorage.getItem("token") && localStorage.getItem("accessToken")) {
      localStorage.setItem("token", localStorage.getItem("accessToken"));
    }

    const token = localStorage.getItem("token");
    if (token) {
      fetchActivities(token);
    } else {
      console.warn("❌ Không tìm thấy token.");
    }
  }, []);

  const fetchActivities = async (token) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(token);
      console.log("🧩 Decoded:", decoded);

      // 👉 Ưu tiên lấy role rõ ràng
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        decoded.role || decoded.Role || "";

      const staffId =
        decoded?.nameid || decoded?.UserId || decoded?.staffId || decoded?.StaffId;

      console.log("Role:", role);
      console.log("StaffId:", staffId);

      let url;

      // 👉 Chỉ cho Admin gọi /ActivityNotification (tổng)
      if (role?.toLowerCase() === "admin") {
        url = "https://chosachonline-datn.onrender.com/api/ActivityNotification";
      } else {
        if (!staffId) throw new Error("Không xác định được StaffId từ token");
        url = `https://chosachonline-datn.onrender.com/api/ActivityNotification/staff/${staffId}`;
      }

      const res = await apiClient.get(url);

      const formatted = res.data.map((n) => ({
        notificationId: n.NotificationId,
        description: n.Description,
        createdDate: n.CreatedDate,
        staffId: n.StaffId,
        staffName: n.StaffName || "Unknown",
      }));

      setActivities(formatted);
      setFilteredActivities(formatted);
      setStatistics(calculateStatistics(formatted));
    } catch (err) {
      console.error("❌ Lỗi lấy dữ liệu hoạt động:", err);
    } finally {
      setIsLoading(false);
    }
  };



  const calculateStatistics = (data) => {
    const todayStr = new Date().toLocaleDateString("vi-VN");
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneHourAgo = new Date(now);
    oneHourAgo.setHours(now.getHours() - 1);

    return {
      totalActivities: data.length,
      activeStaff: [...new Set(data.map((a) => a.staffId))].length,
      todayActivities: data.filter(
        (a) => new Date(a.createdDate).toLocaleDateString("vi-VN") === todayStr
      ).length,
      thisWeekActivities: data.filter((a) => new Date(a.createdDate) >= oneWeekAgo).length,
      thisMonthActivities: data.filter((a) => new Date(a.createdDate) >= oneMonthAgo).length,
      recentActivities: data.filter((a) => new Date(a.createdDate) >= oneHourAgo).length,
    };
  };

  const handleSearch = () => {
    setIsLoading(true);
    const keyword = searchStaffId.trim().toLowerCase();

    const filtered = !keyword
      ? activities
      : activities.filter(
        (a) =>
          a.staffId?.toLowerCase().includes(keyword) ||
          a.staffName?.toLowerCase().includes(keyword)
      );

    setFilteredActivities(filtered);
    setIsLoading(false);
  };

  return {
    activities: filteredActivities,
    statistics,
    isLoading,
    searchStaffId,
    handleSearchChange: setSearchStaffId,
    handleSearch,
  };
};