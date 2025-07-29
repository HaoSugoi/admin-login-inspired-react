import React, { useEffect, useState } from "react";
import apiClient from "../../../services/api"; // đường dẫn đến file của bạn
import { toast } from "react-toastify";

const ActivitySection = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const res = await apiClient.get("/ActivityNotification");

      const data = res.data.map((item) => ({
        id: item.NotificationId,
        user: item.StaffName,
        action: item.Description,
        time: new Date(item.CreatedDate).toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      }));

      setActivities(data);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      toast.error("Không thể tải hoạt động gần đây.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="section-card">
        <div className="section-title d-flex justify-between align-items-center mb-2">
          <span>Hoạt động gần đây</span>
          <a href="/admin/employee-activities" className="view-all-link text-primary small">
            Xem tất cả ›
          </a>
        </div>

        <div className="activity-list" style={{ maxHeight: "260px", overflowY: "auto" }}>
          {loading ? (
            <div className="text-muted">Đang tải hoạt động...</div>
          ) : activities.length === 0 ? (
            <div className="text-muted">Không có hoạt động nào.</div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="activity-item mb-3">
                <div className="activity-user fw-semibold">{activity.user}</div>
                <div className="activity-action">{activity.action}</div>
                <div className="activity-time text-muted small">{activity.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
