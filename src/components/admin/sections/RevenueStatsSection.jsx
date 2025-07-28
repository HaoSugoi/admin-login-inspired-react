import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import apiClient from "../../../services/api";

const RevenueStatsSection = () => {
  const [rangeType, setRangeType] = useState("daily"); // daily | monthly | yearly
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem(`${rangeType}-rent-data`);
    if (savedData) setChartData(JSON.parse(savedData));
  }, [rangeType]);

  const handleConfirm = async () => {
    if (!startDate || !endDate) return alert("Vui lòng nhập đủ ngày bắt đầu và kết thúc");

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) return alert("Ngày bắt đầu phải trước hoặc bằng ngày kết thúc");

    const requests = [];
    const current = new Date(start);

    if (rangeType === "daily") {
      while (current <= end) {
        const isoDate = new Date(current).toISOString(); // ISO string required
        const label = `${current.getDate().toString().padStart(2, '0')}/${(current.getMonth() + 1).toString().padStart(2, '0')}`;

        requests.push(
          apiClient.post("/api/Report/rent/daily/set-date", JSON.stringify(isoDate), {
            headers: { "Content-Type": "application/json" }
          }).then(() =>
            apiClient.get("/api/Report/rent/daily").then((res) => ({
              label,
              value: res.data?.TotalValueToday || 0
            }))
          )
        );

        current.setDate(current.getDate() + 1);
      }
    }

    // NOTE: Nếu backend cũng thay đổi format tháng/năm tương tự ISO string, có thể update logic tương tự ở đây

    const results = await Promise.all(requests);
    setChartData(results);
    localStorage.setItem(`${rangeType}-rent-data`, JSON.stringify(results));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Thống Kê Doanh Thu (Thuê - Theo Ngày)</h2>

      <div className="flex gap-4 mb-4 items-center">
        <select
          value={rangeType}
          onChange={(e) => setRangeType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="daily">Theo Ngày</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <span>→</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />

        <Button onClick={handleConfirm}>Xác nhận</Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#00bfa5" name="Tổng tiền (VND)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueStatsSection;
